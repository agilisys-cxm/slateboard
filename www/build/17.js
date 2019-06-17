webpackJsonp([17],{

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmGamePageModule", function() { return ConfirmGamePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirm_game__ = __webpack_require__(369);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ConfirmGamePageModule = /** @class */ (function () {
    function ConfirmGamePageModule() {
    }
    ConfirmGamePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__confirm_game__["a" /* ConfirmGamePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__confirm_game__["a" /* ConfirmGamePage */]),
            ],
        })
    ], ConfirmGamePageModule);
    return ConfirmGamePageModule;
}());

//# sourceMappingURL=confirm-game.module.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmGamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_game_model__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_player_model__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_data__ = __webpack_require__(123);
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
 * Generated class for the ConfirmGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConfirmGamePage = /** @class */ (function () {
    function ConfirmGamePage(navCtrl, navParams, data, toastCtrl, alertCtrl, loadingCtrl, user) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.user = user;
        this.games = [];
        this.loading = false;
    }
    ConfirmGamePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConfirmGamePage');
        /*
            if (this.user.profile.uid) {
                if (!this.loading) {
                    this.loading = true;
                    this.update();
                    this.loading = false;
                }
        
            } else {
              console.log('User not loaded')
            }
        */
    };
    ConfirmGamePage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter ConfirmGamePage');
        if (this.user.profile.uid) {
            if (!this.loading) {
                this.loading = true;
                this.update();
                this.loading = false;
            }
        }
    };
    ConfirmGamePage.prototype.update = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Updating...",
            duration: 10000
        });
        loader.present();
        this.games = [];
        this.user.confirmGames().then(function (result) {
            console.log('result', result);
            _this.loadGames(result);
            loader.dismissAll();
            _this.loading = false;
        });
    };
    ConfirmGamePage.prototype.loadGames = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            console.log('Processing', item);
            var game = new __WEBPACK_IMPORTED_MODULE_3__models_game_model__["a" /* GameModel */](item);
            var challenger = new __WEBPACK_IMPORTED_MODULE_4__models_player_model__["a" /* PlayerModel */](item);
            console.log('Player', challenger);
            game.setChallenger(challenger);
            game.venue_name = item.venue_name;
            game.leaderboard = item.leaderboard;
            if (game.winner == game.opponent) {
                game.winner_name = "You";
            }
            else {
                game.winner_name = game.challenger_player.first;
            }
            this.games.push(game);
        }
        console.log('Games', this.games);
    };
    ConfirmGamePage.prototype.doRefresh = function (refresher) {
        this.update();
        refresher.complete();
    };
    ConfirmGamePage.prototype.confirmCheck = function (game) {
        var _this = this;
        console.log('Submit()');
        var prompt = this.alertCtrl.create({
            title: "Just checking",
            message: 'Happy to confirm?',
            buttons: [
                {
                    text: 'Not sure',
                    handler: function (data) {
                        console.log('Not sure');
                    }
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.confirm(game);
                    }
                }
            ]
        });
        prompt.present();
    };
    ConfirmGamePage.prototype.confirm = function (game) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Confirming...",
            duration: 10000
        });
        loader.present();
        var response = this.user.confirmGame(game.nid).subscribe(function (resp) {
            loader.dismissAll();
            _this.update();
        });
        console.log('Confirm game response', response);
    };
    ConfirmGamePage.prototype.toast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    };
    ConfirmGamePage.prototype.removeCheck = function (game) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Removing...",
            duration: 10000
        });
        loader.present();
        var response = this.user.removeGame(game.nid).subscribe(function (resp) {
            loader.dismissAll();
            _this.update();
        });
        console.log('Game remove', response);
    };
    ConfirmGamePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-confirm-game',template:/*ion-inline-start:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/confirm-game/confirm-game.html"*/'<!--\n  Generated template for the ConfirmGamePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar [color]="isAndroid ? \'royal\' : \'primary\'">\n    <ion-title>Confirm games played</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="update()">\n        <ion-icon name="refresh"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n\n      <ion-card color="light" *ngFor="let game of games">\n\n        <ion-item>\n          <ion-avatar item-start>\n            <img [src]="game.challenger_player.thumb" alt="{{game.challenger_player.name}}">\n          </ion-avatar>\n          <h2>You played {{game.challenger_player.first}} at {{game.venue_name}}</h2>\n          <p>{{game.winner_name}} won</p>\n          <p>Not right? <a (click)="removeCheck(game)">remove</a></p>\n          <button ion-button (click)="confirmCheck(game)" item-end>Confirm</button>\n\n\n        </ion-item>\n\n        <ion-row>\n          <ion-col text-right>{{game.posted_date | date:"EEE d, MMM"}} at {{game.posted_date | date:"HH:mm"}}</ion-col>\n        </ion-row>\n\n      </ion-card>\n\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidbishop/Ionic/Slateboard/slateApp/src/pages/confirm-game/confirm-game.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* User */]])
    ], ConfirmGamePage);
    return ConfirmGamePage;
}());

//# sourceMappingURL=confirm-game.js.map

/***/ })

});
//# sourceMappingURL=17.js.map