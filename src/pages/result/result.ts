import { Component } from '@angular/core';
import {
    AlertController, IonicPage, LoadingController,
    NavController,
    NavParams
} from 'ionic-angular';
import {PostModel} from "../../models/post-model";
import {UserModel} from "../../models/user-model";
import {User} from "../../providers/user/user";

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  post: PostModel;
  profile: UserModel;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

      this.post = navParams.get('post') || null;
      this.profile = this.user.attachProfile();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad result page');
  }

  won() {
        let prompt = this.alertCtrl.create({
            title: "I beat " + this.post.opponent.first,
            message: 'Confirm your result',
            buttons: [
                {
                    text: 'Back',
                    handler: data => {
                        console.log('Cancelled');
                    }
                },
                {
                    text: 'Confirm',
                    handler: data => {
                        this.post.winner = this.post.challenger.nid;
                        this.submit();
                        /*
                        this.navCtrl.push('PostgamePage', {
                          post: this.post
                        });*/
                    }
                }
            ]
        });
        prompt.present();
  }

  lost() {
      let prompt = this.alertCtrl.create({
          title: "I lost to " + this.post.opponent.first,
          message: 'Confirm your result',
          buttons: [
              {
                  text: 'Back',
                  handler: data => {
                      console.log('Cancel lose');
                  }
              },
              {
                  text: 'Confirm',
                  handler: data => {
                      this.post.winner = this.post.opponent.nid;
                      this.submit();
                      /*
                      this.navCtrl.push('PostgamePage', {
                          post: this.post
                      });*/
                  }
              }
          ]
      });
      prompt.present();

  }

  submit() {
      console.log('Submit()');

      let loader = this.loadingCtrl.create({
          content: "Posting...",
          duration: 10000
      });
      loader.present();

      let response = this.user.postGame(this.post).subscribe(resp=>
      {
          loader.dismissAll();
          console.log('Posted response:', response);
          this.navCtrl.popTo(this.navCtrl.getByIndex(2));

      });


  }

}
