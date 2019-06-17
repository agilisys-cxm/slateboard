
export class PlayerModel {
    nid: number;
    first: string;
    last: string;
    thumb: string;
    image: string;
    username: string;

    constructor(data:any) {
        this.nid = data.nid;
        this.first = data.first;
        this.last = data.last;
        this.username = data.username;

        let $pos = data.thumb.indexOf('player-profile');
        if ($pos > 1) {
            this.thumb = data.thumb;
            this.image = data.image;
        } else {
            this.thumb = '../../assets/img/lego-head.png';
            this.image = '../../assets/img/lego-head.png';

        }

    }

    serialize(): any {
        let player = [{
            nid: this.nid,
            first: this.first,
            last: this.last,
            thumb: this.thumb,
            image: this.image,
            username: this.username
        }];
        return player;
    }
}