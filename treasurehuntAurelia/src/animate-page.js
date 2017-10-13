import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { UserService } from 'userService';
import { Aurelia } from 'aurelia-framework'
import { Router } from "aurelia-router";

@inject(HttpClient, UserService, Aurelia, Router)
export class animatePage {
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
        this.paperclass = "papperslapp";
        this.router = Router;
        this.aurelia = Aurelia;
        this.http = http;
        this.UserService = UserService;
        this.riddle = "";
        this.answer = "";
        this.correctAnswer = "";
        this.loggedInPlayer = this.UserService.loggedInPlayer;
    }

    AddAnimation() {
        this.paperclass = "papperslappAnimate"
    }

    checkAnswer() {
        this.router.navigate('riddle-page');
    }
}
