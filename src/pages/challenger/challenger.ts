import { Component } from '@angular/core';
import {
    AlertController, IonicPage,
    NavController,
    NavParams, ToastController
} from 'ionic-angular';
import {PlayerModel} from "../../models/player-model";
import {PostModel} from "../../models/post-model";
import {User} from "../../providers/user/user";

/**
 * Generated class for the ChallengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-challenger',
  templateUrl: 'challenger.html',
})
export class ChallengerPage {

  post: PostModel;
  players: PlayerModel[] = [];
  challenge: string = 'open';

  account: { username: string, password: string } = {
        username: 'username',
        password: 'password'
    };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {

      this.post = navParams.get('post') || null;
      this.players = this.post.leaderboard.membership.players;

      console.log('if profile loaded', this.user.profileLoaded);
      if (this.user.profileLoaded == true) {

          console.log('Use profile');

          if (this.user.profile.uid) {

              let playerID = this.user.profile.player;
              let challenger = this.post.leaderboard.membership.getPlayer(playerID);
              this.post.challenger = challenger;
              this.challenge = 'set';
              this.navCtrl.push('OpponentPage', {
                  post: this.post
              });
          }

      } else {

          console.log('Load profile');

          //Load user profile
          this.user.loadProfile().then( data=> {

              if (this.user.profile.uid) {

                  let playerID = this.user.profile.player;
                  let challenger = this.post.leaderboard.membership.getPlayer(playerID);
                  this.post.challenger = challenger;
                  this.challenge = 'set';

                  this.navCtrl.push('OpponentPage', {
                      post: this.post
                  });

              }


          }, error =>{

              console.log('Opps', error);

          });

      }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengerPage');
  }

  doRegister(){
      this.navCtrl.push('ChallengerSignupPage', {
          post: this.post
      });

  }

  doLogin(player: PlayerModel){

      console.log('doLogin',player);

      let prompt = this.alertCtrl.create({
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
                  handler: data => {


                      console.log('Cancel clicked',data);
                  }
              },
              {
                  text: 'Login',
                  handler: data => {
                      console.log('Login clicked',data);

                      this.account.username = player.username;
                      this.account.password = data.password;

                      console.log('Login details', this.account);


                      this.user.token().subscribe( (result) => {

                          console.log('doGetToken()',result);

                          this.user.login(this.account).subscribe((resp) => {

                              if (this.user.loggedIn) {
                                  let playerID = this.user.profile.player;
                                  let challenger = this.post.leaderboard.membership.getPlayer(playerID);
                                  this.post.challenger = challenger;
                                  this.navCtrl.push('OpponentPage', { post: this.post  });

                              } else {

                                  this.toast('Login failed');

                              }
                          });

                      }, (err) => {

                          this.toast(err);

                      });


                  }
              }
          ]
      });
      prompt.present();

  }

    toast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    }
}
