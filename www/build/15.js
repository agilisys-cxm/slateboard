webpackJsonp([15],{

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectoryPageModule", function() { return DirectoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directory__ = __webpack_require__(371);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DirectoryPageModule = /** @class */ (function () {
    function DirectoryPageModule() {
    }
    DirectoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__directory__["a" /* DirectoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__directory__["a" /* DirectoryPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__directory__["a" /* DirectoryPage */]
            ]
        })
    ], DirectoryPageModule);
    return DirectoryPageModule;
}());

//# sourceMappingURL=directory.module.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_directory_directory__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DirectoryPage = /** @class */ (function () {
    function DirectoryPage(navCtrl, navParams, toastCtrl, data) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.data = data;
        this.venues = [];
        this.provider = new __WEBPACK_IMPORTED_MODULE_2__providers_directory_directory__["a" /* DirectoryProvider */](data);
    }
    DirectoryPage.prototype.ionViewDidLoad = function () {
        this.loadDirectory();
    };
    DirectoryPage.prototype.ionViewWillEnter = function () {
        this.venues = this.provider.attach();
    };
    DirectoryPage.prototype.loadDirectory = function () {
        //      console.log('loadDirectory()');
        this.provider.load();
        //      this.toast('Loaded from database');
    };
    DirectoryPage.prototype.update = function () {
        var _this = this;
        this.provider.dump();
        this.provider.reset();
        this.provider.update().then(function (message) {
            _this.toast(message);
            _this.venues = _this.provider.attach();
        });
    };
    DirectoryPage.prototype.goTo = function (venue) {
        this.provider.setActiveVenue(venue);
        this.navCtrl.push('VenuePage', { venue: venue });
    };
    DirectoryPage.prototype.doRefresh = function (refresher) {
        this.update();
        refresher.complete();
    };
    DirectoryPage.prototype.toast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    };
    DirectoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-directory',template:/*ion-inline-start:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/directory/directory.html"*/'<!--\n  Generated template for the DirectoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar [color]="isAndroid ? \'royal\' : \'primary\'">\n    <ion-title>{{ \'DIRECTORY_TITLE\' | translate }}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="update()">\n        <ion-icon name="refresh"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n\n  <ion-list [virtualScroll]="venues">\n    <ion-item *virtualItem="let venue" (click)="goTo(venue)">\n      <ion-thumbnail item-start>\n        <img [src]="venue.thumb" alt="{{venue.name}}">\n      </ion-thumbnail>\n      <h2>{{venue.name}}</h2>\n      <p>{{venue.address}}<br/>{{venue.city}}</p>\n      <button ion-button clear item-end>View</button>\n    </ion-item>\n  </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/directory/directory.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */]])
    ], DirectoryPage);
    return DirectoryPage;
}());

//# sourceMappingURL=directory.js.map

/***/ })

});
//# sourceMappingURL=15.js.map