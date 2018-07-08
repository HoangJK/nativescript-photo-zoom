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
            image: "https://www.alveo-slovakia.com/photo/147689/w3css-images-bordered-image.jpg",
        },
        {
            image: "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-400502.jpg"
        },
        {
            image: "https://images3.alphacoders.com/712/712915.jpg",
        },
        {
            image: "https://images8.alphacoders.com/869/869862.jpg",
        },
        {
            image: "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-400502.jpg"
        }
    ]);

    constructor() { }

}
