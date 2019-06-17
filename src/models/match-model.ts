import {MatchPlayerModel} from "./match-player-model";
import {PlayerModel} from "./player-model";

export class MatchModel {
    gamesPlayed: number;

    matchPlayers: MatchPlayerModel[] = [];

    constructor(public challengerPlayer: PlayerModel, public opponentPlayer: PlayerModel) {

        if (challengerPlayer) {
            let matchChallenger = new MatchPlayerModel(challengerPlayer);
            this.matchPlayers.push(matchChallenger);
        }

        if (opponentPlayer) {
            let matchOpponent = new MatchPlayerModel(opponentPlayer);
            this.matchPlayers.push(matchOpponent);
        }

    }

    hasPlayers(challenger: PlayerModel, opponent: PlayerModel): boolean {

        return (this.hasPlayer(challenger) && this.hasPlayer(opponent));

    }

    hasPlayer(player: PlayerModel): boolean {

        for(const matchPlayer of this.matchPlayers) {
            if (matchPlayer.player.nid == player.nid) {
                return true;
            }
        }

        return null;
    }

    getMatchPlayer(player: PlayerModel): MatchPlayerModel {
        for(const matchPlayer of this.matchPlayers) {
            if (matchPlayer.player.nid == player.nid) {
                return matchPlayer;
            }
        }
        return null;
    }

    /**
     * Check who won, based on simple logic of two players in match
     */
    addResult(winner: PlayerModel) {

        for(const matchPlayer of this.matchPlayers) {
            //If we have a winner then set the winner and the loser
            if (winner) {
                if (matchPlayer.player.nid == winner.nid) {
                    matchPlayer.won();
                } else {
                    matchPlayer.lost();
                }

            } else {

                //If we don't have a winner then set the game as a draw
                matchPlayer.draw();

            }
        }
    }

    reset() {
//        console.log('reset',this.matchPlayers);
        this.gamesPlayed = 0;

        for(const matchPlayer of this.matchPlayers) {
            matchPlayer.reset();
        }

    }

}