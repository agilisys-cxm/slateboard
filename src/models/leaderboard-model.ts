import { GameModel } from './game-model';
import { CompetitorModel} from "./competitor-model";
import { MembershipModel} from "./membership-model";
import {MatchModel} from "./match-model";
import {PlayerModel} from "./player-model";
import {SportModel} from "./sport-model";
import {VenueModel} from "./venue-model";

export class LeaderboardModel {

    nid: number;
    venue: number;
    sport: number;
    name: string;
    posted: number;
    posted_date: number;
    updated: number;
    updated_date: number;
    status: string;
    sportModel: SportModel;
    venueModel: VenueModel;
    membership: MembershipModel;

//    data: any;

    //Array of games
    games: GameModel[] = [];

    //Array of competitors
    competitors: CompetitorModel[] = [];

    //Array of Matches
    matches: MatchModel[] = [];

    constructor(data: any){
        if (data) {
            this.nid = data.nid;
            this.name = data.name;
            this.venue  = data.venue;
            this.sport = data.sport;
            this.status = data.status;

            this.posted = data.posted;
            this.posted_date = this.posted * 1000;

            this.updated = data.updated;
            this.updated_date = this.updated * 1000;

            this.sportModel = new SportModel(this.sport);
        }
    }

    serialize(): any {
        let leaderboard = [{
            nid: this.nid,
            venue: this.venue,
            sport: this.sport,
            status: this.status,
            posted: this.posted,
            updated: this.updated,
            name: this.name
        }];
        return leaderboard;
    }

    loadCompetitorsAndMatches() {
        this.loadCompetitors();
        this.loadMatches();
    }

    build() {
        console.log('build');

        //For each competitor
        for (const currentCompetitor of this.competitors) {

                //For each match
                for (const currentMatch of this.matches) {

                    if (currentMatch.hasPlayer(currentCompetitor.player)) {

                        let currentMatchPlayer = currentMatch.getMatchPlayer(currentCompetitor.player);

                        currentCompetitor.addMatchResults(
                            currentMatchPlayer.gamesPlayed,
                            currentMatchPlayer.gamesWon,
                            currentMatchPlayer.gamesLost,
                            currentMatchPlayer.gamesDrawn,
                            currentMatchPlayer.points);

                    }
                }
        }

        this.competitors.sort(function(a,b) {
            return b.points - a.points;
        });
    }


    reset(): void {
        console.log('reset()');

        //For each competitor
        for (const competitor of this.competitors) {
            competitor.reset();
        }

        //Matches
        for (const match of this.matches) {
            match.reset();
        }

        for (const game of this.games) {
            let index = this.games.indexOf(game);
            if (index > -1) {
                this.games.splice(index, 1);
            }
        }


    }

    addGame(game: GameModel): void {
        let found = this.find(game);

        if (found == 0) {
            if (game.nid > 0) {
                this.games.push(game);
//                console.log('Adding game',game);
            } else {
                console.log('Game ID missing',game);
            }
        } else {
//            console.log('Game already listed',game);

        }
    }

    removeGame(game: GameModel): void {

        let index = this.games.indexOf(game);

        if(index > -1){
            this.games.splice(index, 1);
        }


    }

    update(data: any) {
        for (const item of data) {
//            console.log('Processing: ', item);
            let game = new GameModel(item);
            this.addGame(game);
        }
    }

    find(newGame: GameModel): number {

        for (const currentGame of this.games) {
            if (currentGame.nid == newGame.nid) {
                return 1;
            }
        }

        return 0;

    }

    associatePlayers() {
//        console.log('asssociatePlayers');


        for (const currentGame of this.games) {
            //Get challenger
            let challenger = this.membership.getPlayer(currentGame.challenger);

            //Get opponent
            let opponent = this.membership.getPlayer(currentGame.opponent);

            currentGame.setChallenger(challenger);
            currentGame.setOpponent(opponent);



            //Set winner if challenger
            if (currentGame.winner == currentGame.challenger) {
                currentGame.setWinner(challenger);
                currentGame.setLoser(opponent);
            }

            //Set winner if opponent
            if (currentGame.winner == currentGame.opponent) {
                currentGame.setWinner(opponent);
                currentGame.setLoser(challenger);
            }

//            console.log('associated',currentGame);

        }
    }

    loadCompetitors() {
        for (const game of this.games) {

            this.addCompetitorToList(game.challenger_player);
            this.addCompetitorToList(game.opponent_player);

        }
    }

    loadMatches() {
        for (const game of this.games) {
            this.addMatchGame(game);
        }
    }

    addCompetitorToList(player: PlayerModel) {

        let addCompetitor: boolean = true;

        for (const competitor of this.competitors) {
            if (addCompetitor) {
                if (competitor.isPlayer(player)) {
                    addCompetitor = false;
                }
            }
        }

        if (addCompetitor == true) {
            let newCompetitor: CompetitorModel = new CompetitorModel(player);
            this.competitors.push(newCompetitor);
        }
    }

    addMatchGame(game: GameModel) {

        let match: MatchModel = this.getOrStartMatch(game);

        match.addResult(game.winner_player);

    }

    getOrStartMatch(game: GameModel) {

        let addMatch: boolean = true;

        for (const match of this.matches) {
            if (addMatch) {
                if (match.hasPlayers(game.challenger_player, game.opponent_player)) {
                    addMatch = false;
                    return match;
                }
            }
        }

        if (addMatch) {
            let newMatch: MatchModel = new MatchModel(game.challenger_player, game.opponent_player);
            this.matches.push(newMatch);
            return newMatch;
        }
    }

    setVenue(venue: VenueModel) {
        this.venueModel = venue;
    }

    setMembership(membership: MembershipModel) {
        this.membership = membership;
    }


}