webpackJsonp([2],{

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VenuePageModule", function() { return VenuePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__venue__ = __webpack_require__(386);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VenuePageModule = /** @class */ (function () {
    function VenuePageModule() {
    }
    VenuePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__venue__["a" /* VenuePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__venue__["a" /* VenuePage */]),
            ],
        })
    ], VenuePageModule);
    return VenuePageModule;
}());

//# sourceMappingURL=venue.module.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VenuePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_venue_venue__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_membership_membership__ = __webpack_require__(235);
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
 * Generated class for the VenuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VenuePage = /** @class */ (function () {
    function VenuePage(navCtrl, navParams, toastCtrl, data, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.data = data;
        this.loadingCtrl = loadingCtrl;
        this.loaded = false;
        this.leaderboards = [];
        this.venue = navParams.get('venue') || null;
        if (!this.venue.nid) {
            console.log('No venue!');
            this.navCtrl.setRoot('WelcomePage', {}, {
                animate: true,
                direction: 'forward'
            });
        }
        else {
            this.provider = new __WEBPACK_IMPORTED_MODULE_3__providers_venue_venue__["a" /* VenueProvider */](this.venue, this.data);
            this.membership = new __WEBPACK_IMPORTED_MODULE_4__providers_membership_membership__["a" /* MembershipProvider */](this.venue.nid, this.data);
            this.leaderboards = this.provider.attach();
        }
    }
    VenuePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad()');
        if (this.venue.nid) {
            if (this.loaded == false) {
                this.provider.load().then(function (success) {
                    _this.membership.load().then(function (success) {
                        _this.loaded = true;
                        console.log('loaded', _this.loaded);
                    });
                });
            }
        }
    };
    VenuePage.prototype.update = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Updating...",
            duration: 10000
        });
        loader.present();
        console.log('getTimestamp');
        this.provider.getTimestamp().then(function (data) {
            console.log('update Leaderboards');
            _this.provider.update().then(function (leaderboards) {
                if (leaderboards) {
                    _this.leaderboards = _this.provider.attach();
                }
                console.log('getTimestamp - players');
                _this.membership.getTimestamp().then(function (data) {
                    //getMembership
                    console.log('update Membership');
                    _this.membership.update().then(function (members) {
                        loader.dismissAll();
                    }, function (reason) {
                        console.log('error', reason);
                        loader.dismissAll();
                    });
                }, function (reason) {
                    console.log('leaderboards', reason);
                    loader.dismissAll();
                });
            });
        }, function (reason) {
            console.log('timestamp', reason);
            loader.dismissAll();
        });
    };
    VenuePage.prototype.goTo = function (leaderboard) {
        leaderboard.setMembership(this.membership.membership);
        leaderboard.setVenue(this.venue);
        this.navCtrl.push('LeaderboardPage', {
            leaderboard: leaderboard
        });
    };
    VenuePage.prototype.doRefresh = function (refresher) {
        this.update();
        refresher.complete();
    };
    VenuePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-venue',template:/*ion-inline-start:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/venue/venue.html"*/'<!--\n  Generated template for the VenuePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar [color]="isAndroid ? \'royal\' : \'primary\'">\n    <ion-title>{{venue.name}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="update()">\n        <ion-icon name="refresh"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div class="venue-profile" text-center #profilePic [style.background-image]="\'url(\' + venue.image + \')\'">\n  </div>\n\n  <div class="venue-detail" padding>\n    <h2>{{venue.name}}</h2>\n    <p>{{venue.address}}<br/>{{venue.city}}, {{venue.postcode}}</p>\n  </div>\n\n  <ion-list [virtualScroll]="leaderboards">\n    <ion-card *virtualItem="let leaderboard">\n      <ion-item (click)="goTo(leaderboard)">\n        <ion-thumbnail item-start>\n          <img [src]="leaderboard.sportModel.image" alt="{{leaderboard.sportModel.name}}">\n        </ion-thumbnail>\n        <h2>{{leaderboard.name}}</h2>\n        <p>{{leaderboard.status}}</p>\n      </ion-item>\n    </ion-card>\n  </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/venue/venue.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], VenuePage);
    return VenuePage;
}());

//# sourceMappingURL=venue.js.map

/***/ })

});
//# sourceMappingURL=2.js.map