
export class UserModel {
    uid: number;
    mail: string;
    name: string;
    player: number;
    thumb: string;
    image: string;
    token: string;
    sessid: string;
    session_name: string;

    constructor(data:any) {

        if (data) {
            console.log('data', data);

            this.uid = data.uid;
            this.mail = data.mail;
            this.name = data.name;

            if (data.player) {

                this.player = data.player;

            } else {

                if (data.field_player) {
                    this.player = data.field_player.und[0].target_id;
                }

            }
        } else {
            this.name = 'Not logged in';
        }
    }

    serialize(): any {
        let user = [{
            uid: this.uid,
            mail: this.mail,
            name: this.name,
            player: this.player
        }];
        return user;
    }
}