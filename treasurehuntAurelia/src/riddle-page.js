import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { UserService } from 'userService';

@inject(HttpClient, UserService)
export class riddlePage {
    constructor(http, UserService) {
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
        this.http = http;
        this.UserService = UserService;
        this.riddle = "";
        this.getRiddle();
        this.answer = "";
        this.correctAnswer = "";
        this.loggedInPlayer = this.UserService.loggedInPlayer;
    }

    getRiddle() {
        this.http.fetch('api/GetRandomRiddle')
            .then(response => response.json())
            .then(data => {
                this.riddle = data;
            })
    }

    checkAnswer() {
        this.http.fetch(`api/getAnswer?riddleAnswer=${this.answer}&riddle=${this.riddle}`) 
            .then(response => response.json())
            .then(data => {
                this.correctAnswer = data;
            })
    }

}
