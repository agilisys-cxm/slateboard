import {LeaderboardModel} from "./leaderboard-model";
import {PlayerModel} from "./player-model";

export class PostModel {
    leaderboard: LeaderboardModel;
    challenger: PlayerModel;
    opponent: PlayerModel;
    status: string;
    winner: number;

    constructor(leaderboard: LeaderboardModel) {
        this.leaderboard = leaderboard;
    }


}