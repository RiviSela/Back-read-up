(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~extra-extra-module~ui-ui-module"],{

/***/ "./src/app/@pages/components/slider/slider-handle.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/@pages/components/slider/slider-handle.component.ts ***!
  \*********************************************************************/
/*! exports provided: pgSliderHandleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pgSliderHandleComponent", function() { return pgSliderHandleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _slider_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slider.component */ "./src/app/@pages/components/slider/slider.component.ts");
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


var pgSliderHandleComponent = /** @class */ (function () {
    function pgSliderHandleComponent(_slider) {
        this._slider = _slider;
        this.style = {};
        this._showToolTip = false;
    }
    Object.defineProperty(pgSliderHandleComponent.prototype, "Active", {
        set: function (value) {
            // [For tooltip]
            this._showToolTip = value;
        },
        enumerable: true,
        configurable: true
    });
    pgSliderHandleComponent.prototype.ngOnChanges = function (changes) {
        if (changes.Offset) {
            this._updateStyle();
        }
        if (changes.Value) {
            this._updateTooltipTitle(); // [For tooltip]
        }
    };
    pgSliderHandleComponent.prototype._updateTooltipTitle = function () {
        // [For tooltip]
        this.tooltipTitle = this.TipFormatter ? this.TipFormatter(this.Value) : "" + this.Value;
    };
    pgSliderHandleComponent.prototype._updateStyle = function () {
        this.style[this.Vertical ? 'bottom' : 'left'] = this.Offset + "%";
    };
    pgSliderHandleComponent.ctorParameters = function () { return [
        { type: _slider_component__WEBPACK_IMPORTED_MODULE_1__["pgSliderComponent"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], pgSliderHandleComponent.prototype, "ClassName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], pgSliderHandleComponent.prototype, "Vertical", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], pgSliderHandleComponent.prototype, "Offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], pgSliderHandleComponent.prototype, "Value", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Function)
    ], pgSliderHandleComponent.prototype, "TipFormatter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderHandleComponent.prototype, "Active", null);
    pgSliderHandleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'pg-slider-handle',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            template: "\n    <div [class]=\"ClassName\" [ngStyle]=\"style\">\n      <div class=\"tooltip fade top\" [class.show]=\"_showToolTip\" style=\"top: -33px;left: -7px;\">\n        <div class=\"tooltip-inner\">\n          <span>{{ tooltipTitle }}</span>\n        </div>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [_slider_component__WEBPACK_IMPORTED_MODULE_1__["pgSliderComponent"]])
    ], pgSliderHandleComponent);
    return pgSliderHandleComponent;
}());



/***/ }),

/***/ "./src/app/@pages/components/slider/slider-marks.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/@pages/components/slider/slider-marks.component.ts ***!
  \********************************************************************/
/*! exports provided: pgSliderMarksComponent, Marks, MarksArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pgSliderMarksComponent", function() { return pgSliderMarksComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Marks", function() { return Marks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarksArray", function() { return MarksArray; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _util_convert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/convert */ "./src/app/@pages/components/util/convert.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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


var pgSliderMarksComponent = /** @class */ (function () {
    function pgSliderMarksComponent() {
        this._vertical = false;
        this._included = false;
        // Dynamic properties
        this.LowerBound = null;
        this.UpperBound = null;
    }
    Object.defineProperty(pgSliderMarksComponent.prototype, "Vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            // Required
            this._vertical = Object(_util_convert__WEBPACK_IMPORTED_MODULE_1__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderMarksComponent.prototype, "Included", {
        get: function () {
            return this._included;
        },
        set: function (value) {
            this._included = Object(_util_convert__WEBPACK_IMPORTED_MODULE_1__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    pgSliderMarksComponent.prototype.ngOnChanges = function (changes) {
        if (changes.MarksArray) {
            this.buildAttrs();
        }
        if (changes.MarksArray || changes.LowerBound || changes.UpperBound) {
            this.togglePointActive();
        }
    };
    pgSliderMarksComponent.prototype.trackById = function (index, attr) {
        return attr.id;
    };
    pgSliderMarksComponent.prototype.buildAttrs = function () {
        var _this = this;
        var range = this.Max - this.Min;
        this.attrs = this.MarksArray.map(function (mark) {
            var _a;
            var value = mark.value, offset = mark.offset, config = mark.config;
            // calc styles
            var label = config;
            var style;
            if (_this.Vertical) {
                style = {
                    marginBottom: '-50%',
                    bottom: ((value - _this.Min) / range) * 100 + "%"
                };
            }
            else {
                var marksCount = _this.MarksArray.length;
                var unit = 100 / (marksCount - 1);
                var markWidth = unit * 0.9;
                style = {
                    width: markWidth + "%",
                    marginLeft: -markWidth / 2 + "%",
                    left: ((value - _this.Min) / range) * 100 + "%"
                };
            }
            // custom configuration
            if (typeof config === 'object') {
                label = config.label;
                if (config.style) {
                    style = __assign({}, style, config.style);
                }
            }
            return {
                id: value,
                value: value,
                offset: offset,
                classes: (_a = {},
                    _a[_this.ClassName + "-text"] = true,
                    _a),
                style: style,
                label: label
            };
        }); // END - map
    };
    pgSliderMarksComponent.prototype.togglePointActive = function () {
        var _this = this;
        if (this.attrs && this.LowerBound !== null && this.UpperBound !== null) {
            this.attrs.forEach(function (attr) {
                var value = attr.value;
                var isActive = (!_this.Included && value === _this.UpperBound) || (_this.Included && value <= _this.UpperBound && value >= _this.LowerBound);
                attr.classes[_this.ClassName + "-text-active"] = isActive;
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], pgSliderMarksComponent.prototype, "LowerBound", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], pgSliderMarksComponent.prototype, "UpperBound", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", MarksArray)
    ], pgSliderMarksComponent.prototype, "MarksArray", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], pgSliderMarksComponent.prototype, "ClassName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], pgSliderMarksComponent.prototype, "Min", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], pgSliderMarksComponent.prototype, "Max", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderMarksComponent.prototype, "Vertical", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderMarksComponent.prototype, "Included", null);
    pgSliderMarksComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'pg-slider-marks',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            template: "\n    <div [class]=\"ClassName\">\n      <span *ngFor=\"let attr of attrs; trackBy: trackById\" [ngClass]=\"attr.classes\" [ngStyle]=\"attr.style\" [innerHTML]=\"attr.label\"></span>\n    </div>\n  "
        })
    ], pgSliderMarksComponent);
    return pgSliderMarksComponent;
}());

var Marks = /** @class */ (function () {
    function Marks() {
    }
    return Marks;
}());

// TODO: extends Array could cause unexpected behavior when targeting es5 or below
var MarksArray = /** @class */ (function (_super) {
    __extends(MarksArray, _super);
    function MarksArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MarksArray;
}(Array));



/***/ }),

/***/ "./src/app/@pages/components/slider/slider-step.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/@pages/components/slider/slider-step.component.ts ***!
  \*******************************************************************/
/*! exports provided: pgSliderStepComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pgSliderStepComponent", function() { return pgSliderStepComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _util_convert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/convert */ "./src/app/@pages/components/util/convert.ts");
/* harmony import */ var _slider_marks_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slider-marks.component */ "./src/app/@pages/components/slider/slider-marks.component.ts");
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



var pgSliderStepComponent = /** @class */ (function () {
    function pgSliderStepComponent() {
        this._vertical = false;
        this._included = false;
        // Dynamic properties
        this.LowerBound = null;
        this.UpperBound = null;
    }
    Object.defineProperty(pgSliderStepComponent.prototype, "Vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            // Required
            this._vertical = Object(_util_convert__WEBPACK_IMPORTED_MODULE_1__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderStepComponent.prototype, "Included", {
        get: function () {
            return this._included;
        },
        set: function (value) {
            this._included = Object(_util_convert__WEBPACK_IMPORTED_MODULE_1__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    pgSliderStepComponent.prototype.ngOnChanges = function (changes) {
        if (changes.MarksArray) {
            this.buildAttrs();
        }
        if (changes.MarksArray || changes.LowerBound || changes.UpperBound) {
            this.togglePointActive();
        }
    };
    pgSliderStepComponent.prototype.trackById = function (index, attr) {
        return attr.id;
    };
    pgSliderStepComponent.prototype.buildAttrs = function () {
        var orient = this.Vertical ? 'bottom' : 'left';
        var prefixCls = this.PrefixCls;
        this.attrs = this.MarksArray.map(function (mark) {
            var _a, _b;
            var value = mark.value, offset = mark.offset;
            return {
                id: value,
                value: value,
                offset: offset,
                style: (_a = {},
                    _a[orient] = offset + "%",
                    _a),
                classes: (_b = {},
                    _b[prefixCls + "-dot"] = true,
                    _b[prefixCls + "-dot-active"] = false,
                    _b)
            };
        });
    };
    pgSliderStepComponent.prototype.togglePointActive = function () {
        var _this = this;
        if (this.attrs && this.LowerBound !== null && this.UpperBound !== null) {
            this.attrs.forEach(function (attr) {
                var value = attr.value;
                var isActive = (!_this.Included && value === _this.UpperBound) || (_this.Included && value <= _this.UpperBound && value >= _this.LowerBound);
                attr.classes[_this.PrefixCls + "-dot-active"] = isActive;
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], pgSliderStepComponent.prototype, "LowerBound", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], pgSliderStepComponent.prototype, "UpperBound", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _slider_marks_component__WEBPACK_IMPORTED_MODULE_2__["MarksArray"])
    ], pgSliderStepComponent.prototype, "MarksArray", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], pgSliderStepComponent.prototype, "PrefixCls", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderStepComponent.prototype, "Vertical", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderStepComponent.prototype, "Included", null);
    pgSliderStepComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'pg-slider-step',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            template: "\n    <div class=\"{{ PrefixCls }}-step\">\n      <span *ngFor=\"let attr of attrs; trackBy: trackById\" [ngClass]=\"attr.classes\" [ngStyle]=\"attr.style\"></span>\n    </div>\n  "
        })
    ], pgSliderStepComponent);
    return pgSliderStepComponent;
}());



/***/ }),

/***/ "./src/app/@pages/components/slider/slider-track.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/@pages/components/slider/slider-track.component.ts ***!
  \********************************************************************/
/*! exports provided: pgSliderTrackComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pgSliderTrackComponent", function() { return pgSliderTrackComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _util_convert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/convert */ "./src/app/@pages/components/util/convert.ts");
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


var pgSliderTrackComponent = /** @class */ (function () {
    function pgSliderTrackComponent() {
        this._vertical = false;
        this._included = false;
        this.style = {};
    }
    Object.defineProperty(pgSliderTrackComponent.prototype, "Vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            // Required
            this._vertical = Object(_util_convert__WEBPACK_IMPORTED_MODULE_1__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderTrackComponent.prototype, "Included", {
        get: function () {
            return this._included;
        },
        set: function (value) {
            this._included = Object(_util_convert__WEBPACK_IMPORTED_MODULE_1__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    pgSliderTrackComponent.prototype.ngOnChanges = function (changes) {
        if (changes.Included) {
            this.style.visibility = this.Included ? 'visible' : 'hidden';
        }
        if (changes.Vertical || changes.Offset || changes.Length) {
            if (this.Vertical) {
                this.style.bottom = this.Offset + "%";
                this.style.height = this.Length + "%";
            }
            else {
                this.style.left = this.Offset + "%";
                this.style.width = this.Length + "%";
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], pgSliderTrackComponent.prototype, "Offset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], pgSliderTrackComponent.prototype, "Length", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], pgSliderTrackComponent.prototype, "ClassName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderTrackComponent.prototype, "Vertical", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderTrackComponent.prototype, "Included", null);
    pgSliderTrackComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'pg-slider-track',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            template: "\n    <div [class]=\"ClassName\" [ngStyle]=\"style\"></div>\n  "
        })
    ], pgSliderTrackComponent);
    return pgSliderTrackComponent;
}());



/***/ }),

/***/ "./src/app/@pages/components/slider/slider.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/@pages/components/slider/slider.component.ts ***!
  \**************************************************************/
/*! exports provided: SliderHandle, pgSliderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderHandle", function() { return SliderHandle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pgSliderComponent", function() { return pgSliderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _util_convert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/convert */ "./src/app/@pages/components/util/convert.ts");
/* harmony import */ var _slider_marks_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./slider-marks.component */ "./src/app/@pages/components/slider/slider-marks.component.ts");
/* harmony import */ var _slider_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./slider.service */ "./src/app/@pages/components/slider/slider.service.ts");
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
/*
 * Author : NG-ZORRO - ANT UI
 * Github : https://github.com/NG-ZORRO/ng-zorro-antd
 * Copyright Reserved : MIT LICENSE
 * Modified : Ace Revox
 */







var SliderHandle = /** @class */ (function () {
    function SliderHandle() {
    }
    return SliderHandle;
}());

var pgSliderComponent = /** @class */ (function () {
    // |--------------------------------------------------------------------------------------------
    // | Lifecycle hooks
    // |--------------------------------------------------------------------------------------------
    function pgSliderComponent(utils) {
        this.utils = utils;
        this._color = '';
        // Debugging
        this.DebugId = null; // set this id will print debug informations to console
        // Static configurations (properties that can only specify once)
        this.Step = 1;
        this.Marks = null;
        this.Min = 0;
        this.Max = 100;
        this.DefaultValue = null;
        this.Tooltip = false;
        this.OnAfterChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Inside properties
        this._disabled = false;
        this._dots = false;
        this._included = true;
        this._range = false;
        this._vertical = false;
        this.value = null; // CORE value state
        this.cacheSliderStart = null;
        this.cacheSliderLength = null;
        this.prefixCls = 'pg-slider';
        this.activeValueIndex = null; // Current activated handle's index ONLY for range=true
        this.track = { offset: null, length: null }; // Track's offset and length
        this.bounds = { lower: null, upper: null }; // now for pg-slider-step
        this.isDragging = false; // Current dragging state
    }
    pgSliderComponent_1 = pgSliderComponent;
    Object.defineProperty(pgSliderComponent.prototype, "Disabled", {
        get: function () {
            return this._disabled;
        },
        // Dynamic property settings
        set: function (value) {
            this._disabled = Object(_util_convert__WEBPACK_IMPORTED_MODULE_4__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "Vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = Object(_util_convert__WEBPACK_IMPORTED_MODULE_4__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "TooltipForceVisiblity", {
        set: function (value) {
            this._toolTipForce = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "Range", {
        get: function () {
            return this._range;
        },
        set: function (value) {
            this._range = Object(_util_convert__WEBPACK_IMPORTED_MODULE_4__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "Dots", {
        get: function () {
            return this._dots;
        },
        set: function (value) {
            this._dots = Object(_util_convert__WEBPACK_IMPORTED_MODULE_4__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "Included", {
        get: function () {
            return this._included;
        },
        set: function (value) {
            this._included = Object(_util_convert__WEBPACK_IMPORTED_MODULE_4__["toBoolean"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderComponent.prototype, "Color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    // |--------------------------------------------------------------------------------------------
    // | value accessors & ngModel accessors
    // |--------------------------------------------------------------------------------------------
    pgSliderComponent.prototype.setValue = function (val, isWriteValue) {
        if (isWriteValue === void 0) { isWriteValue = false; }
        if (isWriteValue) {
            this.value = this.formatValue(val);
            this.log("[ngModel:setValue/writeValue]Update track & handles");
            this.updateTrackAndHandles();
        }
        else {
            // [Normal]: setting value, ONLY check changed, then update and trigger onValueChange
            if (!this.isValueEqual(this.value, val)) {
                this.value = val;
                this.log("[Normal:setValue]Update track & handles");
                this.updateTrackAndHandles();
                this.log("[Normal:setValue]onValueChange", val);
                if (this.onValueChange) {
                    // NOTE: onValueChange will be unavailable when writeValue() called at the first time
                    this.onValueChange(this.value);
                }
            }
        }
    };
    pgSliderComponent.prototype.getValue = function (cloneAndSort) {
        if (cloneAndSort === void 0) { cloneAndSort = false; }
        // TODO: using type guard, remove type cast
        if (cloneAndSort && this.Range) {
            // clone & sort range values
            return this.utils.cloneArray(this.value).sort(function (a, b) { return a - b; });
        }
        return this.value;
    };
    // clone & sort current value and convert them to offsets, then return the new one
    pgSliderComponent.prototype.getValueToOffset = function (value) {
        var _this = this;
        var normalizedValue = value;
        if (typeof normalizedValue === 'undefined') {
            normalizedValue = this.getValue(true);
        }
        // TODO: using type guard, remove type cast
        return this.Range ? normalizedValue.map(function (val) { return _this.valueToOffset(val); }) : this.valueToOffset(normalizedValue);
    };
    pgSliderComponent.prototype.writeValue = function (val) {
        if (typeof this.onValueChange !== 'function') {
            return;
        } // ignore the first initial call
        this.log("[ngModel/writeValue]current writing value = ", val);
        this.setValue(val, true);
    };
    pgSliderComponent.prototype.registerOnChange = function (fn) {
        this.onValueChange = fn;
    };
    pgSliderComponent.prototype.registerOnTouched = function (fn) { };
    pgSliderComponent.prototype.setDisabledState = function (isDisabled) {
        this.Disabled = isDisabled;
        this.toggleDragDisabled(isDisabled);
        this.setClassMap();
    };
    // initialize event binding, class init, etc. (called only once)
    pgSliderComponent.prototype.ngOnInit = function () {
        // initial checking
        this.checkValidValue(this.DefaultValue); // check DefaultValue
        // default handles
        this.handles = this._generateHandles(this.Range ? 2 : 1);
        // initialize
        this.sliderDOM = this.slider.nativeElement;
        if (this.getValue() === null) {
            this.setValue(this.formatValue(null));
        } // init with default value
        this.marksArray = this.Marks === null ? null : this.toMarksArray(this.Marks);
        // event bindings
        this.createDrag();
        // initialize drag's disabled status
        this.toggleDragDisabled(this.Disabled);
        // the first time to init classes
        this.setClassMap();
        if (this._toolTipForce) {
            this._showHandleTooltip(this.Range ? this.activeValueIndex : 0);
        }
    };
    pgSliderComponent.prototype.ngOnChanges = function (changes) {
        var Disabled = changes.Disabled, Marks = changes.Marks;
        if (Disabled && !Disabled.firstChange) {
            this.toggleDragDisabled(Disabled.currentValue);
            this.setClassMap();
        }
        else if (Marks && !Marks.firstChange) {
            this.marksArray = this.Marks ? this.toMarksArray(this.Marks) : null;
        }
    };
    pgSliderComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeDrag();
    };
    // |--------------------------------------------------------------------------------------------
    // | Basic flow functions
    // |--------------------------------------------------------------------------------------------
    pgSliderComponent.prototype.setClassMap = function () {
        var _a;
        this.classMap = (_a = {},
            _a[this.prefixCls] = true,
            _a[this._color] = true,
            _a[this.prefixCls + "-disabled"] = this.Disabled,
            _a[this.prefixCls + "-vertical"] = this.Vertical,
            _a[this.prefixCls + "-with-marks"] = this.marksArray ? this.marksArray.length : 0,
            _a);
    };
    // find the cloest value to be activated (only for range = true)
    pgSliderComponent.prototype.setActiveValueIndex = function (pointerValue) {
        if (this.Range) {
            var minimal_1 = null;
            var gap_1;
            var activeIndex_1;
            // TODO: using type guard, remove type cast
            this.getValue().forEach(function (val, index) {
                gap_1 = Math.abs(pointerValue - val);
                if (minimal_1 === null || gap_1 < minimal_1) {
                    minimal_1 = gap_1;
                    activeIndex_1 = index;
                }
            });
            this.activeValueIndex = activeIndex_1;
        }
    };
    pgSliderComponent.prototype.setActiveValue = function (pointerValue) {
        if (this.Range) {
            // TODO: using type guard, remove type cast
            var newValue = this.utils.cloneArray(this.value);
            newValue[this.activeValueIndex] = pointerValue;
            this.setValue(newValue);
        }
        else {
            this.setValue(pointerValue);
        }
    };
    pgSliderComponent.prototype.updateTrackAndHandles = function () {
        var _this = this;
        var value = this.getValue();
        var offset = this.getValueToOffset(value);
        var valueSorted = this.getValue(true);
        var offsetSorted = this.getValueToOffset(valueSorted);
        var boundParts = this.Range ? valueSorted : [0, valueSorted];
        var trackParts = this.Range ? [offsetSorted[0], offsetSorted[1] - offsetSorted[0]] : [0, offsetSorted];
        this.handles.forEach(function (handle, index) {
            handle.offset = _this.Range ? offset[index] : offset;
            handle.value = _this.Range ? value[index] : value;
        });
        this.bounds.lower = boundParts[0], this.bounds.upper = boundParts[1];
        this.track.offset = trackParts[0], this.track.length = trackParts[1];
    };
    pgSliderComponent.prototype.toMarksArray = function (marks) {
        var marksArray = [];
        for (var key in marks) {
            var mark = marks[key];
            var val = typeof key === 'number' ? key : parseFloat(key);
            if (val < this.Min || val > this.Max) {
                continue;
            }
            marksArray.push({ value: val, offset: this.valueToOffset(val), config: mark });
        }
        return marksArray;
    };
    // |--------------------------------------------------------------------------------------------
    // | Event listeners & bindings
    // |--------------------------------------------------------------------------------------------
    pgSliderComponent.prototype.onDragStart = function (value) {
        this.log('[onDragStart]dragging value = ', value);
        this.toggleDragMoving(true);
        // cache DOM layout/reflow operations
        this.cacheSliderProperty();
        // trigger drag start
        this.setActiveValueIndex(value);
        this.setActiveValue(value);
        // Tooltip visibility of handles
        if (this.Tooltip) {
            this._showHandleTooltip(this.Range ? this.activeValueIndex : 0);
        }
    };
    pgSliderComponent.prototype.onDragMove = function (value) {
        this.log('[onDragMove]dragging value = ', value);
        // trigger drag moving
        this.setActiveValue(value);
    };
    pgSliderComponent.prototype.onDragEnd = function () {
        this.log('[onDragEnd]');
        this.toggleDragMoving(false);
        this.OnAfterChange.emit(this.getValue(true));
        // remove cache DOM layout/reflow operations
        this.cacheSliderProperty(true);
        // Hide all tooltip
        this._hideAllHandleTooltip();
    };
    pgSliderComponent.prototype.createDrag = function () {
        var _this = this;
        var sliderDOM = this.sliderDOM;
        var orientField = this.Vertical ? 'pageY' : 'pageX';
        // TODO: using named interface
        var mouse = {
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup',
            pluckKey: [orientField]
        };
        var touch = {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend',
            pluckKey: ['touches', '0', orientField],
            filter: function (e) { return !_this.utils.isNotTouchEvent(e); }
        };
        // make observables
        [mouse, touch].forEach(function (source) {
            // TODO: remove any
            // TODO: filterFunc doesn't match filter in touch, should be checked
            /* tslint:disable-next-line:no-any */
            var _a = source, start = _a.start, move = _a.move, end = _a.end, pluckKey = _a.pluckKey, _b = _a.filterFunc, filterFunc = _b === void 0 ? function () { return true; } : _b;
            // start
            source.startPlucked$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(sliderDOM, start).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(filterFunc), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(_this.utils.pauseEvent), rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["pluck"].apply(void 0, pluckKey), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (position) { return _this.findClosestValue(position); }));
            // end
            source.end$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(document, end);
            // resolve move
            source.moveResolved$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(document, move).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(filterFunc), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(_this.utils.pauseEvent), rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["pluck"].apply(void 0, pluckKey), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (position) { return _this.findClosestValue(position); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(source.end$));
            // merge to become moving
            // source.move$ = source.startPlucked$.mergeMapTo(source.moveResolved$);
        });
        // merge mouse and touch observables
        this.dragstart$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(mouse.startPlucked$, touch.startPlucked$);
        // this.dragmove$ = Observable.merge(mouse.move$, touch.move$);
        this.dragmove$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(mouse.moveResolved$, touch.moveResolved$);
        this.dragend$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(mouse.end$, touch.end$);
    };
    pgSliderComponent.prototype.subscribeDrag = function (periods) {
        if (periods === void 0) { periods = ['start', 'move', 'end']; }
        this.log('[subscribeDrag]this.dragstart$ = ', this.dragstart$);
        if (periods.indexOf('start') !== -1 && this.dragstart$ && !this.dragstart_) {
            this.dragstart_ = this.dragstart$.subscribe(this.onDragStart.bind(this));
        }
        if (periods.indexOf('move') !== -1 && this.dragmove$ && !this.dragmove_) {
            this.dragmove_ = this.dragmove$.subscribe(this.onDragMove.bind(this));
        }
        if (periods.indexOf('end') !== -1 && this.dragend$ && !this.dragend_) {
            this.dragend_ = this.dragend$.subscribe(this.onDragEnd.bind(this));
        }
    };
    pgSliderComponent.prototype.unsubscribeDrag = function (periods) {
        if (periods === void 0) { periods = ['start', 'move', 'end']; }
        this.log('[unsubscribeDrag]this.dragstart_ = ', this.dragstart_);
        if (periods.indexOf('start') !== -1 && this.dragstart_) {
            this.dragstart_.unsubscribe();
            this.dragstart_ = null;
        }
        if (periods.indexOf('move') !== -1 && this.dragmove_) {
            this.dragmove_.unsubscribe();
            this.dragmove_ = null;
        }
        if (periods.indexOf('end') !== -1 && this.dragend_) {
            this.dragend_.unsubscribe();
            this.dragend_ = null;
        }
    };
    pgSliderComponent.prototype.toggleDragMoving = function (movable) {
        var periods = ['move', 'end'];
        if (movable) {
            this.isDragging = true;
            this.subscribeDrag(periods);
        }
        else {
            this.isDragging = false;
            this.unsubscribeDrag(periods);
        }
    };
    pgSliderComponent.prototype.toggleDragDisabled = function (disabled) {
        if (disabled) {
            this.unsubscribeDrag();
        }
        else {
            this.subscribeDrag(['start']);
        }
    };
    // |--------------------------------------------------------------------------------------------
    // | Util functions (tools)
    // |--------------------------------------------------------------------------------------------
    // find the closest value depend on pointer's position
    pgSliderComponent.prototype.findClosestValue = function (position) {
        var sliderStart = this.getSliderStartPosition();
        var sliderLength = this.getSliderLength();
        var ratio = this.utils.correctNumLimit((position - sliderStart) / sliderLength, 0, 1);
        var val = (this.Max - this.Min) * (this.Vertical ? 1 - ratio : ratio) + this.Min;
        var points = this.Marks === null ? [] : Object.keys(this.Marks).map(parseFloat);
        // push closest step
        if (this.Step !== null && !this.Dots) {
            var closestOne = Math.round(val / this.Step) * this.Step;
            points.push(closestOne);
        }
        // calculate gaps
        var gaps = points.map(function (point) { return Math.abs(val - point); });
        var closest = points[gaps.indexOf(Math.min.apply(Math, gaps))];
        // return the fixed
        return this.Step === null ? closest : parseFloat(closest.toFixed(this.utils.getPrecision(this.Step)));
    };
    pgSliderComponent.prototype.valueToOffset = function (value) {
        return this.utils.valueToOffset(this.Min, this.Max, value);
    };
    pgSliderComponent.prototype.getSliderStartPosition = function () {
        if (this.cacheSliderStart !== null) {
            return this.cacheSliderStart;
        }
        var offset = this.utils.getElementOffset(this.sliderDOM);
        return this.Vertical ? offset.top : offset.left;
    };
    pgSliderComponent.prototype.getSliderLength = function () {
        if (this.cacheSliderLength !== null) {
            return this.cacheSliderLength;
        }
        var sliderDOM = this.sliderDOM;
        return this.Vertical ? sliderDOM.clientHeight : sliderDOM.clientWidth;
    };
    // cache DOM layout/reflow operations for performance (may not necessary?)
    pgSliderComponent.prototype.cacheSliderProperty = function (remove) {
        if (remove === void 0) { remove = false; }
        this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
        this.cacheSliderLength = remove ? null : this.getSliderLength();
    };
    pgSliderComponent.prototype.formatValue = function (value) {
        var _this = this;
        // NOTE: will return new value
        var res = value;
        if (!this.checkValidValue(value)) {
            // if empty, use default value
            res = this.DefaultValue === null ? (this.Range ? [this.Min, this.Max] : this.Min) : this.DefaultValue;
        }
        else {
            // format
            // TODO: using type guard, remove type cast
            res = this.Range
                ? value.map(function (val) { return _this.utils.correctNumLimit(val, _this.Min, _this.Max); })
                : this.utils.correctNumLimit(value, this.Min, this.Max);
        }
        return res;
    };
    // check if value is valid and throw error if value-type/range not match
    pgSliderComponent.prototype.checkValidValue = function (value) {
        var range = this.Range;
        if (value === null || value === undefined) {
            return false;
        } // it's an invalid value, just return
        var isArray = Array.isArray(value);
        if (!Array.isArray(value)) {
            var parsedValue = value;
            if (typeof value !== 'number') {
                parsedValue = parseFloat(value);
            }
            if (isNaN(parsedValue)) {
                return false;
            } // it's an invalid value, just return
        }
        if (isArray !== !!range) {
            // value type not match
            throw new Error("The \"Range\" can't match the \"Value\"'s type, please check these properties: \"Range\", \"Value\", \"DefaultValue\".");
        }
        return true;
    };
    pgSliderComponent.prototype.isValueEqual = function (value, val) {
        if (typeof value !== typeof val) {
            return false;
        }
        if (Array.isArray(value)) {
            var len = value.length;
            for (var i = 0; i < len; i++) {
                if (value[i] !== val[i]) {
                    return false;
                }
            }
            return true;
        }
        else {
            return value === val;
        }
    };
    // print debug info
    // TODO: should not kept in component
    /* tslint:disable-next-line:no-any */
    pgSliderComponent.prototype.log = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (this.DebugId !== null) {
            var args = ["[pg-slider][#" + this.DebugId + "] "].concat(Array.prototype.slice.call(arguments));
            console.log.apply(null, args);
        }
    };
    // Show one handle's tooltip and hide others'
    pgSliderComponent.prototype._showHandleTooltip = function (handleIndex) {
        var _this = this;
        if (handleIndex === void 0) { handleIndex = 0; }
        this.handles.forEach(function (handle, index) {
            _this.handles[index].active = index === handleIndex;
        });
    };
    pgSliderComponent.prototype._hideAllHandleTooltip = function () {
        if (!this._showHandleTooltip) {
            this.handles.forEach(function (handle) { return (handle.active = false); });
        }
    };
    pgSliderComponent.prototype._generateHandles = function (amount) {
        var handles = [];
        for (var i = 0; i < amount; i++) {
            handles.push({ offset: null, value: null, active: false });
        }
        return handles;
    };
    var pgSliderComponent_1;
    pgSliderComponent.ctorParameters = function () { return [
        { type: _slider_service__WEBPACK_IMPORTED_MODULE_6__["SliderService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "DebugId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "Disabled", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "Step", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _slider_marks_component__WEBPACK_IMPORTED_MODULE_5__["Marks"])
    ], pgSliderComponent.prototype, "Marks", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "Min", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "Max", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "DefaultValue", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], pgSliderComponent.prototype, "Tooltip", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Function)
    ], pgSliderComponent.prototype, "TipFormatter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], pgSliderComponent.prototype, "OnAfterChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "Vertical", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "TooltipForceVisiblity", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "Range", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "Dots", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderComponent.prototype, "Included", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSliderComponent.prototype, "Color", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('slider', { static: true }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], pgSliderComponent.prototype, "slider", void 0);
    pgSliderComponent = pgSliderComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'pg-slider',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return pgSliderComponent_1; }),
                    multi: true
                }
            ],
            template: "\n    <div #slider [ngClass]=\"classMap\">\n      <div class=\"pg-slider-rail\"></div>\n      <pg-slider-track\n        ClassName=\"{{ prefixCls }}-track\"\n        [Vertical]=\"Vertical\"\n        [Included]=\"Included\"\n        [Offset]=\"track.offset\"\n        [Length]=\"track.length\"\n      ></pg-slider-track>\n      <pg-slider-step\n        *ngIf=\"marksArray\"\n        PrefixCls=\"{{ prefixCls }}\"\n        [Vertical]=\"Vertical\"\n        [LowerBound]=\"bounds.lower\"\n        [UpperBound]=\"bounds.upper\"\n        [MarksArray]=\"marksArray\"\n        [Included]=\"Included\"\n      ></pg-slider-step>\n      <pg-slider-handle\n        *ngFor=\"let handle of handles\"\n        ClassName=\"{{ prefixCls }}-handle\"\n        [Vertical]=\"Vertical\"\n        [Offset]=\"handle.offset\"\n        [Value]=\"handle.value\"\n        [Active]=\"handle.active\"\n        [TipFormatter]=\"TipFormatter\"\n      ></pg-slider-handle>\n      <pg-slider-marks\n        *ngIf=\"marksArray\"\n        ClassName=\"{{ prefixCls }}-mark\"\n        [Vertical]=\"Vertical\"\n        [Min]=\"Min\"\n        [Max]=\"Max\"\n        [LowerBound]=\"bounds.lower\"\n        [UpperBound]=\"bounds.upper\"\n        [MarksArray]=\"marksArray\"\n        [Included]=\"Included\"\n      ></pg-slider-marks>\n    </div>\n  ",
            styles: [__importDefault(__webpack_require__(/*! ./slider.scss */ "./src/app/@pages/components/slider/slider.scss")).default]
        }),
        __metadata("design:paramtypes", [_slider_service__WEBPACK_IMPORTED_MODULE_6__["SliderService"]])
    ], pgSliderComponent);
    return pgSliderComponent;
}());



/***/ }),

/***/ "./src/app/@pages/components/slider/slider.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/@pages/components/slider/slider.module.ts ***!
  \***********************************************************/
/*! exports provided: pgSliderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pgSliderModule", function() { return pgSliderModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var _slider_handle_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slider-handle.component */ "./src/app/@pages/components/slider/slider-handle.component.ts");
/* harmony import */ var _slider_marks_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slider-marks.component */ "./src/app/@pages/components/slider/slider-marks.component.ts");
/* harmony import */ var _slider_step_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./slider-step.component */ "./src/app/@pages/components/slider/slider-step.component.ts");
/* harmony import */ var _slider_track_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./slider-track.component */ "./src/app/@pages/components/slider/slider-track.component.ts");
/* harmony import */ var _slider_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./slider.component */ "./src/app/@pages/components/slider/slider.component.ts");
/* harmony import */ var _slider_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./slider.service */ "./src/app/@pages/components/slider/slider.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
/*
 * Author : NG-ZORRO - ANT UI
 * Github : https://github.com/NG-ZORRO/ng-zorro-antd
 * Copyright Reserved : MIT LICENSE
 * Modified : Ace Revox
 */









var pgSliderModule = /** @class */ (function () {
    function pgSliderModule() {
    }
    pgSliderModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            exports: [_slider_component__WEBPACK_IMPORTED_MODULE_7__["pgSliderComponent"], _slider_track_component__WEBPACK_IMPORTED_MODULE_6__["pgSliderTrackComponent"], _slider_handle_component__WEBPACK_IMPORTED_MODULE_3__["pgSliderHandleComponent"], _slider_step_component__WEBPACK_IMPORTED_MODULE_5__["pgSliderStepComponent"], _slider_marks_component__WEBPACK_IMPORTED_MODULE_4__["pgSliderMarksComponent"]],
            declarations: [_slider_component__WEBPACK_IMPORTED_MODULE_7__["pgSliderComponent"], _slider_track_component__WEBPACK_IMPORTED_MODULE_6__["pgSliderTrackComponent"], _slider_handle_component__WEBPACK_IMPORTED_MODULE_3__["pgSliderHandleComponent"], _slider_step_component__WEBPACK_IMPORTED_MODULE_5__["pgSliderStepComponent"], _slider_marks_component__WEBPACK_IMPORTED_MODULE_4__["pgSliderMarksComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["TooltipModule"]],
            providers: [_slider_service__WEBPACK_IMPORTED_MODULE_8__["SliderService"]]
        })
    ], pgSliderModule);
    return pgSliderModule;
}());



/***/ }),

/***/ "./src/app/@pages/components/slider/slider.scss":
/*!******************************************************!*\
  !*** ./src/app/@pages/components/slider/slider.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0BwYWdlcy9jb21wb25lbnRzL3NsaWRlci9zbGlkZXIuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/@pages/components/slider/slider.service.ts":
/*!************************************************************!*\
  !*** ./src/app/@pages/components/slider/slider.service.ts ***!
  \************************************************************/
/*! exports provided: SliderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderService", function() { return SliderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var SliderService = /** @class */ (function () {
    function SliderService() {
    }
    SliderService.prototype.pauseEvent = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    SliderService.prototype.getPrecision = function (num) {
        var numStr = num.toString();
        var dotIndex = numStr.indexOf('.');
        return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
    };
    SliderService.prototype.cloneArray = function (arr) {
        return arr.slice();
    };
    SliderService.prototype.isNotTouchEvent = function (e) {
        return !e.touches || e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
    };
    // convert value to offset in percent
    SliderService.prototype.valueToOffset = function (min, max, value) {
        return ((value - min) / (max - min)) * 100;
    };
    SliderService.prototype.correctNumLimit = function (num, min, max) {
        var res = +num;
        if (isNaN(res)) {
            return min;
        }
        if (num < min) {
            res = min;
        }
        else if (num > max) {
            res = max;
        }
        return res;
    };
    /**
     * get the offset of an element relative to the document (Reference from jquery's offset())
     * @param elem HTMLElement ref
     */
    SliderService.prototype.getElementOffset = function (elem) {
        // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
        // Support: IE <=11 only
        // Running getBoundingClientRect on a
        // disconnected node in IE throws an error
        if (!elem.getClientRects().length) {
            return { top: 0, left: 0 };
        }
        // Get document-relative position by adding viewport scroll to viewport-relative gBCR
        var rect = elem.getBoundingClientRect();
        var win = elem.ownerDocument.defaultView;
        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        };
    };
    SliderService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], SliderService);
    return SliderService;
}());



/***/ })

}]);
//# sourceMappingURL=default~extra-extra-module~ui-ui-module.js.map