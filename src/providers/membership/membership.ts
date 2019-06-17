import { Injectable } from '@angular/core';

import { MembershipModel } from "../../models/membership-model";
import { PlayerModel } from "../../models/player-model";
import { DataProvider } from "../";

@Injectable()
export class MembershipProvider {

    //http://slateboardapp.com/json/[VENUE]/players

    playersURLPostfix: any = '/players';
    playersURL: any;
    playersURLBase: any;
    playersNID: any;
    playersTimestamp: string;

    membership: MembershipModel;
    playersStorageName: string;


    constructor(public venueID: number,
                public data: DataProvider) {

        this.membership = new MembershipModel();

        this.playersNID = venueID;
        this.playersURLBase = venueID  + this.playersURLPostfix;
        this.playersURL = this.playersURLBase;
        this.playersStorageName = 'players-' + venueID;

    }

    getTimestamp(): Promise<string> {
        console.log('getTimestamp()');

        return this.data.getTimestamp(this.playersStorageName).then(
            data => {
                if (data) {
                    this.playersTimestamp = data;
                    this.playersURL = this.playersURLBase + '-update?changed=' + this.playersTimestamp;
                    return data;
                }
                return null;
            },
            reason => {
                this.playersTimestamp = null;
                return reason;
            }
        );

    }

    update(): Promise<boolean> {
        console.log('update()');
        return this.data.get(this.playersURL).then(
            result => {

                if (result.length > 0) {
                    this.membership.update(result);
                    this.save();
                    return true;
                } else {
                    console.log('No updates', result);
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
        return this.membership.players;
    }

    load(): Promise<string>  {
//        console.log('load()');

        return this.data.load(this.playersStorageName).then(
            data => {
                if (data) {
                    let items = JSON.parse(data);
                    for (const item of items) {
                        let player = new PlayerModel(item[0]);
                        this.membership.addPlayer(player);
                    }
                }
                return 'Players loaded';
            },
            reason => {
                return 'Failed to load players';
            }
        );
    }

    save() {
        console.log('save()');
        let saveData = [];

        for (const player of this.membership.players) {
            saveData.push(player.serialize());
        }

        let newData = JSON.stringify(saveData);

        this.data.save(this.playersStorageName,newData);
        this.data.saveTimestamp(this.playersStorageName);
    }

    reset() {
        this.membership = new MembershipModel();
        this.dump();
    }

    dump() {
        this.data.dump(this.playersStorageName);
    }

}
