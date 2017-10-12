import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { UserService } from 'userService';
import { Aurelia } from 'aurelia-framework'

@inject(HttpClient, UserService, Aurelia)
export class riddlePage {
    constructor(http, UserService, Aurelia) {
        http.configure(config => {
            config
                .withBaseUrl('http://localhost:51043/')
                .withDefaults({
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
        });
        this.aurelia = Aurelia;
        this.http = http;
        this.UserService = UserService;
        this.riddle = "";
        this.answer = "";
        this.correctAnswer = "";
        this.loggedInPlayer = this.UserService.loggedInPlayer;
    }



}
