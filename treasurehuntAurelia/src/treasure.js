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
        
        this.treasureclass = "treasureDesign";
        this.UserService = UserService;
        this.loggedInPlayer = this.UserService.loggedInPlayer;

    }
    CorrectTreasureCode() {

        if (this.firstnumber1 == 9 && this.firstnumber2 == 1 && this.firstnumber3 == 8 && this.firstnumber4 == 5) {
            console.log("Bra, du knäckte koden!")
            this.treasureclass = "treasureDesign2";
        }
        else {
            console.log("Det här går ju dåligt...")
        }
    }


}
