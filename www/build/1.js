webpackJsonp([1],{

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomePageModule", function() { return WelcomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__welcome__ = __webpack_require__(387);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var WelcomePageModule = /** @class */ (function () {
    function WelcomePageModule() {
    }
    WelcomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */]
            ]
        })
    ], WelcomePageModule);
    return WelcomePageModule;
}());

//# sourceMappingURL=welcome.module.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_directory_directory__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, user, data, toastCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.user = user;
        this.data = data;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.provider = new __WEBPACK_IMPORTED_MODULE_3__providers_directory_directory__["a" /* DirectoryProvider */](data);
        this.profile = this.user.attachProfile();
        this.session = this.user.attachSession();
        this.venue = this.provider.attachActiveVenue();
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "loading...",
            duration: 10000
        });
        loader.present();
        this.user.loadProfile().then(function (data) {
            console.log('loadProfile', _this.user.loggedIn);
        }, function (error) {
            console.log('loadProfile', error);
        });
        this.user.loadSession().then(function (data) {
            if (data == 'success') {
                _this.session = _this.user.attachSession();
            }
        }, function (error) {
            loader.dismissAll();
            console.log('loadSession', error);
        });
        this.provider.loadActiveVenue().then(function (data) {
            if (data == 'success') {
                loader.dismissAll();
                _this.venue = _this.provider.attachActiveVenue();
            }
        }, function (error) {
            loader.dismissAll();
            console.log('loadActiveVenue', error);
        });
        this.provider.load();
    };
    WelcomePage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter welcome page');
        this.profile = this.user.attachProfile();
        this.session = this.user.attachSession();
        this.venue = null;
        this.venue = this.provider.attachActiveVenue();
    };
    WelcomePage.prototype.directory = function () {
        this.navCtrl.push('DirectoryPage');
    };
    WelcomePage.prototype.toast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    };
    WelcomePage.prototype.goTo = function (venue) {
        this.navCtrl.push('VenuePage', { venue: venue });
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/welcome/welcome.html"*/'<ion-content scroll="false">\n  <div class="splash-bg"></div>\n  <div class="splash-info">\n    <div class="splash-logo"></div>\n    <div class="splash-intro" *ngIf="!venue">\n      {{ \'WELCOME_INTRO\' | translate }}\n    </div>\n  </div>\n\n  <div *ngIf="venue">\n    <ion-list>\n      <ion-item>Active venue</ion-item>\n      <ion-item (click)="goTo(venue)">\n        <ion-thumbnail item-start>\n          <img [src]="venue.thumb" alt="{{venue.name}}">\n        </ion-thumbnail>\n        <h2>{{venue.name}}</h2>\n        <p>{{venue.address}}<br/>{{venue.city}}</p>\n        <button ion-button clear item-end>View</button>\n      </ion-item>\n    </ion-list>\n  </div>\n\n\n  <div padding>\n    <button ion-button block (click)="directory()">{{ \'FIND_VENUE\' | translate }}</button>\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/welcome/welcome.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* User */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ })

});
//# sourceMappingURL=1.js.map