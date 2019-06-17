import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    Refresher,
    ToastController
} from 'ionic-angular';

import { VenueModel } from '../../models/venue-model';
import { DirectoryProvider } from "../../providers/directory/directory";
import { DataProvider} from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
})
export class DirectoryPage {

  venues: VenueModel[] = [];
  provider: DirectoryProvider;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public data: DataProvider) {

      this.provider = new DirectoryProvider(data)

  }

  ionViewDidLoad() {
    this.loadDirectory();
  }

  ionViewWillEnter() {
    this.venues = this.provider.attach();
  }

  loadDirectory(){
//      console.log('loadDirectory()');
      this.provider.load();
//      this.toast('Loaded from database');

  }

  update() {
      this.provider.dump();
      this.provider.reset();
      this.provider.update().then(
          message => {
              this.toast(message);
              this.venues = this.provider.attach();
      });
  }

    goTo(venue: VenueModel) {
        this.provider.setActiveVenue(venue);
        this.navCtrl.push('VenuePage', {venue: venue});
    }

    doRefresh(refresher: Refresher) {
        this.update();
        refresher.complete();
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
