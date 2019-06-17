webpackJsonp([18],{

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChallengerPageModule", function() { return ChallengerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__challenger__ = __webpack_require__(368);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChallengerPageModule = /** @class */ (function () {
    function ChallengerPageModule() {
    }
    ChallengerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__challenger__["a" /* ChallengerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__challenger__["a" /* ChallengerPage */]),
            ],
        })
    ], ChallengerPageModule);
    return ChallengerPageModule;
}());

//# sourceMappingURL=challenger.module.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChallengerPage; });
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
 * Generated class for the ChallengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChallengerPage = /** @class */ (function () {
    function ChallengerPage(navCtrl, navParams, user, alertCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = user;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.players = [];
        this.challenge = 'open';
        this.account = {
            username: 'username',
            password: 'password'
        };
        this.post = navParams.get('post') || null;
        this.players = this.post.leaderboard.membership.players;
        console.log('if profile loaded', this.user.profileLoaded);
        if (this.user.profileLoaded == true) {
            console.log('Use profile');
            if (this.user.profile.uid) {
                var playerID = this.user.profile.player;
                var challenger = this.post.leaderboard.membership.getPlayer(playerID);
                this.post.challenger = challenger;
                this.challenge = 'set';
                this.navCtrl.push('OpponentPage', {
                    post: this.post
                });
            }
        }
        else {
            console.log('Load profile');
            //Load user profile
            this.user.loadProfile().then(function (data) {
                if (_this.user.profile.uid) {
                    var playerID = _this.user.profile.player;
                    var challenger = _this.post.leaderboard.membership.getPlayer(playerID);
                    _this.post.challenger = challenger;
                    _this.challenge = 'set';
                    _this.navCtrl.push('OpponentPage', {
                        post: _this.post
                    });
                }
            }, function (error) {
                console.log('Opps', error);
            });
        }
    }
    ChallengerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChallengerPage');
    };
    ChallengerPage.prototype.doRegister = function () {
        this.navCtrl.push('ChallengerSignupPage', {
            post: this.post
        });
    };
    ChallengerPage.prototype.doLogin = function (player) {
        var _this = this;
        console.log('doLogin', player);
        var prompt = this.alertCtrl.create({
            title: 'Login',
            message: "Enter user password",
            inputs: [
                {
                    name: 'player',
                    placeholder: player.username
                },
                {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked', data);
                    }
                },
                {
                    text: 'Login',
                    handler: function (data) {
                        console.log('Login clicked', data);
                        _this.account.username = player.username;
                        _this.account.password = data.password;
                        console.log('Login details', _this.account);
                        _this.user.token().subscribe(function (result) {
                            console.log('doGetToken()', result);
                            _this.user.login(_this.account).subscribe(function (resp) {
                                if (_this.user.loggedIn) {
                                    var playerID = _this.user.profile.player;
                                    var challenger = _this.post.leaderboard.membership.getPlayer(playerID);
                                    _this.post.challenger = challenger;
                                    _this.navCtrl.push('OpponentPage', { post: _this.post });
                                }
                                else {
                                    _this.toast('Login failed');
                                }
                            });
                        }, function (err) {
                            _this.toast(err);
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    ChallengerPage.prototype.toast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    };
    ChallengerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-challenger',template:/*ion-inline-start:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/challenger/challenger.html"*/'<!--\n  Generated template for the ChallengerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar [color]="isAndroid ? \'royal\' : \'primary\'">\n    <ion-title>Challenger</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n<ion-content>\n  <div class="item-detail" padding>\n    <p><strong>Venue:</strong> {{post.leaderboard.venueModel.name}}</p>\n    <p><strong>Leaderboard:</strong> {{post.leaderboard.name}}</p>\n  </div>\n  <ion-list [virtualScroll]="players">\n    <ion-item>\n      <button ion-button (click)="doRegister()" block>Register</button>\n    </ion-item>\n    <ion-item *virtualItem="let player">\n      <ion-avatar item-start>\n        <img [src]="player.thumb" alt="{{player.name}}">\n      </ion-avatar>\n      <h2>{{player.first}} {{player.last}}</h2>\n      <button ion-button clear item-end (click)="doLogin(player)">Login</button>\n    </ion-item>\n  </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/challenger/challenger.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* User */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], ChallengerPage);
    return ChallengerPage;
}());

//# sourceMappingURL=challenger.js.map

/***/ })

});
//# sourceMappingURL=18.js.map