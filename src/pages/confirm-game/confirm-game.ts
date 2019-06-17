import { Component } from '@angular/core';
import {
    AlertController,
    IonicPage, LoadingController,
    NavController,
    NavParams,
    Refresher, ToastController
} from 'ionic-angular';
import {User} from "../../providers/user/user";
import { GameModel } from "../../models/game-model";
import { PlayerModel } from "../../models/player-model";
import {DataProvider} from "../../providers/data/data";


/**
 * Generated class for the ConfirmGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-game',
  templateUrl: 'confirm-game.html',
})
export class ConfirmGamePage {

  games: GameModel[] = [];
  loading: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public data: DataProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public user: User) {
  }

  ionViewDidLoad() {

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
  }

  ionViewWillEnter() {
      console.log('ionViewWillEnter ConfirmGamePage')
      if (this.user.profile.uid) {
          if (!this.loading) {
              this.loading = true;
              this.update();
              this.loading = false;
          }

      }
  }


  update() {
    let loader = this.loadingCtrl.create({
        content: "Updating...",
        duration: 10000
    });
    loader.present();


    this.games = [];
    this.user.confirmGames().then(
        result => {
            console.log('result', result);
            this.loadGames(result);
            loader.dismissAll();
            this.loading = false;
        }
    )
  }

  loadGames(data: any) {

    for (const item of data) {
      console.log('Processing', item);
      let game = new GameModel(item);

      let challenger = new PlayerModel(item);
      console.log('Player', challenger);
      game.setChallenger(challenger);
      game.venue_name = item.venue_name;
      game.leaderboard = item.leaderboard;
      if (game.winner == game.opponent) {
          game.winner_name = "You";
      } else {
          game.winner_name = game.challenger_player.first;
      }


      this.games.push(game);
    }
    console.log('Games', this.games);
  }

  doRefresh(refresher: Refresher) {
    this.update();
    refresher.complete();
  }

  confirmCheck(game: GameModel) {
      console.log('Submit()');

      let prompt = this.alertCtrl.create({
          title: "Just checking",
          message: 'Happy to confirm?',
          buttons: [
              {
                  text: 'Not sure',
                  handler: data => {
                      console.log('Not sure');
                  }
              },
              {
                  text: 'Yes',
                  handler: data => {
                      this.confirm(game);
                  }
              }
          ]
      });
      prompt.present();
  }

    confirm(game: GameModel) {
      let loader = this.loadingCtrl.create({
          content: "Confirming...",
          duration: 10000
      });
      loader.present();

      let response = this.user.confirmGame(game.nid).subscribe(resp=>
      {
          loader.dismissAll();
          this.update();
      });

      console.log('Confirm game response', response);
  }

    toast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    }

    removeCheck(game: GameModel) {
        let loader = this.loadingCtrl.create({
            content: "Removing...",
            duration: 10000
        });
        loader.present();

        let response = this.user.removeGame(game.nid).subscribe(resp=>
        {
            loader.dismissAll();
            this.update();
        });

        console.log('Game remove', response);
    }





}
