webpackJsonp([9],{

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpponentPageModule", function() { return OpponentPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__opponent__ = __webpack_require__(379);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OpponentPageModule = /** @class */ (function () {
    function OpponentPageModule() {
    }
    OpponentPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__opponent__["a" /* OpponentPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__opponent__["a" /* OpponentPage */]),
            ],
        })
    ], OpponentPageModule);
    return OpponentPageModule;
}());

//# sourceMappingURL=opponent.module.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpponentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(230);
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
 * Generated class for the OpponentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OpponentPage = /** @class */ (function () {
    function OpponentPage(navCtrl, navParams, user) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = user;
        this.players = [];
        this.post = navParams.get('post') || null;
        this.profile = this.user.attachProfile();
        this.players = this.post.leaderboard.membership.players;
    }
    OpponentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad opponent page');
    };
    OpponentPage.prototype.ionViewWilLEnter = function () {
        console.log('ionViewWillEnter opponent page');
        this.profile = this.user.attachProfile();
        console.log('Profile', this.profile);
    };
    OpponentPage.prototype.doSelect = function (player) {
        this.post.opponent = player;
        this.navCtrl.push('ResultPage', {
            post: this.post
        });
    };
    OpponentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-opponent',template:/*ion-inline-start:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/opponent/opponent.html"*/'<!--\n  Generated template for the OpponentPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar [color]="isAndroid ? \'royal\' : \'primary\'">\n    <ion-title>Opponent</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="item-detail" padding>\n      <p><strong>Venue:</strong> {{post.leaderboard.venueModel.name}}</p>\n    <p><strong>Leaderboard:</strong> {{post.leaderboard.name}}</p>\n    <p><strong>Challenger:</strong> {{post.challenger.first}} {{post.challenger.last}}</p>\n  </div>\n  <ion-list [virtualScroll]="players">\n    <ion-item  *virtualItem="let player">\n        <ion-avatar item-start>\n          <img [src]="player.thumb" alt="{{player.name}}">\n        </ion-avatar>\n        <h2>{{player.first}} {{player.last}}</h2>\n        <button ion-button clear item-end (click)="doSelect(player)" *ngIf="post.challenger.nid != player.nid">Select</button>\n    </ion-item>\n  </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/opponent/opponent.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* User */]])
    ], OpponentPage);
    return OpponentPage;
}());

//# sourceMappingURL=opponent.js.map

/***/ })

});
//# sourceMappingURL=9.js.map