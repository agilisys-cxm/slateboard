import { Component } from '@angular/core';
import { IonicPage,
    NavController,
    NavParams,
    ToastController} from 'ionic-angular';

import { User } from '../../providers';
import { UserModel } from '../../models/user-model';
import {SessionModel} from "../../models/session-model";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

    // Our translated text strings
    profile: UserModel;
    session: SessionModel;
    domain: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public user: User) {

      console.log('Constructor()',this.user);
      this.profile = this.user.attachProfile();
      this.session = this.user.attachSession();
      console.log('constructor(this.user.data.domain)',this.user.data.domain)
      this.domain = this.user.data.domain;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad account page');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter account page');
    this.profile = this.user.attachProfile();
  }

    login() {
        this.navCtrl.push('LoginPage')
    }

    signup() {
        this.navCtrl.push('SignupPage');
    }

    doLogout() {
        this.user.logout().subscribe((resp) => {
            this.toast('Logged out',resp);

        }, (err) => {
            // Unable to log in
            this.toast(err);
        });
        this.profile = this.user.attachProfile();
        this.session = this.user.attachSession();
    }

    doChangeDomain(){
      console.log('doChangeDomain()');
      console.log('this.domain: ',this.domain);
      this.user.changeDomain(this.domain);
      console.log('this.user.data.domain: ',this.user.data.domain);
      this.domain = this.user.data.domain;

    }

    load() {
      this.user.loadProfile().then( data => {
            this.profile = this.user.attachProfile();
            this.toast('load',data);
          this.session = this.user.attachSession();
      }, reason => {
          this.toast(reason);
      })
    }

    save() {
      this.user.saveProfile();
    }

    dump() {
        this.user.dumpProfile();
        this.profile = this.user.attachProfile();
        this.session = this.user.attachSession();
    }

    toast(message: string, data: any = null) {
        console.log(message, data);
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    }

}
