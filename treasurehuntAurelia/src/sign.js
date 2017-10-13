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
        this.city = "";
        this.getCity();
        this.coordinates = "";
        this.correctCoordinates = "";
        this.UserService = UserService;
        this.loggedInPlayer = this.UserService.loggedInPlayer;

        this.router = Router;
        this.aurelia = Aurelia;
        this.http = http;
        this.UserService = UserService;
        this.riddle = "";
        this.getRiddle();
        this.answer = "";
        this.correctAnswer = "";
        this.loggedInPlayer = this.UserService.loggedInPlayer;
    }

    getCity() {
        this.http.fetch(`api/GetRandomCityFromPlayer?playerName=${this.UserService.loggedInPlayer}`)
            .then(response => response.json())
            .then(data => {
                this.city = data;
            })
    }

    checkCoordinates() {
        this.http.fetch(`api/GetCoordinates?coordinates=${this.coordinates}&city=${this.city}`)
            .then(response => response.json())
            .then(data => {
                if (data === true) {
                    this.answer = "";
                    this.UserService.AddStep();
                    switch (this.UserService.GetSteps()) {
                        case 2: this.router.navigate('paste');
                            break;
                        default: this.getRiddle();
                            break;
                    }
                }
                console.log(data);
            })
    }

    addCityToPlayer() {
        this.http.fetch(`api/AddCityToPlayer?playerName=${this.UserService.loggedInPlayer}&cityName=${this.city}`, { method: 'post' })
    }
}
