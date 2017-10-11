import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class newUser {
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
        this.newUserName = "";
        this.newUserPassword = "";
        this.error = "";
        this.response = "";
    }

    createNewUser() {
        this.checkIfPlayerExists().then(x =>
            {
            this.taken = x;
            console.log("after check", x)
            }
        ).then(x => {

            if (!this.taken) {
                this.http.fetch(`api/CreatePlayer?name=${this.newUserName}&password=${this.newUserPassword}`, { method: 'post' })
                this.response = "New user added";
            }
            else {
                this.response = "Username already taken"
            }
        })
    }

    checkIfPlayerExists() {
        return this.http.fetch(`api/CheckIfUserExists?playerName=${this.newUserName}`)
            .then(response => {

                return response.json()

            })
            .then(data => { 
                console.log("Check", data)
                return data;
            })
    }


}
