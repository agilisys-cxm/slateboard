import { Injectable } from '@angular/core';

import { LeaderboardModel } from "../../models/leaderboard-model";
import {DataProvider} from "../";
import {VenueModel} from "../../models/venue-model";


/*
  Generated class for the VenueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VenueProvider {

  //https://slateboardapp.com/json/[VENUE]/leaderboards

  venueURLPostfix: any = '/leaderboards';
  venueURLBase: any;
  venueURL: any;
  venueNID: any;
  venueTimestamp: string;
  venueStorageName: string;

  constructor(public venue: VenueModel,
              public data: DataProvider) {

      this.venueNID = venue.nid;
      this.venueURLBase = venue.nid + this.venueURLPostfix;
      this.venueURL = this.venueURLBase;
      this.venueStorageName = 'venue-' + venue.nid;

  }

    getTimestamp(): Promise<string> {
      console.log('getTimestamp()');

        return this.data.getTimestamp(this.venueStorageName).then(
            data => {
                if (data) {
                    this.venueTimestamp = data;
                    this.venueURL = this.venueURLBase + '-update?changed=' + this.venueTimestamp;
                    return data;
                }
                return null;
            },
            reason => {
                this.venueTimestamp = null;
                return reason;
            }
        );

    }


    update(): Promise<boolean> {
        console.log('update()');
        return this.data.get(this.venueURL).then(
            result => {

                if (result.length > 0) {
                    this.venue.update(result);
                    this.save();
                    return true;

                } else {
                    console.log('No updates',result);
                    return false;
                }

            },
            reason => {

                console.log('reason: ', reason);
                return false;

            }
        );
    }

    attach() {
        return this.venue.leaderboards;
    }

    load(): Promise<string>  {
//        console.log('load()');

        return this.data.load(this.venueStorageName).then(
            data => {
                if (data) {
                    let items = JSON.parse(data);
                    for (const item of items) {
                        let leaderboard = new LeaderboardModel(item[0]);
                        this.venue.addLeaderboard(leaderboard);
                    }
                }
//                console.log('Leaderboards',this.venue.leaderboards);
                return 'Leaderboards loaded';
            },
            reason => {
                console.log('reason: ', reason);
                return 'No leaderboards found';
            }
        );
    }

    save() {
        console.log('save()');
        let saveData = [];

        for (const leaderboard of this.venue.leaderboards) {
            saveData.push(leaderboard.serialize());
        }

        let newData = JSON.stringify(saveData);

        this.data.save(this.venueStorageName,newData);
        this.data.saveTimestamp(this.venueStorageName);
    }

    reset() {
      this.venue = new VenueModel(null);
      this.dump();
    }

    dump() {
        this.data.dump(this.venueStorageName);
    }

}
