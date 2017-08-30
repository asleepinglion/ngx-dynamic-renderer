# Getting Started with the Dynamic Renderer

> This project is currently experimental, use at your own risk :)

Manually composing UI can be a tedious job, especially when there are lots of similar pages that should all follow the same design patterns, are highly configurable, and/or need to be altered frequently to meet rapidly changing business and regulatory requirements. As opposed to statically rendering, where components are engineered into a specific configuration at build-time, dynamic rendering is a an approach to component rendering where the UI is instead composed by executing programmatic APIs based on configuration data at run-time. There is nothing revolutionary about rendering in this way, nor is it meant to be the solution for everything, its just another tool in the toolbox and a natural extension and evolution of combining design systems & component architectures. 

The mission of the Dynamic Renderer is to create a super thin adapter between the Angular rendering APIs and the components of your choosing using a simple identity map pairing text aliases with proper Angular classes. The instructions for how to render those components is transcribed via a natural JSON-based Component schema designed as a lightweight standardized envelope for a component tree. The schema provides a natural interface for a nested set of components, their properties, events, actions. The resulting consumer API is thus driven by the exposed components themselves. For example, you could create a list component which takes an array of items via a property or as a set of child components depending on your design system and the level of composability you need to support. **This leaves the overall API up to the component authors to decide.**

This also means you should be able to use the Dynamic Renderer with existing components. That said, the renderer best supports components which provide simple declarative APIs to encapsulate complex behavior. This avoids complex configuration and allows the renderer itself to remain lightweight & maintain its singular purpose.

**Composition** is supported via content projection (ng-content), however, its not currently possible to fill content projection slots by name (see the content projection section below). **Events** and actions are supported through additional annotation in the JSON configuration, and wire from actual component events (even custom observables) to methods available on the component (see the events section below). 
**Interpolation** is supported for properties and action parameters using a custom method of the dynamic renderer which allows you to access properties of any component or service the renderer has control over through the `id` property (see the interpolation section below). **Services** can also be exposed by providing a service map similar to the component map and using the service annotation (see the section on services below).


## Importing the Dynamic Renderer

To take advantage of the dynamic renderer you need to import it into the NgModule for the component you wish to be able to dynamically render within. If your using the Dynamic Renderer for the whole application, that would be the AppModule, otherwise it could be a Page component, or if your only using the Dynamic Renderer for a specific part of the UI, some arbitrary component's module.

Install the ngx-dynamic-renderer package:

```bash
yarn add ngx-dynamic-renderer
```

Import the NgxDynamicRendererModule into a module file:

```typescript
import { NgxDynamicRendererModule, NgxDynamicRendererComponent } from 'ngx-dynamic-renderer';
```

And import the NgxDynamicRendererModule into the NgModule declaration itself:

```typescript
@NgModule({
  imports: [
    CommonModule,
    // other modules you need...
    NgxDynamicRendererModule
  ],
  entryComponents: [
  	NgxDynamicRendererComponent
    // any components you want available to the dynamic renderer
    // otherwise the angular build system will tree-shake them out.
  ]
})
export class MyPageModule { }
```

> Note that you still need to include any modules for components you'd like exposed to the dynamic render. The dynamic renderer contains no components besides the renderer itself. You additionally need to add any components that will be available but aren't used in the module elsewhere in the **entryComponents** of the NgModule. Otherwise, the components will not be available at runtime because they will be removed during the tree-shaking process that happens at build time.


## Using the Dynamic Renderer

Once the Dynamic Renderer is included in the module which houses the component from which you want to use it within, you can use it like any other component. 

In the example below we invoke the renderer within our MyPage component's template (referred to as the root renderer):

```js
<ngx-dynamic-renderer [components]="componentMeta" [componentMap]="componentMap"></ngx-dynamic-renderer>
```

As you can see where are passing in two properties, the **components** property which describes the configuration the renderer will use to render and the **componentMap** property which provides a map of components available to the renderer. Let's take a look at our MyPage component's controller:

```js
import { Component } from '@angular/core';
import { MyComponent1 } from 'app/components/my-component1/my-component1.component';
import { MyComponent2 } from 'app/components/my-component2/my-component2.component';

@Component({
  selector: 'my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent {

  componentMap: Object = {
    'comp1': MyComponent,
    'comp2': MyComponent2
  };

  componentMeta: Array<Object> = [
    {
      component: 'comp1',
      properties: {
        label: 'Hello'
      }
    },
    {
      component: 'comp2',
      properties: {
        label: 'World!'
      }
    }
  ];
  
}
```

So now we can see that our **componentMap** is just a identity map between textual key references and the component class the renderer should use when it encounters it in the component meta configuration object. Likewise the **components**  property is just a collection (an array of objects) which describes the component and its properties. In the example were exposing two components under the alias of comp1 and comp2 and setting the label property for each. 

## The Component Meta Schema

In establishing the JSON meta schema, care was taken **not** to create an additional unnecessary layer of abstraction with its own arbitrary vocabulary; thus the meta schema is just a nested structure of components and properties which map directly to the components themselves.

```js
{ 
  "components": 
  [
    { 
      "component": "componentMapAlias",
      "properties": {
        "property": "Property Value",
         ...
      },
      "events": [...],
      "components:" [ ... ]
  ]
}
```

### Composition & Content Projection 

Angular supports composition of components via a mechanism called content projection. Inside a component you can annotate content projection slots (areas which can be replaced with other components) using the ng-content directive. The ng-content directive supports a “select” attribute which allows you to assign nested components to specific slots based on the element name, classes used, etc. 

Currently the programmatic API for creating components dynamically only support the ability to provide an array of components to project which will assign to projection slots based on the index and the order of appearance within the component. Consequently, components provided to the dynamic renderer via the components attribute of the JSON meta configuration of a parent component will cause the first nested component to be placed in the first available ng-content inside the parent component. 

Let's say we have a simple card component whose template looks like:

```html
<md-card>
  <md-card-content>
    <ng-content></ng-content>
  </md-card-content>
</md-card>
```

To project a single text element inside the content area of the card, we would use the following JSON meta configuration:

```js
{
  components: [
    {
      id: 'card1',
      component: 'card',
      components: [
        {
          id: 'text1',
          component: 'text',
          properties: {
            text: `Text message 1.`
          }
        }
      ]
    }
  ]
} 
```

If multiple components are provided and there are a lesser amount of content projection slots available, the additional components will actually be rendered as siblings to the the parent component and not as children. This can yield unexpected results if your not expecting it. In order to render multiple components into a single content projection slot, you need to nest them in an dynamic renderer:

```js
{
  components: [
    {
      id: 'card1',
      component: 'card',
      components: [
        {
          component: 'dynamic-renderer',
          components: [
            {
              id: 'text1',
              component: 'text',
              properties: {
                text: `Text message 1.`
              }
            },
            {
              id: 'text2',
              component: 'text',
              properties: {
                text: `Text message 2.`
              }
            }
          ]
        }
      ]
    }
  ]
} 
```

### Events & Actions

The meta schema additionally allows you to subscribe to component events and execute actions based on conditions. The available events are those the component emits, and the actions are those methods publicly available on the component (no special tricks). 

```js
events: {
  eventName: [
    { 
      id: "myNamedAction",
      source: "self", // default value
      target: "self", // default value
      type: "component", // default value
      action: "method1",
      params: [ "param1" ],
      conditions: [
        { comparator: "eq", params: ["param1", "param2"] }
      ]
    }
  ]
}
```

> Note: Action conditions have not yet been implemented.

### Value & Parameter Interpolation

Values and parameters can reference values from the local component, root component, or any of the components or services rendered by the dynamic render (as long as they are identified with an id attribute in the meta configuration and the proper prefix is used). For example, if the counter component has a count property and you want to display that value from within an a simple text component, the JSON meta configuration might look something like: 

```js
{
  components: [
    {
      id: 'counter1',
      component: 'counter',
      properties: {
        start: 0,
        interval: 500
      },
    },  
    {
      id: 'text1',
      component: 'text',
      properties: {
        style: 'body',
        text: `The counter value is: {{#counter1.count}}.`
      }
    }
  ]
}
```

As you can see above, components can be referenced using `#` prefix; alternatively services can be referenced using the `$` prefix. Without either prefix the value will be referenced from the local component. You can also use `#root` to access the root renderer component. If the value being access is an Observable it will subscribe to updates automatically.

### Working with Services

Client-side (Angular) Services can be exposed to the dynamic renderer by providing a serviceMap, which works exactly like the the componentMap, providing textual aliases which map to services injected into the root renderer's parent component.

Let's say we have a service called MyService1 which has a basic method that returns a simple text value:

```js
import { Injectable } from '@angular/core';

@Injectable()
export class MyService1 {

  public test() {
    return 'simple value';
  }
 
}
```

Here our root renderer has been updated to include the **serviceMap** property:

```js
<ngx-dynamic-renderer [serviceMap]="serviceMap" [components]="componentMeta" [componentMap]="componentMap"></ngx-dynamic-renderer>
```

And our MyPage controller has been updated to define the **serviceMap** property including our injected service:

```js
import { Component } from '@angular/core';
import { MyService1 } from 'app/services/my-service1/my-service1.service.js';
import { MyComponent1 } from 'app/components/my-component1/my-component1.component';
import { MyComponent2 } from 'app/components/my-component2/my-component2.component';

@Component({
  selector: 'my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent {

  componentMap: Object = {
    'comp1': MyComponent,
    'comp2': MyComponent2
  };
  
  serviceMap: Object = {};

  componentMeta: Array = [
    {
      component: 'comp1',
      properties: {
        label: 'Hello'
      }
    },
    {
      component: 'comp2',
      properties: {
        label: 'World!'
      }
    }
  ];
  
  constructor( private myService1: MyService1 ) {
    this.serviceMap['myService1'] myService1;
  }
  
}
```

With this, we can now access and call methods of our service using an event/action in our JSON meta configuration:

```js
{
  components: [
    {
      id: 'card1',
      component: 'card',
      components: [
        {
          id: 'text1',
          component: 'text',
          properties: {
            text: `Text message 1.`
          },
          events: {
            init: [
              {
                id: "action1",
                target: "$myService1",
                action: "test"
              }
            ],
            "action1": [
              {
                target: "self",
                action: "setTextValue"
                // if no parameters are passed, the response of the 
                // previous action becomes the first parameter.
              }
            ]
          }
        }
      ]
    }
  ]
} 
```

In the above example, the **text1** component will execute the **test** action on the **myService1** service when the **init** event is executed. Since the action has an **id**, an event will be fired after the action has executed using the **id** of the action as the event name. This allows additional actions to be chained to the result of previous actions. The response from the previous action will be appended to the parameters of the chained action (becoming the first parameter if no parameters are specified in the chained action). Following the example above, the **setTextValue** method would be called on the **text1** component passing in the value from the **test** method on the **myService1** service.

While this certainly works, its often desired to have multiple components access the same data, or more importantly, to limit the number of external connections services tend to make. This can easily be achieved by instead using the **init** event and **setValue** action of the root renderer:

```js
{
  components: [
    {
      id: 'card1',
      component: 'card',
      components: [
        {
          id: 'text1',
          component: 'text',
          properties: {
            text: `{{#root.myValue}}`
          }
        }
      ]
    }
  ],
  events: {
    init: [
      {
        id: "action1",
        target: "$myService1",
        action: "test"
      }
    ],
    "action1": [
      {
        target: "self",
        action: "setValue",
        params: ["myValue"] // previous action's response is appended as the second parameter. 
      }
    ]
  }
} 
```

### Complex USer Interfaces

All of this gives a lot of flexibility of control from the meta layer, but at any point in which behavior becomes too complicated to describe via the meta schema, the recommended practice is to create a component which encapsulates that behavior and exposes a simpler API. This is a standard best practice for component development in general, and such a harmony should only help us drive towards higher quality of components in general.

A good example of this would be forms; as forms tend to have increased internal complexity, dynamic rendering is more easily achieved by using a combination of JSON Form Schema, a Layout Schema, and a description of the their current State. All of this could be annotated with the JSON Component schema outlined above, but, to reduce complexity its best to create a dynamic-form component which expects these properties specifically.


## What's Left?

- [x] Add support to rerender based on changes to the components configuration.
- [x] Support interpolated values in properties from both services & components.
- [ ] Support interpolated values in parameters from both services & components.
- [x] Support updating interpolated values when they change (if value is observable).
- [x] Support services via serviceMap and the $ annotation.
- [x] Support source as well as target for events.
- [ ] Add support for chained actions using the event ids as specified in above documentation.
- [ ] Add support for conditions on event/actions — likely using a condition map similar to the component map, allowing the library of available conditions to be controlled externally.
- [ ]  Create 2-3 example/demo apps to demonstrate possibilities and the best practices.
- [x] Counter Application
- [ ] Multi-step Form
- [ ] Paginated Data Table (using Apollo & Starwars (https://github.com/graphql/swapi-graphql) GraphQL server)
- [ ] Add checks/balances to ensure proper JSON configuration, warn/error incorrectly referenced, components, services, variables, etc.
- [ ] Add support for routing, changing the entire rendered structure or segments/partials.
- [ ] Write unit tests for the renderer itself.


## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Aaron Storck](mailto:aaronstorck@gmail.com)
