import { Component } from '@angular/core';
import { IonicPage,
    NavController,
    NavParams} from 'ionic-angular';

import { PlayerModel } from "../../models/player-model";
import {PostModel} from "../../models/post-model";
import {User} from "../../providers/user/user";
import {UserModel} from "../../models/user-model";

/**
 * Generated class for the OpponentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opponent',
  templateUrl: 'opponent.html',
})
export class OpponentPage {

    post: PostModel;
    profile: UserModel;

    players: PlayerModel[] = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public user: User) {

        this.post = navParams.get('post') || null;
        this.profile = this.user.attachProfile();
        this.players = this.post.leaderboard.membership.players;

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad opponent page');
  }

  ionViewWilLEnter() {
    console.log('ionViewWillEnter opponent page');
    this.profile = this.user.attachProfile();
    console.log('Profile',this.profile);
  }

  doSelect(player){
    this.post.opponent = player;
    this.navCtrl.push('ResultPage', {
        post: this.post
    });

  }

}
