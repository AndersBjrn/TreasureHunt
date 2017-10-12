export class App {

    configureRouter(config, router) {
        this.router = router;
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
            },
            {
                route: ['treasure'],
                name: 'treasure',
                moduleId: 'treasure',
                nav: true,
                title: 'Kod: 9185',
            },
            {
                route: ['sign'],
                name: 'sign',
                moduleId: 'sign',
                nav: true,
                title: 'Korsning',
            }
        ]);
    }
}
