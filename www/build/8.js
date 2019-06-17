webpackJsonp([8],{

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultPageModule", function() { return ResultPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__result__ = __webpack_require__(380);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ResultPageModule = /** @class */ (function () {
    function ResultPageModule() {
    }
    ResultPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__result__["a" /* ResultPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__result__["a" /* ResultPage */]),
            ],
        })
    ], ResultPageModule);
    return ResultPageModule;
}());

//# sourceMappingURL=result.module.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultPage; });
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
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ResultPage = /** @class */ (function () {
    function ResultPage(navCtrl, navParams, user, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = user;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.post = navParams.get('post') || null;
        this.profile = this.user.attachProfile();
    }
    ResultPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad result page');
    };
    ResultPage.prototype.won = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "I beat " + this.post.opponent.first,
            message: 'Confirm your result',
            buttons: [
                {
                    text: 'Back',
                    handler: function (data) {
                        console.log('Cancelled');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.post.winner = _this.post.challenger.nid;
                        _this.submit();
                        /*
                        this.navCtrl.push('PostgamePage', {
                          post: this.post
                        });*/
                    }
                }
            ]
        });
        prompt.present();
    };
    ResultPage.prototype.lost = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "I lost to " + this.post.opponent.first,
            message: 'Confirm your result',
            buttons: [
                {
                    text: 'Back',
                    handler: function (data) {
                        console.log('Cancel lose');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.post.winner = _this.post.opponent.nid;
                        _this.submit();
                        /*
                        this.navCtrl.push('PostgamePage', {
                            post: this.post
                        });*/
                    }
                }
            ]
        });
        prompt.present();
    };
    ResultPage.prototype.submit = function () {
        var _this = this;
        console.log('Submit()');
        var loader = this.loadingCtrl.create({
            content: "Posting...",
            duration: 10000
        });
        loader.present();
        var response = this.user.postGame(this.post).subscribe(function (resp) {
            loader.dismissAll();
            console.log('Posted response:', response);
            _this.navCtrl.popTo(_this.navCtrl.getByIndex(2));
        });
    };
    ResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-result',template:/*ion-inline-start:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/result/result.html"*/'<!--\n  Generated template for the ResultPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar [color]="isAndroid ? \'royal\' : \'primary\'">\n    <ion-title>result</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="item-detail" padding>\n    <p><strong>Venue:</strong> {{post.leaderboard.venueModel.name}}</p>\n    <p><strong>Leaderboard:</strong> {{post.leaderboard.name}}</p>\n    <p><strong>Challenger:</strong> {{post.challenger.first}} {{post.challenger.last}}</p>\n    <p><strong>Opponent:</strong> {{post.opponent.first}} {{post.opponent.last}}</p>\n  </div>\n\n  <div padding>\n    <button ion-button block color="secondary" large (click)="won()">Won</button>\n  </div>\n  <div padding>\n    <button ion-button block color="danger" large (click)="lost()">Lost</button>\n  </div>\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/result/result.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* User */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], ResultPage);
    return ResultPage;
}());

//# sourceMappingURL=result.js.map

/***/ })

});
//# sourceMappingURL=8.js.map