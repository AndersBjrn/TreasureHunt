import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { UserService } from 'userService';
import { Aurelia } from 'aurelia-framework'
import { Router } from "aurelia-router";

@inject(HttpClient, UserService, Aurelia, Router)
export class riddlePage {
    constructor(http, UserService, Aurelia, Router) {
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
        this.router = Router;
        this.aurelia = Aurelia;
        this.http = http;
        this.UserService = UserService;
        this.riddle = "testgåta51043";
        this.answer = ``;
        this.correctAnswer = "";
        this.loggedInPlayer = `?username=`;
    }

    DisplayPassword() {
        this.CheckAnswer();
        this.answer = "&password=sup3rg00dp4$$w0rd";
    }

    CheckAnswer() {
        if (this.answer == 1) {
            this.router.navigate('riddle-page');
        }
    }

}
