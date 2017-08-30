import {
  Component,
  ComponentFactoryResolver,
  ComponentRef, // needed by the ngc compiler
  ViewContainerRef,
  Renderer2,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'ngx-dynamic-renderer',
  template: `<div #container></div>`
})
export class NgxDynamicRendererComponent implements OnInit, OnChanges, OnDestroy {

  // acquire access to the dynamic renderer's container
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  // id to reference the renderer
  private id = 'root';
  // maintain reference to root renderer (supporting nested renderers)
  private rootRenderer = this;
  // array of objects describing the components to render
  @Input() components = [];
  // component map which maps text aliases to Angular component classes
  @Input() componentMap = {};
  // service map which maps text aliases to Angular services
  @Input() serviceMap = {};
  // instance map of component instances by id
  private instanceMap = {};
  // registry of events to subscribe/unsubscribe
  private events = [];
  // registery of interpolations based on subscriptions
  private interpolations = {};

  constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer2) { }

  ngOnInit () {
    // make the dynamic renderer available to itself for nested renderering
    // tslint:disable-next-line
    this.componentMap = Object.assign(DynamicRendererMap, this.componentMap);
  }

  // todo: optimize by clearing only removed components & updating values of existing components
  ngOnChanges(changes: SimpleChanges) {

    if ( changes.components ) {
      // ensure we are creating a copy of the array and not passing by reference
      this.components = [...changes.components.currentValue];

      // unsubsribe to any events and interpolations
      this._unSubscribeEvents();
      this._unSubscribeInterpolations();

      // clear components
      this.container.clear();

      // loop over configuration and generate components
      // nested renderers will increase the root renderer's refCount
      this._render(this.components);

      if ( this.id === 'root' ) {
        console.log('(dynamic-renderer) rendering complete.');
        this._subscribeEvents();
      }
    }
  }

  ngOnDestroy() {
    this._unSubscribeEvents();
    this._unSubscribeInterpolations();
  }

  _uid(prefix = '') {
    return `${prefix}-${Math.random().toString(36).substring(2, 10)}`;
  }

  _render(components) {
    // render compoonents (reversed since components created at index 0)
    const instances = components.reverse().map(componentDef => {
      return this._createComponent(componentDef);
    });

    // return array of instantiated components
    return instances;
  }

  _createComponent(componentDef: any) {
    // generate an id if not set
    componentDef.id = componentDef.id || this._uid(componentDef.component);

    console.log('(dynamic-renderer) creating:', componentDef.id);
    // console.log('createComponent', componentDef);

    // make sure the defined component exists in the component map
    if ( this.componentMap[componentDef.component] ) {

      // create component factory from class
      const compFactory = this.resolver.resolveComponentFactory(this.componentMap[componentDef.component]);

      // recursively create nested components and store in array for projection into parent
      let projections = [];
      if ( componentDef.components && !(componentDef.component === 'dynamic-renderer') ) {
        projections = this._render(componentDef.components).map(instance => {
          if ( instance && instance.location && instance.location.nativeElement ) {
            return [instance.location.nativeElement];
          }
        });
      }

      // use the container to create component from factory including any projections
      const component = this.container.createComponent(
        compFactory,
        0, // projections break when parent component not inserted at 0
        this.container.parentInjector,
        projections
      );

      // ensure the id is set on the instance
      component.instance['id'] = componentDef.id;

      // pass through any properties for the component
      if ( componentDef.properties ) {
        Object.keys(componentDef.properties)
          .forEach((property) => {
            this._interpolate(componentDef.properties[property], component.instance, property);
            console.log('(dynamic-renderer) setting:', property, component.instance[property]);
          });

      // if this is a nested dynamic renderer itself, pass the components into the component's properties.
      } else {
        if ( componentDef.component === 'dynamic-renderer' ) {
          component.instance['id'] = this._uid();
          component.instance['rootRenderer'] = this.rootRenderer;
          component.instance['components'] = componentDef.components;
        }
      }

      // maintain reference to component by id
      if ( componentDef.id ) {
        this.rootRenderer.instanceMap[componentDef.id] = component;
      }

      // maintain registry of events to actions (subscriptions wired after rendering complete)
      if ( componentDef.events && !Array.isArray(componentDef.events) ) {
        Object.keys(componentDef.events).forEach(eventName => {
          if ( Array.isArray(componentDef.events[eventName]) ) {
            const newEvents = componentDef.events[eventName].map(eventDef => {
              return {
                origin: component,
                source: eventDef.source,
                eventName: eventName,
                target: eventDef.target,
                action: eventDef.action,
                params: eventDef.params || []
              };
            });
            this.rootRenderer.events = [...this.rootRenderer.events, ...newEvents];
          }
        });
      }

      return component;
    } else {
      console.log('(dynamic-renderer) component not found:', componentDef.component);
      return false;
    }
  }

  // lexer to tokenize expression into strings & variables
  _lex(expr) {
    const tokenTypes = [
      { regex: /^{{(\s?([^{}\s]*)\s?)}}/, type: 'variable' },
      { regex: /(^.+?)(?={{|$)/, type: 'string' }
    ];

    let tokens = [];
    let match;
    let i;

    do {
      for ( i = 0; i < tokenTypes.length; i++ ) {
        match = tokenTypes[i].regex.exec(expr);
        if ( match ) {
          tokens.push({type: tokenTypes[i].type, value: match[1], id: this._uid('token')});
          expr = expr.substring(match[0].length);
        }
      }
    } while (expr.length > 0 );

    return tokens;
  }

  // interpolate properties with dynamic values
  _interpolate(expr, origin: object, property: string) {
    if ( typeof expr !== 'string' || !origin ) {
      return expr;
    }

    let tokens = this._lex(expr);

    let uid = this._uid();
    this.interpolations[uid] = {
      component: origin['id'],
      property: property,
      tokens: tokens,
      values: {},
      subscriptions: {},
      update: () => {
        // maintain quick access for reflection
        let interpolationDef = this.interpolations[uid];

        // update property on origin
        origin[property] = tokens.map((token, index) => {

          // return simple value for strings & numbers
          if ( token.type === 'string' || token.type === 'number' ) {
            return token.value;
          } else {
            // look up dynamic value
            let dynValue = this._getValue(token.value, origin);

            // return value if reference to simple string or number
            if ( typeof dynValue === 'string' || typeof dynValue === 'number' ) {
              return dynValue;

            // subscribe if value is an observable
            } else if ( dynValue && typeof dynValue['subscribe'] === 'function' ) {

              // todo: do subscribtions after rendering is complete to access props of components renderered later
              if ( !interpolationDef.subscriptions[token.id] ) {
                interpolationDef.subscriptions[token.id] = true;
                console.log('(dynamic-renderer) subscribing interpolated value for:', origin['id'], property, token.id);
                interpolationDef.subscriptions[token.id] = dynValue['subscribe']((value) => {
                  console.log('(dynamic-renderer) updating interpolated value:', value);
                  interpolationDef.values[index] = value;
                  interpolationDef.update();
                });
              }

              return (typeof interpolationDef.values[index] === 'undefined' ) ? '' : interpolationDef.values[index];
            }
          }
        }).join('');
      }
    };

    // trigger initial update
    this.interpolations[uid].update();
  }

  _getValue(expr: string, context: object ) {
    const keys = expr.split('.');

    // support id-based references to other components or services
    const firstChar = keys[0].substr(0, 1);
    if ( firstChar === '#') {
      if ( this.rootRenderer.instanceMap[keys[0].substr(1, keys[0].length - 1)] ) {
        context = this.rootRenderer.instanceMap[keys[0].substr(1, keys[0].length - 1)].instance;
        keys.shift();
      }
    } else if ( firstChar === '$' ) {
      if ( this.rootRenderer.serviceMap[keys[0].substr(1, keys[0].length - 1)] ) {
        context = this.rootRenderer.serviceMap[keys[0].substr(1, keys[0].length - 1)];
        keys.shift();
      }
    }

    // traverse dot syntax
    let prop = context;
    keys.forEach((key, ) => {
      if ( prop ) {
        prop = prop[key];
      }
    });

    return prop;
  }

  // todo: support conditions
  // todo: support debouncing?
  _subscribeEvents() {
    this.rootRenderer.events = this.rootRenderer.events.map(eventDef => {

      let source = (!eventDef.source || eventDef.source === 'self') ? eventDef.origin : eventDef.source;
      if (typeof source === 'string') {
        if (source.substr(0, 1) === '$') {
          source = this.rootRenderer.serviceMap[source.substr(1, source.length - 1)];
        } else if (source.substr(0, 1) === '#') {
          source = this.rootRenderer.instanceMap[source.substr(1, source.length - 1)];
        } else {
          source = this.rootRenderer.instanceMap[source];
        }
      }

      let target = (!eventDef.target || eventDef.target === 'self') ? eventDef.origin : eventDef.target;
      if (typeof target === 'string') {
        if (target.substr(0, 1) === '$') {
          target = this.rootRenderer.serviceMap[target.substr(1, target.length - 1)];
        } else if (target.substr(0, 1) === '#') {
          target = this.rootRenderer.instanceMap[target.substr(1, target.length - 1)];
        } else {
          target = this.rootRenderer.instanceMap[target];
        }
      }

      if ( source && target ) {
        let sourceInstance = (source.instance) ? source.instance : source;
        let targetInstance = (target.instance) ? target.instance : target;
        const action = targetInstance[eventDef.action];

        if ( action ) {
          console.log('(dynamic-renderer) subscribing event:', eventDef.eventName, '->', targetInstance, eventDef.action);

          // subscribe to @Output if available
          // todo: ensure this is actual an Observerable
          if ( sourceInstance[eventDef.eventName] && typeof sourceInstance[eventDef.eventName].subscribe === 'function' ) {
            eventDef.subscription = sourceInstance[eventDef.eventName].subscribe((value) => {
              // todo: support interpolation of variables in params
              console.log('(dynamic-renderer) firing event:', eventDef.eventName, value);

              // todo: provide option to disable this feature?
              // push new value on the end of the params list
              // exceucte the action passing in the parameters
              action.apply(targetInstance, [...eventDef.params, value]);
            });

          // else use native event, such as click, blur, etc
          } else if ( source.location ) {
            eventDef.listener = this.renderer.listen(source.location.nativeElement, eventDef.eventName, (event) => {
              // todo: support interpolation of variables in params
              console.log('(dynamic-renderer) firing event:', eventDef.eventName, event);
              action.apply(targetInstance, [...eventDef.params, event.target.value]);
            });
          }
        }
      }

      return eventDef;
    });
  }

  _unSubscribeEvents() {
    this.rootRenderer.events.forEach(eventDef => {
      if ( eventDef.subscription ) {
        console.log('(dynamic-renderer) unsubscribing event:', eventDef.eventName);
        eventDef.subscription.unsubscribe();
      }

      if ( eventDef.listener ) {
        console.log('(dynamic-renderer) unsubscribing event:', eventDef.eventName);
        eventDef.listener();
      }
    });

    // reset the event registry
    this.rootRenderer.events = [];
  }

  _unSubscribeInterpolations() {
    Object.keys(this.rootRenderer.interpolations).forEach(interpolationDefId => {
      let interpolationDef = this.rootRenderer.interpolations[interpolationDefId];
      Object.keys(interpolationDef.subscriptions).forEach(subscriptionId => {
        console.log('(dynamic-renderer) unsubscribing interpolation:',
          interpolationDef.component, interpolationDef.property, subscriptionId);
        interpolationDef.subscriptions[subscriptionId].unsubscribe();
      });
    });
  }

}

// make the dynamic renderer available to itself
const DynamicRendererMap = { 'dynamic-renderer': NgxDynamicRendererComponent };
