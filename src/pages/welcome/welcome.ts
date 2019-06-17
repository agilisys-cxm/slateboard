import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, ToastController} from 'ionic-angular';
import {User} from "../../providers/user/user";
import {UserModel} from "../../models/user-model";
import {SessionModel} from "../../models/session-model";
import {VenueModel} from "../../models/venue-model";
import { DirectoryProvider } from "../../providers/directory/directory";
import {DataProvider} from "../../providers/data/data";



/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  profile: UserModel;
  session: SessionModel;
  venue: VenueModel;
  provider: DirectoryProvider;


  constructor(public navCtrl: NavController,
              public user: User,
              public data: DataProvider,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {

    this.provider = new DirectoryProvider(data)

    this.profile = this.user.attachProfile();
    this.session = this.user.attachSession();
    this.venue = this.provider.attachActiveVenue();
  }

    ionViewDidLoad() {

        let loader = this.loadingCtrl.create({
            content: "loading...",
            duration: 10000
        });
        loader.present();

        this.user.loadProfile().then( data=> {

            console.log('loadProfile',this.user.loggedIn);

        }, error => {

            console.log('loadProfile',error);

        });

        this.user.loadSession().then( data=> {
            if (data=='success') {

                this.session = this.user.attachSession();

            }
        }, error => {

            loader.dismissAll();
            console.log('loadSession', error);

        });

        this.provider.loadActiveVenue().then( data => {
            if (data=='success') {
                loader.dismissAll();
                this.venue = this.provider.attachActiveVenue();
            }
        }, error => {

            loader.dismissAll();
            console.log('loadActiveVenue', error);

        });

        this.provider.load();

    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter welcome page');
        this.profile = this.user.attachProfile();
        this.session = this.user.attachSession();
        this.venue = null;
        this.venue = this.provider.attachActiveVenue();
    }



  directory() {
      this.navCtrl.push('DirectoryPage');
  }

  toast(message: string) {
      let toast = this.toastCtrl.create({
          message: message,
          duration: 1000,
          position: 'bottom'
      });
      toast.present();
  }

    goTo(venue: VenueModel) {
        this.navCtrl.push('VenuePage', {venue: venue});
    }

}
