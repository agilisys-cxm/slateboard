import { Component } from '@angular/core';
import {
    IonicPage, LoadingController,
    NavController,
    NavParams,
    Refresher,
    ToastController
} from 'ionic-angular';

import { VenueModel } from "../../models/venue-model";
import { GameModel } from "../../models/game-model";

import { LeaderboardProvider } from "../../providers/leaderboard/leaderboard";
import { DataProvider } from "../../providers/data/data";
import { CompetitorModel } from "../../models/competitor-model";
import { LeaderboardModel } from "../../models/leaderboard-model";
import {PostModel} from "../../models/post-model";
import {User} from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

  venue: VenueModel;
  games: GameModel[] = [];
  competitors: CompetitorModel[];
  provider: LeaderboardProvider;
  leaderboard: LeaderboardModel;
  loaded: boolean = false;

  board: string = "posts";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public data: DataProvider,
              public loadingCtrl: LoadingController,
              public user: User) {

    //Grab the leaderboard
    this.venue = navParams.get('venue') || new VenueModel(null);
    this.leaderboard = navParams.get('leaderboard') || new LeaderboardModel(null);
//    console.log(this.leaderboard.name, this.leaderboard);

    if (!this.leaderboard.nid) {

        console.log('No leaderboard!');
        this.navCtrl.setRoot('WelcomePage', {}, {
            animate: true,
            direction: 'forward'
        });

    } else {

        this.provider = new LeaderboardProvider(
            this.leaderboard,
            this.data
        );

        //Hook up the list
        this.attach();
    }
  }

  ionViewDidLoad() {
    //Load games
    console.log('View loaded', this.loaded)
    if (this.leaderboard.nid) {
        if (this.loaded == false) {
            console.log('Loading games');
            this.loadGames().then(
                message => {

                    //Then set game players
                    this.provider.associatePlayers();
                    this.provider.loadCompetitorsAndMatches();
                    this.provider.build();
                    this.loaded = true;
                    console.log('loaded', this.loaded);

                });
        }
    }
  }

  ionViewWillEnter() {
      this.attach();
  }


  loadGames(): Promise<string> {
      console.log('loadGames()');

      return this.provider.load();
  }

  update(){
      let loader = this.loadingCtrl.create({
          content: "Updating...",
          duration: 10000
      });
      loader.present();

      this.provider.getTimestamp().then(
          data=> {
              this.provider.update().then(
                  success => {
                      if (success) {
                          this.attach();
                      }
                      loader.dismissAll();

                  });
          }
      )

  }

  attach(){
      this.games = null;
      this.games = this.provider.attachGames();
      console.log('Need a smarter ordering function when attaching');
//      this.games.reverse();
      this.competitors = null;
      this.competitors = this.provider.attachCompetitors();
  }

    doRefresh(refresher: Refresher) {
      this.update();
    }

    doReset(){
      console.log('doReset()');
      this.provider.reset();
    }

    doPostGame() {
        let post = new PostModel(this.leaderboard);

        if (this.user.loggedIn == true) {
            if (this.user.profile.uid) {

                let playerID = this.user.profile.player;
                let challenger = post.leaderboard.membership.getPlayer(playerID);
                post.challenger = challenger;
                this.navCtrl.push('OpponentPage', {
                    post: post
                });
            }
        } else {
            this.navCtrl.push('ChallengerPage', {
                post: post
            });
        }

    }
}
