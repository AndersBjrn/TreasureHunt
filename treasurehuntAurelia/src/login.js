import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { UserService } from 'userService';
import { Aurelia } from 'aurelia-framework';
import { Router } from "aurelia-router";

@inject(HttpClient, UserService, Aurelia, Router)
export class Login {
    constructor(http, UserService, aurelia, Router) {
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
        this.aurelia = aurelia;
        this.http = http;
        this.UserService = UserService;
        this.playername = "";
        this.password = "";
        this.loggedInPlayer = this.UserService.loggedInPlayer;
              
    }

    Login() {
        this.http.fetch(`api/LogIn?playerName=${this.playername}&playerPassword=${this.password}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data === true) {
                    this.UserService.SetUser(this.playername);
                    this.loggedInPlayer = this.UserService.loggedInPlayer;
                    this.router.navigate('riddle-page');
                }
            });       
    }
}
