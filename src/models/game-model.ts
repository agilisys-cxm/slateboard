import { PlayerModel } from './player-model';

export class GameModel {
    nid: number;
    venue: number;
    sport: number;
    challenger: number;
    opponent: number;
    status: string;
    winner: number;
    posted: number;
    posted_date: any;
    challenger_player: PlayerModel;
    opponent_player: PlayerModel;

    winner_player: PlayerModel;
    winner_image: string;
    winner_name: string;

    loser_player: PlayerModel;
    loser_image: string;
    loser_name: string;

    venue_name: string;
    leaderboard: string;


    constructor(data: any) {
        if (data) {
            this.nid = data.nid;
            this.venue = data.venue;
            this.sport = data.sport;
            this.challenger = data.challenger;
            this.opponent = data.opponent;
            this.status = data.status;
            this.winner = data.winner;
            this.posted = data.posted;

            this.posted_date = this.posted * 1000;
        }
    }

    serialize(): any {
        let game = [{
            nid: this.nid,
            venue: this.venue,
            sport: this.sport,
            challenger: this.challenger,
            opponent: this.opponent,
            status: this.status,
            winner: this.winner,
            posted: this.posted
        }];
        return game;
    }

    setChallenger(player: PlayerModel) {
        this.challenger_player = player;
    }

    setOpponent(player: PlayerModel) {
        this.opponent_player = player;
    }

    setWinner(player: PlayerModel) {
        this.winner_player = player;
        this.winner_image = player.thumb;
        this.winner_name = player.first + ' ' + player.last;
    }

    setLoser(player: PlayerModel) {
        this.loser_player = player;
        this.loser_image = player.thumb;
        this.loser_name = player.first + ' ' + player.last;
    }



}