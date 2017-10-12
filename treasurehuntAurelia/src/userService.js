export class UserService {
    constructor() {
        this.loggedInPlayer = "";
        this.completedSteps = 0;
    }

    SetUser(name) {
        this.loggedInPlayer = name;
    }

    AddStep() {
        this.completedSteps++;
    }

    GetSteps() {
        return this.completedSteps;
    }

    GetUser() {
        return this.loggedInPlayer;
    }

}
