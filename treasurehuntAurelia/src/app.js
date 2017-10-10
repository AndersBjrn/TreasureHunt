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
    }

    getRiddle() {
        this.http.fetch('api/GetRandomRiddle')
            .then(response => {
                console.log(response)
                return response.json()
            })
        .then(data => {
            console.log(data);
        })
    }
}
