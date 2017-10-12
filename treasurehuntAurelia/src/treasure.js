import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { UserService } from 'userService';

@inject(HttpClient, UserService)

export class Treasure {
    constructor(http, UserService) {
        this.firstnumber1 = 0;
        this.firstnumber2 = 0;
        this.firstnumber3 = 0;
        this.firstnumber4 = 0;
        //this.number1 = "";
        //this.number2 = "";
        //this.number3 = "";
        //this.number4 = "";
        this.UserService = UserService;
        this.loggedInPlayer = this.UserService.loggedInPlayer;

    }
    CorrectTreasureCode() {
        //this.firstnumber1 = this.number1;
        //this.firstnumber2 = this.number2;
        //this.firstnumber3 = this.number3;
        //this.firstnumber4 = this.number4;
        if (this.firstnumber1 == 9 && this.firstnumber2 == 1 && this.firstnumber3 == 8 && this.firstnumber4 == 5) {
            console.log("Bra")
        }
        else {
            console.log("Dåligt")
        }
    }
}
