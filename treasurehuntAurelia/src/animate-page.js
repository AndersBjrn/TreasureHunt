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
        this.riddle = "Finns bakom dig";
        this.answer = "";
        this.correctAnswer = "";
        this.loggedInPlayer = this.UserService.loggedInPlayer;
        this.rstring = this.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        this.randomAnswer = "_ _ _ X = ("+ this.rstring +").length";
    }

    AddAnimation() {
        this.paperclass = "papperslappAnimate"
    }

    randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
    } 

    checkAnswer() {
        if (this.answer == this.rstring) {
        this.router.navigate('riddle-page');
        }
    }
}
