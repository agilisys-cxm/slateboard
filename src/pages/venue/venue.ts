import { Component } from '@angular/core';
import {
    IonicPage, LoadingController,
    NavController,
    NavParams,
    Refresher,
    ToastController
} from 'ionic-angular';

import { VenueModel } from "../../models/venue-model";
import { LeaderboardModel} from "../../models/leaderboard-model";
import { DataProvider} from "../../providers/data/data";
import { VenueProvider} from "../../providers/venue/venue";
import { MembershipProvider} from "../../providers/membership/membership";


/**
 * Generated class for the VenuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venue',
  templateUrl: 'venue.html',
})
export class VenuePage {

  venue: VenueModel;
  provider: VenueProvider;
  loaded: boolean = false;

  leaderboards: LeaderboardModel[] = [];

  membership: MembershipProvider;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public data: DataProvider,
              public loadingCtrl: LoadingController) {

    this.venue = navParams.get('venue') || null;

    if (!this.venue.nid) {

        console.log('No venue!');
        this.navCtrl.setRoot('WelcomePage', {}, {
            animate: true,
            direction: 'forward'
        });

    } else {

        this.provider = new VenueProvider(
            this.venue,
            this.data);

        this.membership = new MembershipProvider(
            this.venue.nid,
            this.data
        );

        this.leaderboards = this.provider.attach();

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad()');
    if (this.venue.nid) {
        if (this.loaded == false) {
            this.provider.load().then(
                success => {
                    this.membership.load().then(
                        success=> {
                            this.loaded = true;
                            console.log('loaded', this.loaded);
                        }
                    )
                });
        }
    }
  }

    update() {
        let loader = this.loadingCtrl.create({
            content: "Updating...",
            duration: 10000
        });
        loader.present();

        console.log('getTimestamp');
        this.provider.getTimestamp().then(
            data=> {

                console.log('update Leaderboards');
                this.provider.update().then(
                    leaderboards => {

                        if (leaderboards) {
                            this.leaderboards = this.provider.attach();
                        }
                        console.log('getTimestamp - players');
                        this.membership.getTimestamp().then(
                            data => {

                                //getMembership
                                console.log('update Membership');
                                this.membership.update().then(
                                    members => {

                                        loader.dismissAll();

                                    },
                                    reason=>{
                                        console.log('error',reason);
                                        loader.dismissAll();
                                    });

                            }, reason => {

                                console.log('leaderboards',reason);
                                loader.dismissAll();


                            }
                        )

                    })

            }, reason => {
                console.log('timestamp',reason);
                loader.dismissAll();
            }
        );

    }

  goTo(leaderboard: LeaderboardModel) {
      leaderboard.setMembership(this.membership.membership);
      leaderboard.setVenue(this.venue);

      this.navCtrl.push('LeaderboardPage', {
          leaderboard: leaderboard
      });
  }

    doRefresh(refresher: Refresher) {
        this.update();
        refresher.complete();
    }
}
