export class App {

    configureRouter(config, router) {
        this.router = router;
        this.loggedInPlayer = "";
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
                route: ['newuser'],
                name: 'newuser',
                moduleId: 'newUser',
                nav: true,
                title: 'Skapa konto',
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
