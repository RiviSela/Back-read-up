(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["email-light-email-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/email-light/compose/compose.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/email-light/compose/compose.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<pg-secondary-sidebar extraClass=\"light\">\n  <div class=\"m-b-20 m-l-30 m-r-10 d-sm-none d-md-block d-lg-block d-xl-block\">\n    <a [routerLink]=\"['../compose']\" class=\"btn btn-complete btn-block\">Compose</a>\n  </div>\n  <p class=\"menu-title\">BROWSE</p>\n  <ul class=\"main-menu\">\n    <li class=\"active\">\n      <a [routerLink]=\"['../list']\">\n        <span class=\"title\"><i class=\"pg-icon\">inbox</i> Inbox</span>\n        <span class=\"badge pull-right\">5</span>\n      </a>\n    </li>\n    <li class=\"\">\n      <a [routerLink]=\"['../list']\">\n        <span class=\"title\"><i class=\"pg-icon\">inbox_all</i> All mail</span>\n      </a>\n      <ul class=\"sub-menu no-padding\">\n        <li>\n          <a [routerLink]=\"['../list']\">\n            <span class=\"title\">Important</span>\n          </a>\n        </li>\n        <li>\n          <a [routerLink]=\"['../list']\">\n            <span class=\"title\">Labeled</span>\n          </a>\n        </li>\n      </ul>\n    </li>\n    <li>\n      <a [routerLink]=\"['../list']\">\n        <span class=\"title\"><i class=\"pg-icon\">sent</i> Sent</span>\n      </a>\n    </li>\n    <li>\n      <a [routerLink]=\"['../list']\">\n        <span class=\"title\"><i class=\"pg-icon\">spam</i> Spam</span>\n        <span class=\"badge pull-right\">10</span>\n      </a>\n    </li>\n  </ul>\n  <p class=\"menu-title m-t-20 all-caps\">Quick view</p>\n  <ul class=\"sub-menu no-padding\">\n    <li>\n      <a href=\"javascript:void(0)\">\n        <span class=\"title\">Documents</span>\n      </a>\n    </li>\n    <li>\n      <a href=\"javascript:void(0)\">\n        <span class=\"title\">Flagged</span>\n        <span class=\"badge pull-right\">5</span>\n      </a>\n    </li>\n    <li>\n      <a href=\"javascript:void(0)\">\n        <span class=\"title\">Images</span>\n      </a>\n    </li>\n  </ul>\n</pg-secondary-sidebar>\n<div class=\"inner-content full-height d-md-flex justify-content-center align-items-center\">\n  <!-- START COMPOSE EMAIL -->\n  <div class=\"email-composer container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-md-12 no-padding\">\n        <div class=\"wysiwyg5-wrapper email-toolbar-wrapper\">\n        </div>\n        <div class=\"form-group-attached\">\n          <div class=\"row clearfix\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group form-group-default\">\n                <label>to:</label>\n                <pg-tag-control></pg-tag-control>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <div class=\"form-group form-group-default\">\n                <label>cc:</label>\n                <pg-tag-control placeholder=\"Add Carbon Copy\"></pg-tag-control>\n              </div>\n            </div>\n          </div>\n          <div class=\"form-group form-group-default\">\n            <label>Subject</label>\n            <input type=\"text\" class=\"form-control\" name=\"subject\">\n\t\t  </div>\n\t\t  <div class=\"email-body-wrapper\">\n\t\t\t<quill-editor [styles]=\"{height: '350px'}\" placeholder=\"Reply\" [modules]=\"editorModules\">\n\t\t\t</quill-editor>\n\t\t  </div>\n        </div>\n\n      </div>\n    </div>\n    <div class=\"row p-b-10 b-l b-r b-b b-grey p-t-15\">\n      <div class=\"col-md-11 d-md-flex d-lg-flex d-xl-flex d-block align-items-start\">\n        <div class=\"form-check d-flex m-t-5\">\n          <input id=\"sendCC\" type=\"checkbox\" value=\"1\">\n          <label class=\"d-none d-lg-block small-text\" for=\"sendCC\">Send a Carbon Copy to my Primary email\n            address.</label>\n          <label class=\"d-md-none small-text\" for=\"sendCC\">Send me a CC</label>\n        </div>\n      </div>\n      <div class=\"col-md-1\">\n        <button aria-label=\"\" class=\"btn btn-complete btn-lg pull-right btn-icon-left\"><i\n            class=\"pg-icon\">send</i>Send</button>\n      </div>\n    </div>\n  </div>\n  <!-- END COMPOSE EMAIL -->\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/email-light/list/list.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/email-light/list/list.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- START APP -->\n<pg-secondary-sidebar extraClass=\"light\">\n  <div class=\"m-b-20 m-l-30 m-r-10 d-sm-none d-md-block d-lg-block d-xl-block\">\n    <a [routerLink]=\"['../compose']\" class=\"btn btn-complete btn-block\">Compose</a>\n  </div>\n  <p class=\"menu-title\">BROWSE</p>\n  <ul class=\"main-menu\">\n    <li class=\"active\">\n      <a [routerLink]=\"['../list']\">\n        <span class=\"title\"><i class=\"pg-icon\">inbox</i> Inbox</span>\n        <span class=\"badge pull-right\">5</span>\n      </a>\n    </li>\n    <li class=\"\">\n      <a [routerLink]=\"['../list']\">\n        <span class=\"title\"><i class=\"pg-icon\">inbox_all</i> All mail</span>\n      </a>\n      <ul class=\"sub-menu no-padding\">\n        <li>\n          <a [routerLink]=\"['../list']\">\n            <span class=\"title\">Important</span>\n          </a>\n        </li>\n        <li>\n          <a [routerLink]=\"['../list']\">\n            <span class=\"title\">Labeled</span>\n          </a>\n        </li>\n      </ul>\n    </li>\n    <li>\n      <a [routerLink]=\"['../list']\">\n        <span class=\"title\"><i class=\"pg-icon\">sent</i> Sent</span>\n      </a>\n    </li>\n    <li>\n      <a [routerLink]=\"['../list']\">\n        <span class=\"title\"><i class=\"pg-icon\">spam</i> Spam</span>\n        <span class=\"badge pull-right\">10</span>\n      </a>\n    </li>\n  </ul>\n  <p class=\"menu-title m-t-20 all-caps\">Quick view</p>\n  <ul class=\"sub-menu no-padding\">\n    <li>\n      <a href=\"javascript:void(0)\">\n        <span class=\"title\">Documents</span>\n      </a>\n    </li>\n    <li>\n      <a href=\"javascript:void(0)\">\n        <span class=\"title\">Flagged</span>\n        <span class=\"badge pull-right\">5</span>\n      </a>\n    </li>\n    <li>\n      <a href=\"javascript:void(0)\">\n        <span class=\"title\">Images</span>\n      </a>\n    </li>\n  </ul>\n</pg-secondary-sidebar>\n<!-- END SECONDARY SIDEBAR MENU -->\n<div class=\"inner-content email-layout full-height\">\n  <div class=\"split-view\">\n    <!-- START SPLIT LIST VIEW -->\n    <div class=\"split-list\" [class.slideLeft]=\"isEmailSelected\">\n      <a class=\"list-refresh\" href=\"javascript:void(0)\"><i class=\"pg-icon\">refresh_alt</i></a>\n      <pg-list-view-container class=\"scrollable full-height\">\n        <pg-list-item *ngFor=\"let emailGroup of emailList\">\n          <ng-template #ItemHeading>\n            {{emailGroup.group}}\n          </ng-template>\n          <li class=\"item padding-10 p-l-15\" *ngFor=\"let item of emailGroup.list\" (click)=\"onSelect(item)\"\n            [class.active]=\"item === selectedEmail\">\n            <div class=\"thumbnail-wrapper d32 circular\"><img alt=\"\" height=\"40\" src=\"{{item.dp}}\" width=\"40\"></div>\n            <div class=\"form-check no-margin p-l-10\">\n              <input id=\"emailcheckbox-0-{{item.id}}\" type=\"checkbox\" value=\"1\"> <label\n                for=\"emailcheckbox-0-{{item.id}}\" class=\"m-l-5 no-padding\"></label>\n            </div>\n            <div class=\"inline\">\n              <p class=\"recipients no-margin\">{{item.from}}</p>\n              <div class=\"datetime\">\n                11:23am\n              </div>\n              <p class=\"subject no-margin\">{{item.subject}}</p>\n              <p class=\"body no-margin\" innerHTML=\"{{item.body}}\"></p>\n            </div>\n          </li>\n        </pg-list-item>\n      </pg-list-view-container>\n\n    </div>\n    <!-- END SPLIT LIST VIEW -->\n    <!-- START SPLIT DETAILS -->\n    <div class=\"split-details\">\n      <ng-template #noResultBlock>\n        <div class=\"no-result\">\n          <h1>No email has been selected</h1>\n        </div>\n      </ng-template>\n      <div *ngIf=\"selectedEmail; else noResultBlock\" class=\"email-content-wrapper\">\n        <div class=\"actions-wrapper menuclipper bg-master-lightest scrollable\">\n          <div class=\"actions-wrapper menuclipper bg-contrast-lowest\">\n            <button type=\"button\" class=\"btn btn-link btn-sm\">Reply</button>\n            <button type=\"button\" class=\"btn btn-link btn-sm\">Reply all</button>\n            <button type=\"button\" class=\"btn btn-link btn-sm\">Forward</button>\n            <button type=\"button\" class=\"btn btn-link btn-sm\">Delete</button>\n          </div>\n          <div class=\"clearfix\"></div>\n        </div>\n        <div class=\"email-content-header\">\n          <div class=\"subject m-b-20 semi-bold mw-80\">\n            {{selectedEmail.subject}}\n          </div>\n          <div class=\"fromto row\">\n            <div class=\"col-lg-8 d-flex align-items-center\">\n              <div class=\"thumbnail-wrapper d48 circular m-r-10\">\n                <img width=\"40\" height=\"40\" alt=\"\" src=\"{{selectedEmail.dp}}\">\n              </div>\n              <div class=\"\">\n                <div class=\"btn-group dropdown-default\" dropdown>\n                  <a class=\"btn dropdown-toggle\" dropdownToggle>{{selectedEmail.from}} </a>\n                  <div *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\">Friend</a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\">Report</a>\n                  </div>\n                </div>\n              </div>\n              <label class=\"inline\">\n                <span class=\"small-text\">\n                  <span aria-hidden=\"true\">&lt;</span>johnsmith@skyace.com\n                  <span aria-hidden=\"true\">&gt;</span>\n                </span>\n              </label>\n            </div>\n            <div class=\"col-lg-4 d-flex align-items-center text-right sm-text-left\">\n              <p class=\"datetime no-margin small-text full-width\">\n                {{selectedEmail.datetime}}\n              </p>\n            </div>\n          </div>\n        </div>\n        <div class=\"email-content\">\n          <div class=\"clearfix\"></div>\n          <div class=\"email-content-body m-t-20\" innerHTML=\"{{selectedEmail.body}}\">\n          </div>\n          <div class=\"wysiwyg5-wrapper m-t-30\">\n            <quill-editor [styles]=\"{height: '200px'}\" placeholder=\"Reply\" [modules]=\"editorModules\">\n            </quill-editor>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- END SPLIT DETAILS -->\n    <!-- START COMPOSE BUTTON FOR TABS -->\n    <div class=\"compose-wrapper d-md-none\">\n      <a class=\"compose-email text-info pull-right m-r-15 m-t-15\" [routerLink]=\"['../compose']\">\n        <i class=\"pg-icon\">edit</i>\n      </a>\n    </div>\n    <!-- END COMPOSE BUTTON -->\n  </div>\n</div>\n<!-- END APP -->\n");

/***/ }),

/***/ "./src/app/email-light/compose/compose.component.scss":
/*!************************************************************!*\
  !*** ./src/app/email-light/compose/compose.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2VtYWlsLWxpZ2h0L2NvbXBvc2UvY29tcG9zZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/email-light/compose/compose.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/email-light/compose/compose.component.ts ***!
  \**********************************************************/
/*! exports provided: ComposeComponentLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComposeComponentLight", function() { return ComposeComponentLight; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _pages_services_toggler_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../@pages/services/toggler.service */ "./src/app/@pages/services/toggler.service.ts");
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


var ComposeComponentLight = /** @class */ (function () {
    function ComposeComponentLight(toggler) {
        this.toggler = toggler;
        this.editorModules = {
            //https://github.com/KillerCodeMonkey/ngx-quill
            toolbar: [[{ header: [1, 2, 3, 4, false] }], ['bold', 'italic', 'underline'], ['link', 'image']]
        };
    }
    ComposeComponentLight.prototype.ngOnInit = function () {
        var _this = this;
        //Async Update -
        //https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
        setTimeout(function () {
            _this.toggler.toggleFooter(false);
        });
        //Set Layout Options
        this.toggler.setHeaderClass('light');
        this.toggler.setPageContainer('full-height');
        this.toggler.setContent('full-height');
    };
    ComposeComponentLight.ctorParameters = function () { return [
        { type: _pages_services_toggler_service__WEBPACK_IMPORTED_MODULE_1__["pagesToggleService"] }
    ]; };
    ComposeComponentLight = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'email-compose-light',
            template: __importDefault(__webpack_require__(/*! raw-loader!./compose.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/email-light/compose/compose.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./compose.component.scss */ "./src/app/email-light/compose/compose.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_pages_services_toggler_service__WEBPACK_IMPORTED_MODULE_1__["pagesToggleService"]])
    ], ComposeComponentLight);
    return ComposeComponentLight;
}());



/***/ }),

/***/ "./src/app/email-light/email.module.ts":
/*!*********************************************!*\
  !*** ./src/app/email-light/email.module.ts ***!
  \*********************************************/
/*! exports provided: EmailLightModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailLightModule", function() { return EmailLightModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _email_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./email.routing */ "./src/app/email-light/email.routing.ts");
/* harmony import */ var _pages_components_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../@pages/components/shared.module */ "./src/app/@pages/components/shared.module.ts");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm5/ngx-quill.js");
/* harmony import */ var _pages_components_tag_tag_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../@pages/components/tag/tag.module */ "./src/app/@pages/components/tag/tag.module.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./list/list.component */ "./src/app/email-light/list/list.component.ts");
/* harmony import */ var _compose_compose_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./compose/compose.component */ "./src/app/email-light/compose/compose.component.ts");
/* harmony import */ var _email_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./email.service */ "./src/app/email-light/email.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
//Demo Used for Simply white Layout only






//Core Pages Layout Components







var EmailLightModule = /** @class */ (function () {
    function EmailLightModule() {
    }
    EmailLightModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _pages_components_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
                ngx_quill__WEBPACK_IMPORTED_MODULE_7__["QuillModule"].forRoot(),
                _pages_components_tag_tag_module__WEBPACK_IMPORTED_MODULE_8__["pgTagModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_email_routing__WEBPACK_IMPORTED_MODULE_5__["emailRoute"]),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__["BsDropdownModule"].forRoot()
            ],
            declarations: [_list_list_component__WEBPACK_IMPORTED_MODULE_10__["EmailListComponentLight"], _compose_compose_component__WEBPACK_IMPORTED_MODULE_11__["ComposeComponentLight"]],
            providers: [_email_service__WEBPACK_IMPORTED_MODULE_12__["EmailServiceLight"]]
        })
    ], EmailLightModule);
    return EmailLightModule;
}());



/***/ }),

/***/ "./src/app/email-light/email.routing.ts":
/*!**********************************************!*\
  !*** ./src/app/email-light/email.routing.ts ***!
  \**********************************************/
/*! exports provided: emailRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailRoute", function() { return emailRoute; });
/* harmony import */ var _compose_compose_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compose/compose.component */ "./src/app/email-light/compose/compose.component.ts");
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list/list.component */ "./src/app/email-light/list/list.component.ts");
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var emailRoute = [
    {
        path: 'light',
        children: [
            {
                path: 'list',
                component: _list_list_component__WEBPACK_IMPORTED_MODULE_1__["EmailListComponentLight"],
                data: {
                    layoutOption: 'email'
                }
            },
            {
                path: 'compose',
                component: _compose_compose_component__WEBPACK_IMPORTED_MODULE_0__["ComposeComponentLight"],
                data: {
                    layoutOption: 'email'
                }
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/email-light/email.service.ts":
/*!**********************************************!*\
  !*** ./src/app/email-light/email.service.ts ***!
  \**********************************************/
/*! exports provided: EmailServiceLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailServiceLight", function() { return EmailServiceLight; });
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


var EmailServiceLight = /** @class */ (function () {
    function EmailServiceLight(http) {
        this.http = http;
    }
    // Get all emails from the API
    EmailServiceLight.prototype.getEmails = function () {
        return this.http.get('assets/data/email.json').map(function (res) { return res.json(); });
    };
    EmailServiceLight.ctorParameters = function () { return [
        { type: _angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"] }
    ]; };
    EmailServiceLight = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], EmailServiceLight);
    return EmailServiceLight;
}());



/***/ }),

/***/ "./src/app/email-light/list/list.component.scss":
/*!******************************************************!*\
  !*** ./src/app/email-light/list/list.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2VtYWlsLWxpZ2h0L2xpc3QvbGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/email-light/list/list.component.ts":
/*!****************************************************!*\
  !*** ./src/app/email-light/list/list.component.ts ***!
  \****************************************************/
/*! exports provided: EmailListComponentLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailListComponentLight", function() { return EmailListComponentLight; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _pages_services_toggler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../@pages/services/toggler.service */ "./src/app/@pages/services/toggler.service.ts");
/* harmony import */ var _email_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../email.service */ "./src/app/email-light/email.service.ts");
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




var EmailListComponentLight = /** @class */ (function () {
    function EmailListComponentLight(_service, http, toggler) {
        this._service = _service;
        this.http = http;
        this.toggler = toggler;
        this.emailList = [];
        this.editingMode = false;
        this.editorModules = {
            // https://github.com/KillerCodeMonkey/ngx-quill
            toolbar: [[{ header: [1, 2, 3, 4, false] }], ['bold', 'italic', 'underline'], ['link', 'image']]
        };
        this.isEmailSelected = false;
    }
    EmailListComponentLight.prototype.ngOnInit = function () {
        var _this = this;
        // Retrieve posts from the API
        this._service.getEmails().subscribe(function (list) {
            _this.emailList = list.emails;
        });
        // Async Update -
        // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
        setTimeout(function () {
            _this.toggler.toggleFooter(false);
        });
        // Set Layout Options
        this.toggler.setHeaderClass('light');
        this.toggler.setPageContainer('full-height');
        this.toggler.setContent('full-height');
    };
    EmailListComponentLight.prototype.onSelect = function (item) {
        this.selectedEmail = item;
        this.isEmailSelected = true;
    };
    EmailListComponentLight.prototype.onBack = function () {
        this.isEmailSelected = false;
    };
    EmailListComponentLight.ctorParameters = function () { return [
        { type: _email_service__WEBPACK_IMPORTED_MODULE_3__["EmailServiceLight"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
        { type: _pages_services_toggler_service__WEBPACK_IMPORTED_MODULE_2__["pagesToggleService"] }
    ]; };
    EmailListComponentLight = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'email-list-light',
            template: __importDefault(__webpack_require__(/*! raw-loader!./list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/email-light/list/list.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./list.component.scss */ "./src/app/email-light/list/list.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_email_service__WEBPACK_IMPORTED_MODULE_3__["EmailServiceLight"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _pages_services_toggler_service__WEBPACK_IMPORTED_MODULE_2__["pagesToggleService"]])
    ], EmailListComponentLight);
    return EmailListComponentLight;
}());



/***/ })

}]);
//# sourceMappingURL=email-light-email-module.js.map