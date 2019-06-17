webpackJsonp([20],{

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountPageModule", function() { return AccountPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__account__ = __webpack_require__(366);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AccountPageModule = /** @class */ (function () {
    function AccountPageModule() {
    }
    AccountPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__account__["a" /* AccountPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__account__["a" /* AccountPage */]),
            ],
        })
    ], AccountPageModule);
    return AccountPageModule;
}());

//# sourceMappingURL=account.module.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers__ = __webpack_require__(29);
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
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AccountPage = /** @class */ (function () {
    function AccountPage(navCtrl, navParams, toastCtrl, user) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.user = user;
        console.log('Constructor()', this.user);
        this.profile = this.user.attachProfile();
        this.session = this.user.attachSession();
        console.log('constructor(this.user.data.domain)', this.user.data.domain);
        this.domain = this.user.data.domain;
    }
    AccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad account page');
    };
    AccountPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter account page');
        this.profile = this.user.attachProfile();
    };
    AccountPage.prototype.login = function () {
        this.navCtrl.push('LoginPage');
    };
    AccountPage.prototype.signup = function () {
        this.navCtrl.push('SignupPage');
    };
    AccountPage.prototype.doLogout = function () {
        var _this = this;
        this.user.logout().subscribe(function (resp) {
            _this.toast('Logged out', resp);
        }, function (err) {
            // Unable to log in
            _this.toast(err);
        });
        this.profile = this.user.attachProfile();
        this.session = this.user.attachSession();
    };
    AccountPage.prototype.doChangeDomain = function () {
        console.log('doChangeDomain()');
        console.log('this.domain: ', this.domain);
        this.user.changeDomain(this.domain);
        console.log('this.user.data.domain: ', this.user.data.domain);
        this.domain = this.user.data.domain;
    };
    AccountPage.prototype.load = function () {
        var _this = this;
        this.user.loadProfile().then(function (data) {
            _this.profile = _this.user.attachProfile();
            _this.toast('load', data);
            _this.session = _this.user.attachSession();
        }, function (reason) {
            _this.toast(reason);
        });
    };
    AccountPage.prototype.save = function () {
        this.user.saveProfile();
    };
    AccountPage.prototype.dump = function () {
        this.user.dumpProfile();
        this.profile = this.user.attachProfile();
        this.session = this.user.attachSession();
    };
    AccountPage.prototype.toast = function (message, data) {
        if (data === void 0) { data = null; }
        console.log(message, data);
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    };
    AccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-account',template:/*ion-inline-start:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/account/account.html"*/'<!--\n  Generated template for the AccountPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar [color]="isAndroid ? \'royal\' : \'primary\'">\n    <ion-title>Account</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div padding>\n    <div class="item-profile" text-center #profilePic [style.background-image]="\'url(\' + \'x\' + \')\'">\n    </div>\n\n\n    <ion-list *ngIf="!profile.uid">\n      <button ion-button block (click)="signup()" *ngIf="user.loggedIn==false">Sign up</button>\n      <button ion-button block (click)="login()" class="login">Login</button>\n      <!--\n      <button ion-button (click)="load()" block>Load</button>\n      -->\n    </ion-list>\n\n    <div *ngIf="profile.uid">\n      <ion-list>\n        <ion-item>\n          <p>{{profile.name}}</p>\n        </ion-item>\n        <ion-item>\n          <p>{{profile.mail}}</p>\n        </ion-item>\n      </ion-list>\n      <ion-list>\n        <button ion-button (click)="doLogout()" block>Logout</button>\n      </ion-list>\n    </div>\n  </div>\n\n  <ion-list>\n    <ion-item>\n      <ion-select [(ngModel)]="domain" name="domain">\n        <ion-label>Domain</ion-label>\n        <ion-option value="http://slate-server:8888/" checked="true">Local</ion-option>\n        <ion-option value="http://dev-slate-server.pantheonsite.io/">Live</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <button ion-button (click)="doChangeDomain()" block>Change domain</button>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/account/account.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__providers__["h" /* User */]])
    ], AccountPage);
    return AccountPage;
}());

//# sourceMappingURL=account.js.map

/***/ })

});
//# sourceMappingURL=20.js.map