import { PlayerModel } from './player-model';

export class MembershipModel {

    data: any;
    players: PlayerModel[] = [];

    constructor(){

    }


    resetMembership(): void {

    }

    addPlayer(player: PlayerModel): void {
        let found = this.find(player);

        if (found == 0) {
            if (player.nid > 0) {
                this.players.push(player);
//                console.log('Adding player',player);
            } else {
                console.log('Player ID missing',player);
            }
        } else {
//            console.log('Player already listed',player);

        }
    }

    removePlayer(player: PlayerModel): void {

        let index = this.players.indexOf(player);

        if(index > -1){
            this.players.splice(index, 1);
        }


    }

    update(data: any) {
        for (const item of data) {
//            console.log('Processing: ', item);
            let player = new PlayerModel(item);
            this.addPlayer(player);
        }
    }

    find(newPlayer: PlayerModel): number {

        for (const currentPlayer of this.players) {
            if (currentPlayer.nid == newPlayer.nid) {
                return 1;
            }
        }

        return 0;
    }

    getPlayer(nid: number): PlayerModel {

        for (const currentPlayer of this.players) {
            if (currentPlayer.nid == nid) {
                return currentPlayer;
            }
        }
    }
}