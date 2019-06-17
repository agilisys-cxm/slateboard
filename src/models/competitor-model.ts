import {PlayerModel} from "./player-model";

export class CompetitorModel{
    gamesWon: number = 0;
    gamesDrawn: number = 0;
    gamesLost: number = 0;
    gamesPlayed: number = 0;
    playersPlayed: number = 0;
    points: number = 0;

    constructor(public player: PlayerModel) {

    }

    addMatchResults(gamesPlayed: number,
                    gamesWon: number,
                    gamesLost: number,
                    gamesDrawn: number,
                    points: number) {
        this.gamesPlayed = this.gamesPlayed + gamesPlayed;
        this.gamesWon = this.gamesWon + gamesWon;
        this.gamesDrawn = this.gamesDrawn + gamesDrawn;
        this.gamesLost = this.gamesLost + gamesLost;
        this.points = this.points + points;
        this.playersPlayed++;
//        console.log('addMatchResults ' + this.player.first, this.points);
    }

    compareTo(opponent: CompetitorModel) {
        return opponent.points - this.points;
    }

    isPlayer(test: PlayerModel): boolean {
        return  (this.player.nid == test.nid);
    }

    reset(){
        this.gamesWon = 0;
        this.gamesDrawn = 0;
        this.gamesLost = 0;
        this.gamesPlayed = 0;
        this.points = 0;
        this.playersPlayed = 0;
//        console.log(this.player.first, this.points);
    }
}