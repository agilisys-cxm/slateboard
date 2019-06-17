webpackJsonp([21],{

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataProvider = /** @class */ (function () {
    function DataProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        this.local_domain = 'http://slate-server:8888/';
        this.live_domain = 'http://dev-slate-server.pantheonsite.io/';
        this.domain = '';
        this.settings = Object(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["b" /* provideSettings */])(storage);
        this.domain = this.live_domain;
    }
    DataProvider.prototype.get = function (url) {
        var finalURL = this.domain + 'json/' + url;
        console.log('get: ' + finalURL);
        return this.http.get(finalURL).toPromise();
    };
    DataProvider.prototype.load = function (name) {
        console.log('load: ' + name);
        return this.storage.get(name);
    };
    DataProvider.prototype.save = function (name, data) {
        console.log('save: ' + name, data);
        return this.storage.set(name, data);
    };
    DataProvider.prototype.dump = function (name) {
        console.log('dump: ' + name);
        this.storage.remove(name);
    };
    DataProvider.prototype.changeDomain = function (newDomain) {
        console.log('changeDomain()');
        console.log('domain: ' + this.domain);
        console.log('new domain: ' + newDomain);
        this.domain = newDomain;
        console.log('domain: ' + this.domain);
    };
    DataProvider.prototype.saveTimestamp = function (name) {
        //        console.log('saveTimestamp:' + name);
        name = 'timestamp-' + name;
        var stamp = new Date().toISOString();
        stamp = stamp.substr(0, 16);
        this.save(name, stamp);
    };
    DataProvider.prototype.getTimestamp = function (name) {
        //        console.log('getTimestamp:' + name);
        name = 'timestamp-' + name;
        return this.load(name);
    };
    DataProvider.prototype.dumpTimestamp = function (name) {
        name = 'timestamp-' + name;
        this.dump(name);
    };
    DataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], DataProvider);
    return DataProvider;
}());

//# sourceMappingURL=data.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameModel; });
var GameModel = /** @class */ (function () {
    function GameModel(data) {
        if (data) {
            this.nid = data.nid;
            this.venue = data.venue;
            this.sport = data.sport;
            this.challenger = data.challenger;
            this.opponent = data.opponent;
            this.status = data.status;
            this.winner = data.winner;
            this.posted = data.posted;
            this.posted_date = this.posted * 1000;
        }
    }
    GameModel.prototype.serialize = function () {
        var game = [{
                nid: this.nid,
                venue: this.venue,
                sport: this.sport,
                challenger: this.challenger,
                opponent: this.opponent,
                status: this.status,
                winner: this.winner,
                posted: this.posted
            }];
        return game;
    };
    GameModel.prototype.setChallenger = function (player) {
        this.challenger_player = player;
    };
    GameModel.prototype.setOpponent = function (player) {
        this.opponent_player = player;
    };
    GameModel.prototype.setWinner = function (player) {
        this.winner_player = player;
        this.winner_image = player.thumb;
        this.winner_name = player.first + ' ' + player.last;
    };
    GameModel.prototype.setLoser = function (player) {
        this.loser_player = player;
        this.loser_image = player.thumb;
        this.loser_name = player.first + ' ' + player.last;
    };
    return GameModel;
}());

//# sourceMappingURL=game-model.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerModel; });
var PlayerModel = /** @class */ (function () {
    function PlayerModel(data) {
        this.nid = data.nid;
        this.first = data.first;
        this.last = data.last;
        this.username = data.username;
        var $pos = data.thumb.indexOf('player-profile');
        if ($pos > 1) {
            this.thumb = data.thumb;
            this.image = data.image;
        }
        else {
            this.thumb = '../../assets/img/lego-head.png';
            this.image = '../../assets/img/lego-head.png';
        }
    }
    PlayerModel.prototype.serialize = function () {
        var player = [{
                nid: this.nid,
                first: this.first,
                last: this.last,
                thumb: this.thumb,
                image: this.image,
                username: this.username
            }];
        return player;
    };
    return PlayerModel;
}());

//# sourceMappingURL=player-model.js.map

/***/ }),

/***/ 137:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 137;

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (immutable) */ __webpack_exports__["b"] = provideSettings;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_http_loader__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mocks_providers_items__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(344);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_8__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
function provideSettings(storage) {
    /**
     * The Settings provider takes a set of default settings for your app.
     *
     * You can add new settings options at any time. Once the settings are saved,
     * these values will not overwrite the saved values (this can be done manually if desired).
     */
    return new __WEBPACK_IMPORTED_MODULE_11__providers__["g" /* Settings */](storage, {
        option1: true,
        option2: 'Ionitron J. Framework',
        option3: '3',
        option4: 'Hello'
    });
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/account/account.module#AccountPageModule', name: 'AccountPage', segment: 'account', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cards/cards.module#CardsPageModule', name: 'CardsPage', segment: 'cards', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/challenger/challenger.module#ChallengerPageModule', name: 'ChallengerPage', segment: 'challenger', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/confirm-game/confirm-game.module#ConfirmGamePageModule', name: 'ConfirmGamePage', segment: 'confirm-game', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/content/content.module#ContentPageModule', name: 'ContentPage', segment: 'content', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/directory/directory.module#DirectoryPageModule', name: 'DirectoryPage', segment: 'directory', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/item-create/item-create.module#ItemCreatePageModule', name: 'ItemCreatePage', segment: 'item-create', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/item-detail/item-detail.module#ItemDetailPageModule', name: 'ItemDetailPage', segment: 'item-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leaderboard/leaderboard.module#LeaderboardPageModule', name: 'LeaderboardPage', segment: 'leaderboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/list-master/list-master.module#ListMasterPageModule', name: 'ListMasterPage', segment: 'list-master', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/opponent/opponent.module#OpponentPageModule', name: 'OpponentPage', segment: 'opponent', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/result/result.module#ResultPageModule', name: 'ResultPage', segment: 'result', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutorial/tutorial.module#TutorialPageModule', name: 'TutorialPage', segment: 'tutorial', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/venue/venue.module#VenuePageModule', name: 'VenuePage', segment: 'venue', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__providers__["a" /* Api */],
                __WEBPACK_IMPORTED_MODULE_10__mocks_providers_items__["a" /* Items */],
                __WEBPACK_IMPORTED_MODULE_11__providers__["h" /* User */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__providers__["b" /* DataProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers__["c" /* DirectoryProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers__["e" /* LeaderboardProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers__["f" /* MembershipProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers__["i" /* VenueProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_11__providers__["g" /* Settings */], useFactory: provideSettings, deps: [__WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]] },
                // Keep this to enable Ionic's runtime error handling during development
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/account/account.module": [
		345,
		20
	],
	"../pages/cards/cards.module": [
		346,
		19
	],
	"../pages/challenger/challenger.module": [
		347,
		18
	],
	"../pages/confirm-game/confirm-game.module": [
		348,
		17
	],
	"../pages/content/content.module": [
		349,
		16
	],
	"../pages/directory/directory.module": [
		350,
		15
	],
	"../pages/item-create/item-create.module": [
		351,
		14
	],
	"../pages/item-detail/item-detail.module": [
		352,
		13
	],
	"../pages/leaderboard/leaderboard.module": [
		353,
		0
	],
	"../pages/list-master/list-master.module": [
		354,
		12
	],
	"../pages/login/login.module": [
		355,
		11
	],
	"../pages/menu/menu.module": [
		356,
		10
	],
	"../pages/opponent/opponent.module": [
		357,
		9
	],
	"../pages/result/result.module": [
		358,
		8
	],
	"../pages/search/search.module": [
		359,
		7
	],
	"../pages/settings/settings.module": [
		360,
		6
	],
	"../pages/signup/signup.module": [
		361,
		5
	],
	"../pages/tabs/tabs.module": [
		362,
		4
	],
	"../pages/tutorial/tutorial.module": [
		363,
		3
	],
	"../pages/venue/venue.module": [
		364,
		2
	],
	"../pages/welcome/welcome.module": [
		365,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 188;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
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
 * Api is a generic REST Api handler. Set your API url first.
 */
var Api = /** @class */ (function () {
    function Api(http) {
        this.http = http;
        this.domain = 'http://dev-slate-server.pantheonsite.io/';
        this.service_url = 'service/';
    }
    Api.prototype.get = function (endpoint, params, reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]();
            for (var k in params) {
                reqOpts.params.set(k, params[k]);
            }
        }
        console.log('get ' + this.getURL() + endpoint, reqOpts);
        return this.http.get(this.getURL() + endpoint, reqOpts);
    };
    Api.prototype.post = function (endpoint, body, reqOpts) {
        console.log('post URL', this.getURL() + endpoint);
        console.log('post BODY', body);
        console.log('post OPTIONS', reqOpts);
        return this.http.post(this.getURL() + endpoint, body, reqOpts);
    };
    Api.prototype.put = function (endpoint, body, reqOpts) {
        return this.http.put(this.getURL() + endpoint, body, reqOpts);
    };
    Api.prototype.delete = function (endpoint, reqOpts) {
        return this.http.delete(this.getURL() + endpoint, reqOpts);
    };
    Api.prototype.patch = function (endpoint, body, reqOpts) {
        return this.http.put(this.getURL() + endpoint, body, reqOpts);
    };
    Api.prototype.getURL = function () {
        return this.domain + this.service_url;
    };
    Api = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], Api);
    return Api;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Items; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_item__ = __webpack_require__(316);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Items = /** @class */ (function () {
    function Items() {
        this.items = [];
        this.defaultItem = {
            "name": "Burt Bear",
            "profilePic": "assets/img/speakers/bear.jpg",
            "about": "Burt is a Bear.",
        };
        var items = [
            {
                "name": "Burt Bear",
                "profilePic": "assets/img/speakers/bear.jpg",
                "about": "Burt is a Bear."
            },
            {
                "name": "Charlie Cheetah",
                "profilePic": "assets/img/speakers/cheetah.jpg",
                "about": "Charlie is a Cheetah."
            },
            {
                "name": "Donald Duck",
                "profilePic": "assets/img/speakers/duck.jpg",
                "about": "Donald is a Duck."
            },
            {
                "name": "Eva Eagle",
                "profilePic": "assets/img/speakers/eagle.jpg",
                "about": "Eva is an Eagle."
            },
            {
                "name": "Ellie Elephant",
                "profilePic": "assets/img/speakers/elephant.jpg",
                "about": "Ellie is an Elephant."
            },
            {
                "name": "Molly Mouse",
                "profilePic": "assets/img/speakers/mouse.jpg",
                "about": "Molly is a Mouse."
            },
            {
                "name": "Paul Puppy",
                "profilePic": "assets/img/speakers/puppy.jpg",
                "about": "Paul is a Puppy."
            }
        ];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            this.items.push(new __WEBPACK_IMPORTED_MODULE_1__models_item__["a" /* Item */](item));
        }
    }
    Items.prototype.query = function (params) {
        if (!params) {
            return this.items;
        }
        return this.items.filter(function (item) {
            for (var key in params) {
                var field = item[key];
                if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
                    return item;
                }
                else if (field == params[key]) {
                    return item;
                }
            }
            return null;
        });
    };
    Items.prototype.add = function (item) {
        this.items.push(item);
    };
    Items.prototype.delete = function (item) {
        this.items.splice(this.items.indexOf(item), 1);
    };
    Items = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], Items);
    return Items;
}());

//# sourceMappingURL=items.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_api__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_data__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user_model__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_session_model__ = __webpack_require__(320);
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
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
var User = /** @class */ (function () {
    function User(api, data) {
        this.api = api;
        this.data = data;
        this.storageProfileName = 'profile';
        this.storageSessionName = 'session';
        this.loggedIn = false;
        this.profileLoaded = false;
        this.sessionLoaded = false;
        this.profile = new __WEBPACK_IMPORTED_MODULE_4__models_user_model__["a" /* UserModel */](null);
        this.session = new __WEBPACK_IMPORTED_MODULE_5__models_session_model__["a" /* SessionModel */](null);
    }
    /**
     * Get token
     */
    User.prototype.token = function () {
        var _this = this;
        console.log('token()');
        var seq = this.api.post('user/token.json', null).share();
        seq.subscribe(function (res) {
            console.log('token() response', res);
            _this.session = new __WEBPACK_IMPORTED_MODULE_5__models_session_model__["a" /* SessionModel */](res);
            _this.sessionLoaded = true;
            _this.saveSession();
        });
        return seq;
    };
    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    User.prototype.login = function (accountInfo) {
        var _this = this;
        var config = {
            headers: {
                'X-CSRF-Token': this.session.token
            }
        };
        var seq = this.api.post('user/login.json', accountInfo, config).share();
        seq.subscribe(function (res) {
            console.log('SUCCESS', res);
            _this.profile = new __WEBPACK_IMPORTED_MODULE_4__models_user_model__["a" /* UserModel */](res.user);
            _this.session = new __WEBPACK_IMPORTED_MODULE_5__models_session_model__["a" /* SessionModel */](res);
            _this.saveProfile();
            _this.saveSession();
            _this.loggedIn = true;
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    User.prototype.signup = function (accountInfo) {
        var seq = this.api.post('signup', accountInfo).share();
        seq.subscribe(function (res) {
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
            }
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    /**
     * Log the user out, which forgets the session
     */
    User.prototype.logout = function () {
        this.profileLoaded = false;
        this.loggedIn = false;
        var config = {
            headers: {
                'X-CSRF-Token': this.session.token
            }
        };
        var seq = this.api.post('user/logout.json', null, config).share();
        seq.subscribe(function (res) {
            console.log('SUCCESS', res);
        }, function (err) {
            console.error('ERROR', err);
        });
        this.dumpProfile();
        this.dumpSession();
        return seq;
    };
    User.prototype.saveProfile = function () {
        var saveData = this.profile.serialize();
        var newData = JSON.stringify(saveData);
        this.data.save(this.storageProfileName, newData);
    };
    User.prototype.saveSession = function () {
        var saveData = this.session.serialize();
        var newData = JSON.stringify(saveData);
        this.data.save(this.storageSessionName, newData);
    };
    User.prototype.loadProfile = function () {
        var _this = this;
        return this.data.load(this.storageProfileName).then(function (data) {
            if (data) {
                var items = JSON.parse(data);
                _this.profile = new __WEBPACK_IMPORTED_MODULE_4__models_user_model__["a" /* UserModel */](items[0]);
                _this.profileLoaded = true;
                if (_this.profile.uid) {
                    _this.loggedIn = true;
                    return 'success';
                }
                else {
                    return 'empty';
                }
            }
            return 'empty';
        }, function (reason) {
            console.error('error: ', reason);
            return reason;
        });
    };
    User.prototype.loadSession = function () {
        var _this = this;
        return this.data.load(this.storageSessionName).then(function (data) {
            if (data) {
                var items = JSON.parse(data);
                _this.session = new __WEBPACK_IMPORTED_MODULE_5__models_session_model__["a" /* SessionModel */](items[0]);
                _this.sessionLoaded = true;
                return 'success';
            }
            return 'empty';
        }, function (reason) {
            console.error('error: ', reason);
            return reason;
        });
    };
    User.prototype.dumpProfile = function () {
        this.data.dump(this.storageProfileName);
        this.profile = new __WEBPACK_IMPORTED_MODULE_4__models_user_model__["a" /* UserModel */](null);
        this.profileLoaded = false;
    };
    User.prototype.dumpSession = function () {
        this.data.dump(this.storageSessionName);
        this.session = new __WEBPACK_IMPORTED_MODULE_5__models_session_model__["a" /* SessionModel */](null);
        this.sessionLoaded = false;
    };
    User.prototype.attachProfile = function () {
        return this.profile;
    };
    User.prototype.attachSession = function () {
        return this.session;
    };
    User.prototype.postGame = function (post) {
        console.log('venue', post.leaderboard.venue);
        console.log('Leaderboard', post.leaderboard.nid);
        console.log('challenger', post.challenger.nid);
        console.log('opponent', post.opponent.nid);
        console.log('winner', post.winner);
        console.log('Token', this.session.token);
        var data = {
            game: {
                'leaderboard': post.leaderboard.nid,
                'challenger': post.challenger.nid,
                'opponent': post.opponent.nid,
                'winner': post.winner,
                'venue': post.leaderboard.venue,
                'sport': post.leaderboard.sport
            }
        };
        var config = {
            headers: {
                'X-CSRF-Token': this.session.token
            }
        };
        var seq = this.api.post('game', data, config).share();
        seq.subscribe(function (res) {
            console.log('SUCCESS', res);
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    User.prototype.confirmGames = function () {
        var url = this.profile.uid + '/confirm-games';
        return this.data.get(url).then(function (result) {
            console.log('Received', result);
            return result;
        }, function (error) {
            console.log('error', error);
            return error;
        });
    };
    User.prototype.confirmGame = function (id) {
        console.log('ID', id);
        var data = {
            game: {
                'id': id
            }
        };
        var config = {
            headers: {
                'X-CSRF-Token': this.session.token
            }
        };
        var seq = this.api.post('confirm-game', data, config).share();
        seq.subscribe(function (res) {
            console.log('SUCCESS', res);
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    User.prototype.removeGame = function (id) {
        console.log('ID', id);
        var data = {
            game: {
                'id': id
            }
        };
        var config = {
            headers: {
                'X-CSRF-Token': this.session.token
            }
        };
        var seq = this.api.post('remove-game', data, config).share();
        seq.subscribe(function (res) {
            console.log('SUCCESS', res);
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    User.prototype.changeDomain = function (domain) {
        this.data.changeDomain(domain);
        this.api.domain = domain;
    };
    User = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__api_api__["a" /* Api */],
            __WEBPACK_IMPORTED_MODULE_3__data_data__["a" /* DataProvider */]])
    ], User);
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstRunPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MainPage; });
/* unused harmony export AccountPage */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Tab1Root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Tab2Root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Tab3Root; });
// The page the user lands on after opening the app and without a session
var FirstRunPage = 'TutorialPage';
// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
var MainPage = 'TabsPage';
var AccountPage = 'AccountPage';
// The initial root pages for our tabs (remove if not using tabs)
var Tab1Root = 'WelcomePage';
var Tab2Root = 'AccountPage';
var Tab3Root = 'ConfirmGamePage';
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectoryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_directory_model__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_venue_model__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DirectoryProvider = /** @class */ (function () {
    function DirectoryProvider(data) {
        this.data = data;
        this.directoryURL = 'venue-list';
        this.directory = new __WEBPACK_IMPORTED_MODULE_1__models_directory_model__["a" /* DirectoryModel */]();
        this.directoryStorageName = 'directory';
        this.activeVenueStorageName = 'active-venue';
    }
    DirectoryProvider.prototype.update = function () {
        var _this = this;
        console.log('update()');
        return this.data.get(this.directoryURL).then(function (result) {
            console.log('result: ', result);
            _this.directory.update(result);
            _this.save();
            return 'Results updated';
        }, function (reason) {
            console.log('reason: ', reason);
            return 'No result found';
        });
    };
    DirectoryProvider.prototype.attach = function () {
        return this.directory.venues;
    };
    DirectoryProvider.prototype.load = function () {
        //        console.log('load()');
        this.loadDirectory();
        this.loadActiveVenue();
    };
    DirectoryProvider.prototype.loadDirectory = function () {
        var _this = this;
        this.data.load(this.directoryStorageName).then(function (data) {
            if (data) {
                var items = JSON.parse(data);
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    var venue = new __WEBPACK_IMPORTED_MODULE_2__models_venue_model__["a" /* VenueModel */](item[0]);
                    _this.directory.addVenue(venue);
                }
            }
            return _this.directory.venues;
        });
    };
    DirectoryProvider.prototype.loadActiveVenue = function () {
        var _this = this;
        return this.data.load(this.activeVenueStorageName).then(function (data) {
            if (data) {
                var items = JSON.parse(data);
                for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                    var item = items_2[_i];
                    var venue = new __WEBPACK_IMPORTED_MODULE_2__models_venue_model__["a" /* VenueModel */](item[0]);
                    _this.directory.setActiveVenue(venue);
                }
                return 'success';
            }
            else {
                return 'empty';
            }
        }, function (reason) {
            console.log('error', reason);
            return 'empty';
        });
    };
    DirectoryProvider.prototype.save = function () {
        console.log('save()');
        this.saveDirectory();
        this.saveActiveVenue();
    };
    DirectoryProvider.prototype.saveDirectory = function () {
        console.log('saveDirectory()');
        var saveData = [];
        for (var _i = 0, _a = this.directory.venues; _i < _a.length; _i++) {
            var venue = _a[_i];
            saveData.push(venue.serialize());
        }
        var newData = JSON.stringify(saveData);
        return this.data.save(this.directoryStorageName, newData);
    };
    DirectoryProvider.prototype.saveActiveVenue = function () {
        if (this.directory.activeVenue) {
            var saveData = [];
            saveData.push(this.directory.activeVenue.serialize());
            var newData = JSON.stringify(saveData);
            this.data.save(this.activeVenueStorageName, newData);
        }
    };
    DirectoryProvider.prototype.reset = function () {
        this.directory = new __WEBPACK_IMPORTED_MODULE_1__models_directory_model__["a" /* DirectoryModel */]();
    };
    DirectoryProvider.prototype.dump = function () {
        this.data.dump(this.directoryStorageName);
    };
    DirectoryProvider.prototype.setActiveVenue = function (venue) {
        this.directory.setActiveVenue(venue);
        this.saveActiveVenue();
    };
    DirectoryProvider.prototype.attachActiveVenue = function () {
        return this.directory.activeVenue;
    };
    DirectoryProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3____["b" /* DataProvider */]])
    ], DirectoryProvider);
    return DirectoryProvider;
}());

//# sourceMappingURL=directory.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_leaderboard_model__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_game_model__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LeaderboardProvider = /** @class */ (function () {
    function LeaderboardProvider(leaderboard, data) {
        this.leaderboard = leaderboard;
        this.data = data;
        //http://slateboardapp.com/json/[VENUE]/[SPORT]/games
        this.leaderboardURLPostfix = '/leaderboard';
        this.gamesLoaded = false;
        this.leaderboardNID = leaderboard.nid;
        this.leaderboardURLBase = leaderboard.nid + this.leaderboardURLPostfix;
        this.leaderboardURL = this.leaderboardURLBase;
        this.leaderboardStorageName = 'leaderboard-' + leaderboard.nid;
    }
    LeaderboardProvider.prototype.getTimestamp = function () {
        //      console.log('getTimestamp()');
        var _this = this;
        return this.data.getTimestamp(this.leaderboardStorageName).then(function (data) {
            if (data) {
                _this.leaderboardTimestamp = data;
                _this.leaderboardURL = _this.leaderboardURLBase + '-update?changed=' + _this.leaderboardTimestamp;
                return data;
            }
            return null;
        }, function (reason) {
            _this.leaderboardTimestamp = null;
            return reason;
        });
    };
    LeaderboardProvider.prototype.update = function () {
        var _this = this;
        console.log('update()');
        return this.data.get(this.leaderboardURL).then(function (result) {
            if (result.length > 0) {
                _this.leaderboard.update(result);
                _this.save();
                return true;
            }
            else {
                console.log('No new updates', result);
                return false;
            }
        }, function (reason) {
            console.log('reason: ', reason);
            return false;
        });
    };
    LeaderboardProvider.prototype.attachGames = function () {
        return this.leaderboard.games;
    };
    LeaderboardProvider.prototype.attachCompetitors = function () {
        return this.leaderboard.competitors;
    };
    LeaderboardProvider.prototype.load = function () {
        var _this = this;
        console.log('load()');
        return this.data.load(this.leaderboardStorageName).then(function (data) {
            if (data) {
                var items = JSON.parse(data);
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    var game = new __WEBPACK_IMPORTED_MODULE_2__models_game_model__["a" /* GameModel */](item[0]);
                    _this.leaderboard.addGame(game);
                }
            }
            _this.gamesLoaded = true;
            //                console.log('Games',this.leaderboard.games);
            return 'Games loaded';
        }, function (reason) {
            console.log('reason: ', reason);
            return 'No result found';
        });
    };
    LeaderboardProvider.prototype.save = function () {
        console.log('save()');
        var saveData = [];
        for (var _i = 0, _a = this.leaderboard.games; _i < _a.length; _i++) {
            var game = _a[_i];
            saveData.push(game.serialize());
        }
        var newData = JSON.stringify(saveData);
        this.data.save(this.leaderboardStorageName, newData);
        this.data.saveTimestamp(this.leaderboardStorageName);
    };
    LeaderboardProvider.prototype.reset = function () {
        this.leaderboard.reset();
        this.dump();
    };
    LeaderboardProvider.prototype.dump = function () {
        this.data.dump(this.leaderboardStorageName);
        this.data.dumpTimestamp(this.leaderboardStorageName);
    };
    LeaderboardProvider.prototype.associatePlayers = function () {
        console.log('associatePlayers', this.gamesLoaded);
        this.leaderboard.associatePlayers();
    };
    LeaderboardProvider.prototype.loadCompetitorsAndMatches = function () {
        this.leaderboard.loadCompetitorsAndMatches();
    };
    LeaderboardProvider.prototype.build = function () {
        this.leaderboard.build();
    };
    LeaderboardProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__models_leaderboard_model__["a" /* LeaderboardModel */],
            __WEBPACK_IMPORTED_MODULE_3____["b" /* DataProvider */]])
    ], LeaderboardProvider);
    return LeaderboardProvider;
}());

//# sourceMappingURL=leaderboard.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MembershipProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_membership_model__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_player_model__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MembershipProvider = /** @class */ (function () {
    function MembershipProvider(venueID, data) {
        this.venueID = venueID;
        this.data = data;
        //http://slateboardapp.com/json/[VENUE]/players
        this.playersURLPostfix = '/players';
        this.membership = new __WEBPACK_IMPORTED_MODULE_1__models_membership_model__["a" /* MembershipModel */]();
        this.playersNID = venueID;
        this.playersURLBase = venueID + this.playersURLPostfix;
        this.playersURL = this.playersURLBase;
        this.playersStorageName = 'players-' + venueID;
    }
    MembershipProvider.prototype.getTimestamp = function () {
        var _this = this;
        console.log('getTimestamp()');
        return this.data.getTimestamp(this.playersStorageName).then(function (data) {
            if (data) {
                _this.playersTimestamp = data;
                _this.playersURL = _this.playersURLBase + '-update?changed=' + _this.playersTimestamp;
                return data;
            }
            return null;
        }, function (reason) {
            _this.playersTimestamp = null;
            return reason;
        });
    };
    MembershipProvider.prototype.update = function () {
        var _this = this;
        console.log('update()');
        return this.data.get(this.playersURL).then(function (result) {
            if (result.length > 0) {
                _this.membership.update(result);
                _this.save();
                return true;
            }
            else {
                console.log('No updates', result);
                return false;
            }
        }, function (reason) {
            console.log('reason: ', reason);
            return false;
        });
    };
    MembershipProvider.prototype.attach = function () {
        return this.membership.players;
    };
    MembershipProvider.prototype.load = function () {
        //        console.log('load()');
        var _this = this;
        return this.data.load(this.playersStorageName).then(function (data) {
            if (data) {
                var items = JSON.parse(data);
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    var player = new __WEBPACK_IMPORTED_MODULE_2__models_player_model__["a" /* PlayerModel */](item[0]);
                    _this.membership.addPlayer(player);
                }
            }
            return 'Players loaded';
        }, function (reason) {
            return 'Failed to load players';
        });
    };
    MembershipProvider.prototype.save = function () {
        console.log('save()');
        var saveData = [];
        for (var _i = 0, _a = this.membership.players; _i < _a.length; _i++) {
            var player = _a[_i];
            saveData.push(player.serialize());
        }
        var newData = JSON.stringify(saveData);
        this.data.save(this.playersStorageName, newData);
        this.data.saveTimestamp(this.playersStorageName);
    };
    MembershipProvider.prototype.reset = function () {
        this.membership = new __WEBPACK_IMPORTED_MODULE_1__models_membership_model__["a" /* MembershipModel */]();
        this.dump();
    };
    MembershipProvider.prototype.dump = function () {
        this.data.dump(this.playersStorageName);
    };
    MembershipProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [Number, __WEBPACK_IMPORTED_MODULE_3____["b" /* DataProvider */]])
    ], MembershipProvider);
    return MembershipProvider;
}());

//# sourceMappingURL=membership.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VenueProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_leaderboard_model__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2____ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_venue_model__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the VenueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var VenueProvider = /** @class */ (function () {
    function VenueProvider(venue, data) {
        this.venue = venue;
        this.data = data;
        //https://slateboardapp.com/json/[VENUE]/leaderboards
        this.venueURLPostfix = '/leaderboards';
        this.venueNID = venue.nid;
        this.venueURLBase = venue.nid + this.venueURLPostfix;
        this.venueURL = this.venueURLBase;
        this.venueStorageName = 'venue-' + venue.nid;
    }
    VenueProvider.prototype.getTimestamp = function () {
        var _this = this;
        console.log('getTimestamp()');
        return this.data.getTimestamp(this.venueStorageName).then(function (data) {
            if (data) {
                _this.venueTimestamp = data;
                _this.venueURL = _this.venueURLBase + '-update?changed=' + _this.venueTimestamp;
                return data;
            }
            return null;
        }, function (reason) {
            _this.venueTimestamp = null;
            return reason;
        });
    };
    VenueProvider.prototype.update = function () {
        var _this = this;
        console.log('update()');
        return this.data.get(this.venueURL).then(function (result) {
            if (result.length > 0) {
                _this.venue.update(result);
                _this.save();
                return true;
            }
            else {
                console.log('No updates', result);
                return false;
            }
        }, function (reason) {
            console.log('reason: ', reason);
            return false;
        });
    };
    VenueProvider.prototype.attach = function () {
        return this.venue.leaderboards;
    };
    VenueProvider.prototype.load = function () {
        //        console.log('load()');
        var _this = this;
        return this.data.load(this.venueStorageName).then(function (data) {
            if (data) {
                var items = JSON.parse(data);
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    var leaderboard = new __WEBPACK_IMPORTED_MODULE_1__models_leaderboard_model__["a" /* LeaderboardModel */](item[0]);
                    _this.venue.addLeaderboard(leaderboard);
                }
            }
            //                console.log('Leaderboards',this.venue.leaderboards);
            return 'Leaderboards loaded';
        }, function (reason) {
            console.log('reason: ', reason);
            return 'No leaderboards found';
        });
    };
    VenueProvider.prototype.save = function () {
        console.log('save()');
        var saveData = [];
        for (var _i = 0, _a = this.venue.leaderboards; _i < _a.length; _i++) {
            var leaderboard = _a[_i];
            saveData.push(leaderboard.serialize());
        }
        var newData = JSON.stringify(saveData);
        this.data.save(this.venueStorageName, newData);
        this.data.saveTimestamp(this.venueStorageName);
    };
    VenueProvider.prototype.reset = function () {
        this.venue = new __WEBPACK_IMPORTED_MODULE_3__models_venue_model__["a" /* VenueModel */](null);
        this.dump();
    };
    VenueProvider.prototype.dump = function () {
        this.data.dump(this.venueStorageName);
    };
    VenueProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__models_venue_model__["a" /* VenueModel */],
            __WEBPACK_IMPORTED_MODULE_2____["b" /* DataProvider */]])
    ], VenueProvider);
    return VenueProvider;
}());

//# sourceMappingURL=venue.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(138);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(189);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__api_api__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mocks_providers_items__ = __webpack_require__(190);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__mocks_providers_items__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_settings__ = __webpack_require__(317);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__settings_settings__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_user__ = __webpack_require__(230);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__user_user__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_data__ = __webpack_require__(123);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__data_data__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directory_directory__ = __webpack_require__(232);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__directory_directory__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__leaderboard_leaderboard__ = __webpack_require__(234);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_6__leaderboard_leaderboard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__membership_membership__ = __webpack_require__(235);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_7__membership_membership__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__venue_venue__ = __webpack_require__(236);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__venue_venue__["a"]; });









//# sourceMappingURL=index.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or an "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
var Item = /** @class */ (function () {
    function Item(fields) {
        // Quick and dirty extend/assign fields to this model
        for (var f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }
    return Item;
}());

//# sourceMappingURL=item.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(72);
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
 * A simple settings/config class for storing key/value pairs with persistence.
 */
var Settings = /** @class */ (function () {
    function Settings(storage, defaults) {
        this.storage = storage;
        this.SETTINGS_KEY = '_settings';
        this._defaults = defaults;
    }
    Settings.prototype.load = function () {
        var _this = this;
        return this.storage.get(this.SETTINGS_KEY).then(function (value) {
            if (value) {
                _this.settings = value;
                return _this._mergeDefaults(_this._defaults);
            }
            else {
                return _this.setAll(_this._defaults).then(function (val) {
                    _this.settings = val;
                });
            }
        });
    };
    Settings.prototype._mergeDefaults = function (defaults) {
        for (var k in defaults) {
            if (!(k in this.settings)) {
                this.settings[k] = defaults[k];
            }
        }
        return this.setAll(this.settings);
    };
    Settings.prototype.merge = function (settings) {
        for (var k in settings) {
            this.settings[k] = settings[k];
        }
        return this.save();
    };
    Settings.prototype.setValue = function (key, value) {
        this.settings[key] = value;
        return this.storage.set(this.SETTINGS_KEY, this.settings);
    };
    Settings.prototype.setAll = function (value) {
        return this.storage.set(this.SETTINGS_KEY, value);
    };
    Settings.prototype.getValue = function (key) {
        return this.storage.get(this.SETTINGS_KEY)
            .then(function (settings) {
            return settings[key];
        });
    };
    Settings.prototype.save = function () {
        return this.setAll(this.settings);
    };
    Object.defineProperty(Settings.prototype, "allSettings", {
        get: function () {
            return this.settings;
        },
        enumerable: true,
        configurable: true
    });
    Settings = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], Object])
    ], Settings);
    return Settings;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModel; });
var UserModel = /** @class */ (function () {
    function UserModel(data) {
        if (data) {
            console.log('data', data);
            this.uid = data.uid;
            this.mail = data.mail;
            this.name = data.name;
            if (data.player) {
                this.player = data.player;
            }
            else {
                if (data.field_player) {
                    this.player = data.field_player.und[0].target_id;
                }
            }
        }
        else {
            this.name = 'Not logged in';
        }
    }
    UserModel.prototype.serialize = function () {
        var user = [{
                uid: this.uid,
                mail: this.mail,
                name: this.name,
                player: this.player
            }];
        return user;
    };
    return UserModel;
}());

//# sourceMappingURL=user-model.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionModel; });
var SessionModel = /** @class */ (function () {
    function SessionModel(data) {
        if (data) {
            this.token = data.token;
            this.sessid = data.sessid;
            this.session_name = data.session_name;
        }
    }
    SessionModel.prototype.serialize = function () {
        var session = [{
                token: this.token,
                sessid: this.sessid,
                session_name: this.session_name
            }];
        return session;
    };
    return SessionModel;
}());

//# sourceMappingURL=session-model.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectoryModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__venue_model__ = __webpack_require__(56);

var DirectoryModel = /** @class */ (function () {
    function DirectoryModel() {
        this.venues = [];
        this.activeVenue = null;
    }
    DirectoryModel.prototype.resetDirectory = function () {
    };
    DirectoryModel.prototype.addVenue = function (venue) {
        var found = this.find(venue);
        if (found == 0) {
            if (venue.nid > 0) {
                this.venues.push(venue);
            }
            else {
                console.log('Venue ID missing');
            }
        }
        else {
            console.log('Venue already listed');
        }
    };
    DirectoryModel.prototype.removeVenue = function (venue) {
        var index = this.venues.indexOf(venue);
        if (index > -1) {
            this.venues.splice(index, 1);
        }
    };
    DirectoryModel.prototype.update = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var venue = new __WEBPACK_IMPORTED_MODULE_0__venue_model__["a" /* VenueModel */](item);
            //console.log('updating venue: ', venue);
            this.addVenue(venue);
        }
    };
    DirectoryModel.prototype.find = function (newVenue) {
        for (var _i = 0, _a = this.venues; _i < _a.length; _i++) {
            var currentVenue = _a[_i];
            if (currentVenue.nid == newVenue.nid) {
                return 1;
            }
        }
        return 0;
    };
    DirectoryModel.prototype.setActiveVenue = function (venue) {
        console.log('setActiveVenue', venue);
        this.activeVenue = venue;
    };
    return DirectoryModel;
}());

//# sourceMappingURL=directory-model.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompetitorModel; });
var CompetitorModel = /** @class */ (function () {
    function CompetitorModel(player) {
        this.player = player;
        this.gamesWon = 0;
        this.gamesDrawn = 0;
        this.gamesLost = 0;
        this.gamesPlayed = 0;
        this.playersPlayed = 0;
        this.points = 0;
    }
    CompetitorModel.prototype.addMatchResults = function (gamesPlayed, gamesWon, gamesLost, gamesDrawn, points) {
        this.gamesPlayed = this.gamesPlayed + gamesPlayed;
        this.gamesWon = this.gamesWon + gamesWon;
        this.gamesDrawn = this.gamesDrawn + gamesDrawn;
        this.gamesLost = this.gamesLost + gamesLost;
        this.points = this.points + points;
        this.playersPlayed++;
        //        console.log('addMatchResults ' + this.player.first, this.points);
    };
    CompetitorModel.prototype.compareTo = function (opponent) {
        return opponent.points - this.points;
    };
    CompetitorModel.prototype.isPlayer = function (test) {
        return (this.player.nid == test.nid);
    };
    CompetitorModel.prototype.reset = function () {
        this.gamesWon = 0;
        this.gamesDrawn = 0;
        this.gamesLost = 0;
        this.gamesPlayed = 0;
        this.points = 0;
        this.playersPlayed = 0;
        //        console.log(this.player.first, this.points);
    };
    return CompetitorModel;
}());

//# sourceMappingURL=competitor-model.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__match_player_model__ = __webpack_require__(324);

var MatchModel = /** @class */ (function () {
    function MatchModel(challengerPlayer, opponentPlayer) {
        this.challengerPlayer = challengerPlayer;
        this.opponentPlayer = opponentPlayer;
        this.matchPlayers = [];
        if (challengerPlayer) {
            var matchChallenger = new __WEBPACK_IMPORTED_MODULE_0__match_player_model__["a" /* MatchPlayerModel */](challengerPlayer);
            this.matchPlayers.push(matchChallenger);
        }
        if (opponentPlayer) {
            var matchOpponent = new __WEBPACK_IMPORTED_MODULE_0__match_player_model__["a" /* MatchPlayerModel */](opponentPlayer);
            this.matchPlayers.push(matchOpponent);
        }
    }
    MatchModel.prototype.hasPlayers = function (challenger, opponent) {
        return (this.hasPlayer(challenger) && this.hasPlayer(opponent));
    };
    MatchModel.prototype.hasPlayer = function (player) {
        for (var _i = 0, _a = this.matchPlayers; _i < _a.length; _i++) {
            var matchPlayer = _a[_i];
            if (matchPlayer.player.nid == player.nid) {
                return true;
            }
        }
        return null;
    };
    MatchModel.prototype.getMatchPlayer = function (player) {
        for (var _i = 0, _a = this.matchPlayers; _i < _a.length; _i++) {
            var matchPlayer = _a[_i];
            if (matchPlayer.player.nid == player.nid) {
                return matchPlayer;
            }
        }
        return null;
    };
    /**
     * Check who won, based on simple logic of two players in match
     */
    MatchModel.prototype.addResult = function (winner) {
        for (var _i = 0, _a = this.matchPlayers; _i < _a.length; _i++) {
            var matchPlayer = _a[_i];
            //If we have a winner then set the winner and the loser
            if (winner) {
                if (matchPlayer.player.nid == winner.nid) {
                    matchPlayer.won();
                }
                else {
                    matchPlayer.lost();
                }
            }
            else {
                //If we don't have a winner then set the game as a draw
                matchPlayer.draw();
            }
        }
    };
    MatchModel.prototype.reset = function () {
        //        console.log('reset',this.matchPlayers);
        this.gamesPlayed = 0;
        for (var _i = 0, _a = this.matchPlayers; _i < _a.length; _i++) {
            var matchPlayer = _a[_i];
            matchPlayer.reset();
        }
    };
    return MatchModel;
}());

//# sourceMappingURL=match-model.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchPlayerModel; });
var MatchPlayerModel = /** @class */ (function () {
    function MatchPlayerModel(model) {
        this.model = model;
        this.points = 0;
        this.gamesWon = 0;
        this.gamesDrawn = 0;
        this.gamesLost = 0;
        this.gamesPlayed = 0;
        this.player = model;
    }
    /**
     * 2 points for a win
     */
    MatchPlayerModel.prototype.won = function () {
        this.gamesPlayed++;
        this.gamesWon++;
        this.points++;
        //Max 3 points
        if (this.points > 3) {
            this.points = 3;
        }
        //        console.log(this.player.first, this.points);
    };
    /**
     * 1 point for a draw
     */
    MatchPlayerModel.prototype.draw = function () {
        this.gamesPlayed++;
        this.gamesDrawn++;
        //        this.points++;
    };
    /**
     * No points for a loss
     */
    MatchPlayerModel.prototype.lost = function () {
        this.gamesPlayed++;
        this.gamesLost++;
        this.points--;
        if (this.points < 0) {
            this.points = 0;
        }
        //        console.log(this.player.first, this.points);
    };
    MatchPlayerModel.prototype.reset = function () {
        //        console.log('reset', this.player.first);
        this.points = 0;
        this.gamesPlayed = 0;
        this.gamesLost = 0;
        this.gamesDrawn = 0;
        this.gamesWon = 0;
    };
    return MatchPlayerModel;
}());

//# sourceMappingURL=match-player-model.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SportModel; });
var SportModel = /** @class */ (function () {
    function SportModel(id) {
        this.sports = [
            { name: 'Pool', image: '../../assets/img/sport-icons/blue/33.png', id: 33 },
            { name: 'Darts', image: '../../assets/img/sport-icons/blue/34.png', id: 34 },
            { name: 'Dominos', image: '../../assets/img/sport-icons/blue/35.png', id: 35 },
            { name: 'Draughts', image: '../../assets/img/sport-icons/blue/680.png', id: 680 },
        ];
        this.id = id;
        for (var _i = 0, _a = this.sports; _i < _a.length; _i++) {
            var sport = _a[_i];
            if (sport.id == this.id) {
                this.name = sport.name;
                this.image = sport.image;
            }
        }
    }
    return SportModel;
}());

//# sourceMappingURL=sport-model.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MembershipModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_model__ = __webpack_require__(125);

var MembershipModel = /** @class */ (function () {
    function MembershipModel() {
        this.players = [];
    }
    MembershipModel.prototype.resetMembership = function () {
    };
    MembershipModel.prototype.addPlayer = function (player) {
        var found = this.find(player);
        if (found == 0) {
            if (player.nid > 0) {
                this.players.push(player);
                //                console.log('Adding player',player);
            }
            else {
                console.log('Player ID missing', player);
            }
        }
        else {
            //            console.log('Player already listed',player);
        }
    };
    MembershipModel.prototype.removePlayer = function (player) {
        var index = this.players.indexOf(player);
        if (index > -1) {
            this.players.splice(index, 1);
        }
    };
    MembershipModel.prototype.update = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            //            console.log('Processing: ', item);
            var player = new __WEBPACK_IMPORTED_MODULE_0__player_model__["a" /* PlayerModel */](item);
            this.addPlayer(player);
        }
    };
    MembershipModel.prototype.find = function (newPlayer) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var currentPlayer = _a[_i];
            if (currentPlayer.nid == newPlayer.nid) {
                return 1;
            }
        }
        return 0;
    };
    MembershipModel.prototype.getPlayer = function (nid) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var currentPlayer = _a[_i];
            if (currentPlayer.nid == nid) {
                return currentPlayer;
            }
        }
    };
    return MembershipModel;
}());

//# sourceMappingURL=membership-model.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(translate, platform, settings, config, statusBar, splashScreen, data) {
        var _this = this;
        this.translate = translate;
        this.config = config;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.data = data;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages__["b" /* MainPage */];
        this.pages = [
            { title: 'Tutorial', component: 'TutorialPage' },
            { title: 'Welcome', component: 'WelcomePage' },
            { title: 'Tabs', component: 'TabsPage' },
            { title: 'Cards', component: 'CardsPage' },
            { title: 'Content', component: 'ContentPage' },
            { title: 'Login', component: 'LoginPage' },
            { title: 'Signup', component: 'SignupPage' },
            { title: 'Master Detail', component: 'ListMasterPage' },
            { title: 'Menu', component: 'MenuPage' },
            { title: 'Settings', component: 'SettingsPage' },
            { title: 'Search', component: 'SearchPage' }
        ];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            //Check if tutorial has been seen
            _this.data.load('skipTutorial').then(function (data) {
                var skip = data;
                if (skip != 'yes') {
                    console.log('skipping tutorial', skip);
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages__["a" /* FirstRunPage */];
                }
            });
        });
        this.initTranslate();
    }
    MyApp.prototype.initTranslate = function () {
        var _this = this;
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('en');
        var browserLang = this.translate.getBrowserLang();
        if (browserLang) {
            if (browserLang === 'zh') {
                var browserCultureLang = this.translate.getBrowserCultureLang();
                if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
                    this.translate.use('zh-cmn-Hans');
                }
                else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
                    this.translate.use('zh-cmn-Hant');
                }
            }
            else {
                this.translate.use(this.translate.getBrowserLang());
            }
        }
        else {
            this.translate.use('en'); // Set your language here
        }
        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(function (values) {
            _this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "<ion-menu [content]=\"content\">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Pages</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n      <ion-list>\n        <button menuClose ion-item *ngFor=\"let p of pages\" (click)=\"openPage(p)\">\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n\n  </ion-menu>\n  <ion-nav #content [root]=\"rootPage\"></ion-nav>"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__providers__["g" /* Settings */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* Config */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__providers__["b" /* DataProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VenueModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leaderboard_model__ = __webpack_require__(57);

var VenueModel = /** @class */ (function () {
    function VenueModel(data) {
        this.leaderboards = [];
        if (data) {
            this.nid = data.nid;
            this.name = data.name;
            this.image = data.image;
            this.thumb = data.thumb;
            this.sports = data.sports;
            this.address = data.address;
            this.city = data.city;
            this.postcode = data.postcode;
            this.lat = data.lat;
            this.long = data.long;
        }
    }
    VenueModel.prototype.serialize = function () {
        var venue = [{
                nid: this.nid,
                name: this.name,
                image: this.image,
                thumb: this.thumb,
                sports: this.sports,
                address: this.address,
                city: this.city,
                postcode: this.postcode,
                lat: this.lat,
                long: this.long
            }];
        return venue;
    };
    VenueModel.prototype.update = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var leaderboard = new __WEBPACK_IMPORTED_MODULE_0__leaderboard_model__["a" /* LeaderboardModel */](item);
            console.log('updating leaderboard: ', leaderboard);
            this.addLeaderboard(leaderboard);
        }
    };
    VenueModel.prototype.addLeaderboard = function (leaderboard) {
        var found = this.find(leaderboard);
        if (found == 0) {
            if (leaderboard.nid > 0) {
                this.leaderboards.push(leaderboard);
            }
            else {
                console.log('Leaderboard ID missing');
            }
        }
        else {
            console.log('Leaderboard already listed');
        }
    };
    VenueModel.prototype.find = function (newLeaderboard) {
        for (var _i = 0, _a = this.leaderboards; _i < _a.length; _i++) {
            var currentLeaderboard = _a[_i];
            if (currentLeaderboard.nid == newLeaderboard.nid) {
                return 1;
            }
        }
        return 0;
    };
    return VenueModel;
}());

//# sourceMappingURL=venue-model.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_model__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__competitor_model__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__match_model__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sport_model__ = __webpack_require__(325);




var LeaderboardModel = /** @class */ (function () {
    function LeaderboardModel(data) {
        //    data: any;
        //Array of games
        this.games = [];
        //Array of competitors
        this.competitors = [];
        //Array of Matches
        this.matches = [];
        if (data) {
            this.nid = data.nid;
            this.name = data.name;
            this.venue = data.venue;
            this.sport = data.sport;
            this.status = data.status;
            this.posted = data.posted;
            this.posted_date = this.posted * 1000;
            this.updated = data.updated;
            this.updated_date = this.updated * 1000;
            this.sportModel = new __WEBPACK_IMPORTED_MODULE_3__sport_model__["a" /* SportModel */](this.sport);
        }
    }
    LeaderboardModel.prototype.serialize = function () {
        var leaderboard = [{
                nid: this.nid,
                venue: this.venue,
                sport: this.sport,
                status: this.status,
                posted: this.posted,
                updated: this.updated,
                name: this.name
            }];
        return leaderboard;
    };
    LeaderboardModel.prototype.loadCompetitorsAndMatches = function () {
        this.loadCompetitors();
        this.loadMatches();
    };
    LeaderboardModel.prototype.build = function () {
        console.log('build');
        //For each competitor
        for (var _i = 0, _a = this.competitors; _i < _a.length; _i++) {
            var currentCompetitor = _a[_i];
            //For each match
            for (var _b = 0, _c = this.matches; _b < _c.length; _b++) {
                var currentMatch = _c[_b];
                if (currentMatch.hasPlayer(currentCompetitor.player)) {
                    var currentMatchPlayer = currentMatch.getMatchPlayer(currentCompetitor.player);
                    currentCompetitor.addMatchResults(currentMatchPlayer.gamesPlayed, currentMatchPlayer.gamesWon, currentMatchPlayer.gamesLost, currentMatchPlayer.gamesDrawn, currentMatchPlayer.points);
                }
            }
        }
        this.competitors.sort(function (a, b) {
            return b.points - a.points;
        });
    };
    LeaderboardModel.prototype.reset = function () {
        console.log('reset()');
        //For each competitor
        for (var _i = 0, _a = this.competitors; _i < _a.length; _i++) {
            var competitor = _a[_i];
            competitor.reset();
        }
        //Matches
        for (var _b = 0, _c = this.matches; _b < _c.length; _b++) {
            var match = _c[_b];
            match.reset();
        }
        for (var _d = 0, _e = this.games; _d < _e.length; _d++) {
            var game = _e[_d];
            var index = this.games.indexOf(game);
            if (index > -1) {
                this.games.splice(index, 1);
            }
        }
    };
    LeaderboardModel.prototype.addGame = function (game) {
        var found = this.find(game);
        if (found == 0) {
            if (game.nid > 0) {
                this.games.push(game);
                //                console.log('Adding game',game);
            }
            else {
                console.log('Game ID missing', game);
            }
        }
        else {
            //            console.log('Game already listed',game);
        }
    };
    LeaderboardModel.prototype.removeGame = function (game) {
        var index = this.games.indexOf(game);
        if (index > -1) {
            this.games.splice(index, 1);
        }
    };
    LeaderboardModel.prototype.update = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            //            console.log('Processing: ', item);
            var game = new __WEBPACK_IMPORTED_MODULE_0__game_model__["a" /* GameModel */](item);
            this.addGame(game);
        }
    };
    LeaderboardModel.prototype.find = function (newGame) {
        for (var _i = 0, _a = this.games; _i < _a.length; _i++) {
            var currentGame = _a[_i];
            if (currentGame.nid == newGame.nid) {
                return 1;
            }
        }
        return 0;
    };
    LeaderboardModel.prototype.associatePlayers = function () {
        //        console.log('asssociatePlayers');
        for (var _i = 0, _a = this.games; _i < _a.length; _i++) {
            var currentGame = _a[_i];
            //Get challenger
            var challenger = this.membership.getPlayer(currentGame.challenger);
            //Get opponent
            var opponent = this.membership.getPlayer(currentGame.opponent);
            currentGame.setChallenger(challenger);
            currentGame.setOpponent(opponent);
            //Set winner if challenger
            if (currentGame.winner == currentGame.challenger) {
                currentGame.setWinner(challenger);
                currentGame.setLoser(opponent);
            }
            //Set winner if opponent
            if (currentGame.winner == currentGame.opponent) {
                currentGame.setWinner(opponent);
                currentGame.setLoser(challenger);
            }
            //            console.log('associated',currentGame);
        }
    };
    LeaderboardModel.prototype.loadCompetitors = function () {
        for (var _i = 0, _a = this.games; _i < _a.length; _i++) {
            var game = _a[_i];
            this.addCompetitorToList(game.challenger_player);
            this.addCompetitorToList(game.opponent_player);
        }
    };
    LeaderboardModel.prototype.loadMatches = function () {
        for (var _i = 0, _a = this.games; _i < _a.length; _i++) {
            var game = _a[_i];
            this.addMatchGame(game);
        }
    };
    LeaderboardModel.prototype.addCompetitorToList = function (player) {
        var addCompetitor = true;
        for (var _i = 0, _a = this.competitors; _i < _a.length; _i++) {
            var competitor = _a[_i];
            if (addCompetitor) {
                if (competitor.isPlayer(player)) {
                    addCompetitor = false;
                }
            }
        }
        if (addCompetitor == true) {
            var newCompetitor = new __WEBPACK_IMPORTED_MODULE_1__competitor_model__["a" /* CompetitorModel */](player);
            this.competitors.push(newCompetitor);
        }
    };
    LeaderboardModel.prototype.addMatchGame = function (game) {
        var match = this.getOrStartMatch(game);
        match.addResult(game.winner_player);
    };
    LeaderboardModel.prototype.getOrStartMatch = function (game) {
        var addMatch = true;
        for (var _i = 0, _a = this.matches; _i < _a.length; _i++) {
            var match = _a[_i];
            if (addMatch) {
                if (match.hasPlayers(game.challenger_player, game.opponent_player)) {
                    addMatch = false;
                    return match;
                }
            }
        }
        if (addMatch) {
            var newMatch = new __WEBPACK_IMPORTED_MODULE_2__match_model__["a" /* MatchModel */](game.challenger_player, game.opponent_player);
            this.matches.push(newMatch);
            return newMatch;
        }
    };
    LeaderboardModel.prototype.setVenue = function (venue) {
        this.venueModel = venue;
    };
    LeaderboardModel.prototype.setMembership = function (membership) {
        this.membership = membership;
    };
    return LeaderboardModel;
}());

//# sourceMappingURL=leaderboard-model.js.map

/***/ })

},[237]);
//# sourceMappingURL=main.js.map