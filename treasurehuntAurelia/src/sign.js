import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { UserService } from 'userService';

@inject(HttpClient, UserService)

export class Sign {
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
        this.loggedInPlayer = this.UserService.loggedInPlayer;
    }

    getCity() {
        this.http.fetch(`api/GetRandomRiddleFromPlayer?playerName=${this.UserService.loggedInPlayer}`)
            .then(response => response.json())
            .then(data => {
                this.riddle = data;
            })
    }
}
