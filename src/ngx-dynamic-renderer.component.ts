import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewContainerRef,
  Renderer2,
  ViewChild,
  Input,
  AfterContentInit
} from '@angular/core';

@Component({
  selector: 'ngx-dynamic-renderer',
  template: `<div #container></div>`
})
export class NgxDynamicRendererComponent implements AfterContentInit {

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

  ngAfterContentInit() {
    // make the dynamic renderer available to itself
    this.componentMap = Object.assign(DynamicRendererMap, this.componentMap);

    // loop over configuration and generate components
    this._render(this.components);

    // when the reference count of the root renderer is zero, we know the rendering is complete.
    this.rootRenderer.refCount -= 1;
    if ( this.rootRenderer.refCount === 0 ) {
      console.log('(dynamic-renderer) rendering complete.');
      this._subscribeEvents();
    }
  }

  // todo: support conditions
  // todo: properly unsubscribe on destruction
  _subscribeEvents() {
    this.rootRenderer.eventRegistry.forEach(eventDef => {

      const target = (!eventDef.target || eventDef.target === 'self') ? eventDef.source : this.rootRenderer.instanceMap[eventDef.target];

      if ( target ) {
        const action = target.instance[eventDef.action];
        // const params = eventDef.params || [];

        if ( action ) {
          console.log('(dynamic-renderer) subscribing event:', eventDef);

          // subscribe to @Output if available
          if ( eventDef.source.instance[eventDef.eventName] ) {
            eventDef.source.instance[eventDef.eventName].subscribe((event) => {
              // todo: support interpolation of variables in params
              console.log('(dynamic-renderer) firing event:', eventDef.eventName);
              action.apply(target.instance, eventDef.params);
            });

          // else use native event, such as click, blur, etc
          } else {
            this.renderer.listen(eventDef.source.location.nativeElement, eventDef.eventName, (event) => {
              // todo: support interpolation of variables in params
              console.log('(dynamic-renderer) firing event:', eventDef.eventName);
              action.apply(target.instance, eventDef.params);
            });
          }
        }
      }
    });
  }

  _render(components) {
    if (components.length > 0 ) {
      console.log('(dynamic-renderer) renderer starting with:', components[components.length - 1].id);
    }

    // render compoonents (reversed since components created at index 0)
    const instances = components.reverse().map(componentDef => {
      return this._createComponent(componentDef);
    });

    // return array of instantiated components
    return instances;
  }

  _createComponent(componentDef:any) {
    console.log('(dynamic-renderer) creating component...', componentDef.id);
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
      if ( componentDef.properties ) {
        Object.keys(componentDef.properties)
          .forEach((property) => {
            // console.log('setting prop:', property, componentDef.properties[property]);
            component.instance[property] = componentDef.properties[property];
          });

      // if this is a dynamic renderer itself, pass the components into the component's properties.
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
          componentDef.events[eventName].forEach(eventDef => {
            const event = {
              source: component,
              eventName: eventName,
              target: eventDef.target,
              action: eventDef.action,
              params: eventDef.params
            };
            console.log('(dynamic-renderer) registering event:', event);
            this.rootRenderer.eventRegistry.push(event);
          });
        });
      }

      return component;
    } else {
      console.log('(dynamic-renderer) component not registered with renderer:', componentDef.component);
      return false;
    }
  }

}

// make the component renderer available to itself
const DynamicRendererMap = { 'dynamic-renderer': NgxDynamicRendererComponent };
