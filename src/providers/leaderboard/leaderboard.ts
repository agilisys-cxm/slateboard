import { Injectable } from '@angular/core';

import { LeaderboardModel } from "../../models/leaderboard-model";
import { GameModel } from "../../models/game-model";
import { DataProvider } from "../";

@Injectable()
export class LeaderboardProvider {

  //http://slateboardapp.com/json/[VENUE]/[SPORT]/games

  leaderboardURLPostfix: any = '/leaderboard';
  leaderboardURLBase: any;
  leaderboardURL: any;
  leaderboardNID: any;

  leaderboardStorageName: string;
  gamesLoaded = false;


  leaderboardTimestamp: string;


  constructor(public leaderboard: LeaderboardModel,
              public data: DataProvider) {

    this.leaderboardNID = leaderboard.nid;
    this.leaderboardURLBase = leaderboard.nid + this.leaderboardURLPostfix;
    this.leaderboardURL = this.leaderboardURLBase;
    this.leaderboardStorageName = 'leaderboard-' + leaderboard.nid;

  }

  getTimestamp(): Promise<string> {
//      console.log('getTimestamp()');

      return this.data.getTimestamp(this.leaderboardStorageName).then(
          data => {
              if (data) {
                  this.leaderboardTimestamp = data;
                  this.leaderboardURL = this.leaderboardURLBase + '-update?changed=' + this.leaderboardTimestamp;
                  return data;
              }
              return null;
          },
          reason => {
              this.leaderboardTimestamp = null;
              return reason;
          }
      );

  }



    update(): Promise<boolean> {
        console.log('update()');

        return this.data.get(this.leaderboardURL).then(
            result => {

                if (result.length > 0) {
                    this.leaderboard.update(result);
                    this.save();
                    return true;
                } else {
                    console.log('No new updates',result);
                    return false;
                }

            },
            reason => {

                console.log('reason: ', reason);
                return false;

            }
        );
    }

    attachGames() {
        return this.leaderboard.games;
    }

    attachCompetitors() {
      return this.leaderboard.competitors;
    }

    load(): Promise<string>  {
      console.log('load()');

      return this.data.load(this.leaderboardStorageName).then(
            data => {
                if (data) {
                    let items = JSON.parse(data);
                    for (const item of items) {
                        let game = new GameModel(item[0]);
                        this.leaderboard.addGame(game);
                    }
                }
                this.gamesLoaded = true;
//                console.log('Games',this.leaderboard.games);
                return 'Games loaded';
            },
            reason => {
                console.log('reason: ', reason);
                return 'No result found';
            }
        );
    }

    save() {
        console.log('save()');
        let saveData = [];

        for (const game of this.leaderboard.games) {
            saveData.push(game.serialize());
        }

        let newData = JSON.stringify(saveData);

        this.data.save(this.leaderboardStorageName,newData);
        this.data.saveTimestamp(this.leaderboardStorageName);
    }

    reset() {
        this.leaderboard.reset();
        this.dump();
    }

    dump() {
        this.data.dump(this.leaderboardStorageName);
        this.data.dumpTimestamp(this.leaderboardStorageName);
    }

    associatePlayers() {
        console.log('associatePlayers', this.gamesLoaded);
        this.leaderboard.associatePlayers();
    }

    loadCompetitorsAndMatches() {
      this.leaderboard.loadCompetitorsAndMatches();
    }

    build() {
      this.leaderboard.build();
    }

}
