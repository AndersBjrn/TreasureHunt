import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { UserService } from 'userService';
import { Aurelia } from 'aurelia-framework'
import { Router } from "aurelia-router";

@inject(HttpClient, UserService, Aurelia, Router)
export class karta {
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

        this.loggedInPlayer = this.UserService.loggedInPlayer;
    }

    nextPage() {
        this.router.navigate('riddle-page');
    }

}
