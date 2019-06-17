import {PlayerModel} from "./player-model";

export class MatchPlayerModel {
    player: PlayerModel;
    points: number = 0;
    gamesWon: number = 0;
    gamesDrawn: number = 0;
    gamesLost: number = 0;
    gamesPlayed: number = 0;

    constructor(public model: PlayerModel) {
        this.player = model;
    }

    /**
     * 2 points for a win
     */
    won() {
        this.gamesPlayed++;
        this.gamesWon++;
        this.points++;

        //Max 3 points
        if (this.points > 3) {
            this.points = 3;
        }
//        console.log(this.player.first, this.points);
    }

    /**
     * 1 point for a draw
     */
    draw() {
        this.gamesPlayed++;
        this.gamesDrawn++;
//        this.points++;
    }

    /**
     * No points for a loss
     */
    lost() {
        this.gamesPlayed++;
        this.gamesLost++;
        this.points--;

        if (this.points < 0) {
            this.points = 0;
        }
//        console.log(this.player.first, this.points);
    }

    reset(){
//        console.log('reset', this.player.first);
        this.points = 0;
        this.gamesPlayed = 0;
        this.gamesLost = 0;
        this.gamesDrawn = 0;
        this.gamesWon = 0;
    }

}