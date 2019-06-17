export class SessionModel {
    token: string;
    sessid: string;
    session_name: string;

    constructor(data:any) {
        if (data) {
            this.token = data.token;
            this.sessid = data.sessid;
            this.session_name = data.session_name;
        }
    }

    serialize(): any {
        let session = [{
            token: this.token,
            sessid: this.sessid,
            session_name: this.session_name
        }];
        return session;
    }
}