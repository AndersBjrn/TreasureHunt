export class App {

    configureRouter(config, router) {
        this.router = router;
        this.loggedInPlayer = "asdf";
        config.title = 'Skattjakt';
        config.map([
            {
                route: ['', 'login', 'home'],
                name: 'Login',
                moduleId: 'login',
                nav: true,
                title: 'Logga in',
            },
            {
                route: ['riddle-page'],
                name: 'riddle',
                moduleId: 'riddle-page',
                nav: true,
                title: 'Klara av problemet!',
            }
        ]);
    }

    SetLoggedInPlayer(playername) {
        this.loggedInPlayer = playername;
    }
}
