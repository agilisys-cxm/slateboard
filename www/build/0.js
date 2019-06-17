webpackJsonp([0],{

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaderboardPageModule", function() { return LeaderboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leaderboard__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LeaderboardPageModule = /** @class */ (function () {
    function LeaderboardPageModule() {
    }
    LeaderboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__leaderboard__["a" /* LeaderboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__leaderboard__["a" /* LeaderboardPage */]),
            ],
        })
    ], LeaderboardPageModule);
    return LeaderboardPageModule;
}());

//# sourceMappingURL=leaderboard.module.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_venue_model__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_leaderboard_leaderboard__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_leaderboard_model__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_post_model__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_user__ = __webpack_require__(230);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LeaderboardPage = /** @class */ (function () {
    function LeaderboardPage(navCtrl, navParams, toastCtrl, data, loadingCtrl, user) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.data = data;
        this.loadingCtrl = loadingCtrl;
        this.user = user;
        this.games = [];
        this.loaded = false;
        this.board = "posts";
        //Grab the leaderboard
        this.venue = navParams.get('venue') || new __WEBPACK_IMPORTED_MODULE_2__models_venue_model__["a" /* VenueModel */](null);
        this.leaderboard = navParams.get('leaderboard') || new __WEBPACK_IMPORTED_MODULE_5__models_leaderboard_model__["a" /* LeaderboardModel */](null);
        //    console.log(this.leaderboard.name, this.leaderboard);
        if (!this.leaderboard.nid) {
            console.log('No leaderboard!');
            this.navCtrl.setRoot('WelcomePage', {}, {
                animate: true,
                direction: 'forward'
            });
        }
        else {
            this.provider = new __WEBPACK_IMPORTED_MODULE_3__providers_leaderboard_leaderboard__["a" /* LeaderboardProvider */](this.leaderboard, this.data);
            //Hook up the list
            this.attach();
        }
    }
    LeaderboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //Load games
        console.log('View loaded', this.loaded);
        if (this.leaderboard.nid) {
            if (this.loaded == false) {
                console.log('Loading games');
                this.loadGames().then(function (message) {
                    //Then set game players
                    _this.provider.associatePlayers();
                    _this.provider.loadCompetitorsAndMatches();
                    _this.provider.build();
                    _this.loaded = true;
                    console.log('loaded', _this.loaded);
                });
            }
        }
    };
    LeaderboardPage.prototype.ionViewWillEnter = function () {
        this.attach();
    };
    LeaderboardPage.prototype.loadGames = function () {
        console.log('loadGames()');
        return this.provider.load();
    };
    LeaderboardPage.prototype.update = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Updating...",
            duration: 10000
        });
        loader.present();
        this.provider.getTimestamp().then(function (data) {
            _this.provider.update().then(function (success) {
                if (success) {
                    _this.attach();
                }
                loader.dismissAll();
            });
        });
    };
    LeaderboardPage.prototype.attach = function () {
        this.games = null;
        this.games = this.provider.attachGames();
        console.log('Need a smarter ordering function when attaching');
        //      this.games.reverse();
        this.competitors = null;
        this.competitors = this.provider.attachCompetitors();
    };
    LeaderboardPage.prototype.doRefresh = function (refresher) {
        this.update();
    };
    LeaderboardPage.prototype.doReset = function () {
        console.log('doReset()');
        this.provider.reset();
    };
    LeaderboardPage.prototype.doPostGame = function () {
        var post = new __WEBPACK_IMPORTED_MODULE_6__models_post_model__["a" /* PostModel */](this.leaderboard);
        if (this.user.loggedIn == true) {
            if (this.user.profile.uid) {
                var playerID = this.user.profile.player;
                var challenger = post.leaderboard.membership.getPlayer(playerID);
                post.challenger = challenger;
                this.navCtrl.push('OpponentPage', {
                    post: post
                });
            }
        }
        else {
            this.navCtrl.push('ChallengerPage', {
                post: post
            });
        }
    };
    LeaderboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-leaderboard',template:/*ion-inline-start:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/leaderboard/leaderboard.html"*/'<!--\n  Generated template for the LeaderboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar [color]="isAndroid ? \'royal\' : \'primary\'" no-border-bottom>\n    <ion-title>{{leaderboard.name}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="update()">\n        <ion-icon name="refresh"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div padding>\n    <ion-segment [(ngModel)]="board">\n      <ion-segment-button value="posts">\n        Posts\n      </ion-segment-button>\n      <ion-segment-button value="leaderboard">\n        Leaderboard\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n\n  <div padding >\n    <button ion-button (click)="doReset()" block>Reset leaderboard</button>\n  </div>\n\n  <div padding  *ngIf="leaderboard.status == \'Open\'">\n    <button ion-button (click)="doPostGame()" block>Post Game</button>\n  </div>\n\n  <div [ngSwitch]="board">\n    <ion-list *ngSwitchCase="\'posts\'">\n      <ion-card color="light" *ngFor="let game of games">\n\n\n        <ion-item>\n          <ion-avatar item-start>\n            <img [src]="game.winner_image">\n          </ion-avatar>\n          <strong>{{game.winner_name}}</strong>\n          <p>has beaten {{game.loser_name}}</p>\n          <p></p>\n          <ion-icon name="trophy" item-end></ion-icon>\n        </ion-item>\n\n        <ion-row>\n            <ion-col text-right>{{game.posted_date | date:"EEE d yyyy, MMM"}} at {{game.posted_date | date:"HH:mm"}}</ion-col>\n        </ion-row>\n\n      </ion-card>\n    </ion-list>\n    <ion-list *ngSwitchCase="\'leaderboard\'">\n\n      <ion-card *ngFor="let competitor of competitors; let i = index">\n        <ion-item>\n          <ion-row>\n            <ion-col col-auto>\n              <ion-avatar>\n                <img [src]="competitor.player.thumb">\n              </ion-avatar>\n            </ion-col>\n            <ion-col>\n              <h2>{{competitor.player.first}} {{competitor.player.last}}</h2>\n              <p>Position No. {{i+1}}</p>\n            </ion-col>\n            <ion-col col-auto text-center="">\n              <h2>{{competitor.points}}</h2>\n              <p>points</p>\n            </ion-col>\n          </ion-row>\n\n\n\n        </ion-item>\n      </ion-card>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/leaderboard/leaderboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_user_user__["a" /* User */]])
    ], LeaderboardPage);
    return LeaderboardPage;
}());

//# sourceMappingURL=leaderboard.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostModel; });
var PostModel = /** @class */ (function () {
    function PostModel(leaderboard) {
        this.leaderboard = leaderboard;
    }
    return PostModel;
}());

//# sourceMappingURL=post-model.js.map

/***/ })

});
//# sourceMappingURL=0.js.map