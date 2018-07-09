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
            image: "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-400502.jpg"
        },
        {
            image: "https://images3.alphacoders.com/712/712915.jpg",
        },
        {
            image: "~/assets/images/inuyasha.jpg",
        },
        {
            image: "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-400502.jpg"
        },
        {
            image: "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-400502.jpg"
        },
        {
            image: "https://images3.alphacoders.com/712/712915.jpg",
        },
        {
            image: "~/assets/images/inuyasha.jpg",
        },
        {
            image: "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-400502.jpg"
        },
        {
            image: "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-400502.jpg"
        },
        {
            image: "https://images3.alphacoders.com/712/712915.jpg",
        },
        {
            image: "~/assets/images/inuyasha.jpg",
        },
        {
            image: "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-400502.jpg"
        },
    ]);

    constructor() { }

    onSubmitImage(item) {
        item.loaded = false;
    }

    onFinalImageSet(item) {
        item.loaded = true;
    }

    onFailure(item) {
        item.loaded = true;
    }

}
