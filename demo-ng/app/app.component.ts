import { Component } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { screen } from "platform";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    public screenWidth = screen.mainScreen.widthDIPs;
    public screenHeight = screen.mainScreen.heightDIPs;
    public items = new ObservableArray([
        {
            image: 'https://s-media-cache-ak0.pinimg.com/originals/4c/92/cc/4c92cc1dfbde6a6a40fe799f56fa9294.jpg'
        },
        {

            image: 'https://images.unsplash.com/photo-1487715433499-93acdc0bd7c3?auto=format&fit=crop&w=2228&q=80'
        },
        {
            image: 'https://img15.deviantart.net/60ea/i/2012/310/e/4/shazam_by_maiolo-d5k6fr5.jpg'
        },
        {
            image: 'https://i.annihil.us/u/prod/marvel/i/mg/d/f0/558982863130d.jpg'
        },
        {
            image: 'https://images.unsplash.com/photo-1466872732082-8966b5959296?auto=format&fit=crop&w=2100&q=80'
        },
        {
            image: 'https://images.unsplash.com/photo-1464061884326-64f6ebd57f83?auto=format&fit=crop&w=2100&q=80'
        },
        {
            image: 'https://otakukart.com/animeblog/wp-content/uploads/2016/04/Kurama-Naruto.png'
        },
        {
            image: 'https://images.unsplash.com/photo-1474861644511-0f2775ae97cc?auto=format&fit=crop&w=2391&q=80'
        }
    ]);

    constructor() { }

}
