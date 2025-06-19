(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["extra-extra-module"],{

/***/ "./node_modules/ng-scrollreveal/directives/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/ng-scrollreveal/directives/index.js ***!
  \**********************************************************/
/*! exports provided: NgsRevealDirective, NgsRevealSetDirective, AbstractNgsRevealDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ngs_reveal_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ngs-reveal.directive */ "./node_modules/ng-scrollreveal/directives/ngs-reveal.directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealDirective", function() { return _ngs_reveal_directive__WEBPACK_IMPORTED_MODULE_0__["NgsRevealDirective"]; });

/* harmony import */ var _ngs_reveal_set_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ngs-reveal-set.directive */ "./node_modules/ng-scrollreveal/directives/ngs-reveal-set.directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealSetDirective", function() { return _ngs_reveal_set_directive__WEBPACK_IMPORTED_MODULE_1__["NgsRevealSetDirective"]; });

/* harmony import */ var _ngs_reveal_common_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ngs-reveal-common.directive */ "./node_modules/ng-scrollreveal/directives/ngs-reveal-common.directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractNgsRevealDirective", function() { return _ngs_reveal_common_directive__WEBPACK_IMPORTED_MODULE_2__["AbstractNgsRevealDirective"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ng-scrollreveal/directives/ngs-reveal-common.directive.js":
/*!********************************************************************************!*\
  !*** ./node_modules/ng-scrollreveal/directives/ngs-reveal-common.directive.js ***!
  \********************************************************************************/
/*! exports provided: AbstractNgsRevealDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractNgsRevealDirective", function() { return AbstractNgsRevealDirective; });
/**
 * Base directive class shared by the concrete ScrollReveal directives.
 */
var AbstractNgsRevealDirective = (function () {
    function AbstractNgsRevealDirective(ngsRevealService) {
        this.ngsRevealService = ngsRevealService;
    }
    AbstractNgsRevealDirective.prototype._initConfig = function (value) {
        if (value && typeof value === 'string') {
            this.config = JSON.parse(value);
        }
        else if (value && typeof value === 'object') {
            this.config = value;
        }
    };
    return AbstractNgsRevealDirective;
}());
//# sourceMappingURL=ngs-reveal-common.directive.js.map

/***/ }),

/***/ "./node_modules/ng-scrollreveal/directives/ngs-reveal-set.directive.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/ng-scrollreveal/directives/ngs-reveal-set.directive.js ***!
  \*****************************************************************************/
/*! exports provided: NgsRevealSetDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgsRevealSetDirective", function() { return NgsRevealSetDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_ngs_reveal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/ngs-reveal.service */ "./node_modules/ng-scrollreveal/services/ngs-reveal.service.js");
/* harmony import */ var _ngs_reveal_common_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ngs-reveal-common.directive */ "./node_modules/ng-scrollreveal/directives/ngs-reveal-common.directive.js");
var __extends = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * Directive to add 'ScrollReveal' functionality to a <b>set of DOM elements</b> (identify via the `[ngsSelector]` attribute) in the page.
 * This directive is meant to be placed on the <b>parent node</b> that contains the child elements to reveal.
 * You can optionally add the `[ngsInterval]` attribute to reveal items sequentially, following the given interval(in milliseconds).
 * You can optionally add the `[ngsSync]` attribute to reveal new child elements that may have been added in the parent node asynchronously.
 *
 */
var NgsRevealSetDirective = (function (_super) {
    __extends(NgsRevealSetDirective, _super);
    function NgsRevealSetDirective(elementRef, ngsRevealService) {
        _super.call(this, ngsRevealService);
        this.elementRef = elementRef;
    }
    Object.defineProperty(NgsRevealSetDirective.prototype, "_config", {
        /**
         * Custom configuration to use when revealing this set of elements
         */
        set: function (value) {
            this._initConfig(value);
        },
        enumerable: true,
        configurable: true
    });
    NgsRevealSetDirective.prototype.ngOnInit = function () {
        if (!this.ngsSelector && console) {
            var item = this.elementRef.nativeElement ? this.elementRef.nativeElement.className : '';
            console.error("[ng-scrollreveal] You must set \"[ngsSelector]\" attribute on item '" + item + "' when using \"ngsRevealSet\"");
            return;
        }
        this.ngsRevealService.revealSet(this.elementRef, this.ngsSelector, this.ngsInterval, this.config);
    };
    NgsRevealSetDirective.prototype.ngOnChanges = function (changes) {
        var ngsSyncProp = 'ngsSync';
        if (ngsSyncProp in changes
            && !changes[ngsSyncProp].isFirstChange()
            && !changes[ngsSyncProp].currentValue()) {
            this.ngsRevealService.sync();
        }
    };
    NgsRevealSetDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[ngsRevealSet]'
                },] },
    ];
    /** @nocollapse */
    NgsRevealSetDirective.ctorParameters = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _services_ngs_reveal_service__WEBPACK_IMPORTED_MODULE_1__["NgsRevealService"], },
    ];
    NgsRevealSetDirective.propDecorators = {
        '_config': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['ngsRevealSet',] },],
        'ngsSelector': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        'ngsInterval': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        'ngsSync': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return NgsRevealSetDirective;
}(_ngs_reveal_common_directive__WEBPACK_IMPORTED_MODULE_2__["AbstractNgsRevealDirective"]));
//# sourceMappingURL=ngs-reveal-set.directive.js.map

/***/ }),

/***/ "./node_modules/ng-scrollreveal/directives/ngs-reveal.directive.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ng-scrollreveal/directives/ngs-reveal.directive.js ***!
  \*************************************************************************/
/*! exports provided: NgsRevealDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgsRevealDirective", function() { return NgsRevealDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_ngs_reveal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/ngs-reveal.service */ "./node_modules/ng-scrollreveal/services/ngs-reveal.service.js");
/* harmony import */ var _ngs_reveal_common_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ngs-reveal-common.directive */ "./node_modules/ng-scrollreveal/directives/ngs-reveal-common.directive.js");
var __extends = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * Directive to add 'ScrollReveal' functionality to a <b>single DOM element</b> in the page.
 */
var NgsRevealDirective = (function (_super) {
    __extends(NgsRevealDirective, _super);
    function NgsRevealDirective(elementRef, ngsRevealService) {
        _super.call(this, ngsRevealService);
        this.elementRef = elementRef;
        this.visibility = 'hidden';
    }
    Object.defineProperty(NgsRevealDirective.prototype, "_config", {
        /**
         * Custom configuration to use when revealing this element
         */
        set: function (value) {
            this._initConfig(value);
        },
        enumerable: true,
        configurable: true
    });
    NgsRevealDirective.prototype.ngOnInit = function () {
        this.ngsRevealService.reveal(this.elementRef, this.config);
    };
    NgsRevealDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[ngsReveal]'
                },] },
    ];
    /** @nocollapse */
    NgsRevealDirective.ctorParameters = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _services_ngs_reveal_service__WEBPACK_IMPORTED_MODULE_1__["NgsRevealService"], },
    ];
    NgsRevealDirective.propDecorators = {
        'visibility': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['style.visibility',] },],
        '_config': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['ngsReveal',] },],
    };
    return NgsRevealDirective;
}(_ngs_reveal_common_directive__WEBPACK_IMPORTED_MODULE_2__["AbstractNgsRevealDirective"]));
//# sourceMappingURL=ngs-reveal.directive.js.map

/***/ }),

/***/ "./node_modules/ng-scrollreveal/index.js":
/*!***********************************************!*\
  !*** ./node_modules/ng-scrollreveal/index.js ***!
  \***********************************************/
/*! exports provided: WindowService, NgsRevealService, NgsRevealConfig, NgsRevealDirective, NgsRevealSetDirective, NgsRevealModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ngs_reveal_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ngs-reveal.module */ "./node_modules/ng-scrollreveal/ngs-reveal.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WindowService", function() { return _ngs_reveal_module__WEBPACK_IMPORTED_MODULE_0__["WindowService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealService", function() { return _ngs_reveal_module__WEBPACK_IMPORTED_MODULE_0__["NgsRevealService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealConfig", function() { return _ngs_reveal_module__WEBPACK_IMPORTED_MODULE_0__["NgsRevealConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealDirective", function() { return _ngs_reveal_module__WEBPACK_IMPORTED_MODULE_0__["NgsRevealDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealSetDirective", function() { return _ngs_reveal_module__WEBPACK_IMPORTED_MODULE_0__["NgsRevealSetDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealModule", function() { return _ngs_reveal_module__WEBPACK_IMPORTED_MODULE_0__["NgsRevealModule"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ng-scrollreveal/ngs-reveal.module.js":
/*!***********************************************************!*\
  !*** ./node_modules/ng-scrollreveal/ngs-reveal.module.js ***!
  \***********************************************************/
/*! exports provided: WindowService, NgsRevealService, NgsRevealConfig, NgsRevealDirective, NgsRevealSetDirective, NgsRevealModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgsRevealModule", function() { return NgsRevealModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/index */ "./node_modules/ng-scrollreveal/services/index.js");
/* harmony import */ var _directives_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives/index */ "./node_modules/ng-scrollreveal/directives/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WindowService", function() { return _services_index__WEBPACK_IMPORTED_MODULE_2__["WindowService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealService", function() { return _services_index__WEBPACK_IMPORTED_MODULE_2__["NgsRevealService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealConfig", function() { return _services_index__WEBPACK_IMPORTED_MODULE_2__["NgsRevealConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealDirective", function() { return _directives_index__WEBPACK_IMPORTED_MODULE_3__["NgsRevealDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealSetDirective", function() { return _directives_index__WEBPACK_IMPORTED_MODULE_3__["NgsRevealSetDirective"]; });







/**
 * Main module of the library
 */
var NgsRevealModule = (function () {
    function NgsRevealModule() {
    }
    NgsRevealModule.forRoot = function () {
        return {
            ngModule: NgsRevealModule,
            providers: [_services_index__WEBPACK_IMPORTED_MODULE_2__["WindowService"], _services_index__WEBPACK_IMPORTED_MODULE_2__["NgsRevealService"], _services_index__WEBPACK_IMPORTED_MODULE_2__["NgsRevealConfig"]]
        };
    };
    NgsRevealModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
                    ],
                    exports: [_directives_index__WEBPACK_IMPORTED_MODULE_3__["NgsRevealDirective"], _directives_index__WEBPACK_IMPORTED_MODULE_3__["NgsRevealSetDirective"]],
                    declarations: [_directives_index__WEBPACK_IMPORTED_MODULE_3__["NgsRevealDirective"], _directives_index__WEBPACK_IMPORTED_MODULE_3__["NgsRevealSetDirective"]]
                },] },
    ];
    /** @nocollapse */
    NgsRevealModule.ctorParameters = [];
    return NgsRevealModule;
}());
//# sourceMappingURL=ngs-reveal.module.js.map

/***/ }),

/***/ "./node_modules/ng-scrollreveal/services/index.js":
/*!********************************************************!*\
  !*** ./node_modules/ng-scrollreveal/services/index.js ***!
  \********************************************************/
/*! exports provided: NgsRevealService, NgsRevealConfig, WindowService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ngs_reveal_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ngs-reveal.service */ "./node_modules/ng-scrollreveal/services/ngs-reveal.service.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealService", function() { return _ngs_reveal_service__WEBPACK_IMPORTED_MODULE_0__["NgsRevealService"]; });

/* harmony import */ var _ngs_reveal_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ngs-reveal-config */ "./node_modules/ng-scrollreveal/services/ngs-reveal-config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgsRevealConfig", function() { return _ngs_reveal_config__WEBPACK_IMPORTED_MODULE_1__["NgsRevealConfig"]; });

/* harmony import */ var _window_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./window.service */ "./node_modules/ng-scrollreveal/services/window.service.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WindowService", function() { return _window_service__WEBPACK_IMPORTED_MODULE_2__["WindowService"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ng-scrollreveal/services/ngs-reveal-config.js":
/*!********************************************************************!*\
  !*** ./node_modules/ng-scrollreveal/services/ngs-reveal-config.js ***!
  \********************************************************************/
/*! exports provided: NgsRevealConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgsRevealConfig", function() { return NgsRevealConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

/**
 * Configuration service for the NgScrollReveal directives.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ngsReveal directives used in the application.
 */
var NgsRevealConfig = (function () {
    function NgsRevealConfig() {
        // 'bottom', 'left', 'top', 'right'
        this.origin = 'bottom';
        // Can be any valid CSS distance, e.g. '5rem', '10%', '20vw', etc.
        this.distance = '20px';
        // Time in milliseconds.
        this.duration = 500;
        this.delay = 0;
        // Starting angles in degrees, will transition from these values to 0 in all axes.
        this.rotate = { x: 0, y: 0, z: 0 };
        // Starting opacity value, before transitioning to the computed opacity.
        this.opacity = 0;
        // Starting scale value, will transition from this value to 1
        this.scale = 0.9;
        // Accepts any valid CSS easing, e.g. 'ease', 'ease-in-out', 'linear', etc.
        this.easing = 'cubic-bezier(0.6, 0.2, 0.1, 1)';
        // true/false to control reveal animations on mobile.
        this.mobile = true;
        // true:  reveals occur every time elements become visible
        // false: reveals occur once as elements become visible
        this.reset = false;
        // 'always' — delay for all reveal animations
        // 'once'   — delay only the first time reveals occur
        // 'onload' - delay only for animations triggered by first load
        this.useDelay = 'always';
        // Change when an element is considered in the viewport. The default value
        // of 0.20 means 20% of an element must be visible for its reveal to occur.
        this.viewFactor = 0.2;
        // Pixel values that alter the container boundaries.
        // e.g. Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
        // --
        // Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png
        this.viewOffset = { top: 0, right: 0, bottom: 0, left: 0 };
    }
    NgsRevealConfig.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    NgsRevealConfig.ctorParameters = [];
    return NgsRevealConfig;
}());
//# sourceMappingURL=ngs-reveal-config.js.map

/***/ }),

/***/ "./node_modules/ng-scrollreveal/services/ngs-reveal.service.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ng-scrollreveal/services/ngs-reveal.service.js ***!
  \*********************************************************************/
/*! exports provided: NgsRevealService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgsRevealService", function() { return NgsRevealService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngs_reveal_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ngs-reveal-config */ "./node_modules/ng-scrollreveal/services/ngs-reveal-config.js");
/* harmony import */ var _window_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./window.service */ "./node_modules/ng-scrollreveal/services/window.service.js");



/**
 * Service to inject in directives to use ScrollReveal JS.
 * It delegates the work to SR, when DOM manipulation is possible (i.e app is not running in a web worker for e.g).
 * If not possible, most methods simply do nothing, as DOM elements are not available anyway.
 */
var NgsRevealService = (function () {
    function NgsRevealService(config, windowService) {
        this.config = config;
        this.windowService = windowService;
        this.window = windowService.nativeWindow;
        if (this.window) {
            // init the scrollReveal library with injected config
            var srConfig = Object.assign({}, config || {});
            this.sr = ScrollReveal(srConfig);
        }
    }
    /**
     * Method to reveal a single DOM element.
     * @param elementRef  a reference to the element to reveal
     * @param config      (optional) custom configuration to use when revealing this element
     */
    NgsRevealService.prototype.reveal = function (elementRef, config) {
        if (!this.window) {
            return null;
        }
        return elementRef.nativeElement ?
            this.sr.reveal(elementRef.nativeElement, config) : this.sr;
    };
    /**
     * Method to reveal a set of DOM elements.
     * @param parentElementRef  the parent DOM element encaspulating the child elements to reveal
     * @param selector          a list of CSS selectors (comma-separated) that identifies child elements to reveal
     * @param interval          (optional) interval in milliseconds, to animate child elemnts sequentially
     * @param config            (optional) custom configuration to use when revealing this set of elements
     */
    NgsRevealService.prototype.revealSet = function (parentElementRef, selector, interval, config) {
        if (!this.window) {
            return null;
        }
        return parentElementRef.nativeElement ?
            this.sr.reveal(selector, config, interval) : this.sr;
    };
    /**
     * Method to synchronize and consider newly added child elements (for e.g when child elements were added asynchronously to parent DOM) .
     */
    NgsRevealService.prototype.sync = function () {
        if (this.window) {
            this.sr.sync();
        }
    };
    NgsRevealService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    NgsRevealService.ctorParameters = [
        { type: _ngs_reveal_config__WEBPACK_IMPORTED_MODULE_1__["NgsRevealConfig"], },
        { type: _window_service__WEBPACK_IMPORTED_MODULE_2__["WindowService"], },
    ];
    return NgsRevealService;
}());
//# sourceMappingURL=ngs-reveal.service.js.map

/***/ }),

/***/ "./node_modules/ng-scrollreveal/services/window.service.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ng-scrollreveal/services/window.service.js ***!
  \*****************************************************************/
/*! exports provided: WindowService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowService", function() { return WindowService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

/**
 * Service to interact with the window object.
 */
var WindowService = (function () {
    function WindowService() {
    }
    Object.defineProperty(WindowService.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    WindowService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    WindowService.ctorParameters = [];
    return WindowService;
}());
function _window() {
    // Return the global native browser window object
    return typeof window !== 'undefined' ? window : undefined;
}
//# sourceMappingURL=window.service.js.map

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/extra/blankpage/blankpage.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/extra/blankpage/blankpage.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  blankpage works!\n</p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/extra/gallery/gallery.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/extra/gallery/gallery.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid container-fixed-lg p-l-0 p-r-0\">\n  <pg-container>\n    <isotope-grid class=\"gallery\" [options]=\"galleryOptions\" [@enterAnimation]=\"_isLoading == true ?'loading':'ready'\">\n      <div class=\"gallery-filters p-t-20 p-b-10\">\n        <ul class=\"list-inline text-right\">\n          <li class=\"hint-text\">Sort by: </li>&nbsp;\n          <li><a href=\"javascript:void(0)\" class=\"active text-color p-r-5 p-l-5\">Name</a></li>&nbsp;\n          <li><a href=\"javascript:void(0)\" class=\"text-color hint-text p-r-5 p-l-5\">Views</a></li>&nbsp;\n          <li><a href=\"javascript:void(0)\" class=\"text-color hint-text p-r-5 p-l-5\">Cost</a></li>&nbsp;\n          <li>\n            <button class=\"btn btn-primary m-l-10\" (click)=\"slideRight.show()\">More filters</button>\n          </li>\n        </ul>\n      </div>\n      <isotope-item *ngFor=\"let item of feed; let isFirst = first\" class=\"\">\n        <div class=\"gallery-item\" [class.first]=\"isFirst\" [attr.data-width]=\"item.featured ? 2 : 1\"\n          [attr.data-height]=\"item.featured ? 2 : 1\" (click)=\"toggleModal()\">\n          <!-- START PREVIEW -->\n          <img *ngIf=\"item.thumbnail.length === 1\" src=\"{{item.thumbnail}}\" alt=\"\" class=\"image-responsive-height\">\n\n          <div *ngIf=\"item.thumbnail.length > 1\" class=\"swiper-container full-height\" [swiper]=\"config\"\n            [(index)]=\"index\">\n            <div class=\"swiper-wrapper full-height\">\n              <div class=\"swiper-slide slide-front full-height\"\n                [ngStyle]=\"{'background-image': 'url('+item.thumbnail[0]+')'}\">\n              </div>\n              <div class=\" swiper-slide  slide-back full-height\"\n                [ngStyle]=\"{'background-image': 'url('+item.thumbnail[1]+')'}\">\n              </div>\n            </div>\n          </div>\n\n          <!-- END PREVIEW -->\n          <!-- START ITEM OVERLAY DESCRIPTION -->\n          <div class=\"overlayer bottom-left full-width\">\n            <div class=\"overlayer-wrapper item-info \">\n              <div class=\"gradient-grey p-l-20 p-r-20 p-t-20 p-b-5\">\n                <div *ngIf=\"item.featured !== true\">\n                  <p class=\"pull-left bold text-white fs-14 p-t-10\">{{item.title}}</p>\n                  <h5 class=\"pull-right semi-bold text-white font-montserrat bold\">{{item.price}}</h5>\n                  <div class=\"clearfix\"></div>\n                </div>\n\n                <div *ngIf=\"item.featured === true\">\n                  <h3 class=\"pull-left bold text-white no-margin\">{{item.title}}</h3>\n                  <h3 class=\"pull-right semi-bold text-white font-montserrat bold no-margin\">{{item.price}}</h3>\n                  <div class=\"clearfix\"></div>\n                  <span class=\"hint-text pull-left text-white\">{{item.caption}}</span>\n                  <div class=\"clearfix\"></div>\n                </div>\n                <div class=\"\">\n                  <h5 class=\"text-white light\">{{item.description}}</h5>\n                </div>\n\n\n                <div class=\"m-t-10\">\n                  <div class=\"thumbnail-wrapper d32 circular m-t-5\">\n                    <img width=\"40\" height=\"40\" src=\"{{item.author.avatar}}\" data-src=\"{{item.author.avatar}}\" pgRetina\n                      src2x=\"{{item.author.avatar2x}}\" alt=\"\">\n                  </div>\n                  <div class=\"inline m-l-10\">\n                    <p class=\"no-margin text-white fs-12\">Designed by {{item.author.name}}</p>\n                    <p class=\"rating\">\n                      <i class=\"fa fa-star rated\"></i>&nbsp;\n                      <i class=\"fa fa-star rated\"></i>&nbsp;\n                      <i class=\"fa fa-star rated\"></i>&nbsp;\n                      <i class=\"fa fa-star rated\"></i>&nbsp;\n                      <i class=\"fa fa-star\"></i>\n                    </p>\n                  </div>\n                  <div class=\"pull-right m-t-10\">\n                    <button class=\"btn btn-white btn-xs btn-mini bold fs-14\" type=\"button\">+</button>\n                  </div>\n                  <div class=\"clearfix\"></div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <!-- END PRODUCT OVERLAY DESCRIPTION -->\n        </div>\n      </isotope-item>\n    </isotope-grid>\n  </pg-container>\n</div>\n\n<!-- Modal -->\n<div bsModal #fadInModal=\"bs-modal\" class=\"modal item-modal fade fill-in\" tabindex=\"-1\" role=\"dialog\"\n  aria-hidden=\"true\">\n\n  <div class=\"modal-dialog \">\n    <div class=\"modal-content\">\n      <div class=\"modal-body\">\n        <div class=\"container-fluid\">\n          <div class=\"row dialog__overview\">\n            <div class=\"col-md-7 no-padding item-slideshow-wrapper full-height\">\n\n              <div class=\"swiper-container full-height\" [swiper]=\"configModal\" [(index)]=\"index2\">\n                <div class=\"swiper-wrapper full-height\">\n                  <div class=\"swiper-slide slide-front full-height\"\n                    [ngStyle]=\"{'background-image': 'url(assets/img/gallery/item-square.jpg)'}\">\n                  </div>\n                  <div class=\" swiper-slide  slide-back full-height\"\n                    [ngStyle]=\"{'background-image': 'url(assets/img/gallery/item-square.jpg)'}\">\n                  </div>\n                </div>\n\n                <div class=\"swiper-pagination\"></div>\n\n                <div class=\"swiper-button swiper-button-prev\" (click)=\"prevSlide()\">\n                  <i class=\"pg-icon\">chevron_left</i>\n                </div>\n                <div class=\"swiper-button swiper-button-next\" (click)=\"nextSlide()\">\n                  <i class=\"pg-icon\">chevron_right</i>\n                </div>\n              </div>\n\n\n            </div>\n            <div class=\"col-md-12 d-md-none d-lg-none d-xl-none bg-info-dark\">\n              <div class=\"container-xs-height\">\n                <div class=\"row row-xs-height\">\n                  <div class=\"col-8 col-xs-height col-middle no-padding\">\n                    <div class=\"thumbnail-wrapper d32 circular inline\">\n                      <img width=\"32\" height=\"32\" src=\"assets/img/profiles/2.jpg\" data-src=\"assets/img/profiles/2.jpg\"\n                        data-src-retina=\"assets/img/profiles/2x.jpg\" alt=\"\">\n                    </div>\n                    <div class=\"inline m-l-15\">\n                      <p class=\"text-white no-margin\">Alex Nester</p>\n                      <p class=\"hint-text text-white no-margin fs-12\">Senior UI/UX designer</p>\n                    </div>\n                  </div>\n                  <div class=\"col-4 col-xs-height col-middle text-right  no-padding\">\n                    <h2 class=\"bold text-white price font-montserrat\">$20.00</h2>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-5 p-r-35 p-t-35 p-l-35 full-height item-description\">\n              <h2 class=\"semi-bold no-margin font-montserrat\">Happy Ninja</h2>\n              <p class=\"rating fs-12 m-t-5\">\n                <i class=\"fa fa-star \"></i>&nbsp;\n                <i class=\"fa fa-star \"></i>&nbsp;\n                <i class=\"fa fa-star \"></i>&nbsp;\n                <i class=\"fa fa-star-o\"></i>&nbsp;\n                <i class=\"fa fa-star-o\"></i>&nbsp;\n              </p>\n              <p class=\"fs-13\">When it comes to digital design, the lines between functionality, aesthetics, and\n                psychology are inseparably blurred. Without the constraints of the physical world, there’s no natural\n                form to fall back on, and every bit of constraint and affordance must be introduced intentionally. Good\n                design makes a product useful.\n              </p>\n              <div class=\"row m-b-20 m-t-20\">\n                <div class=\"col-6\"><span class=\"font-montserrat all-caps fs-11\">Price ranges</span>\n                </div>\n                <div class=\"col-6 text-right\">$20.00 - $40.00</div>\n              </div>\n              <div class=\"row m-t-20 m-b-10\">\n                <div class=\"col-6\"><span class=\"font-montserrat all-caps fs-11\">Paint sizes</span>\n                </div>\n              </div>\n              <button class=\"btn btn-white\">S</button>&nbsp;\n              <button class=\"btn btn-white\">M</button>&nbsp;\n              <button class=\"btn btn-white\">L</button>&nbsp;\n              <button class=\"btn btn-white\">XL</button>&nbsp;\n              <br>\n              <button class=\"btn btn-primary buy-now\">Buy Now</button>\n            </div>\n          </div>\n          <div class=\"row dialog__footer bg-info-dark d-sm-none d-none d-sm-flex d-lg-flex d-xl-flex\">\n            <div class=\"col-md-7 full-height separator\">\n              <div class=\"container-xs-height\">\n                <div class=\"row row-xs-height\">\n                  <div class=\"col-7 col-xs-height col-middle no-padding\">\n                    <div class=\"thumbnail-wrapper d48 circular inline\">\n                      <img width=\"48\" height=\"48\" src=\"assets/img/profiles/2.jpg\" data-src=\"assets/img/profiles/2.jpg\"\n                        data-src-retina=\"assets/img/profiles/2x.jpg\" alt=\"\">\n                    </div>\n                    <div class=\"inline m-l-15\">\n                      <p class=\"text-white no-margin\">Alex Nester</p>\n                      <p class=\"hint-text text-white no-margin fs-12\">Senior UI/UX designer</p>\n                    </div>\n                  </div>\n                  <div class=\"col-5 col-xs-height col-middle text-right  no-padding\">\n                    <h2 class=\"bold text-white price font-montserrat\">$20.00</h2>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-5 full-height\">\n              <ul class=\"recommended list-inline pull-right m-t-10 m-b-0\">\n                <li>\n                  <a href=\"javascript:void(0)\"><img src=\"assets/img/gallery/thumb-1.jpg\"></a>\n                </li>\n                <li>\n                  <a href=\"javascript:void(0)\"><img src=\"assets/img/gallery/thumb-2.jpg\"></a>\n                </li>\n                <li>\n                  <a href=\"javascript:void(0)\"><img src=\"assets/img/gallery/thumb-3.jpg\"></a>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n        <button class=\"close action top-right\" (click)=\"fadInModal.hide()\"><i class=\"pg pg-close fs-14\"></i>\n        </button>\n\n      </div>\n    </div>\n    <!-- /.modal-content -->\n  </div>\n  <!-- /.modal-dialog -->\n</div>\n\n\n<!-- MODAL STICK UP SMALL ALERT -->\n<div bsModal #slideRight=\"bs-modal\" class=\"modal filters-modal fade slide-right\" tabindex=\"-1\" role=\"dialog\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content-wrapper\">\n      <div class=\"modal-content\">\n\n        <div class=\"padding-40 \">\n          <a (click)=\"slideRight.hide()\" class=\"filter-close quickview-toggle\" href=\"javascript:void(0)\">\n            <i class=\"pg-icon\">close</i>\n          </a>\n          <form class=\"\" role=\"form\">\n            <h5 class=\"all-caps font-montserrat fs-12 m-b-20\">Advance filters</h5>\n            <div class=\"form-group form-group-default \" pgFormGroupDefault>\n              <label>Project</label>\n              <input type=\"email\" class=\"form-control\" placeholder=\"Type of select a label\">\n            </div>\n            <h5 class=\"all-caps font-montserrat fs-12 m-b-20 m-t-25\">Advance filters</h5>\n            <div class=\"form-check danger\">\n              <input type=\"radio\" checked=\"checked\" value=\"1\" name=\"filter\" id=\"asc\">\n              <label for=\"asc\">Ascending order</label>\n            </div>\n            <div class=\"form-check danger\">\n              <input type=\"radio\" value=\"2\" name=\"filter\" id=\"views\">\n              <label for=\"views\">Most viewed</label>\n            </div>\n            <div class=\"form-check danger\">\n              <input type=\"radio\" value=\"3\" name=\"filter\" id=\"cost\">\n              <label for=\"cost\">Cost</label>\n            </div>\n            <div class=\"form-check danger\">\n              <input type=\"radio\" value=\"4\" name=\"filter\" id=\"latest\">\n              <label for=\"latest\">Latest</label>\n            </div>\n            <h5 class=\"all-caps font-montserrat fs-12 m-b-20 m-t-25\">Price range</h5>\n            <pg-slider name=\"filter-slider\" Range [Color]=\"'danger'\" [(ngModel)]=\"rangeValue\" [Step]=\"10\"\n              [DefaultValue]=\"[20, 50]\"></pg-slider>\n            <button (click)=\"slideRight.hide()\" class=\"pull-right btn btn-danger btn-cons m-t-40\">Apply</button>\n          </form>\n        </div>\n\n      </div>\n    </div>\n    <!-- /.modal-content -->\n  </div>\n  <!-- /.modal-dialog -->\n</div>\n<!-- END MODAL STICK UP SMALL ALERT -->\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/extra/invoice/invoice.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/extra/invoice/invoice.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nav class=\"navbar navbar-default bg-master-lighter sm-padding-10 full-width p-t-0 p-b-0\" role=\"navigation\">\n  <div class=\"full-width\">\n    <pg-container>\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class=\"navbar-header text-center\">\n          <button type=\"button\" class=\"navbar-toggle collapsed btn btn-link no-padding\" (click)=\"isCollapsed = !isCollapsed\"\n          [attr.aria-expanded]=\"!isCollapsed\" aria-controls=\"sub-nav\">\n            <i class=\"pg pg-more v-align-middle\"></i>\n          </button>\n        </div>\n        <!-- Collect the nav links, forms, and other content for toggling -->\n        <div class=\"collapse navbar-collapse\" id=\"sub-nav\" [collapse]=\"isCollapsed\">\n          <div class=\"row\">\n            <div class=\"col-sm-4\">\n              <ul class=\"navbar-nav col-sm-12 col-md-12  col-lg-7 \">\n                <li class=\"nav-item dropdown\" dropdown>\n                  <a class=\"nav-link dropdown-toggle d-flex align-items-center\" href=\"javascript:void(0);\" id=\"navbarDropdownMenuLink\" dropdownToggle aria-haspopup=\"true\" aria-expanded=\"false\">\n                    <i class=\"pg-icon m-r-10\">page</i> Squarespace\n                  </a>\n                  <div class=\"dropdown-menu\"   *dropdownMenu aria-labelledby=\"navbarDropdownMenuLink\">\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action </a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\n                    <div class=\"divider\"></div>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\">Separated link</a>\n                    <div class=\"divider\"></div>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\">One more separated link</a>\n                  </div>\n                </li>\n              </ul>\n            </div>\n            <div class=\"col-sm-4\">\n              <ul class=\"navbar-nav d-flex flex-row\">\n                <li class=\"nav-item\"><a href=\"javascript:void(0)\">Open</a></li>\n                <li class=\"nav-item\"><a href=\"javascript:void(0)\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Print\"><i class=\"pg-icon\">printer</i></a></li>\n                <li class=\"nav-item\"><a href=\"javascript:void(0)\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Download\"><i class=\"pg-icon\">download</i></a></li>\n              </ul>\n            </div>\n            <div class=\"col-sm-4\">\n              <ul class=\"navbar-nav d-flex flex-row justify-content-sm-end\">\n                <li class=\"nav-item\">\n                  <a href=\"javascript:void(0)\" class=\"p-r-10\"><img width=\"25\" height=\"25\" alt=\"\" class=\"icon-pdf\" src2x=\"assets/img/invoice/pdf2x.png\" pgRetina src1x=\"assets/img/invoice/pdf.png\" src=\"assets/img/invoice/pdf2x.png\"></a>\n                </li>\n                <li class=\"nav-item\">\n                  <a href=\"javascript:void(0)\" class=\"p-r-10\"><img width=\"25\" height=\"25\" alt=\"\" class=\"icon-image\" src2x=\"assets/img/invoice/image2x.png\" pgRetina src1x=\"assets/img/invoice/image.png\" src=\"assets/img/invoice/image2x.png\"></a>\n                </li>\n                <li class=\"nav-item\">\n                  <a href=\"javascript:void(0)\" class=\"p-r-10\"><img width=\"25\" height=\"25\" alt=\"\" class=\"icon-doc\" src2x=\"assets/img/invoice/doc2x.png\" pgRetina src1x=\"assets/img/invoice/doc.png\" src=\"assets/img/invoice/doc2x.png\"></a>\n                </li>\n                <li class=\"nav-item\"><a href=\"javascript:void(0)\" class=\"p-r-10\" (click)=\"setFullScreen()\"><i class=\"pg-icon\">expand</i></a></li>\n              </ul>\n            </div>\n          </div>\n\n        </div>\n        <!-- /.navbar-collapse -->\n    </pg-container>\n  </div>\n  <!-- /.container-fluid -->\n</nav>\n<!-- START CONTAINER FLUID -->\n<pg-container>\n  <!-- START card -->\n  <div class=\"card card-default m-t-20\">\n    <div class=\"card-body\">\n      <div class=\"invoice padding-50 sm-padding-10\">\n        <div>\n          <div class=\"pull-left\">\n            <img width=\"235\" height=\"47\" alt=\"\" class=\"invoice-logo\" src2x=\"assets/img/invoice/squarespace2x.png\" pgRetina src1x=\"assets/img/invoice/squarespace.png\" src=\"assets/img/invoice/squarespace2x.png\">\n            <address class=\"m-t-10\">\n                            Apple Enterprise Sales\n                            <br>(877) 412-7753.\n                            <br>\n                        </address>\n          </div>\n          <div class=\"pull-right sm-m-t-20\">\n            <h2 class=\"font-montserrat all-caps hint-text\">Invoice</h2>\n          </div>\n          <div class=\"clearfix\"></div>\n        </div>\n        <br>\n        <br>\n        <div class=\"col-12\">\n          <div class=\"row\">\n            <div class=\"col-lg-9 col-sm-height sm-no-padding\">\n              <p class=\"small no-margin\">Invoice to</p>\n              <h5 class=\"semi-bold m-t-0\">Darren Forthway</h5>\n              <address>\n                                    <strong>Pages Incoperated.</strong>\n                                    <br>page.inc\n                                    <br>\n                                    1600 Amphitheatre Pkwy, Mountain View,<br>\n                                    CA 94043, United States\n                                </address>\n            </div>\n            <div class=\"col-lg-3 sm-no-padding sm-p-b-20 d-flex align-items-end justify-content-between\">\n              <div>\n                <div class=\"font-montserrat bold all-caps\">Invoice No :</div>\n                <div class=\"font-montserrat bold all-caps\">Invoice date :</div>\n                <div class=\"clearfix\"></div>\n              </div>\n              <div class=\"text-right\">\n                <div class=\"\">0047</div>\n                <div class=\"\">29/09/14</div>\n                <div class=\"clearfix\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"table-responsive table-invoice\">\n          <table class=\"table m-t-50\">\n            <thead>\n              <tr>\n                <th class=\"\">Task Description</th>\n                <th class=\"text-center\">Rate</th>\n                <th class=\"text-center\">Hours</th>\n                <th class=\"text-right\">Total</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td class=\"\">\n                  <p class=\"text-black\">Character Illustration</p>\n                  <p class=\"small hint-text\">\n                    Character Design projects from the latest top online portfolios on Behance.\n                  </p>\n                </td>\n                <td class=\"text-center\">$65.00</td>\n                <td class=\"text-center\">84</td>\n                <td class=\"text-right\">$5,376.00</td>\n              </tr>\n              <tr>\n                <td class=\"\">\n                  <p class=\"text-black\">Cross Heart Charity Branding</p>\n                  <p class=\"small hint-text\">\n                    Attempt to attach higher credibility to a new product by associating it with a well established company name\n                  </p>\n                </td>\n                <td class=\"text-center\">$89.00</td>\n                <td class=\"text-center\">100</td>\n                <td class=\"text-right\">$8,900.00</td>\n              </tr>\n              <tr>\n                <td class=\"\">\n                  <p class=\"text-black\">iOs App</p>\n                  <p class=\"small hint-text\">\n                    A video game franchise Inspired primarily by a sketch of stylized wingless - Including Branding / Graphics / Motion Picture &amp; Videos\n                  </p>\n                </td>\n                <td class=\"text-center\">$100.00</td>\n                <td class=\"text-center\">500</td>\n                <td class=\"text-right\">$50,000.00</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <br>\n        <br>\n        <br>\n        <br>\n        <br>\n        <div>\n          <img width=\"150\" height=\"58\" alt=\"\" class=\"invoice-signature\" src2x=\"assets/img/invoice/signature2x.png\" pgRetina src1x=\"assets/img/invoice/signature.png\" src=\"assets/img/invoice/signature2x.png\">\n          <p>Designer’s Identity</p>\n        </div>\n        <br>\n        <br>\n        <div class=\"p-l-15 p-r-15\">\n          <div class=\"row b-a b-grey\">\n            <div class=\"col-md-2 p-l-15 sm-p-t-15 clearfix sm-p-b-15 d-flex flex-column justify-content-center p-r-0\">\n              <h5 class=\"font-montserrat all-caps small no-margin hint-text bold\">Advance</h5>\n              <h3 class=\"no-margin\">$21,000.00</h3>\n            </div>\n            <div class=\"col-md-5 clearfix sm-p-b-15 d-flex flex-column justify-content-center\">\n              <h5 class=\"font-montserrat all-caps small no-margin hint-text bold\">Discount (10%)</h5>\n              <h3 class=\"no-margin\">$645.00</h3>\n            </div>\n            <div class=\"col-md-5 text-right bg-master-darker col-sm-height padding-15 d-flex flex-column justify-content-center align-items-end\">\n              <h5 class=\"font-montserrat all-caps small no-margin hint-text text-white bold\">Total</h5>\n              <h1 class=\"no-margin text-white\">$64,276.00</h1>\n            </div>\n          </div>\n        </div>\n        <hr>\n        <p class=\"small hint-text\">Services will be invoiced in accordance with the Service Description. You must pay all undisputed invoices in full within 30 days of the invoice date, unless otherwise specified under the Special Terms and Conditions. All payments must reference the invoice number. Unless otherwise specified, all invoices shall be paid in the currency of the invoice</p>\n        <p class=\"small hint-text\">Insight retains the right to decline to extend credit and to require that the applicable purchase price be paid prior to performance of Services based on changes in insight's credit policies or your financial condition and/or payment record. Insight reserves the right to charge interest of 1.5% per month or the maximum allowable by applicable law, whichever is less, for any undisputed past due invoices. You are responsible for all costs of collection, including reasonable attorneys' fees, for any payment default on undisputed invoices. In addition, Insight may terminate all further work if payment is not received in a timely manner.</p>\n        <br>\n        <hr>\n        <div>\n          <img src=\"assets/img/logo.png\" alt=\"logo\" pgRetina src1x=\"assets/img/logo.png\" src2x=\"assets/img/logo_2x.png\" width=\"78\" height=\"22\">&nbsp;\n          <span class=\"m-l-70 text-black sm-pull-right\">+34 346 4546 445</span>\n          <span class=\"m-l-40 text-black sm-pull-right\">support@revox.io</span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- END card -->\n</pg-container>\n<!-- END CONTAINER FLUID -->\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/extra/timeline/timeline.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/extra/timeline/timeline.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid bg-master-lighter \">\n  <div class=\"timeline-container top-circle\">\n    <section class=\"timeline\" ngsRevealSet [ngsSelector]=\"'.timeline-block'\">\n      <div class=\"timeline-block\">\n        <div class=\"timeline-point success\">\n          <i class=\"pg-icon\">map</i>\n        </div>\n        <!-- timeline-point -->\n        <div class=\"timeline-content\">\n          <div class=\"card social-card share full-width\">\n            <div class=\"circle\" data-toggle=\"tooltip\" title=\"Label\" data-container=\"body\">\n            </div>\n            <div class=\"card-header clearfix\">\n              <div class=\"user-pic\">\n                <img alt=\"Profile Image\" width=\"33\" height=\"33\" src2x=\"assets/img/profiles/8x.jpg\" pgRetina\n                  src1x=\"assets/img/profiles/8.jpg\" src=\"assets/img/profiles/8x.jpg\">\n              </div>\n              <h5>Jeff Curtis</h5>\n              <h6>Shared a Tweet\n                <span class=\"location semi-bold\"><i class=\"pg-icon\">map</i> SF, California</span>\n              </h6>\n            </div>\n            <div class=\"card-description\">\n              <p>What you think, you become. What you feel, you attract. What you imagine, you create - Buddha. <a\n                  href=\"javascript:void(0)\">#quote</a> </p>\n              <div class=\"via\">via Twitter</div>\n            </div>\n          </div>\n          <div class=\"event-date\">\n            <h6 class=\"font-montserrat all-caps hint-text m-t-0\">Apple Inc</h6>\n            <small class=\"fs-12 hint-text\">15 January 2015, 06:50 PM</small>\n          </div>\n        </div>\n        <!-- timeline-content -->\n      </div>\n      <!-- timeline-block -->\n      <div class=\"timeline-block\">\n        <div class=\"timeline-point small\">\n        </div>\n        <!-- timeline-point -->\n        <div class=\"timeline-content\">\n          <div class=\"card  social-card share full-width\">\n            <div class=\"circle\" data-toggle=\"tooltip\" title=\"Label\" data-container=\"body\">\n            </div>\n            <div class=\"card-header clearfix\">\n              <div class=\"user-pic\">\n                <img alt=\"Profile Image\" width=\"33\" height=\"33\" src2x=\"assets/img/profiles/5x.jpg\" pgRetina\n                  src1x=\"assets/img/profiles/5.jpg\" src=\"assets/img/profiles/5x.jpg\">\n              </div>\n              <h5>Shannon Williams</h5>\n              <h6>Shared a photo\n                <span class=\"location semi-bold\"><i class=\"pg-icon\">map</i> NYC, New York</span>\n              </h6>\n            </div>\n            <div class=\"card-description\">\n              <p>Inspired by : good design is obvious, great design is transparent</p>\n              <div class=\"via\">via themeforest</div>\n            </div>\n            <div class=\"card-content\">\n              <ul class=\"buttons \">\n                <li>\n                  <a href=\"javascript:void(0)\"><i class=\"pg-icon\">expand</i>\n                  </a>\n                </li>\n                <li>\n                  <a href=\"javascript:void(0)\"><i class=\"pg-icon\">heart</i>\n                  </a>\n                </li>\n              </ul>\n              <img alt=\"Social post\" src=\"assets/img/social-post-image.png\">\n            </div>\n            <div class=\"card-footer clearfix\">\n              <div class=\"time\">few seconds ago</div>\n              <ul class=\"reactions\">\n                <li><a href=\"javascript:void(0)\" class=\"d-flex align-items-center\">5,345 <i class=\"pg-icon\">comment</i></a>\n                </li>\n                <li><a href=\"javascript:void(0)\" class=\"d-flex align-items-center\">23K <i class=\"pg-icon\">heart</i></a>\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div class=\"event-date\">\n            <small class=\"fs-12 hint-text\">15 January 2015, 06:50 PM</small>\n          </div>\n        </div>\n        <!-- timeline-content -->\n      </div>\n      <!-- timeline-block -->\n      <div class=\"timeline-block\">\n        <div class=\"timeline-point warning\">\n          <i class=\"pg-icon\">chat</i>\n        </div>\n        <!-- timeline-point -->\n        <div class=\"timeline-content\">\n          <div class=\"card social-card share full-width \">\n            <div class=\"card-header clearfix\">\n              <h5 class=\"text-warning pull-left fs-12\">Stock Market <i class=\"pg-icon text-warning fs-11\">circle</i>\n              </h5>\n              <div class=\"pull-right small hint-text d-flex align-items-center\">\n                5,345 <i class=\"pg-icon\">comment</i>\n              </div>\n              <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"card-description\">\n              <h5 class='hint-text no-margin'>Apple Inc.</h5>\n              <h5 class=\"small hint-text no-margin\">NASDAQ: AAPL - Nov 13 8:37 AM ET</h5>\n              <h3>111.25 <span class=\"text-warning\"><i class=\"pg-icon text-warning\">drop_up</i> 0.15 (0.13%)</span></h3>\n            </div>\n            <div class=\"card-footer clearfix\">\n              <div class=\"pull-left\">by <span class=\"text-warning\">John Smith</span></div>\n              <div class=\"pull-right hint-text\">\n                Apr 23\n              </div>\n              <div class=\"clearfix\"></div>\n            </div>\n          </div>\n          <div class=\"event-date\">\n            <h6 class=\"font-montserrat all-caps hint-text m-t-0\">Shared</h6>\n            <small class=\"fs-12 hint-text\">15 January 2015, 06:50 PM</small>\n          </div>\n        </div>\n        <!-- timeline-content -->\n      </div>\n      <!-- timeline-block -->\n      <div class=\"timeline-block\">\n        <div class=\"timeline-point small\">\n        </div>\n        <!-- timeline-point -->\n        <div class=\"timeline-content\">\n          <div class=\"card social-card share full-width \">\n            <div class=\"circle\" data-toggle=\"tooltip\" title=\"Label\" data-container=\"body\">\n            </div>\n            <div class=\"card-header clearfix\">\n              <div class=\"user-pic\">\n                <img alt=\"Profile Image\" width=\"33\" height=\"33\" src2x=\"assets/img/profiles/6x.jpg\" pgRetina\n                  src1x=\"assets/img/profiles/6.jpg\" src=\"assets/img/profiles/6x.jpg\">\n              </div>\n              <h5>Nathaniel Hamilton</h5>\n              <h6>Shared a Tweet\n                <span class=\"location semi-bold\"><i class=\"icon-map\"></i> NYC, New York</span>\n              </h6>\n            </div>\n            <div class=\"card-description\">\n              <p>Testing can show the presense of bugs, but not their absence.</p>\n              <div class=\"via\">via Twitter</div>\n            </div>\n          </div>\n          <div class=\"event-date\">\n            <small class=\"fs-12 hint-text\">15 January 2015, 06:50 PM</small>\n          </div>\n        </div>\n        <!-- timeline-content -->\n      </div>\n      <!-- timeline-block -->\n      <div class=\"timeline-block\">\n        <div class=\"timeline-point small\">\n        </div>\n        <!-- timeline-point -->\n        <div class=\"timeline-content\">\n          <div class=\"card social-card share full-width\">\n            <div class=\"circle\" data-toggle=\"tooltip\" title=\"Label\" data-container=\"body\">\n            </div>\n            <div class=\"card-header clearfix\">\n              <div class=\"user-pic\">\n                <img alt=\"Profile Image\" width=\"33\" height=\"33\" src2x=\"assets/img/profiles/4x.jpg\" pgRetina\n                  src1x=\"assets/img/profiles/4.jpg\" src=\"assets/img/profiles/4x.jpg\">\n              </div>\n              <h5>Andy Young</h5>\n              <h6>Updated his status\n                <span class=\"location semi-bold\"><i class=\"icon-map\"></i> NYC, New York</span>\n              </h6>\n            </div>\n            <div class=\"card-description\">\n              <p>What a lovely day! I think I should go and play outside.</p>\n            </div>\n          </div>\n          <div class=\"event-date\">\n            <small class=\"fs-12 hint-text\">15 January 2015, 06:50 PM</small>\n          </div>\n        </div>\n        <!-- timeline-content -->\n      </div>\n      <!-- timeline-block -->\n    </section>\n    <!-- timeline -->\n  </div>\n  <!-- -->\n</div>\n");

/***/ }),

/***/ "./src/app/extra/blankpage/blankpage.component.css":
/*!*********************************************************!*\
  !*** ./src/app/extra/blankpage/blankpage.component.css ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2V4dHJhL2JsYW5rcGFnZS9ibGFua3BhZ2UuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/extra/blankpage/blankpage.component.ts":
/*!********************************************************!*\
  !*** ./src/app/extra/blankpage/blankpage.component.ts ***!
  \********************************************************/
/*! exports provided: BlankpageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlankpageComponent", function() { return BlankpageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var BlankpageComponent = /** @class */ (function () {
    function BlankpageComponent() {
    }
    BlankpageComponent.prototype.ngOnInit = function () { };
    BlankpageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-blankpage',
            template: __importDefault(__webpack_require__(/*! raw-loader!./blankpage.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/extra/blankpage/blankpage.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./blankpage.component.css */ "./src/app/extra/blankpage/blankpage.component.css")).default]
        }),
        __metadata("design:paramtypes", [])
    ], BlankpageComponent);
    return BlankpageComponent;
}());



/***/ }),

/***/ "./src/app/extra/extra.module.ts":
/*!***************************************!*\
  !*** ./src/app/extra/extra.module.ts ***!
  \***************************************/
/*! exports provided: ExtraModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtraModule", function() { return ExtraModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _extra_routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extra.routing */ "./src/app/extra/extra.routing.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var ng_scrollreveal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-scrollreveal */ "./node_modules/ng-scrollreveal/index.js");
/* harmony import */ var ngx_isotope__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-isotope */ "./node_modules/ngx-isotope/ngx-isotope.umd.js");
/* harmony import */ var ngx_isotope__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_isotope__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-swiper-wrapper */ "./node_modules/ngx-swiper-wrapper/dist/ngx-swiper-wrapper.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _pages_components_slider_slider_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../@pages/components/slider/slider.module */ "./src/app/@pages/components/slider/slider.module.ts");
/* harmony import */ var _blankpage_blankpage_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./blankpage/blankpage.component */ "./src/app/extra/blankpage/blankpage.component.ts");
/* harmony import */ var _pages_components_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../@pages/components/shared.module */ "./src/app/@pages/components/shared.module.ts");
/* harmony import */ var _gallery_gallery_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./gallery/gallery.component */ "./src/app/extra/gallery/gallery.component.ts");
/* harmony import */ var _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./timeline/timeline.component */ "./src/app/extra/timeline/timeline.component.ts");
/* harmony import */ var _invoice_invoice_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./invoice/invoice.component */ "./src/app/extra/invoice/invoice.component.ts");
/* harmony import */ var _gallery_gallery_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./gallery/gallery.service */ "./src/app/extra/gallery/gallery.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




//NGX Bootstrap Components


//Thirdparty



// Dependant of pg-slider


var DEFAULT_SWIPER_CONFIG = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};

//Demo Page






var ExtraModule = /** @class */ (function () {
    function ExtraModule() {
    }
    ExtraModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _pages_components_shared_module__WEBPACK_IMPORTED_MODULE_11__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_extra_routing__WEBPACK_IMPORTED_MODULE_3__["ExtraRouts"]),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["CollapseModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsDropdownModule"].forRoot(),
                ng_scrollreveal__WEBPACK_IMPORTED_MODULE_5__["NgsRevealModule"].forRoot(),
                ngx_isotope__WEBPACK_IMPORTED_MODULE_6__["IsotopeModule"],
                ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_7__["SwiperModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _pages_components_slider_slider_module__WEBPACK_IMPORTED_MODULE_9__["pgSliderModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ModalModule"].forRoot()
            ],
            providers: [
                _gallery_gallery_service__WEBPACK_IMPORTED_MODULE_15__["GalleryService"],
                {
                    provide: ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_7__["SWIPER_CONFIG"],
                    useValue: DEFAULT_SWIPER_CONFIG
                }
            ],
            declarations: [_blankpage_blankpage_component__WEBPACK_IMPORTED_MODULE_10__["BlankpageComponent"], _gallery_gallery_component__WEBPACK_IMPORTED_MODULE_12__["GalleryComponent"], _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_13__["TimelineComponent"], _invoice_invoice_component__WEBPACK_IMPORTED_MODULE_14__["InvoiceComponent"]]
        })
    ], ExtraModule);
    return ExtraModule;
}());



/***/ }),

/***/ "./src/app/extra/extra.routing.ts":
/*!****************************************!*\
  !*** ./src/app/extra/extra.routing.ts ***!
  \****************************************/
/*! exports provided: ExtraRouts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtraRouts", function() { return ExtraRouts; });
/* harmony import */ var _blankpage_blankpage_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blankpage/blankpage.component */ "./src/app/extra/blankpage/blankpage.component.ts");
/* harmony import */ var _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeline/timeline.component */ "./src/app/extra/timeline/timeline.component.ts");
/* harmony import */ var _invoice_invoice_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./invoice/invoice.component */ "./src/app/extra/invoice/invoice.component.ts");
/* harmony import */ var _gallery_gallery_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gallery/gallery.component */ "./src/app/extra/gallery/gallery.component.ts");
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




//Routes
var ExtraRouts = [
    {
        path: '',
        children: [
            {
                path: 'blank',
                component: _blankpage_blankpage_component__WEBPACK_IMPORTED_MODULE_0__["BlankpageComponent"]
            },
            {
                path: 'timeline',
                component: _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_1__["TimelineComponent"],
                data: {
                    title: 'timeline'
                }
            },
            {
                path: 'invoice',
                component: _invoice_invoice_component__WEBPACK_IMPORTED_MODULE_2__["InvoiceComponent"],
                data: {
                    title: 'invoice'
                }
            },
            {
                path: 'gallery',
                component: _gallery_gallery_component__WEBPACK_IMPORTED_MODULE_3__["GalleryComponent"],
                data: {
                    title: 'gallery'
                }
            },
            {
                // Used for demo purpose
                // Only in casual and executive
                path: 'timeline/:type',
                component: _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_1__["TimelineComponent"],
                data: {
                    title: 'timeline'
                }
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/extra/gallery/gallery.component.scss":
/*!******************************************************!*\
  !*** ./src/app/extra/gallery/gallery.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/**\n * Swiper 4.5.1\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * http://www.idangero.us/swiper/\n *\n * Copyright 2014-2019 Vladimir Kharlampidi\n *\n * Released under the MIT License\n *\n * Released on: September 13, 2019\n */\n.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}\n.swiper-container-no-flexbox .swiper-slide{float:left}\n.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}\n.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:flex;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform;transition-property:transform,-webkit-transform;box-sizing:content-box}\n.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}\n.swiper-container-multirow>.swiper-wrapper{flex-wrap:wrap}\n.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}\n.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform;transition-property:transform,-webkit-transform}\n.swiper-slide-invisible-blank{visibility:hidden}\n.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}\n.swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;align-items:flex-start;-webkit-transition-property:height,-webkit-transform;transition-property:height,-webkit-transform;transition-property:transform,height;transition-property:transform,height,-webkit-transform}\n.swiper-container-3d{-webkit-perspective:1200px;perspective:1200px}\n.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}\n.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}\n.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,right top, left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}\n.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,left top, right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}\n.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left bottom, left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}\n.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left top, left bottom,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}\n.swiper-container-wp8-horizontal,.swiper-container-wp8-horizontal>.swiper-wrapper{touch-action:pan-y}\n.swiper-container-wp8-vertical,.swiper-container-wp8-vertical>.swiper-wrapper{touch-action:pan-x}\n.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;background-size:27px 44px;background-position:center;background-repeat:no-repeat}\n.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}\n.swiper-button-prev,.swiper-container-rtl .swiper-button-next{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");left:10px;right:auto}\n.swiper-button-next,.swiper-container-rtl .swiper-button-prev{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");right:10px;left:auto}\n.swiper-button-prev.swiper-button-white,.swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}\n.swiper-button-next.swiper-button-white,.swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}\n.swiper-button-prev.swiper-button-black,.swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}\n.swiper-button-next.swiper-button-black,.swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}\n.swiper-button-lock{display:none}\n.swiper-pagination{position:absolute;text-align:center;-webkit-transition:.3s opacity;transition:.3s opacity;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:10}\n.swiper-pagination.swiper-pagination-hidden{opacity:0}\n.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}\n.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transform:scale(.33);transform:scale(.33);position:relative}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active{-webkit-transform:scale(1);transform:scale(1)}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{-webkit-transform:scale(1);transform:scale(1)}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{-webkit-transform:scale(.66);transform:scale(.66)}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{-webkit-transform:scale(.33);transform:scale(.33)}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{-webkit-transform:scale(.66);transform:scale(.66)}\n.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{-webkit-transform:scale(.33);transform:scale(.33)}\n.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2}\nbutton.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}\n.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}\n.swiper-pagination-bullet-active{opacity:1;background:#007aff}\n.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}\n.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:6px 0;display:block}\n.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:8px}\n.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;-webkit-transition:.2s top,.2s -webkit-transform;transition:.2s top,.2s -webkit-transform;-webkit-transition:.2s transform,.2s top;transition:.2s transform,.2s top;-webkit-transition:.2s transform,.2s top,.2s -webkit-transform;transition:.2s transform,.2s top,.2s -webkit-transform}\n.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 4px}\n.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap}\n.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:.2s left,.2s -webkit-transform;transition:.2s left,.2s -webkit-transform;-webkit-transition:.2s transform,.2s left;transition:.2s transform,.2s left;-webkit-transition:.2s transform,.2s left,.2s -webkit-transform;transition:.2s transform,.2s left,.2s -webkit-transform}\n.swiper-container-horizontal.swiper-container-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:.2s right,.2s -webkit-transform;transition:.2s right,.2s -webkit-transform;-webkit-transition:.2s transform,.2s right;transition:.2s transform,.2s right;-webkit-transition:.2s transform,.2s right,.2s -webkit-transform;transition:.2s transform,.2s right,.2s -webkit-transform}\n.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}\n.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:#007aff;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;transform-origin:left top}\n.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{-webkit-transform-origin:right top;transform-origin:right top}\n.swiper-container-horizontal>.swiper-pagination-progressbar,.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:4px;left:0;top:0}\n.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-container-vertical>.swiper-pagination-progressbar{width:4px;height:100%;left:0;top:0}\n.swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}\n.swiper-pagination-progressbar.swiper-pagination-white{background:rgba(255,255,255,.25)}\n.swiper-pagination-progressbar.swiper-pagination-white .swiper-pagination-progressbar-fill{background:#fff}\n.swiper-pagination-black .swiper-pagination-bullet-active{background:#000}\n.swiper-pagination-progressbar.swiper-pagination-black{background:rgba(0,0,0,.25)}\n.swiper-pagination-progressbar.swiper-pagination-black .swiper-pagination-progressbar-fill{background:#000}\n.swiper-pagination-lock{display:none}\n.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}\n.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}\n.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}\n.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}\n.swiper-scrollbar-cursor-drag{cursor:move}\n.swiper-scrollbar-lock{display:none}\n.swiper-zoom-container{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;text-align:center}\n.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}\n.swiper-slide-zoomed{cursor:move}\n.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s steps(12,end) infinite;animation:swiper-preloader-spin 1s steps(12,end) infinite}\n.swiper-lazy-preloader:after{display:block;content:'';width:100%;height:100%;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");background-position:50%;background-size:100%;background-repeat:no-repeat}\n.swiper-lazy-preloader-white:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\")}\n@-webkit-keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\n@keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\n.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}\n.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out}\n.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;transition-property:opacity}\n.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}\n.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}\n.swiper-container-cube{overflow:visible}\n.swiper-container-cube .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;-webkit-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}\n.swiper-container-cube .swiper-slide .swiper-slide{pointer-events:none}\n.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;transform-origin:100% 0}\n.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}\n.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}\n.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}\n.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;background:#000;opacity:.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}\n.swiper-container-flip{overflow:visible}\n.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}\n.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}\n.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}\n.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}\n.swiper-container-coverflow .swiper-wrapper{-ms-perspective:1200px}\n.item-modal.fade.fill-in.show {\n  background: rgba(55, 58, 71, 0.9);\n}\n.item-modal .modal-dialog {\n  width: 845px;\n  max-width: 845px;\n}\n.item-modal .modal-dialog .dialog__overview {\n  background: white;\n  padding: 0;\n  text-align: left;\n  border: 1px solid rgba(0, 0, 0, 0.8);\n  height: 516px;\n}\n.item-modal .modal-dialog .dialog__overview .buy-now {\n  position: absolute;\n  bottom: 20px;\n  right: 35px;\n}\n.item-modal .modal-dialog .close {\n  top: 15px;\n  right: 15px;\n  z-index: 100;\n}\n.item-modal .modal-body {\n  padding: 0;\n  background: #fff;\n}\n.item-modal .dialog__footer {\n  height: 75px;\n}\n.item-modal .slide {\n  width: 516px;\n  height: 516px;\n  display: block;\n  overflow: hidden;\n  background-image: url(/assets/img/gallery/item-square.jpg);\n  background-size: cover;\n}\n.item-modal .swiper-button {\n  background: transparent;\n  color: white;\n  font-size: 18px;\n  opacity: 0.8;\n  height: 22px;\n  margin-top: -5px;\n}\n:host ::ng-deep .swiper-pagination {\n  text-align: right;\n  padding-right: 25px;\n}\n:host ::ng-deep .swiper-pagination .swiper-pagination-bullet {\n  background: rgba(0, 0, 0, 0.3);\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n  display: inline-block;\n  margin-left: 6px;\n}\n:host ::ng-deep .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {\n  background: #fff;\n}\n.filter-close {\n  position: absolute;\n  right: 12px;\n  top: 2px;\n  color: #788195;\n  padding: 6px;\n  opacity: 0.4;\n}\n@media (max-width: 920px) {\n  .gallery-item.first {\n    display: none;\n  }\n}\n@media (max-width: 767px) {\n  .item-modal .modal-dialog {\n    width: 400px;\n    max-width: 400px;\n    margin: 0 auto;\n  }\n  .item-modal .modal-dialog .container-fluid {\n    height: 100%;\n    padding-left: 30px;\n    padding-right: 30px;\n  }\n  .item-modal .modal-dialog .dialog__overview {\n    height: 100%;\n    margin-right: -30px;\n    margin-left: -30px;\n    border: none;\n  }\n  .item-modal .modal-dialog .modal-body {\n    height: 90%;\n    overflow-y: auto;\n  }\n\n  .item-slideshow-wrapper {\n    height: 515px !important;\n  }\n\n  .item-description {\n    height: auto !important;\n  }\n  .item-description .buy-now {\n    position: static !important;\n    float: right;\n    margin-bottom: 20px;\n  }\n\n  .swiper-container .swiper-slide {\n    width: 100% !important;\n  }\n\n  .dialog__footer {\n    display: none !important;\n  }\n}\n@media (max-width: 420px) {\n  .gallery {\n    margin-top: 80px;\n  }\n\n  .gallery-filters {\n    top: -90px;\n  }\n\n  .item-modal .modal-body {\n    width: 100%;\n    max-width: 100%;\n  }\n}\n@media (max-width: 610px) {\n  .gallery-item, .gallery {\n    width: 100% !important;\n  }\n}\n@media (min-width: 768px) {\n  .item-modal .modal-body .container-fluid > .row {\n    margin-left: -30px;\n    margin-right: -30px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zd2lwZXIvZGlzdC9jc3Mvc3dpcGVyLm1pbi5jc3MiLCJzcmMvYXBwL2V4dHJhL2dhbGxlcnkvQzpcXFVzZXJzXFxkaWFtYVxcRGVza3RvcFxcYmV0dGVyRmx5XFxzaW1wbGVXaGl0ZVxcYW5ndWxhci9zcmNcXGFwcFxcZXh0cmFcXGdhbGxlcnlcXGdhbGxlcnkuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2V4dHJhL2dhbGxlcnkvZ2FsbGVyeS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztFQVVFO0FBQ0Ysa0JBQWtCLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVM7QUFBQywyQ0FBMkMsVUFBVTtBQUFDLDJDQUEyQywyQkFBMkIsQ0FBQyw0QkFBNEIsQ0FBeUQscUJBQXFCO0FBQUMsZ0JBQWdCLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUEwQyxZQUFZLENBQUMsNkNBQTZDLENBQUMscUNBQXFDLENBQWtDLDZCQUE2QixDQUE3QixnREFBNkIsQ0FBQywrQ0FBK0MsQ0FBZ0Msc0JBQXNCO0FBQUMsd0RBQXdELG9DQUFvQyxDQUFDLDRCQUE0QjtBQUFDLDJDQUFxRixjQUFjO0FBQUMsNENBQTRDLDJDQUEyQyxDQUF3QyxtQ0FBbUMsQ0FBQyxhQUFhO0FBQUMsY0FBd0QsYUFBYSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsNkNBQTZDLENBQUMscUNBQXFDLENBQWtDLDZCQUE2QixDQUE3QixnREFBNkIsQ0FBQywrQ0FBK0M7QUFBQyw4QkFBOEIsaUJBQWlCO0FBQUMsd0VBQXdFLFdBQVc7QUFBQyw2Q0FBNkMsdUJBQXVCLENBQXFELHNCQUFzQixDQUFDLG9EQUFvRCxDQUFDLDRDQUE0QyxDQUF5QyxvQ0FBb0MsQ0FBQyxzREFBc0Q7QUFBQyxxQkFBcUIsMEJBQTBCLENBQUMsa0JBQWtCO0FBQUMsK1NBQStTLG1DQUFtQyxDQUFDLDJCQUEyQjtBQUFDLDhMQUE4TCxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsVUFBVTtBQUFDLCtDQUF3UyxvR0FBcUUsQ0FBckUsc0VBQXNFO0FBQUMsZ0RBQXVTLG9HQUFzRSxDQUF0RSx1RUFBdUU7QUFBQyw4Q0FBMlMsc0dBQW9FLENBQXBFLHFFQUFxRTtBQUFDLGlEQUF3UyxzR0FBdUUsQ0FBdkUsd0VBQXdFO0FBQUMsa0ZBQXlHLGtCQUFrQjtBQUFDLDhFQUFxRyxrQkFBa0I7QUFBQyx3Q0FBd0MsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQywwQkFBMEIsQ0FBQywyQkFBMkI7QUFBQyxzRkFBc0YsV0FBVyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUI7QUFBQyw4REFBOEQsbVJBQW1SLENBQUMsU0FBUyxDQUFDLFVBQVU7QUFBQyw4REFBOEQsbVJBQW1SLENBQUMsVUFBVSxDQUFDLFNBQVM7QUFBQyxzR0FBc0csbVJBQW1SO0FBQUMsc0dBQXNHLG1SQUFtUjtBQUFDLHNHQUFzRyxtUkFBbVI7QUFBQyxzR0FBc0csbVJBQW1SO0FBQUMsb0JBQW9CLFlBQVk7QUFBQyxtQkFBbUIsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsOEJBQThCLENBQTJCLHNCQUFzQixDQUFDLG9DQUFvQyxDQUFDLDRCQUE0QixDQUFDLFVBQVU7QUFBQyw0Q0FBNEMsU0FBUztBQUFDLDhHQUE4RyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFBQyxtQ0FBbUMsZUFBZSxDQUFDLFdBQVc7QUFBQyw2REFBNkQsNEJBQTRCLENBQTBCLG9CQUFvQixDQUFDLGlCQUFpQjtBQUFDLG9FQUFvRSwwQkFBMEIsQ0FBd0Isa0JBQWtCO0FBQUMseUVBQXlFLDBCQUEwQixDQUF3QixrQkFBa0I7QUFBQyx5RUFBeUUsNEJBQTRCLENBQTBCLG9CQUFvQjtBQUFDLDhFQUE4RSw0QkFBNEIsQ0FBMEIsb0JBQW9CO0FBQUMseUVBQXlFLDRCQUE0QixDQUEwQixvQkFBb0I7QUFBQyw4RUFBOEUsNEJBQTRCLENBQTBCLG9CQUFvQjtBQUFDLDBCQUEwQixTQUFTLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxVQUFVO0FBQUMsZ0NBQWdDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUF5QixlQUFlLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUMsZUFBZTtBQUFDLHVEQUF1RCxjQUFjO0FBQUMsaUNBQWlDLFNBQVMsQ0FBQyxrQkFBa0I7QUFBQyxzREFBc0QsVUFBVSxDQUFDLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQywrQkFBK0I7QUFBQyxnRkFBZ0YsWUFBWSxDQUFDLGFBQWE7QUFBQyx3RkFBd0YsT0FBTyxDQUFDLGtDQUFrQyxDQUFnQywwQkFBMEIsQ0FBQyxTQUFTO0FBQUMsa0hBQWtILG9CQUFvQixDQUFDLGdEQUFnRCxDQUFDLHdDQUF3QyxDQUFxQyx3Q0FBZ0MsQ0FBaEMsZ0NBQWdDLENBQUMsOERBQXFELENBQXJELHNEQUFzRDtBQUFDLGtGQUFrRixZQUFZO0FBQUMsMEZBQTBGLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBZ0MsMEJBQTBCLENBQUMsa0JBQWtCO0FBQUMsb0hBQW9ILGlEQUFpRCxDQUFDLHlDQUF5QyxDQUFzQyx5Q0FBaUMsQ0FBakMsaUNBQWlDLENBQUMsK0RBQXNELENBQXRELHVEQUF1RDtBQUFDLCtHQUErRyxrREFBa0QsQ0FBQywwQ0FBMEMsQ0FBdUMsMENBQWtDLENBQWxDLGtDQUFrQyxDQUFDLGdFQUF1RCxDQUF2RCx3REFBd0Q7QUFBQywrQkFBK0IsMEJBQTBCLENBQUMsaUJBQWlCO0FBQUMsbUVBQW1FLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQywwQkFBMEIsQ0FBd0Isa0JBQWtCLENBQUMsaUNBQWlDLENBQStCLHlCQUF5QjtBQUFDLHlGQUF5RixrQ0FBa0MsQ0FBZ0MsMEJBQTBCO0FBQUMsNkpBQTZKLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUs7QUFBQyw2SkFBNkosU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSztBQUFDLDBEQUEwRCxlQUFlO0FBQUMsdURBQXVELGdDQUFnQztBQUFDLDJGQUEyRixlQUFlO0FBQUMsMERBQTBELGVBQWU7QUFBQyx1REFBdUQsMEJBQTBCO0FBQUMsMkZBQTJGLGVBQWU7QUFBQyx3QkFBd0IsWUFBWTtBQUFDLGtCQUFrQixrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyx5QkFBeUI7QUFBQywrQ0FBK0MsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVM7QUFBQyw2Q0FBNkMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVU7QUFBQyx1QkFBdUIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSztBQUFDLDhCQUE4QixXQUFXO0FBQUMsdUJBQXVCLFlBQVk7QUFBQyx1QkFBdUIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBMEMsWUFBWSxDQUFDLHVCQUF1QixDQUFxRCxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBa0Qsa0JBQWtCLENBQUMsaUJBQWlCO0FBQUMsb0ZBQW9GLGNBQWMsQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsa0JBQWtCO0FBQUMscUJBQXFCLFdBQVc7QUFBQyx1QkFBdUIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBMEIsb0JBQW9CLENBQUMsaUVBQWlFLENBQUMseURBQXlEO0FBQUMsNkJBQTZCLGFBQWEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyx3N0NBQXc3QyxDQUFDLHVCQUF1QixDQUFDLG9CQUFvQixDQUFDLDJCQUEyQjtBQUFDLG1DQUFtQyxxN0NBQXE3QztBQUFDLHlDQUF5QyxLQUFLLGdDQUFnQyxDQUFDLHdCQUF3QixDQUFDO0FBQUMsaUNBQWlDLEtBQUssZ0NBQWdDLENBQUMsd0JBQXdCLENBQUM7QUFBQyx1Q0FBdUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsYUFBYTtBQUFDLGdFQUFnRSwyQ0FBMkMsQ0FBd0MsbUNBQW1DO0FBQUMscUNBQXFDLG1CQUFtQixDQUFDLG1DQUFtQyxDQUFnQywyQkFBMkI7QUFBQyxtREFBbUQsbUJBQW1CO0FBQUMsNkdBQTZHLG1CQUFtQjtBQUFDLHVCQUF1QixnQkFBZ0I7QUFBQyxxQ0FBcUMsbUJBQW1CLENBQUMsa0NBQWtDLENBQUMsMEJBQTBCLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLDRCQUE0QixDQUEwQixvQkFBb0IsQ0FBQyxVQUFVLENBQUMsV0FBVztBQUFDLG1EQUFtRCxtQkFBbUI7QUFBQywwREFBMEQsK0JBQStCLENBQTZCLHVCQUF1QjtBQUFDLDZHQUE2RyxtQkFBbUI7QUFBQyx3TEFBd0wsbUJBQW1CLENBQUMsa0JBQWtCO0FBQUMsc01BQXNNLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQywwQkFBMEI7QUFBQywyQ0FBMkMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsaUJBQWlCLENBQUMsU0FBUztBQUFDLHVCQUF1QixnQkFBZ0I7QUFBQyxxQ0FBcUMsbUJBQW1CLENBQUMsa0NBQWtDLENBQUMsMEJBQTBCLENBQUMsU0FBUztBQUFDLG1EQUFtRCxtQkFBbUI7QUFBQyw2R0FBNkcsbUJBQW1CO0FBQUMsc01BQXNNLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQywwQkFBMEI7QUFBQyw0Q0FBNEMsc0JBQXNCO0FDUnhrbUI7RUFDSSxpQ0FBQTtBQ0RSO0FER0k7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7QUNEUjtBREdRO0VBQ0ksaUJBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGFBQUE7QUNEWjtBREVZO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0FoQjtBRElRO0VBQ0ksU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDRlo7QURLSTtFQUNJLFVBQUE7RUFDQSxnQkFBQTtBQ0hSO0FES0k7RUFDSSxZQUFBO0FDSFI7QURLSTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsMERBQUE7RUFDQSxzQkFBQTtBQ0hSO0FES0k7RUFDSSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0hSO0FET0E7RUFDSSxpQkFBQTtFQUNBLG1CQUFBO0FDSko7QURLSTtFQUNJLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7QUNIUjtBRElRO0VBQ0ksZ0JBQUE7QUNGWjtBRE9BO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQ0pKO0FET0E7RUFDSTtJQUNJLGFBQUE7RUNKTjtBQUNGO0FETUE7RUFDSTtJQUVRLFlBQUE7SUFDQSxnQkFBQTtJQUNBLGNBQUE7RUNMVjtFRE1VO0lBQ0ksWUFBQTtJQUNBLGtCQUFBO0lBQ0EsbUJBQUE7RUNKZDtFRE1VO0lBQ0ksWUFBQTtJQUNBLG1CQUFBO0lBQ0Esa0JBQUE7SUFDQSxZQUFBO0VDSmQ7RURNVTtJQUNJLFdBQUE7SUFDQSxnQkFBQTtFQ0pkOztFRE9NO0lBQ0ksd0JBQUE7RUNKVjs7RURNTTtJQUNJLHVCQUFBO0VDSFY7RURJVTtJQUNJLDJCQUFBO0lBQ0EsWUFBQTtJQUNBLG1CQUFBO0VDRmQ7O0VETVU7SUFDSSxzQkFBQTtFQ0hkOztFRE1NO0lBQ0ksd0JBQUE7RUNIVjtBQUNGO0FETUE7RUFDSTtJQUNJLGdCQUFBO0VDSk47O0VETUU7SUFDSSxVQUFBO0VDSE47O0VETU07SUFDSSxXQUFBO0lBQ0EsZUFBQTtFQ0hWO0FBQ0Y7QURPQTtFQUNJO0lBQ0ksc0JBQUE7RUNMTjtBQUNGO0FET0E7RUFDSTtJQUNJLGtCQUFBO0lBQ0EsbUJBQUE7RUNMTjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvZXh0cmEvZ2FsbGVyeS9nYWxsZXJ5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTd2lwZXIgNC41LjFcbiAqIE1vc3QgbW9kZXJuIG1vYmlsZSB0b3VjaCBzbGlkZXIgYW5kIGZyYW1ld29yayB3aXRoIGhhcmR3YXJlIGFjY2VsZXJhdGVkIHRyYW5zaXRpb25zXG4gKiBodHRwOi8vd3d3LmlkYW5nZXJvLnVzL3N3aXBlci9cbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE5IFZsYWRpbWlyIEtoYXJsYW1waWRpXG4gKlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKlxuICogUmVsZWFzZWQgb246IFNlcHRlbWJlciAxMywgMjAxOVxuICovXG4uc3dpcGVyLWNvbnRhaW5lcnttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbjtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZzowO3otaW5kZXg6MX0uc3dpcGVyLWNvbnRhaW5lci1uby1mbGV4Ym94IC5zd2lwZXItc2xpZGV7ZmxvYXQ6bGVmdH0uc3dpcGVyLWNvbnRhaW5lci12ZXJ0aWNhbD4uc3dpcGVyLXdyYXBwZXJ7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7LXdlYmtpdC1mbGV4LWRpcmVjdGlvbjpjb2x1bW47LW1zLWZsZXgtZGlyZWN0aW9uOmNvbHVtbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW59LnN3aXBlci13cmFwcGVye3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ei1pbmRleDoxO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5Oi13ZWJraXQtdHJhbnNmb3JtO3RyYW5zaXRpb24tcHJvcGVydHk6LXdlYmtpdC10cmFuc2Zvcm07LW8tdHJhbnNpdGlvbi1wcm9wZXJ0eTp0cmFuc2Zvcm07dHJhbnNpdGlvbi1wcm9wZXJ0eTp0cmFuc2Zvcm07dHJhbnNpdGlvbi1wcm9wZXJ0eTp0cmFuc2Zvcm0sLXdlYmtpdC10cmFuc2Zvcm07LXdlYmtpdC1ib3gtc2l6aW5nOmNvbnRlbnQtYm94O2JveC1zaXppbmc6Y29udGVudC1ib3h9LnN3aXBlci1jb250YWluZXItYW5kcm9pZCAuc3dpcGVyLXNsaWRlLC5zd2lwZXItd3JhcHBlcnstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKX0uc3dpcGVyLWNvbnRhaW5lci1tdWx0aXJvdz4uc3dpcGVyLXdyYXBwZXJ7LXdlYmtpdC1mbGV4LXdyYXA6d3JhcDstbXMtZmxleC13cmFwOndyYXA7ZmxleC13cmFwOndyYXB9LnN3aXBlci1jb250YWluZXItZnJlZS1tb2RlPi5zd2lwZXItd3JhcHBlcnstd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0Oy1vLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0O3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0O21hcmdpbjowIGF1dG99LnN3aXBlci1zbGlkZXstd2Via2l0LWZsZXgtc2hyaW5rOjA7LW1zLWZsZXgtbmVnYXRpdmU6MDtmbGV4LXNocmluazowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246cmVsYXRpdmU7LXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5Oi13ZWJraXQtdHJhbnNmb3JtO3RyYW5zaXRpb24tcHJvcGVydHk6LXdlYmtpdC10cmFuc2Zvcm07LW8tdHJhbnNpdGlvbi1wcm9wZXJ0eTp0cmFuc2Zvcm07dHJhbnNpdGlvbi1wcm9wZXJ0eTp0cmFuc2Zvcm07dHJhbnNpdGlvbi1wcm9wZXJ0eTp0cmFuc2Zvcm0sLXdlYmtpdC10cmFuc2Zvcm19LnN3aXBlci1zbGlkZS1pbnZpc2libGUtYmxhbmt7dmlzaWJpbGl0eTpoaWRkZW59LnN3aXBlci1jb250YWluZXItYXV0b2hlaWdodCwuc3dpcGVyLWNvbnRhaW5lci1hdXRvaGVpZ2h0IC5zd2lwZXItc2xpZGV7aGVpZ2h0OmF1dG99LnN3aXBlci1jb250YWluZXItYXV0b2hlaWdodCAuc3dpcGVyLXdyYXBwZXJ7LXdlYmtpdC1ib3gtYWxpZ246c3RhcnQ7LXdlYmtpdC1hbGlnbi1pdGVtczpmbGV4LXN0YXJ0Oy1tcy1mbGV4LWFsaWduOnN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7LXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5OmhlaWdodCwtd2Via2l0LXRyYW5zZm9ybTt0cmFuc2l0aW9uLXByb3BlcnR5OmhlaWdodCwtd2Via2l0LXRyYW5zZm9ybTstby10cmFuc2l0aW9uLXByb3BlcnR5OnRyYW5zZm9ybSxoZWlnaHQ7dHJhbnNpdGlvbi1wcm9wZXJ0eTp0cmFuc2Zvcm0saGVpZ2h0O3RyYW5zaXRpb24tcHJvcGVydHk6dHJhbnNmb3JtLGhlaWdodCwtd2Via2l0LXRyYW5zZm9ybX0uc3dpcGVyLWNvbnRhaW5lci0zZHstd2Via2l0LXBlcnNwZWN0aXZlOjEyMDBweDtwZXJzcGVjdGl2ZToxMjAwcHh9LnN3aXBlci1jb250YWluZXItM2QgLnN3aXBlci1jdWJlLXNoYWRvdywuc3dpcGVyLWNvbnRhaW5lci0zZCAuc3dpcGVyLXNsaWRlLC5zd2lwZXItY29udGFpbmVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwuc3dpcGVyLWNvbnRhaW5lci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0LC5zd2lwZXItY29udGFpbmVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LC5zd2lwZXItY29udGFpbmVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwuc3dpcGVyLWNvbnRhaW5lci0zZCAuc3dpcGVyLXdyYXBwZXJ7LXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7dHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkfS5zd2lwZXItY29udGFpbmVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwuc3dpcGVyLWNvbnRhaW5lci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0LC5zd2lwZXItY29udGFpbmVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LC5zd2lwZXItY29udGFpbmVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXRvcHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb2ludGVyLWV2ZW50czpub25lO3otaW5kZXg6MTB9LnN3aXBlci1jb250YWluZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdHtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLHJpZ2h0IHRvcCxsZWZ0IHRvcCxmcm9tKHJnYmEoMCwwLDAsLjUpKSx0byhyZ2JhKDAsMCwwLDApKSk7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWxpbmVhci1ncmFkaWVudChyaWdodCxyZ2JhKDAsMCwwLC41KSxyZ2JhKDAsMCwwLDApKTtiYWNrZ3JvdW5kLWltYWdlOi1vLWxpbmVhci1ncmFkaWVudChyaWdodCxyZ2JhKDAsMCwwLC41KSxyZ2JhKDAsMCwwLDApKTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0byBsZWZ0LHJnYmEoMCwwLDAsLjUpLHJnYmEoMCwwLDAsMCkpfS5zd2lwZXItY29udGFpbmVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0e2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AscmlnaHQgdG9wLGZyb20ocmdiYSgwLDAsMCwuNSkpLHRvKHJnYmEoMCwwLDAsMCkpKTtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQscmdiYSgwLDAsMCwuNSkscmdiYSgwLDAsMCwwKSk7YmFja2dyb3VuZC1pbWFnZTotby1saW5lYXItZ3JhZGllbnQobGVmdCxyZ2JhKDAsMCwwLC41KSxyZ2JhKDAsMCwwLDApKTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0byByaWdodCxyZ2JhKDAsMCwwLC41KSxyZ2JhKDAsMCwwLDApKX0uc3dpcGVyLWNvbnRhaW5lci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3B7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IGJvdHRvbSxsZWZ0IHRvcCxmcm9tKHJnYmEoMCwwLDAsLjUpKSx0byhyZ2JhKDAsMCwwLDApKSk7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20scmdiYSgwLDAsMCwuNSkscmdiYSgwLDAsMCwwKSk7YmFja2dyb3VuZC1pbWFnZTotby1saW5lYXItZ3JhZGllbnQoYm90dG9tLHJnYmEoMCwwLDAsLjUpLHJnYmEoMCwwLDAsMCkpO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIHRvcCxyZ2JhKDAsMCwwLC41KSxyZ2JhKDAsMCwwLDApKX0uc3dpcGVyLWNvbnRhaW5lci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b217YmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxmcm9tKHJnYmEoMCwwLDAsLjUpKSx0byhyZ2JhKDAsMCwwLDApKSk7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgwLDAsMCwuNSkscmdiYSgwLDAsMCwwKSk7YmFja2dyb3VuZC1pbWFnZTotby1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMCwwLDAsLjUpLHJnYmEoMCwwLDAsMCkpO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZ2JhKDAsMCwwLC41KSxyZ2JhKDAsMCwwLDApKX0uc3dpcGVyLWNvbnRhaW5lci13cDgtaG9yaXpvbnRhbCwuc3dpcGVyLWNvbnRhaW5lci13cDgtaG9yaXpvbnRhbD4uc3dpcGVyLXdyYXBwZXJ7LW1zLXRvdWNoLWFjdGlvbjpwYW4teTt0b3VjaC1hY3Rpb246cGFuLXl9LnN3aXBlci1jb250YWluZXItd3A4LXZlcnRpY2FsLC5zd2lwZXItY29udGFpbmVyLXdwOC12ZXJ0aWNhbD4uc3dpcGVyLXdyYXBwZXJ7LW1zLXRvdWNoLWFjdGlvbjpwYW4teDt0b3VjaC1hY3Rpb246cGFuLXh9LnN3aXBlci1idXR0b24tbmV4dCwuc3dpcGVyLWJ1dHRvbi1wcmV2e3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7d2lkdGg6MjdweDtoZWlnaHQ6NDRweDttYXJnaW4tdG9wOi0yMnB4O3otaW5kZXg6MTA7Y3Vyc29yOnBvaW50ZXI7YmFja2dyb3VuZC1zaXplOjI3cHggNDRweDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXR9LnN3aXBlci1idXR0b24tbmV4dC5zd2lwZXItYnV0dG9uLWRpc2FibGVkLC5zd2lwZXItYnV0dG9uLXByZXYuc3dpcGVyLWJ1dHRvbi1kaXNhYmxlZHtvcGFjaXR5Oi4zNTtjdXJzb3I6YXV0bztwb2ludGVyLWV2ZW50czpub25lfS5zd2lwZXItYnV0dG9uLXByZXYsLnN3aXBlci1jb250YWluZXItcnRsIC5zd2lwZXItYnV0dG9uLW5leHR7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwlM0NzdmclMjB4bWxucyUzRCdodHRwJTNBJTJGJTJGd3d3LnczLm9yZyUyRjIwMDAlMkZzdmcnJTIwdmlld0JveCUzRCcwJTIwMCUyMDI3JTIwNDQnJTNFJTNDcGF0aCUyMGQlM0QnTTAlMkMyMkwyMiUyQzBsMi4xJTJDMi4xTDQuMiUyQzIybDE5LjklMkMxOS45TDIyJTJDNDRMMCUyQzIyTDAlMkMyMkwwJTJDMjJ6JyUyMGZpbGwlM0QnJTIzMDA3YWZmJyUyRiUzRSUzQyUyRnN2ZyUzRVwiKTtsZWZ0OjEwcHg7cmlnaHQ6YXV0b30uc3dpcGVyLWJ1dHRvbi1uZXh0LC5zd2lwZXItY29udGFpbmVyLXJ0bCAuc3dpcGVyLWJ1dHRvbi1wcmV2e2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgsJTNDc3ZnJTIweG1sbnMlM0QnaHR0cCUzQSUyRiUyRnd3dy53My5vcmclMkYyMDAwJTJGc3ZnJyUyMHZpZXdCb3glM0QnMCUyMDAlMjAyNyUyMDQ0JyUzRSUzQ3BhdGglMjBkJTNEJ00yNyUyQzIyTDI3JTJDMjJMNSUyQzQ0bC0yLjEtMi4xTDIyLjglMkMyMkwyLjklMkMyLjFMNSUyQzBMMjclMkMyMkwyNyUyQzIyeiclMjBmaWxsJTNEJyUyMzAwN2FmZiclMkYlM0UlM0MlMkZzdmclM0VcIik7cmlnaHQ6MTBweDtsZWZ0OmF1dG99LnN3aXBlci1idXR0b24tcHJldi5zd2lwZXItYnV0dG9uLXdoaXRlLC5zd2lwZXItY29udGFpbmVyLXJ0bCAuc3dpcGVyLWJ1dHRvbi1uZXh0LnN3aXBlci1idXR0b24td2hpdGV7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwlM0NzdmclMjB4bWxucyUzRCdodHRwJTNBJTJGJTJGd3d3LnczLm9yZyUyRjIwMDAlMkZzdmcnJTIwdmlld0JveCUzRCcwJTIwMCUyMDI3JTIwNDQnJTNFJTNDcGF0aCUyMGQlM0QnTTAlMkMyMkwyMiUyQzBsMi4xJTJDMi4xTDQuMiUyQzIybDE5LjklMkMxOS45TDIyJTJDNDRMMCUyQzIyTDAlMkMyMkwwJTJDMjJ6JyUyMGZpbGwlM0QnJTIzZmZmZmZmJyUyRiUzRSUzQyUyRnN2ZyUzRVwiKX0uc3dpcGVyLWJ1dHRvbi1uZXh0LnN3aXBlci1idXR0b24td2hpdGUsLnN3aXBlci1jb250YWluZXItcnRsIC5zd2lwZXItYnV0dG9uLXByZXYuc3dpcGVyLWJ1dHRvbi13aGl0ZXtiYWNrZ3JvdW5kLWltYWdlOnVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04LCUzQ3N2ZyUyMHhtbG5zJTNEJ2h0dHAlM0ElMkYlMkZ3d3cudzMub3JnJTJGMjAwMCUyRnN2ZyclMjB2aWV3Qm94JTNEJzAlMjAwJTIwMjclMjA0NCclM0UlM0NwYXRoJTIwZCUzRCdNMjclMkMyMkwyNyUyQzIyTDUlMkM0NGwtMi4xLTIuMUwyMi44JTJDMjJMMi45JTJDMi4xTDUlMkMwTDI3JTJDMjJMMjclMkMyMnonJTIwZmlsbCUzRCclMjNmZmZmZmYnJTJGJTNFJTNDJTJGc3ZnJTNFXCIpfS5zd2lwZXItYnV0dG9uLXByZXYuc3dpcGVyLWJ1dHRvbi1ibGFjaywuc3dpcGVyLWNvbnRhaW5lci1ydGwgLnN3aXBlci1idXR0b24tbmV4dC5zd2lwZXItYnV0dG9uLWJsYWNre2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgsJTNDc3ZnJTIweG1sbnMlM0QnaHR0cCUzQSUyRiUyRnd3dy53My5vcmclMkYyMDAwJTJGc3ZnJyUyMHZpZXdCb3glM0QnMCUyMDAlMjAyNyUyMDQ0JyUzRSUzQ3BhdGglMjBkJTNEJ00wJTJDMjJMMjIlMkMwbDIuMSUyQzIuMUw0LjIlMkMyMmwxOS45JTJDMTkuOUwyMiUyQzQ0TDAlMkMyMkwwJTJDMjJMMCUyQzIyeiclMjBmaWxsJTNEJyUyMzAwMDAwMCclMkYlM0UlM0MlMkZzdmclM0VcIil9LnN3aXBlci1idXR0b24tbmV4dC5zd2lwZXItYnV0dG9uLWJsYWNrLC5zd2lwZXItY29udGFpbmVyLXJ0bCAuc3dpcGVyLWJ1dHRvbi1wcmV2LnN3aXBlci1idXR0b24tYmxhY2t7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwlM0NzdmclMjB4bWxucyUzRCdodHRwJTNBJTJGJTJGd3d3LnczLm9yZyUyRjIwMDAlMkZzdmcnJTIwdmlld0JveCUzRCcwJTIwMCUyMDI3JTIwNDQnJTNFJTNDcGF0aCUyMGQlM0QnTTI3JTJDMjJMMjclMkMyMkw1JTJDNDRsLTIuMS0yLjFMMjIuOCUyQzIyTDIuOSUyQzIuMUw1JTJDMEwyNyUyQzIyTDI3JTJDMjJ6JyUyMGZpbGwlM0QnJTIzMDAwMDAwJyUyRiUzRSUzQyUyRnN2ZyUzRVwiKX0uc3dpcGVyLWJ1dHRvbi1sb2Nre2Rpc3BsYXk6bm9uZX0uc3dpcGVyLXBhZ2luYXRpb257cG9zaXRpb246YWJzb2x1dGU7dGV4dC1hbGlnbjpjZW50ZXI7LXdlYmtpdC10cmFuc2l0aW9uOi4zcyBvcGFjaXR5Oy1vLXRyYW5zaXRpb246LjNzIG9wYWNpdHk7dHJhbnNpdGlvbjouM3Mgb3BhY2l0eTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTt6LWluZGV4OjEwfS5zd2lwZXItcGFnaW5hdGlvbi5zd2lwZXItcGFnaW5hdGlvbi1oaWRkZW57b3BhY2l0eTowfS5zd2lwZXItY29udGFpbmVyLWhvcml6b250YWw+LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMsLnN3aXBlci1wYWdpbmF0aW9uLWN1c3RvbSwuc3dpcGVyLXBhZ2luYXRpb24tZnJhY3Rpb257Ym90dG9tOjEwcHg7bGVmdDowO3dpZHRoOjEwMCV9LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pY3tvdmVyZmxvdzpoaWRkZW47Zm9udC1zaXplOjB9LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0ey13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC4zMyk7LW1zLXRyYW5zZm9ybTpzY2FsZSguMzMpO3RyYW5zZm9ybTpzY2FsZSguMzMpO3Bvc2l0aW9uOnJlbGF0aXZlfS5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7LW1zLXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZS1tYWluey13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEpOy1tcy10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfS5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUtcHJldnstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSguNjYpOy1tcy10cmFuc2Zvcm06c2NhbGUoLjY2KTt0cmFuc2Zvcm06c2NhbGUoLjY2KX0uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlLXByZXYtcHJldnstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSguMzMpOy1tcy10cmFuc2Zvcm06c2NhbGUoLjMzKTt0cmFuc2Zvcm06c2NhbGUoLjMzKX0uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlLW5leHR7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjY2KTstbXMtdHJhbnNmb3JtOnNjYWxlKC42Nik7dHJhbnNmb3JtOnNjYWxlKC42Nil9LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZS1uZXh0LW5leHR7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjMzKTstbXMtdHJhbnNmb3JtOnNjYWxlKC4zMyk7dHJhbnNmb3JtOnNjYWxlKC4zMyl9LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHt3aWR0aDo4cHg7aGVpZ2h0OjhweDtkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXItcmFkaXVzOjEwMCU7YmFja2dyb3VuZDojMDAwO29wYWNpdHk6LjJ9YnV0dG9uLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHtib3JkZXI6bm9uZTttYXJnaW46MDtwYWRkaW5nOjA7LXdlYmtpdC1ib3gtc2hhZG93Om5vbmU7Ym94LXNoYWRvdzpub25lOy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZX0uc3dpcGVyLXBhZ2luYXRpb24tY2xpY2thYmxlIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXR7Y3Vyc29yOnBvaW50ZXJ9LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmV7b3BhY2l0eToxO2JhY2tncm91bmQ6IzAwN2FmZn0uc3dpcGVyLWNvbnRhaW5lci12ZXJ0aWNhbD4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0c3tyaWdodDoxMHB4O3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwtNTAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLC01MCUsMCl9LnN3aXBlci1jb250YWluZXItdmVydGljYWw+LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHttYXJnaW46NnB4IDA7ZGlzcGxheTpibG9ja30uc3dpcGVyLWNvbnRhaW5lci12ZXJ0aWNhbD4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWN7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt3aWR0aDo4cHh9LnN3aXBlci1jb250YWluZXItdmVydGljYWw+LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXR7ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC10cmFuc2l0aW9uOi4ycyB0b3AsLjJzIC13ZWJraXQtdHJhbnNmb3JtO3RyYW5zaXRpb246LjJzIHRvcCwuMnMgLXdlYmtpdC10cmFuc2Zvcm07LW8tdHJhbnNpdGlvbjouMnMgdHJhbnNmb3JtLC4ycyB0b3A7dHJhbnNpdGlvbjouMnMgdHJhbnNmb3JtLC4ycyB0b3A7dHJhbnNpdGlvbjouMnMgdHJhbnNmb3JtLC4ycyB0b3AsLjJzIC13ZWJraXQtdHJhbnNmb3JtfS5zd2lwZXItY29udGFpbmVyLWhvcml6b250YWw+LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHttYXJnaW46MCA0cHh9LnN3aXBlci1jb250YWluZXItaG9yaXpvbnRhbD4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWN7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSk7d2hpdGUtc3BhY2U6bm93cmFwfS5zd2lwZXItY29udGFpbmVyLWhvcml6b250YWw+LnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXR7LXdlYmtpdC10cmFuc2l0aW9uOi4ycyBsZWZ0LC4ycyAtd2Via2l0LXRyYW5zZm9ybTt0cmFuc2l0aW9uOi4ycyBsZWZ0LC4ycyAtd2Via2l0LXRyYW5zZm9ybTstby10cmFuc2l0aW9uOi4ycyB0cmFuc2Zvcm0sLjJzIGxlZnQ7dHJhbnNpdGlvbjouMnMgdHJhbnNmb3JtLC4ycyBsZWZ0O3RyYW5zaXRpb246LjJzIHRyYW5zZm9ybSwuMnMgbGVmdCwuMnMgLXdlYmtpdC10cmFuc2Zvcm19LnN3aXBlci1jb250YWluZXItaG9yaXpvbnRhbC5zd2lwZXItY29udGFpbmVyLXJ0bD4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXR7LXdlYmtpdC10cmFuc2l0aW9uOi4ycyByaWdodCwuMnMgLXdlYmtpdC10cmFuc2Zvcm07dHJhbnNpdGlvbjouMnMgcmlnaHQsLjJzIC13ZWJraXQtdHJhbnNmb3JtOy1vLXRyYW5zaXRpb246LjJzIHRyYW5zZm9ybSwuMnMgcmlnaHQ7dHJhbnNpdGlvbjouMnMgdHJhbnNmb3JtLC4ycyByaWdodDt0cmFuc2l0aW9uOi4ycyB0cmFuc2Zvcm0sLjJzIHJpZ2h0LC4ycyAtd2Via2l0LXRyYW5zZm9ybX0uc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXJ7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yNSk7cG9zaXRpb246YWJzb2x1dGV9LnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyIC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1maWxse2JhY2tncm91bmQ6IzAwN2FmZjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTstbXMtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46bGVmdCB0b3A7LW1zLXRyYW5zZm9ybS1vcmlnaW46bGVmdCB0b3A7dHJhbnNmb3JtLW9yaWdpbjpsZWZ0IHRvcH0uc3dpcGVyLWNvbnRhaW5lci1ydGwgLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyIC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1maWxsey13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjpyaWdodCB0b3A7LW1zLXRyYW5zZm9ybS1vcmlnaW46cmlnaHQgdG9wO3RyYW5zZm9ybS1vcmlnaW46cmlnaHQgdG9wfS5zd2lwZXItY29udGFpbmVyLWhvcml6b250YWw+LnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLC5zd2lwZXItY29udGFpbmVyLXZlcnRpY2FsPi5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1vcHBvc2l0ZXt3aWR0aDoxMDAlO2hlaWdodDo0cHg7bGVmdDowO3RvcDowfS5zd2lwZXItY29udGFpbmVyLWhvcml6b250YWw+LnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLW9wcG9zaXRlLC5zd2lwZXItY29udGFpbmVyLXZlcnRpY2FsPi5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhcnt3aWR0aDo0cHg7aGVpZ2h0OjEwMCU7bGVmdDowO3RvcDowfS5zd2lwZXItcGFnaW5hdGlvbi13aGl0ZSAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZXtiYWNrZ3JvdW5kOiNmZmZ9LnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLnN3aXBlci1wYWdpbmF0aW9uLXdoaXRle2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuMjUpfS5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci5zd2lwZXItcGFnaW5hdGlvbi13aGl0ZSAuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItZmlsbHtiYWNrZ3JvdW5kOiNmZmZ9LnN3aXBlci1wYWdpbmF0aW9uLWJsYWNrIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZle2JhY2tncm91bmQ6IzAwMH0uc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIuc3dpcGVyLXBhZ2luYXRpb24tYmxhY2t7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yNSl9LnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLnN3aXBlci1wYWdpbmF0aW9uLWJsYWNrIC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1maWxse2JhY2tncm91bmQ6IzAwMH0uc3dpcGVyLXBhZ2luYXRpb24tbG9ja3tkaXNwbGF5Om5vbmV9LnN3aXBlci1zY3JvbGxiYXJ7Ym9yZGVyLXJhZGl1czoxMHB4O3Bvc2l0aW9uOnJlbGF0aXZlOy1tcy10b3VjaC1hY3Rpb246bm9uZTtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjEpfS5zd2lwZXItY29udGFpbmVyLWhvcml6b250YWw+LnN3aXBlci1zY3JvbGxiYXJ7cG9zaXRpb246YWJzb2x1dGU7bGVmdDoxJTtib3R0b206M3B4O3otaW5kZXg6NTA7aGVpZ2h0OjVweDt3aWR0aDo5OCV9LnN3aXBlci1jb250YWluZXItdmVydGljYWw+LnN3aXBlci1zY3JvbGxiYXJ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6M3B4O3RvcDoxJTt6LWluZGV4OjUwO3dpZHRoOjVweDtoZWlnaHQ6OTglfS5zd2lwZXItc2Nyb2xsYmFyLWRyYWd7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtwb3NpdGlvbjpyZWxhdGl2ZTtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjUpO2JvcmRlci1yYWRpdXM6MTBweDtsZWZ0OjA7dG9wOjB9LnN3aXBlci1zY3JvbGxiYXItY3Vyc29yLWRyYWd7Y3Vyc29yOm1vdmV9LnN3aXBlci1zY3JvbGxiYXItbG9ja3tkaXNwbGF5Om5vbmV9LnN3aXBlci16b29tLWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7LXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy1tcy1mbGV4LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy13ZWJraXQtYWxpZ24taXRlbXM6Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7dGV4dC1hbGlnbjpjZW50ZXJ9LnN3aXBlci16b29tLWNvbnRhaW5lcj5jYW52YXMsLnN3aXBlci16b29tLWNvbnRhaW5lcj5pbWcsLnN3aXBlci16b29tLWNvbnRhaW5lcj5zdmd7bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlOy1vLW9iamVjdC1maXQ6Y29udGFpbjtvYmplY3QtZml0OmNvbnRhaW59LnN3aXBlci1zbGlkZS16b29tZWR7Y3Vyc29yOm1vdmV9LnN3aXBlci1sYXp5LXByZWxvYWRlcnt3aWR0aDo0MnB4O2hlaWdodDo0MnB4O3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NTAlO3RvcDo1MCU7bWFyZ2luLWxlZnQ6LTIxcHg7bWFyZ2luLXRvcDotMjFweDt6LWluZGV4OjEwOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjo1MCU7LW1zLXRyYW5zZm9ybS1vcmlnaW46NTAlO3RyYW5zZm9ybS1vcmlnaW46NTAlOy13ZWJraXQtYW5pbWF0aW9uOnN3aXBlci1wcmVsb2FkZXItc3BpbiAxcyBzdGVwcygxMixlbmQpIGluZmluaXRlO2FuaW1hdGlvbjpzd2lwZXItcHJlbG9hZGVyLXNwaW4gMXMgc3RlcHMoMTIsZW5kKSBpbmZpbml0ZX0uc3dpcGVyLWxhenktcHJlbG9hZGVyOmFmdGVye2Rpc3BsYXk6YmxvY2s7Y29udGVudDonJzt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgsJTNDc3ZnJTIwdmlld0JveCUzRCcwJTIwMCUyMDEyMCUyMDEyMCclMjB4bWxucyUzRCdodHRwJTNBJTJGJTJGd3d3LnczLm9yZyUyRjIwMDAlMkZzdmcnJTIweG1sbnMlM0F4bGluayUzRCdodHRwJTNBJTJGJTJGd3d3LnczLm9yZyUyRjE5OTklMkZ4bGluayclM0UlM0NkZWZzJTNFJTNDbGluZSUyMGlkJTNEJ2wnJTIweDElM0QnNjAnJTIweDIlM0QnNjAnJTIweTElM0QnNyclMjB5MiUzRCcyNyclMjBzdHJva2UlM0QnJTIzNmM2YzZjJyUyMHN0cm9rZS13aWR0aCUzRCcxMSclMjBzdHJva2UtbGluZWNhcCUzRCdyb3VuZCclMkYlM0UlM0MlMkZkZWZzJTNFJTNDZyUzRSUzQ3VzZSUyMHhsaW5rJTNBaHJlZiUzRCclMjNsJyUyMG9wYWNpdHklM0QnLjI3JyUyRiUzRSUzQ3VzZSUyMHhsaW5rJTNBaHJlZiUzRCclMjNsJyUyMG9wYWNpdHklM0QnLjI3JyUyMHRyYW5zZm9ybSUzRCdyb3RhdGUoMzAlMjA2MCUyQzYwKSclMkYlM0UlM0N1c2UlMjB4bGluayUzQWhyZWYlM0QnJTIzbCclMjBvcGFjaXR5JTNEJy4yNyclMjB0cmFuc2Zvcm0lM0Qncm90YXRlKDYwJTIwNjAlMkM2MCknJTJGJTNFJTNDdXNlJTIweGxpbmslM0FocmVmJTNEJyUyM2wnJTIwb3BhY2l0eSUzRCcuMjcnJTIwdHJhbnNmb3JtJTNEJ3JvdGF0ZSg5MCUyMDYwJTJDNjApJyUyRiUzRSUzQ3VzZSUyMHhsaW5rJTNBaHJlZiUzRCclMjNsJyUyMG9wYWNpdHklM0QnLjI3JyUyMHRyYW5zZm9ybSUzRCdyb3RhdGUoMTIwJTIwNjAlMkM2MCknJTJGJTNFJTNDdXNlJTIweGxpbmslM0FocmVmJTNEJyUyM2wnJTIwb3BhY2l0eSUzRCcuMjcnJTIwdHJhbnNmb3JtJTNEJ3JvdGF0ZSgxNTAlMjA2MCUyQzYwKSclMkYlM0UlM0N1c2UlMjB4bGluayUzQWhyZWYlM0QnJTIzbCclMjBvcGFjaXR5JTNEJy4zNyclMjB0cmFuc2Zvcm0lM0Qncm90YXRlKDE4MCUyMDYwJTJDNjApJyUyRiUzRSUzQ3VzZSUyMHhsaW5rJTNBaHJlZiUzRCclMjNsJyUyMG9wYWNpdHklM0QnLjQ2JyUyMHRyYW5zZm9ybSUzRCdyb3RhdGUoMjEwJTIwNjAlMkM2MCknJTJGJTNFJTNDdXNlJTIweGxpbmslM0FocmVmJTNEJyUyM2wnJTIwb3BhY2l0eSUzRCcuNTYnJTIwdHJhbnNmb3JtJTNEJ3JvdGF0ZSgyNDAlMjA2MCUyQzYwKSclMkYlM0UlM0N1c2UlMjB4bGluayUzQWhyZWYlM0QnJTIzbCclMjBvcGFjaXR5JTNEJy42NiclMjB0cmFuc2Zvcm0lM0Qncm90YXRlKDI3MCUyMDYwJTJDNjApJyUyRiUzRSUzQ3VzZSUyMHhsaW5rJTNBaHJlZiUzRCclMjNsJyUyMG9wYWNpdHklM0QnLjc1JyUyMHRyYW5zZm9ybSUzRCdyb3RhdGUoMzAwJTIwNjAlMkM2MCknJTJGJTNFJTNDdXNlJTIweGxpbmslM0FocmVmJTNEJyUyM2wnJTIwb3BhY2l0eSUzRCcuODUnJTIwdHJhbnNmb3JtJTNEJ3JvdGF0ZSgzMzAlMjA2MCUyQzYwKSclMkYlM0UlM0MlMkZnJTNFJTNDJTJGc3ZnJTNFXCIpO2JhY2tncm91bmQtcG9zaXRpb246NTAlO2JhY2tncm91bmQtc2l6ZToxMDAlO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdH0uc3dpcGVyLWxhenktcHJlbG9hZGVyLXdoaXRlOmFmdGVye2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgsJTNDc3ZnJTIwdmlld0JveCUzRCcwJTIwMCUyMDEyMCUyMDEyMCclMjB4bWxucyUzRCdodHRwJTNBJTJGJTJGd3d3LnczLm9yZyUyRjIwMDAlMkZzdmcnJTIweG1sbnMlM0F4bGluayUzRCdodHRwJTNBJTJGJTJGd3d3LnczLm9yZyUyRjE5OTklMkZ4bGluayclM0UlM0NkZWZzJTNFJTNDbGluZSUyMGlkJTNEJ2wnJTIweDElM0QnNjAnJTIweDIlM0QnNjAnJTIweTElM0QnNyclMjB5MiUzRCcyNyclMjBzdHJva2UlM0QnJTIzZmZmJyUyMHN0cm9rZS13aWR0aCUzRCcxMSclMjBzdHJva2UtbGluZWNhcCUzRCdyb3VuZCclMkYlM0UlM0MlMkZkZWZzJTNFJTNDZyUzRSUzQ3VzZSUyMHhsaW5rJTNBaHJlZiUzRCclMjNsJyUyMG9wYWNpdHklM0QnLjI3JyUyRiUzRSUzQ3VzZSUyMHhsaW5rJTNBaHJlZiUzRCclMjNsJyUyMG9wYWNpdHklM0QnLjI3JyUyMHRyYW5zZm9ybSUzRCdyb3RhdGUoMzAlMjA2MCUyQzYwKSclMkYlM0UlM0N1c2UlMjB4bGluayUzQWhyZWYlM0QnJTIzbCclMjBvcGFjaXR5JTNEJy4yNyclMjB0cmFuc2Zvcm0lM0Qncm90YXRlKDYwJTIwNjAlMkM2MCknJTJGJTNFJTNDdXNlJTIweGxpbmslM0FocmVmJTNEJyUyM2wnJTIwb3BhY2l0eSUzRCcuMjcnJTIwdHJhbnNmb3JtJTNEJ3JvdGF0ZSg5MCUyMDYwJTJDNjApJyUyRiUzRSUzQ3VzZSUyMHhsaW5rJTNBaHJlZiUzRCclMjNsJyUyMG9wYWNpdHklM0QnLjI3JyUyMHRyYW5zZm9ybSUzRCdyb3RhdGUoMTIwJTIwNjAlMkM2MCknJTJGJTNFJTNDdXNlJTIweGxpbmslM0FocmVmJTNEJyUyM2wnJTIwb3BhY2l0eSUzRCcuMjcnJTIwdHJhbnNmb3JtJTNEJ3JvdGF0ZSgxNTAlMjA2MCUyQzYwKSclMkYlM0UlM0N1c2UlMjB4bGluayUzQWhyZWYlM0QnJTIzbCclMjBvcGFjaXR5JTNEJy4zNyclMjB0cmFuc2Zvcm0lM0Qncm90YXRlKDE4MCUyMDYwJTJDNjApJyUyRiUzRSUzQ3VzZSUyMHhsaW5rJTNBaHJlZiUzRCclMjNsJyUyMG9wYWNpdHklM0QnLjQ2JyUyMHRyYW5zZm9ybSUzRCdyb3RhdGUoMjEwJTIwNjAlMkM2MCknJTJGJTNFJTNDdXNlJTIweGxpbmslM0FocmVmJTNEJyUyM2wnJTIwb3BhY2l0eSUzRCcuNTYnJTIwdHJhbnNmb3JtJTNEJ3JvdGF0ZSgyNDAlMjA2MCUyQzYwKSclMkYlM0UlM0N1c2UlMjB4bGluayUzQWhyZWYlM0QnJTIzbCclMjBvcGFjaXR5JTNEJy42NiclMjB0cmFuc2Zvcm0lM0Qncm90YXRlKDI3MCUyMDYwJTJDNjApJyUyRiUzRSUzQ3VzZSUyMHhsaW5rJTNBaHJlZiUzRCclMjNsJyUyMG9wYWNpdHklM0QnLjc1JyUyMHRyYW5zZm9ybSUzRCdyb3RhdGUoMzAwJTIwNjAlMkM2MCknJTJGJTNFJTNDdXNlJTIweGxpbmslM0FocmVmJTNEJyUyM2wnJTIwb3BhY2l0eSUzRCcuODUnJTIwdHJhbnNmb3JtJTNEJ3JvdGF0ZSgzMzAlMjA2MCUyQzYwKSclMkYlM0UlM0MlMkZnJTNFJTNDJTJGc3ZnJTNFXCIpfUAtd2Via2l0LWtleWZyYW1lcyBzd2lwZXItcHJlbG9hZGVyLXNwaW57MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUBrZXlmcmFtZXMgc3dpcGVyLXByZWxvYWRlci1zcGluezEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX0uc3dpcGVyLWNvbnRhaW5lciAuc3dpcGVyLW5vdGlmaWNhdGlvbntwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cG9pbnRlci1ldmVudHM6bm9uZTtvcGFjaXR5OjA7ei1pbmRleDotMTAwMH0uc3dpcGVyLWNvbnRhaW5lci1mYWRlLnN3aXBlci1jb250YWluZXItZnJlZS1tb2RlIC5zd2lwZXItc2xpZGV7LXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLW91dDstby10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLW91dDt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLW91dH0uc3dpcGVyLWNvbnRhaW5lci1mYWRlIC5zd2lwZXItc2xpZGV7cG9pbnRlci1ldmVudHM6bm9uZTstd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6b3BhY2l0eTstby10cmFuc2l0aW9uLXByb3BlcnR5Om9wYWNpdHk7dHJhbnNpdGlvbi1wcm9wZXJ0eTpvcGFjaXR5fS5zd2lwZXItY29udGFpbmVyLWZhZGUgLnN3aXBlci1zbGlkZSAuc3dpcGVyLXNsaWRle3BvaW50ZXItZXZlbnRzOm5vbmV9LnN3aXBlci1jb250YWluZXItZmFkZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSwuc3dpcGVyLWNvbnRhaW5lci1mYWRlIC5zd2lwZXItc2xpZGUtYWN0aXZlIC5zd2lwZXItc2xpZGUtYWN0aXZle3BvaW50ZXItZXZlbnRzOmF1dG99LnN3aXBlci1jb250YWluZXItY3ViZXtvdmVyZmxvdzp2aXNpYmxlfS5zd2lwZXItY29udGFpbmVyLWN1YmUgLnN3aXBlci1zbGlkZXtwb2ludGVyLWV2ZW50czpub25lOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47ei1pbmRleDoxO3Zpc2liaWxpdHk6aGlkZGVuOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7LW1zLXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LnN3aXBlci1jb250YWluZXItY3ViZSAuc3dpcGVyLXNsaWRlIC5zd2lwZXItc2xpZGV7cG9pbnRlci1ldmVudHM6bm9uZX0uc3dpcGVyLWNvbnRhaW5lci1jdWJlLnN3aXBlci1jb250YWluZXItcnRsIC5zd2lwZXItc2xpZGV7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDstbXMtdHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7dHJhbnNmb3JtLW9yaWdpbjoxMDAlIDB9LnN3aXBlci1jb250YWluZXItY3ViZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSwuc3dpcGVyLWNvbnRhaW5lci1jdWJlIC5zd2lwZXItc2xpZGUtYWN0aXZlIC5zd2lwZXItc2xpZGUtYWN0aXZle3BvaW50ZXItZXZlbnRzOmF1dG99LnN3aXBlci1jb250YWluZXItY3ViZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSwuc3dpcGVyLWNvbnRhaW5lci1jdWJlIC5zd2lwZXItc2xpZGUtbmV4dCwuc3dpcGVyLWNvbnRhaW5lci1jdWJlIC5zd2lwZXItc2xpZGUtbmV4dCsuc3dpcGVyLXNsaWRlLC5zd2lwZXItY29udGFpbmVyLWN1YmUgLnN3aXBlci1zbGlkZS1wcmV2e3BvaW50ZXItZXZlbnRzOmF1dG87dmlzaWJpbGl0eTp2aXNpYmxlfS5zd2lwZXItY29udGFpbmVyLWN1YmUgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLC5zd2lwZXItY29udGFpbmVyLWN1YmUgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCwuc3dpcGVyLWNvbnRhaW5lci1jdWJlIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LC5zd2lwZXItY29udGFpbmVyLWN1YmUgLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9we3otaW5kZXg6MDstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVufS5zd2lwZXItY29udGFpbmVyLWN1YmUgLnN3aXBlci1jdWJlLXNoYWRvd3twb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7Ym90dG9tOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kOiMwMDA7b3BhY2l0eTouNjstd2Via2l0LWZpbHRlcjpibHVyKDUwcHgpO2ZpbHRlcjpibHVyKDUwcHgpO3otaW5kZXg6MH0uc3dpcGVyLWNvbnRhaW5lci1mbGlwe292ZXJmbG93OnZpc2libGV9LnN3aXBlci1jb250YWluZXItZmxpcCAuc3dpcGVyLXNsaWRle3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjt6LWluZGV4OjF9LnN3aXBlci1jb250YWluZXItZmxpcCAuc3dpcGVyLXNsaWRlIC5zd2lwZXItc2xpZGV7cG9pbnRlci1ldmVudHM6bm9uZX0uc3dpcGVyLWNvbnRhaW5lci1mbGlwIC5zd2lwZXItc2xpZGUtYWN0aXZlLC5zd2lwZXItY29udGFpbmVyLWZsaXAgLnN3aXBlci1zbGlkZS1hY3RpdmUgLnN3aXBlci1zbGlkZS1hY3RpdmV7cG9pbnRlci1ldmVudHM6YXV0b30uc3dpcGVyLWNvbnRhaW5lci1mbGlwIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwuc3dpcGVyLWNvbnRhaW5lci1mbGlwIC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQsLnN3aXBlci1jb250YWluZXItZmxpcCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwuc3dpcGVyLWNvbnRhaW5lci1mbGlwIC5zd2lwZXItc2xpZGUtc2hhZG93LXRvcHt6LWluZGV4OjA7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbn0uc3dpcGVyLWNvbnRhaW5lci1jb3ZlcmZsb3cgLnN3aXBlci13cmFwcGVyey1tcy1wZXJzcGVjdGl2ZToxMjAwcHh9IiwiQGltcG9ydCAnfnN3aXBlci9kaXN0L2Nzcy9zd2lwZXIubWluLmNzcyc7XG5cbi5pdGVtLW1vZGFse1xuICAgICYuZmFkZS5maWxsLWluLnNob3d7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoNTUsNTgsNzEsLjkpO1xuICAgIH1cbiAgICAubW9kYWwtZGlhbG9nIHtcbiAgICAgICAgd2lkdGg6IDg0NXB4O1xuICAgICAgICBtYXgtd2lkdGg6IDg0NXB4O1xuICAgICAgICBcbiAgICAgICAgLmRpYWxvZ19fb3ZlcnZpZXd7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLDAsMCwuOCk7XG4gICAgICAgICAgICBoZWlnaHQ6IDUxNnB4O1xuICAgICAgICAgICAgLmJ1eS1ub3d7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgIGJvdHRvbTogMjBweDtcbiAgICAgICAgICAgICAgICByaWdodDogMzVweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC5jbG9zZSB7XG4gICAgICAgICAgICB0b3A6IDE1cHg7XG4gICAgICAgICAgICByaWdodDogMTVweDtcbiAgICAgICAgICAgIHotaW5kZXg6IDEwMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAubW9kYWwtYm9keXtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICB9XG4gICAgLmRpYWxvZ19fZm9vdGVye1xuICAgICAgICBoZWlnaHQ6IDc1cHg7XG4gICAgfVxuICAgIC5zbGlkZXtcbiAgICAgICAgd2lkdGg6IDUxNnB4O1xuICAgICAgICBoZWlnaHQ6IDUxNnB4O1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvaW1nL2dhbGxlcnkvaXRlbS1zcXVhcmUuanBnKTtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICB9XG4gICAgLnN3aXBlci1idXR0b257XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgb3BhY2l0eTogLjg7XG4gICAgICAgIGhlaWdodDogMjJweDtcbiAgICAgICAgbWFyZ2luLXRvcDogLTVweDtcbiAgICB9XG59XG5cbjpob3N0ICA6Om5nLWRlZXAgLnN3aXBlci1wYWdpbmF0aW9ue1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIHBhZGRpbmctcmlnaHQ6IDI1cHg7XG4gICAgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBtYXJnaW4tbGVmdDogNnB4O1xuICAgICAgICAmLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmV7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4uZmlsdGVyLWNsb3Nle1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogMTJweDtcbiAgICB0b3A6IDJweDtcbiAgICBjb2xvcjogIzc4ODE5NTtcbiAgICBwYWRkaW5nOiA2cHg7XG4gICAgb3BhY2l0eTogLjQ7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCkge1xuICAgIC5nYWxsZXJ5LWl0ZW0uZmlyc3R7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgLml0ZW0tbW9kYWwgLm1vZGFsLWRpYWxvZyB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHdpZHRoOiA0MDBweDtcbiAgICAgICAgICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgIC5jb250YWluZXItZmx1aWQge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XG4gICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMzBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5kaWFsb2dfX292ZXJ2aWV3IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAtMzBweDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogLTMwcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsLWJvZHl7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA5MCU7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuaXRlbS1zbGlkZXNob3ctd3JhcHBlciB7XG4gICAgICAgICAgICBoZWlnaHQ6IDUxNXB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLml0ZW0tZGVzY3JpcHRpb24ge1xuICAgICAgICAgICAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAuYnV5LW5vdyB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHN0YXRpYyAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5zd2lwZXItY29udGFpbmVyIHtcbiAgICAgICAgICAgIC5zd2lwZXItc2xpZGUge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmRpYWxvZ19fZm9vdGVye1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA0MjBweCkge1xuICAgIC5nYWxsZXJ5e1xuICAgICAgICBtYXJnaW4tdG9wOiA4MHB4O1xuICAgIH1cbiAgICAuZ2FsbGVyeS1maWx0ZXJze1xuICAgICAgICB0b3A6IC05MHB4O1xuICAgIH1cbiAgICAuaXRlbS1tb2RhbHtcbiAgICAgICAgLm1vZGFsLWJvZHkge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA2MTBweCkge1xuICAgIC5nYWxsZXJ5LWl0ZW0sIC5nYWxsZXJ5IHtcbiAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAuaXRlbS1tb2RhbCAubW9kYWwtYm9keSAuY29udGFpbmVyLWZsdWlkID4gLnJvdyB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMzBweDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAtMzBweDtcbiAgICB9XG59IiwiQGltcG9ydCAnfnN3aXBlci9kaXN0L2Nzcy9zd2lwZXIubWluLmNzcyc7XG4uaXRlbS1tb2RhbC5mYWRlLmZpbGwtaW4uc2hvdyB7XG4gIGJhY2tncm91bmQ6IHJnYmEoNTUsIDU4LCA3MSwgMC45KTtcbn1cbi5pdGVtLW1vZGFsIC5tb2RhbC1kaWFsb2cge1xuICB3aWR0aDogODQ1cHg7XG4gIG1heC13aWR0aDogODQ1cHg7XG59XG4uaXRlbS1tb2RhbCAubW9kYWwtZGlhbG9nIC5kaWFsb2dfX292ZXJ2aWV3IHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmc6IDA7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC44KTtcbiAgaGVpZ2h0OiA1MTZweDtcbn1cbi5pdGVtLW1vZGFsIC5tb2RhbC1kaWFsb2cgLmRpYWxvZ19fb3ZlcnZpZXcgLmJ1eS1ub3cge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMjBweDtcbiAgcmlnaHQ6IDM1cHg7XG59XG4uaXRlbS1tb2RhbCAubW9kYWwtZGlhbG9nIC5jbG9zZSB7XG4gIHRvcDogMTVweDtcbiAgcmlnaHQ6IDE1cHg7XG4gIHotaW5kZXg6IDEwMDtcbn1cbi5pdGVtLW1vZGFsIC5tb2RhbC1ib2R5IHtcbiAgcGFkZGluZzogMDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cbi5pdGVtLW1vZGFsIC5kaWFsb2dfX2Zvb3RlciB7XG4gIGhlaWdodDogNzVweDtcbn1cbi5pdGVtLW1vZGFsIC5zbGlkZSB7XG4gIHdpZHRoOiA1MTZweDtcbiAgaGVpZ2h0OiA1MTZweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL2ltZy9nYWxsZXJ5L2l0ZW0tc3F1YXJlLmpwZyk7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG4uaXRlbS1tb2RhbCAuc3dpcGVyLWJ1dHRvbiB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgb3BhY2l0eTogMC44O1xuICBoZWlnaHQ6IDIycHg7XG4gIG1hcmdpbi10b3A6IC01cHg7XG59XG5cbjpob3N0IDo6bmctZGVlcCAuc3dpcGVyLXBhZ2luYXRpb24ge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgcGFkZGluZy1yaWdodDogMjVweDtcbn1cbjpob3N0IDo6bmctZGVlcCAuc3dpcGVyLXBhZ2luYXRpb24gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgd2lkdGg6IDEwcHg7XG4gIGhlaWdodDogMTBweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi1sZWZ0OiA2cHg7XG59XG46aG9zdCA6Om5nLWRlZXAgLnN3aXBlci1wYWdpbmF0aW9uIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG5cbi5maWx0ZXItY2xvc2Uge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxMnB4O1xuICB0b3A6IDJweDtcbiAgY29sb3I6ICM3ODgxOTU7XG4gIHBhZGRpbmc6IDZweDtcbiAgb3BhY2l0eTogMC40O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTIwcHgpIHtcbiAgLmdhbGxlcnktaXRlbS5maXJzdCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5pdGVtLW1vZGFsIC5tb2RhbC1kaWFsb2cge1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICB9XG4gIC5pdGVtLW1vZGFsIC5tb2RhbC1kaWFsb2cgLmNvbnRhaW5lci1mbHVpZCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBhZGRpbmctbGVmdDogMzBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xuICB9XG4gIC5pdGVtLW1vZGFsIC5tb2RhbC1kaWFsb2cgLmRpYWxvZ19fb3ZlcnZpZXcge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBtYXJnaW4tcmlnaHQ6IC0zMHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAtMzBweDtcbiAgICBib3JkZXI6IG5vbmU7XG4gIH1cbiAgLml0ZW0tbW9kYWwgLm1vZGFsLWRpYWxvZyAubW9kYWwtYm9keSB7XG4gICAgaGVpZ2h0OiA5MCU7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgfVxuXG4gIC5pdGVtLXNsaWRlc2hvdy13cmFwcGVyIHtcbiAgICBoZWlnaHQ6IDUxNXB4ICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuaXRlbS1kZXNjcmlwdGlvbiB7XG4gICAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG4gIH1cbiAgLml0ZW0tZGVzY3JpcHRpb24gLmJ1eS1ub3cge1xuICAgIHBvc2l0aW9uOiBzdGF0aWMgIWltcG9ydGFudDtcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuXG4gIC5zd2lwZXItY29udGFpbmVyIC5zd2lwZXItc2xpZGUge1xuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuZGlhbG9nX19mb290ZXIge1xuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDQyMHB4KSB7XG4gIC5nYWxsZXJ5IHtcbiAgICBtYXJnaW4tdG9wOiA4MHB4O1xuICB9XG5cbiAgLmdhbGxlcnktZmlsdGVycyB7XG4gICAgdG9wOiAtOTBweDtcbiAgfVxuXG4gIC5pdGVtLW1vZGFsIC5tb2RhbC1ib2R5IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA2MTBweCkge1xuICAuZ2FsbGVyeS1pdGVtLCAuZ2FsbGVyeSB7XG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5pdGVtLW1vZGFsIC5tb2RhbC1ib2R5IC5jb250YWluZXItZmx1aWQgPiAucm93IHtcbiAgICBtYXJnaW4tbGVmdDogLTMwcHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAtMzBweDtcbiAgfVxufSJdfQ== */");

/***/ }),

/***/ "./src/app/extra/gallery/gallery.component.ts":
/*!****************************************************!*\
  !*** ./src/app/extra/gallery/gallery.component.ts ***!
  \****************************************************/
/*! exports provided: GalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryComponent", function() { return GalleryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _gallery_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gallery.service */ "./src/app/extra/gallery/gallery.service.ts");
/* harmony import */ var ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-swiper-wrapper */ "./node_modules/ngx-swiper-wrapper/dist/ngx-swiper-wrapper.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(_service) {
        this._service = _service;
        this.feed = [];
        this.index = 0;
        this.index2 = 0;
        this._isLoading = true;
        this.galleryOptions = {
            itemSelector: '.gallery-item',
            masonry: {
                columnWidth: 280,
                gutter: 10,
                fitWidth: true
            }
        };
    }
    GalleryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getFeed().subscribe(function (feed) {
            _this.feed = feed;
            setTimeout(function () {
                _this._isLoading = false;
            }, 2000);
        });
        this.config = {
            init: false,
            observer: true,
            direction: 'vertical',
            autoplay: {
                delay: 5000
            }
        };
        this.configModal = {
            init: false,
            observer: true,
            direction: 'horizontal',
            pagination: true
        };
    };
    GalleryComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.swiperViewes.forEach(function (dir) {
                dir.init();
            });
            _this.swiperViewes.first.startAutoplay();
        }, 1);
    };
    GalleryComponent.prototype.nextSlide = function () {
        this.swiperViewes.last.nextSlide();
    };
    GalleryComponent.prototype.prevSlide = function () {
        this.swiperViewes.last.prevSlide();
    };
    GalleryComponent.prototype.toggleModal = function () {
        var _this = this;
        this._modal.show();
        setTimeout(function () {
            _this.swiperViewes.last.update();
        }, 500);
    };
    GalleryComponent.ctorParameters = function () { return [
        { type: _gallery_service__WEBPACK_IMPORTED_MODULE_2__["GalleryService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])(ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_3__["SwiperDirective"]),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], GalleryComponent.prototype, "swiperViewes", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('slider', { static: false }),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "_slider", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fadInModal', { static: true }),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "_modal", void 0);
    GalleryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-gallery',
            template: __importDefault(__webpack_require__(/*! raw-loader!./gallery.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/extra/gallery/gallery.component.html")).default,
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('enterAnimation', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('loading', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                        opacity: '0',
                        transform: 'translateY(8%)'
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('ready', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                        opacity: '1',
                        transform: 'translateY(0)'
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('loading => ready', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('300ms cubic-bezier(0.1, 0.0, 0.2, 1)'))
                ])
            ],
            styles: [__importDefault(__webpack_require__(/*! ./gallery.component.scss */ "./src/app/extra/gallery/gallery.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_gallery_service__WEBPACK_IMPORTED_MODULE_2__["GalleryService"]])
    ], GalleryComponent);
    return GalleryComponent;
}());



/***/ }),

/***/ "./src/app/extra/gallery/gallery.service.ts":
/*!**************************************************!*\
  !*** ./src/app/extra/gallery/gallery.service.ts ***!
  \**************************************************/
/*! exports provided: GalleryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryService", function() { return GalleryService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var GalleryService = /** @class */ (function () {
    function GalleryService(http) {
        this.http = http;
    }
    // Get social feed posts
    GalleryService.prototype.getFeed = function () {
        return this.http.get('assets/data/gallery.json').map(function (res) { return res.json(); });
    };
    GalleryService.ctorParameters = function () { return [
        { type: _angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"] }
    ]; };
    GalleryService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], GalleryService);
    return GalleryService;
}());



/***/ }),

/***/ "./src/app/extra/invoice/invoice.component.scss":
/*!******************************************************!*\
  !*** ./src/app/extra/invoice/invoice.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2V4dHJhL2ludm9pY2UvaW52b2ljZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/extra/invoice/invoice.component.ts":
/*!****************************************************!*\
  !*** ./src/app/extra/invoice/invoice.component.ts ***!
  \****************************************************/
/*! exports provided: InvoiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceComponent", function() { return InvoiceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var InvoiceComponent = /** @class */ (function () {
    function InvoiceComponent() {
        this.isCollapsed = false;
    }
    InvoiceComponent.prototype.ngOnInit = function () { };
    InvoiceComponent.prototype.ngAfterViewInit = function () {
        this.toggleNavbar();
    };
    InvoiceComponent.prototype.setFullScreen = function () {
        pg.setFullScreen(document.querySelector('html'));
    };
    InvoiceComponent.prototype.onResize = function () {
        this.toggleNavbar();
    };
    InvoiceComponent.prototype.toggleNavbar = function () {
        this.isCollapsed = window.innerWidth < 1025;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize', []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], InvoiceComponent.prototype, "onResize", null);
    InvoiceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-invoice',
            template: __importDefault(__webpack_require__(/*! raw-loader!./invoice.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/extra/invoice/invoice.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./invoice.component.scss */ "./src/app/extra/invoice/invoice.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], InvoiceComponent);
    return InvoiceComponent;
}());



/***/ }),

/***/ "./src/app/extra/timeline/timeline.component.scss":
/*!********************************************************!*\
  !*** ./src/app/extra/timeline/timeline.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2V4dHJhL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/extra/timeline/timeline.component.ts":
/*!******************************************************!*\
  !*** ./src/app/extra/timeline/timeline.component.ts ***!
  \******************************************************/
/*! exports provided: TimelineComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineComponent", function() { return TimelineComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ng_scrollreveal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-scrollreveal */ "./node_modules/ng-scrollreveal/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var TimelineComponent = /** @class */ (function () {
    // Config Docs
    // https://tinesoft.github.io/ng-scrollreveal/doc/injectables/NgsRevealConfig.html
    function TimelineComponent(config, route) {
        this.config = config;
        this.route = route;
        // Only for demo - Casual and Executive layout
        this.route.params.subscribe(function (params) {
            if (params['type'] === 'container') {
                config.container = document.querySelector('.page-container');
            }
            config.distance = '0';
        });
    }
    TimelineComponent.prototype.ngOnInit = function () { };
    TimelineComponent.ctorParameters = function () { return [
        { type: ng_scrollreveal__WEBPACK_IMPORTED_MODULE_2__["NgsRevealConfig"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }
    ]; };
    TimelineComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-timeline',
            template: __importDefault(__webpack_require__(/*! raw-loader!./timeline.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/extra/timeline/timeline.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./timeline.component.scss */ "./src/app/extra/timeline/timeline.component.scss")).default]
        }),
        __metadata("design:paramtypes", [ng_scrollreveal__WEBPACK_IMPORTED_MODULE_2__["NgsRevealConfig"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], TimelineComponent);
    return TimelineComponent;
}());



/***/ })

}]);
//# sourceMappingURL=extra-extra-module.js.map