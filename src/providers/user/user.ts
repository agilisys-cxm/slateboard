import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { DataProvider } from "../data/data";

import { UserModel } from "../../models/user-model";
import {SessionModel} from "../../models/session-model";
import {PostModel} from "../../models/post-model";

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
@Injectable()
export class User {

  storageProfileName: string = 'profile';
  storageSessionName: string = 'session';

  profile: UserModel;
  session: SessionModel;

  loggedIn: boolean = false;
  profileLoaded: boolean = false;
  sessionLoaded: boolean = false;


  constructor(public api: Api,
              public data: DataProvider) {

    this.profile = new UserModel(null);
    this.session = new SessionModel(null);

  }

    /**
     * Get token
     */
    token() {
      console.log('token()');
      let seq = this.api.post('user/token.json',null).share();

      seq.subscribe((res: any) => {
          console.log('token() response',res);
          this.session = new SessionModel(res);
          this.sessionLoaded = true;
          this.saveSession();
      });

      return seq;
    }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {

        let config = {
            headers: {
                'X-CSRF-Token': this.session.token
            }
        }

        let seq = this.api.post('user/login.json', accountInfo, config).share();

        seq.subscribe((res: any) => {
            console.log('SUCCESS', res);

            this.profile = new UserModel(res.user);
            this.session = new SessionModel(res);

            this.saveProfile();
            this.saveSession();

            this.loggedIn = true;
        }, err => {
            console.error('ERROR', err);
        });

        return seq;

  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {

      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.profileLoaded = false;
    this.loggedIn = false;

    let config = {
        headers: {
            'X-CSRF-Token': this.session.token
        }
    };


    let seq = this.api.post('user/logout.json', null, config).share();

    seq.subscribe((res: any) => {
        console.log('SUCCESS', res);
    }, err => {
        console.error('ERROR', err);
    });

    this.dumpProfile();
    this.dumpSession();

    return seq;
  }

  saveProfile() {
    let saveData = this.profile.serialize();
    let newData = JSON.stringify(saveData);

    this.data.save(this.storageProfileName, newData);

  }

  saveSession() {
      let saveData = this.session.serialize();
      let newData = JSON.stringify(saveData);

      this.data.save(this.storageSessionName, newData)

  }

  loadProfile(): Promise<string>  {
      return this.data.load(this.storageProfileName).then(
          data => {

              if (data) {
                  let items = JSON.parse(data);
                  this.profile = new UserModel(items[0]);
                  this.profileLoaded = true;

                  if (this.profile.uid) {
                      this.loggedIn = true;
                      return 'success';
                  } else {
                      return 'empty';
                  }
              }
              return 'empty';
          },
          reason => {
              console.error('error: ', reason);
              return reason;
          }
      );
  }

    loadSession(): Promise<string>  {
        return this.data.load(this.storageSessionName).then(
            data => {

                if (data) {
                    let items = JSON.parse(data);
                    this.session = new SessionModel(items[0]);
                    this.sessionLoaded = true;
                    return 'success';
                }
                return 'empty';
            },
            reason => {
                console.error('error: ', reason);
                return reason;
            }
        );
    }


  dumpProfile() {
      this.data.dump(this.storageProfileName);
      this.profile = new UserModel(null);
      this.profileLoaded = false;
  }

  dumpSession() {
      this.data.dump(this.storageSessionName);
      this.session = new SessionModel(null);
      this.sessionLoaded = false;
  }

  attachProfile() {
    return this.profile;
  }

  attachSession() {
      return this.session;
  }

    postGame(post: PostModel) {
        console.log('venue', post.leaderboard.venue);
        console.log('Leaderboard', post.leaderboard.nid);
        console.log('challenger', post.challenger.nid);
        console.log('opponent', post.opponent.nid);
        console.log('winner', post.winner);
        console.log('Token', this.session.token );

        let data = {
            game: {
                'leaderboard': post.leaderboard.nid,
                'challenger': post.challenger.nid,
                'opponent': post.opponent.nid,
                'winner': post.winner,
                'venue': post.leaderboard.venue,
                'sport': post.leaderboard.sport
            }
        }

        let config = {
            headers: {
                'X-CSRF-Token': this.session.token
            }
        }

        let seq = this.api.post('game', data, config).share();

        seq.subscribe((res: any) => {
            console.log('SUCCESS', res);

        }, err => {
            console.error('ERROR', err);
        });

        return seq;

    }

    confirmGames(): Promise<string> {

        let url = this.profile.uid + '/confirm-games';

        return this.data.get(url).then(
            result => {
                console.log('Received',result);
                return result;
            },
                error=> {
            console.log('error', error);
            return error;
        });


    }

    confirmGame(id: any) {
        console.log('ID', id);

        let data = {
            game: {
                'id': id
            }
        }

        let config = {
            headers: {
                'X-CSRF-Token': this.session.token
            }
        }

        let seq = this.api.post('confirm-game', data, config).share();

        seq.subscribe((res: any) => {
            console.log('SUCCESS', res);

        }, err => {
            console.error('ERROR', err);
        });

        return seq;

    }

    removeGame(id: any) {
        console.log('ID', id);

        let data = {
            game: {
                'id': id
            }
        }

        let config = {
            headers: {
                'X-CSRF-Token': this.session.token
            }
        }

        let seq = this.api.post('remove-game', data, config).share();

        seq.subscribe((res: any) => {
            console.log('SUCCESS', res);

        }, err => {
            console.error('ERROR', err);
        });

        return seq;

    }

    changeDomain(domain: string) {

      this.data.changeDomain(domain);
      this.api.domain = domain;
    }


}
