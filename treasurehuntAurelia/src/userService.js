export class UserService {
    constructor() {
        this.loggedInPlayer = "";
    }

    SetUser(name) {
        this.loggedInPlayer = name;
    }

}
