import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class Login {
    constructor(http) {
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
        this.playerName = "";
        this.password = "";
        this.Login();        
    }

    login() {
        this.http.fetch(`api/LogIn?Name=${this.playerName}&playerPassword=${this.password}`)
            .then(response => response.json())
            .then(data => {
                this.correctAnswer = data;
                })       
    }
}
