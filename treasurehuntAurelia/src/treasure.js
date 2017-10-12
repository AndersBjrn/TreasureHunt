import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { UserService } from 'userService';

@inject(HttpClient, UserService)

export class Treasure {
    constructor(http, UserService) {
        this.number1 = "";
        this.number2 = "";
        this.number3 = "";
        this.number4 = "";
        this.loggedInPlayer = this.UserService.loggedInPlayer;

        CorrectTreasureCode() {
        
        }
    }
}
