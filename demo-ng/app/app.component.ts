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
            "albumId": 1,
            "id": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://placehold.it/600/92c952",
            "thumbnailUrl": "https://placehold.it/150/92c952"
        },
        {
            "albumId": 1,
            "id": 2,
            "title": "reprehenderit est deserunt velit ipsam",
            "url": "https://placehold.it/600/771796",
            "thumbnailUrl": "https://placehold.it/150/771796"
        },
        {
            "albumId": 1,
            "id": 3,
            "title": "officia porro iure quia iusto qui ipsa ut modi",
            "url": "https://placehold.it/600/24f355",
            "thumbnailUrl": "https://placehold.it/150/24f355"
        },
        {
            "albumId": 1,
            "id": 4,
            "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
            "url": "https://placehold.it/600/d32776",
            "thumbnailUrl": "https://placehold.it/150/d32776"
        },
        {
            "albumId": 1,
            "id": 5,
            "title": "natus nisi omnis corporis facere molestiae rerum in",
            "url": "https://placehold.it/600/f66b97",
            "thumbnailUrl": "https://placehold.it/150/f66b97"
        },
        {
            "albumId": 1,
            "id": 6,
            "title": "accusamus ea aliquid et amet sequi nemo",
            "url": "https://placehold.it/600/56a8c2",
            "thumbnailUrl": "https://placehold.it/150/56a8c2"
        },
    ]);

    constructor() { }

}
