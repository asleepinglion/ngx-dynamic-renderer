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

  // access to the dynamic renderer container reference
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  // array of components to render
  @Input() components = [];

  // component map which maps text aliases to Angular component classes
  @Input() componentMap = {};

  // instance map for the dynamic event system
  private instanceMap = {};

  // provide reference to root renderer & maintain reference count for event registration
  private rootRenderer = this;
  private refCount = 1;

  // events to register when done renderering
  private eventRegistry = [];

  constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer2) { }

  ngOnInit () {
    // make the dynamic renderer available to itself
    this.componentMap = Object.assign(DynamicRendererMap, this.componentMap);
  }

  // tood: optimize by clearing only components removed / updating values of others?
  ngOnChanges(changes: SimpleChanges) {

    if ( changes.components ) {
      // ensure we are creating a copy of the array and not passing by reference
      this.components = [...changes.components.currentValue];
      // unsubsribe to any events
      this._unSubscribeEvents();

      // clear components
      this.container.clear();
      this.refCount = 1;

      // loop over configuration and generate components
      // nested renderers will increase the root renderer's refCount
      this._render(this.components);

      // when the reference count of the root renderer is zero, we know the rendering is complete.
      this.rootRenderer.refCount -= 1;
      if ( this.rootRenderer.refCount === 0 ) {
        console.log('(dynamic-renderer) rendering complete.');
        this._subscribeEvents();
      }
    }
  }

  ngOnDestroy() {
    this._unSubscribeEvents();
  }

  _render(components) {
    if (components.length > 0 ) {
      console.log('(dynamic-renderer) rendering:', components[components.length - 1].id || '(no id set)');
    }

    // render compoonents (reversed since components created at index 0)
    const instances = components.reverse().map(componentDef => {
      return this._createComponent(componentDef);
    });

    // return array of instantiated components
    return instances;
  }

  _createComponent(componentDef: any) {
    console.log('(dynamic-renderer) creating:', componentDef.id);
    // console.log('createComponent', componentDef);

    // make sure the defined component exists in the component map
    if ( this.componentMap[componentDef.component] ) {

      // console.log('creating component:', componentDef);

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

      // pass through any properties for the component
      // todo: support interoplation of properties
      if ( componentDef.properties ) {
        Object.keys(componentDef.properties)
          .forEach((property) => {
            component.instance[property] = this._interpolate(componentDef.properties[property], component.instance);
            console.log('(dynamic-renderer) setting:', property, component.instance[property]);
          });

      // if this is a nested dynamic renderer itself, pass the components into the component's properties.
      } else {
        if ( componentDef.component === 'dynamic-renderer' ) {
          component.instance['components'] = componentDef.components;
          component.instance['rootRenderer'] = this.rootRenderer;
          this.rootRenderer.refCount += 1;
        }
      }

      // maintain reference to component by id
      if ( componentDef.id ) {
        this.rootRenderer.instanceMap[componentDef.id] = component;
      }

      // maintain registry of events to actions (subscription happens after rendering complete)
      if ( componentDef.events ) {
        Object.keys(componentDef.events).forEach(eventName => {
          const newEvents = componentDef.events[eventName].map(eventDef => {

            console.log(eventDef.action);

            return {
              source: component,
              eventName: eventName,
              target: eventDef.target,
              action: eventDef.action,
              params: eventDef.params
            };
          });
          this.rootRenderer.eventRegistry = [...this.rootRenderer.eventRegistry, ...newEvents];
        });
      }

      return component;
    } else {
      console.log('(dynamic-renderer) component not found:', componentDef.component);
      return false;
    }
  }

  // replace variables in string with those from context
  _interpolate(expr: string, context: object): string {

    const templateMatcher: RegExp = /{{\s?([^{}\s]*)\s?}}/g;

    if ( typeof expr !== 'string' || !context ) {
      return expr;
    }

    console.log('(dynamic-renderer) interpolating:', expr);

    return expr.replace(templateMatcher, (match: string, contents: string) => {
      return this._getValue(contents, context);
    });
  }

  _getValue(expr: string, context: object ): string {
    const keys = expr.split('.');

    // support id-based references to other components
    const firstKey = keys[0].split('#');
    if ( firstKey.length > 1 ) {
      if ( this.rootRenderer.instanceMap[firstKey[1]] ) {
        context = this.rootRenderer.instanceMap[firstKey[1]].instance;
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

    // casting to string
    return prop + '';
  }

  // todo: support conditions
  // todo: debouncing?
  _subscribeEvents() {
    this.rootRenderer.eventRegistry = this.rootRenderer.eventRegistry.map(eventDef => {

      const target = (!eventDef.target || eventDef.target === 'self') ?
        eventDef.source : this.rootRenderer.instanceMap[eventDef.target];

      if ( target ) {
        const action = target.instance[eventDef.action];
        // const params = eventDef.params || [];

        if ( action ) {
          console.log('(dynamic-renderer) subscribing event:', eventDef.eventName, '->',
            target, ',', eventDef.action);

          // subscribe to @Output if available
          // todo: ensure this is actual an Observerable
          if ( eventDef.source.instance[eventDef.eventName] ) {
            eventDef.subscription = eventDef.source.instance[eventDef.eventName].subscribe((event) => {
              // todo: support interpolation of variables in params
              console.log('(dynamic-renderer) firing event:', eventDef.eventName);
              action.apply(target.instance, eventDef.params);
            });

          // else use native event, such as click, blur, etc
          } else {
            eventDef.listener = this.renderer.listen(eventDef.source.location.nativeElement, eventDef.eventName, (event) => {
              // todo: support interpolation of variables in params
              console.log('(dynamic-renderer) firing event:', eventDef.eventName);
              action.apply(target.instance, eventDef.params);
            });
          }
        }
      }

      return eventDef;
    });
  }

  _unSubscribeEvents() {
    this.rootRenderer.eventRegistry.forEach(eventDef => {
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
    this.rootRenderer.eventRegistry = [];
  }

}

// make the dynamic renderer available to itself
const DynamicRendererMap = { 'dynamic-renderer': NgxDynamicRendererComponent };
