import {LeaderboardModel} from "./leaderboard-model";

export class VenueModel {

    nid: number;
    name: string;
    image: string;
    thumb: string;
    sports: string;
    address: string;
    city: string;
    postcode: string;
    lat: string;
    long: string;

    leaderboards: LeaderboardModel[] = [];

    constructor(data: any) {
        if (data) {
            this.nid = data.nid;
            this.name = data.name;
            this.image = data.image;
            this.thumb = data.thumb;
            this.sports = data.sports;
            this.address = data.address;
            this.city = data.city;
            this.postcode = data.postcode;
            this.lat = data.lat;
            this.long = data.long;
        }
    }

    serialize(): any {
        let venue = [{
            nid: this.nid,
            name: this.name,
            image: this.image,
            thumb: this.thumb,
            sports: this.sports,
            address: this.address,
            city: this.city,
            postcode: this.postcode,
            lat: this.lat,
            long: this.long
        }];
        return venue;
    }

    update(data: any) {
        for (const item of data) {
            let leaderboard = new LeaderboardModel(item);
            console.log('updating leaderboard: ', leaderboard);
            this.addLeaderboard(leaderboard);
        }
    }

    addLeaderboard(leaderboard: LeaderboardModel): void {
        let found = this.find(leaderboard);

        if (found == 0) {
            if (leaderboard.nid > 0) {
                this.leaderboards.push(leaderboard);
            } else {
                console.log('Leaderboard ID missing');
            }
        } else {
            console.log('Leaderboard already listed');

        }
    }

    find(newLeaderboard: LeaderboardModel): number {

        for (const currentLeaderboard of this.leaderboards) {
            if (currentLeaderboard.nid == newLeaderboard.nid) {
                return 1;
            }
        }

        return 0;

    }

}