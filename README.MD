# Getting Started with the Dynamic Renderer

> This project is currently experimental, use at your own risk :)

To simplify and standardize dynamic rendering within an Angular application, we've created the Dynamic Renderer, a component that takes as input, a JSON Component schema describing component's and their properties, and an identity map which maps textual identifiers to proper Angular component classes. This allows dynamic renderering to be used for as much or little of the UI with as many or as few components as desired without creating an unnecessarily abstracted vocabulary.

The mission of the Dynamic Renderer is to create a super thin adapter between a natural configuration-only JSON schema, the powerful Angular dynamic rendering APIs, and any components of your choosing. This means you should be able to use the Dynamic Renderer with any 3rd party components dynamically by exposing them to the dynamic renderer's component map.

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

In the example below we invoke the renderer within our MyPage component's template:

```xml
<ngx-dynamic-renderer [components]="componentMeta" [componentMap]="componentMap"></ngx-dynamic-renderer>
```

As you can see where are passing in two properties, the **components** property which describes the configuration the renderer will use to render and the **componentMap** property which provides a map of components available to the renderer. Let's take a look at our MyPage component's controller:

```typescript
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
  
}
```

So now we can see that our componentMap is just a identity map between textual aliases  and the component class the renderer should use when it encounters it in the component meta object. Likewise the componentMeta  property is just a collection (an array of objects) which describes the component and its properties. In the example were exposing two components under the alias of comp1 and comp2 and setting the label property for each. 

## The Component Meta Schema

In establishing the JSON meta schema, care was taken **not** to create an additional unnecessary layer of abstraction with its own arbitrary vocabulary; thus the meta schema is just a nested structure of components and properties which map directly to the components themselves.

```json
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

The meta schema additionally allows you to subscribe to component events and execute actions based on conditions. The available events are those the component emits, and the actions are those methods publicly available on the component (no special tricks). 

```json
"events": {
  "eventName": [
    "target": "self",
    "action": "componentMethod",
    "params": [ "param1" ]
  ]
}
```

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
