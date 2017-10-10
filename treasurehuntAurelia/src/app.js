import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class App {
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
        this.riddle = "";
        this.getRiddle();
        this.answer = "";
        this.correctAnswer = "";
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
