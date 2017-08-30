webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./modules/counter/counter.module": [
		"../../../../../src/app/modules/counter/counter.module.ts"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [
    {
        path: '',
        redirectTo: '/counter',
        pathMatch: 'full'
    },
    {
        path: 'counter',
        loadChildren: './modules/counter/counter.module#CounterModule'
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes, { useHash: true })],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<md-sidenav-container class=\"container\">  \n  <md-toolbar class=\"mat-elevation-z4 toolbar\" color=\"primary\">\n    <span class=\"toolbar-left\">\n      {{title}}\n      <button md-button (click)=\"onToggleMenu()\"><md-icon>arrow_drop_down</md-icon></button>            \n    </span>\n    <span class=\"toolbar-right\">\n      <button md-button (click)=\"onToggleSettings()\"><md-icon>settings</md-icon></button>            \n    </span>  \n  </md-toolbar>\n  <md-sidenav #sideNav class=\"sidenav\" mode=\"side\" align=\"end\">\n      <dyn-editor #editor></dyn-editor>\n  </md-sidenav>  \n  <router-outlet></router-outlet>\n</md-sidenav-container>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  -webkit-font-smoothing: subpixel-antialiased;\n  -webkit-transform: translateZ(0) scale(1, 1);\n          transform: translateZ(0) scale(1, 1); }\n\n.container {\n  height: 100vh; }\n\n.toolbar-left {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto; }\n\n.sidenav {\n  width: 400px;\n  background-color: darkgray;\n  height: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_editor_service__ = __webpack_require__("../../../../../src/app/services/editor.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(editorService) {
        this.editorService = editorService;
        this.title = 'Counter Example';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editorService.jsonInitialized.subscribe(function (json) {
            _this.editor.setJson(json);
        });
    };
    AppComponent.prototype.onToggleSettings = function () {
        if (this.sideNav.opened) {
            this.sideNav.close();
            this.sideNav.opened = false;
        }
        else {
            this.sideNav.open();
            this.sideNav.opened = true;
        }
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('editor'),
    __metadata("design:type", Object)
], AppComponent.prototype, "editor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('sideNav'),
    __metadata("design:type", Object)
], AppComponent.prototype, "sideNav", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_editor_service__["a" /* EditorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_editor_service__["a" /* EditorService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_modules_module__ = __webpack_require__("../../../../../src/app/modules/modules.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_components_module__ = __webpack_require__("../../../../../src/app/components/components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_services_module__ = __webpack_require__("../../../../../src/app/services/services.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_9__services_services_module__["a" /* ServicesModule */],
            __WEBPACK_IMPORTED_MODULE_8__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_material__["a" /* MdSidenavModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_material__["b" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_material__["c" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_material__["d" /* MdSelectModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_material__["e" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_7__modules_modules_module__["a" /* ModulesModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]],
        entryComponents: []
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/components.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dyn_button_dyn_button_component__ = __webpack_require__("../../../../../src/app/components/dyn-button/dyn-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dyn_icon_dyn_icon_component__ = __webpack_require__("../../../../../src/app/components/dyn-icon/dyn-icon.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dyn_input_dyn_input_component__ = __webpack_require__("../../../../../src/app/components/dyn-input/dyn-input.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dyn_counter_input_dyn_counter_input_component__ = __webpack_require__("../../../../../src/app/components/dyn-counter-input/dyn-counter-input.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dyn_counter_dyn_counter_component__ = __webpack_require__("../../../../../src/app/components/dyn-counter/dyn-counter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dyn_editor_dyn_editor_component__ = __webpack_require__("../../../../../src/app/components/dyn-editor/dyn-editor.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__dyn_button_dyn_button_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__dyn_icon_dyn_icon_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__dyn_input_dyn_input_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_7__dyn_counter_dyn_counter_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__dyn_counter_input_dyn_counter_input_component__["a"]; });
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    return ComponentsModule;
}());
ComponentsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["c" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["g" /* MdInputModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__dyn_button_dyn_button_component__["a" /* DynButtonComponent */],
            __WEBPACK_IMPORTED_MODULE_3__dyn_icon_dyn_icon_component__["a" /* DynIconComponent */],
            __WEBPACK_IMPORTED_MODULE_4__dyn_input_dyn_input_component__["a" /* DynInputComponent */],
            __WEBPACK_IMPORTED_MODULE_5__dyn_counter_input_dyn_counter_input_component__["a" /* DynCounterInputComponent */],
            __WEBPACK_IMPORTED_MODULE_7__dyn_counter_dyn_counter_component__["a" /* DynCounterComponent */],
            __WEBPACK_IMPORTED_MODULE_8__dyn_editor_dyn_editor_component__["a" /* DynEditorComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__dyn_button_dyn_button_component__["a" /* DynButtonComponent */],
            __WEBPACK_IMPORTED_MODULE_3__dyn_icon_dyn_icon_component__["a" /* DynIconComponent */],
            __WEBPACK_IMPORTED_MODULE_4__dyn_input_dyn_input_component__["a" /* DynInputComponent */],
            __WEBPACK_IMPORTED_MODULE_5__dyn_counter_input_dyn_counter_input_component__["a" /* DynCounterInputComponent */],
            __WEBPACK_IMPORTED_MODULE_7__dyn_counter_dyn_counter_component__["a" /* DynCounterComponent */],
            __WEBPACK_IMPORTED_MODULE_8__dyn_editor_dyn_editor_component__["a" /* DynEditorComponent */]
        ]
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/dyn-button/dyn-button.component.html":
/***/ (function(module, exports) {

module.exports = "<button md-button>\n  <md-icon>{{icon}}</md-icon>\n</button>"

/***/ }),

/***/ "../../../../../src/app/components/dyn-button/dyn-button.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/dyn-button/dyn-button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynButtonComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DynButtonComponent = (function () {
    function DynButtonComponent() {
    }
    DynButtonComponent.prototype.ngOnInit = function () {
    };
    return DynButtonComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], DynButtonComponent.prototype, "icon", void 0);
DynButtonComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dyn-button',
        template: __webpack_require__("../../../../../src/app/components/dyn-button/dyn-button.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/dyn-button/dyn-button.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], DynButtonComponent);

//# sourceMappingURL=dyn-button.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/dyn-counter-input/dyn-counter-input.component.html":
/***/ (function(module, exports) {

module.exports = "<md-input-container>\n  <input type=\"number\" mdInput [placeholder]=\"placeholder\" [value]=\"value\" (keyup)=\"onKeyUp($event)\">\n</md-input-container>"

/***/ }),

/***/ "../../../../../src/app/components/dyn-counter-input/dyn-counter-input.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/dyn-counter-input/dyn-counter-input.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynCounterInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DynCounterInputComponent = (function () {
    function DynCounterInputComponent() {
        this.placeholder = 'Current count';
        this.value = '0';
    }
    DynCounterInputComponent.prototype.ngOnInit = function () {
    };
    DynCounterInputComponent.prototype.increment = function (step) {
        if (step === void 0) { step = '1'; }
        this.value = (parseInt(this.value) + parseInt(step)).toString();
    };
    DynCounterInputComponent.prototype.decrement = function (step) {
        if (step === void 0) { step = '1'; }
        this.value = (parseInt(this.value) - parseInt(step)).toString();
    };
    DynCounterInputComponent.prototype.onKeyUp = function ($event) {
        this.value = $event.target.value;
    };
    return DynCounterInputComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], DynCounterInputComponent.prototype, "placeholder", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], DynCounterInputComponent.prototype, "value", void 0);
DynCounterInputComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dyn-counter-input',
        template: __webpack_require__("../../../../../src/app/components/dyn-counter-input/dyn-counter-input.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/dyn-counter-input/dyn-counter-input.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], DynCounterInputComponent);

//# sourceMappingURL=dyn-counter-input.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/dyn-counter/dyn-counter.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/components/dyn-counter/dyn-counter.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/dyn-counter/dyn-counter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynCounterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DynCounterComponent = (function () {
    function DynCounterComponent() {
        this.value = 0;
        this.onChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    DynCounterComponent.prototype.ngOnInit = function () {
        this.onChanged.next(this.value);
    };
    DynCounterComponent.prototype.increment = function (step) {
        if (step === void 0) { step = '1'; }
        this.value = (this.value + parseInt(step));
        this.onChanged.next(this.value);
    };
    DynCounterComponent.prototype.decrement = function (step) {
        if (step === void 0) { step = '1'; }
        this.value = (this.value - parseInt(step));
        this.onChanged.next(this.value);
    };
    DynCounterComponent.prototype.setValue = function (value) {
        value = parseInt(value);
        if (value !== this.value) {
            this.value = value;
            this.onChanged.next(this.value);
        }
    };
    return DynCounterComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], DynCounterComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], DynCounterComponent.prototype, "onChanged", void 0);
DynCounterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dyn-counter',
        template: __webpack_require__("../../../../../src/app/components/dyn-counter/dyn-counter.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/dyn-counter/dyn-counter.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], DynCounterComponent);

//# sourceMappingURL=dyn-counter.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/dyn-editor/dyn-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<textarea class=\"editor\" [ngClass]=\"{'editor--error': !isValid }\" (keyup)=\"onEditorChange($event)\">{{json}}</textarea>"

/***/ }),

/***/ "../../../../../src/app/components/dyn-editor/dyn-editor.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".editor {\n  font-family: monospace;\n  font-size: 14px;\n  width: 100%;\n  height: 100%;\n  padding: 20px;\n  border: 0;\n  background-color: #EEE; }\n\n.editor--error {\n  background-color: #FFCCCC; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/dyn-editor/dyn-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_editor_service__ = __webpack_require__("../../../../../src/app/services/editor.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynEditorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DynEditorComponent = (function () {
    function DynEditorComponent(editor) {
        this.editor = editor;
        this.isValid = true;
    }
    DynEditorComponent.prototype.ngOnInit = function () { };
    DynEditorComponent.prototype.setJson = function (json) {
        this.json = json;
    };
    DynEditorComponent.prototype.onEditorChange = function ($event) {
        var parsedMeta;
        try {
            parsedMeta = JSON.parse($event.target.value);
            this.isValid = true;
            this.editor.update(parsedMeta);
        }
        catch (e) {
            this.isValid = false;
            return false;
        }
    };
    return DynEditorComponent;
}());
DynEditorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dyn-editor',
        template: __webpack_require__("../../../../../src/app/components/dyn-editor/dyn-editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/dyn-editor/dyn-editor.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_editor_service__["a" /* EditorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_editor_service__["a" /* EditorService */]) === "function" && _a || Object])
], DynEditorComponent);

var _a;
//# sourceMappingURL=dyn-editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/dyn-icon/dyn-icon.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  dyn-icon works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/dyn-icon/dyn-icon.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/dyn-icon/dyn-icon.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynIconComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DynIconComponent = (function () {
    function DynIconComponent() {
    }
    DynIconComponent.prototype.ngOnInit = function () {
    };
    return DynIconComponent;
}());
DynIconComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dyn-icon',
        template: __webpack_require__("../../../../../src/app/components/dyn-icon/dyn-icon.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/dyn-icon/dyn-icon.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], DynIconComponent);

//# sourceMappingURL=dyn-icon.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/dyn-input/dyn-input.component.html":
/***/ (function(module, exports) {

module.exports = "<md-input-container>\n  <input mdInput [type]=\"type\" [placeholder]=\"placeholder\" [value]=\"value\">\n</md-input-container>"

/***/ }),

/***/ "../../../../../src/app/components/dyn-input/dyn-input.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/dyn-input/dyn-input.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DynInputComponent = (function () {
    function DynInputComponent() {
    }
    DynInputComponent.prototype.ngOnInit = function () {
    };
    DynInputComponent.prototype.setValue = function (newValue) {
        this.value = newValue;
    };
    return DynInputComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], DynInputComponent.prototype, "type", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], DynInputComponent.prototype, "placeholder", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], DynInputComponent.prototype, "value", void 0);
DynInputComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dyn-input',
        template: __webpack_require__("../../../../../src/app/components/dyn-input/dyn-input.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/dyn-input/dyn-input.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], DynInputComponent);

//# sourceMappingURL=dyn-input.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/counter/counter-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__counter_counter_component__ = __webpack_require__("../../../../../src/app/modules/counter/counter/counter.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CounterRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__counter_counter_component__["a" /* CounterComponent */]
    }
];
var CounterRoutingModule = (function () {
    function CounterRoutingModule() {
    }
    return CounterRoutingModule;
}());
CounterRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], CounterRoutingModule);

//# sourceMappingURL=counter-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/counter/counter.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_dynamic_renderer__ = __webpack_require__("../../../../ngx-dynamic-renderer/ngx-dynamic-renderer.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_dynamic_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ngx_dynamic_renderer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__counter_routing_module__ = __webpack_require__("../../../../../src/app/modules/counter/counter-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__counter_counter_component__ = __webpack_require__("../../../../../src/app/modules/counter/counter/counter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__counter_service__ = __webpack_require__("../../../../../src/app/modules/counter/counter.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_components_module__ = __webpack_require__("../../../../../src/app/components/components.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CounterModule", function() { return CounterModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var CounterModule = (function () {
    function CounterModule() {
    }
    return CounterModule;
}());
CounterModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__counter_routing_module__["a" /* CounterRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_8__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_3_ngx_dynamic_renderer__["NgxDynamicRendererModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["a" /* MdSidenavModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["b" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["c" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["e" /* MdToolbarModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__counter_counter_component__["a" /* CounterComponent */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__counter_service__["a" /* CounterService */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["f" /* MdIcon */],
            __WEBPACK_IMPORTED_MODULE_8__components_components_module__["b" /* DynIconComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_components_module__["c" /* DynButtonComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_components_module__["d" /* DynInputComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_components_module__["e" /* DynCounterInputComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_components_module__["f" /* DynCounterComponent */]
        ]
    })
], CounterModule);

//# sourceMappingURL=counter.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/counter/counter.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CounterService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CounterService = (function () {
    function CounterService() {
        this.count = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](0);
        this.value = 0;
    }
    CounterService.prototype.increment = function (step) {
        if (step === void 0) { step = '1'; }
        this.value = (this.value + parseInt(step));
        console.log("(counter-service) incrementing to: " + this.value);
        this.count.next(this.value);
    };
    CounterService.prototype.decrement = function (step) {
        if (step === void 0) { step = '1'; }
        this.value = (this.value - parseInt(step));
        console.log("(counter-service) decrementing to: " + this.value);
        this.count.next(this.value);
    };
    CounterService.prototype.setValue = function (value) {
        value = parseInt(value);
        if (value !== this.value) {
            this.value = value;
            this.count.next(this.value);
        }
    };
    return CounterService;
}());
CounterService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], CounterService);

//# sourceMappingURL=counter.service.js.map

/***/ }),

/***/ "../../../../../src/app/modules/counter/counter/counter.component.html":
/***/ (function(module, exports) {

module.exports = "\n<ngx-dynamic-renderer class=\"renderer\" [components]=\"componentsMeta\" [componentMap]=\"componentMap\" [serviceMap]=\"serviceMap\"></ngx-dynamic-renderer>"

/***/ }),

/***/ "../../../../../src/app/modules/counter/counter/counter.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".renderer {\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n          transform: translate3d(-50%, -50%, 0);\n  width: 400px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/counter/counter/counter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_components_module__ = __webpack_require__("../../../../../src/app/components/components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__counter_service__ = __webpack_require__("../../../../../src/app/modules/counter/counter.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_editor_service__ = __webpack_require__("../../../../../src/app/services/editor.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CounterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CounterComponent = (function () {
    function CounterComponent(counter, editor) {
        this.counter = counter;
        this.editor = editor;
        this.jsonIsValid = true;
        this.componentMap = {
            'button': __WEBPACK_IMPORTED_MODULE_2__components_components_module__["c" /* DynButtonComponent */],
            'icon': __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MdIcon */],
            'input': __WEBPACK_IMPORTED_MODULE_2__components_components_module__["d" /* DynInputComponent */],
            'counter-input': __WEBPACK_IMPORTED_MODULE_2__components_components_module__["e" /* DynCounterInputComponent */],
            'counter': __WEBPACK_IMPORTED_MODULE_2__components_components_module__["f" /* DynCounterComponent */]
        };
        this.componentsMeta = [];
        this.serviceMap = {
            'counter': counter
        };
    }
    CounterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editor.jsonEdited.subscribe(function (json) {
            _this.componentsMeta = json;
        });
        /*
        // version with counter-input component
        this.componentsMeta = JSON.parse(`
        [
          {
            "component": "button",
            "properties": {
              "icon": "remove"
            },
            "events": {
              "click": [
                {
                  "target": "count",
                  "action": "decrement",
                  "params": [
                    5
                  ]
                }
              ]
            }
          },
          {
            "id": "count",
            "component": "counter-input",
            "properties": {
              "value": 0
            }
          },
          {
            "component": "button",
            "properties": {
              "icon": "add"
            },
            "events": {
              "click": [
                {
                  "target": "count",
                  "action": "increment",
                  "params": [
                    5
                  ]
                }
              ]
            }
          }
        ]
        `);
        */
        /*
        // version with counter component
        this.componentsMeta = JSON.parse(`
        [
          {
            "id": "counter1",
            "component": "counter",
            "properties": {
            },
            "events": {
              "onChanged": [
                {
                  "target": "input1",
                  "action": "setValue"
                }
              ]
            }
          },
          {
            "component": "button",
            "properties": {
              "icon": "remove"
            },
            "events": {
              "click": [
                {
                  "target": "counter1",
                  "action": "decrement",
                  "params": [
                    5
                  ]
                }
              ]
            }
          },
          {
            "id": "input1",
            "component": "input",
            "properties": {
              "type": "number",
              "placeholder": "Current count"
            },
            "events": {
              "change": [
                {
                  "target": "counter1",
                  "action": "setValue"
                }
              ]
            }
          },
          {
            "component": "button",
            "properties": {
              "icon": "add"
            },
            "events": {
              "click": [
                {
                  "target": "counter1",
                  "action": "increment",
                  "params": [
                    5
                  ]
                }
              ]
            }
          }
        ]
        `);
         */
        /*
        // version with service & events
        this.componentsMeta = JSON.parse(`
        [
          {
            "component": "button",
            "properties": {
              "icon": "remove"
            },
            "events": {
              "click": [
                {
                  "target": "$counter",
                  "action": "decrement",
                  "params": [
                    5
                  ]
                }
              ]
            }
          },
          {
            "id": "input1",
            "component": "input",
            "properties": {
              "placeholder": "Current count",
              "type": "number",
              "value": "{{$counter.value}}"
            },
            "events": {
              "count": [
                {
                  "source": "$counter",
                  "action": "setValue"
                }
              ],
              "change": [
                {
                  "target": "$counter",
                  "action": "setValue"
                }
              ]
            }
          },
          {
            "component": "button",
            "properties": {
              "icon": "add"
            },
            "events": {
              "click": [
                {
                  "target": "$counter",
                  "action": "increment",
                  "params": [
                    5
                  ]
                }
              ]
            }
          }
        ]
        `);
        */
        // version with service & subscribed dynamic interpolation
        this.componentsMeta = JSON.parse("\n    [\n      {\n        \"component\": \"button\",\n        \"properties\": {\n          \"icon\": \"remove\"\n        },\n        \"events\": {\n          \"click\": [\n            {\n              \"target\": \"$counter\",\n              \"action\": \"decrement\",\n              \"params\": [\n                5\n              ]\n            }\n          ]\n        }\n      },\n      {\n        \"id\": \"input1\",\n        \"component\": \"input\",\n        \"properties\": {\n          \"placeholder\": \"Current count\",\n          \"type\": \"number\",\n          \"value\": \"{{$counter.count}}\"\n        }\n      },\n      {\n        \"component\": \"button\",\n        \"properties\": {\n          \"icon\": \"add\"\n        },\n        \"events\": {\n          \"click\": [\n            {\n              \"target\": \"$counter\",              \n              \"action\": \"increment\",\n              \"params\": [\n                5\n              ]\n            }\n          ]\n        }\n      }\n    ]\n    ");
        /**/
        this.editor.initialize(this.componentsMeta);
    };
    return CounterComponent;
}());
CounterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-counter',
        template: __webpack_require__("../../../../../src/app/modules/counter/counter/counter.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/counter/counter/counter.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__counter_service__["a" /* CounterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__counter_service__["a" /* CounterService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_editor_service__["a" /* EditorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_editor_service__["a" /* EditorService */]) === "function" && _b || Object])
], CounterComponent);

var _a, _b;
//# sourceMappingURL=counter.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/modules.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__counter_counter_module__ = __webpack_require__("../../../../../src/app/modules/counter/counter.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModulesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModulesModule = (function () {
    function ModulesModule() {
    }
    return ModulesModule;
}());
ModulesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__counter_counter_module__["CounterModule"]
        ],
        declarations: []
    })
], ModulesModule);

//# sourceMappingURL=modules.module.js.map

/***/ }),

/***/ "../../../../../src/app/services/editor.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EditorService = (function () {
    function EditorService() {
        this.jsonEdited = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.jsonInitialized = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    EditorService.prototype.initialize = function (json) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, null, 2);
        }
        this.jsonInitialized.next(json);
    };
    EditorService.prototype.update = function (json) {
        this.jsonEdited.next(json);
    };
    return EditorService;
}());
EditorService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], EditorService);

//# sourceMappingURL=editor.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/services.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editor_service__ = __webpack_require__("../../../../../src/app/services/editor.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ServicesModule = (function () {
    function ServicesModule() {
    }
    return ServicesModule;
}());
ServicesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
        ],
        declarations: [],
        providers: [__WEBPACK_IMPORTED_MODULE_2__editor_service__["a" /* EditorService */]]
    })
], ServicesModule);

//# sourceMappingURL=services.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map