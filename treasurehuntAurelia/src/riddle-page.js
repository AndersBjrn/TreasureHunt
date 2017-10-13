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
        this.riddle = "";
        this.getRiddle();
        this.answer = "";
        this.loggedInPlayer = this.UserService.loggedInPlayer;
    }

    getRiddle() {
        this.http.fetch(`api/GetRandomRiddleFromPlayer?playerName=${this.UserService.loggedInPlayer}`)
            .then(response => response.json())
            .then(data => {
                this.riddle = data;
            })
    }

    checkAnswer() {
        this.http.fetch(`api/getAnswer?riddleAnswer=${this.answer}&riddle=${this.riddle}`) 
            .then(response => response.json())
            .then(data => {
                if (data === true) {
                    this.answer = "";
                    this.UserService.AddStep();
                    switch (this.UserService.GetSteps()) {
                        case 2: this.router.navigate('Haxx0r');
                            break;
                        case 1: this.router.navigate('animate-page');
                            break;
                        case 3: this.router.navigate('treasure');
                        default: this.getRiddle();
                            break;
                    }
                }
                console.log(data);
            })
    }

    addRiddleToPlayer() {
        this.http.fetch(`api/AddRiddleToPlayer?playerName=${this.UserService.loggedInPlayer}&riddleText=${this.riddle}`, { method: 'post' })
    }

}
