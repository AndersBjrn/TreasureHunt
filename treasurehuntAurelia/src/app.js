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
                title: 'Logga in'
            },
            {
                route: ['newuser'],
                name: 'newuser',
                moduleId: 'newUser',
                nav: true,
                title: 'Skapa konto'
            },
            {
                route: ['riddle-page'],
                name: 'riddle',
                moduleId: 'riddle-page',
                nav: true,
                title: 'Klara av problemet!'
            },
            {
                route: ['Haxx0r'],
                name: 'urlpage',
                moduleId: 'url-page',
                nav: true,
                title: '/api/SecretPage'
            },
            {
                route: ['treasure'],
                name: 'treasure',
                moduleId: 'treasure',
                nav: true,
                title: '9 _ _ _',
            },
            {
                route: ['animate-page'],
                name: 'animate',
                moduleId: 'animate-page',
                nav: true,
                title: 'Klara av problemet!',
            },
            {
                route: ['sign'],
                name: 'sign',
                moduleId: 'sign',
                nav: true,
                title: 'Korsning',
            },
            {
                route: ['pirate'],
                name: 'pirate',
                moduleId: 'pirate',
                nav: true,
                title: 'Piraten!',
            },
            {
                route: ['pirate2'],
                name: 'pirate2',
                moduleId: 'pirate2',
                nav: true,
                title: 'Piraten!',            
},
            {
                route: ['karta'],
                name: 'karta',
                moduleId: 'karta',
                nav: true,
                title: 'Kartan!',
            }
        ]);
    }
}
