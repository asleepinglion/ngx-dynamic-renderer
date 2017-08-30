# Project Notes

## Initialize Project

- ng new examples --styles=scss --routing
- yarn add @angular/material @angular/ckd @angular/animations hammerjs
- yarn add ngx-dynamic-renderer
- ng serve --sourcemap=false

> Use --sourcemap=false on ng serve for major increase in build times during development.

- Add imports for @angular/animations and hammerjs.
- Create components module and create desired components.
- Import material component modules: MdbuttonModule, MdIconModule, MdInputModule.
- Import the ngx-dynamic-renderer.
- Created wrapper components for material to ensure a simplified consistent API via properties by encapsulating behavior/structure defined by design system and limiting configuration exposed.
- Add wrapper components to entryComponents of parent ngModule to make them available dynamically.

## Create & Expose New Component

- Create the new component: ng g c dyn-button
- Make sure component is imported/declared in a module.
- Export the component class from the module for easy import elsewhere.
- Import the component class into the view containing the ngx-dynamic-renderer, and add an alias to the componentMap referencing the component class.
- Make sure the component is listed in the entryComponents of the module containing the dynamic renderer.


