# NativeScript Photo Zoom
A NativeScript Photo Zoom
### Based on
[ScrollView ](https://docs.nativescript.org/angular/ui/ng-ui-widgets/scroll-view) and [SDWebImage ](https://github.com/rs/SDWebImage) for iOS

[PhotoDraweeView](https://github.com/ongakuer/PhotoDraweeView) and [Fresco](https://github.com/facebook/fresco) for Android

Referenced from [nativescript-fresco](https://github.com/NativeScript/nativescript-fresco)  and [nativescript-image-zoom](https://github.com/triniwiz/nativescript-image-zoom)
## Installation
Run `tns plugin add nativescript-photo-zoom`
## API
### Events
* **finalImageSet**  
This event is fired after the final image has been set.
* **failure**  
This event is fired after the fetch of the final image failed.
* **submit**  
This event is fired before the image request is submitted (only Android).
### Instance Properties
* **src** - *String*  
String value used for the image URI. You can use this property to set the image to be loaded from remote location (http, https), from the resources and local files of your {N} application.
* **placeholder** - *String*  
String value used for the placeholder image URI. You can use this property to set a placeholder image loaded from the local and resources files of your {N} application.
* **stretch** - *String*  
Describes how image is resized to fill its allocated space. This property can be set to:
*aspectFill*, 
*aspectFit*, 
*fill* or 
*none*
## Usage in Angular
- Import `NativeScriptUIPhotoZoomModule` in `NgModule`:
```typescript
import { NativeScriptUIPhotoZoomModule } from "nativescript-photo-zoom/angular";
//......
@NgModule({
	//......
	imports: [
        //......
		NativeScriptUIPhotoZoomModule,
        //......
	],
    //......
})
```
```html
<!-- app.component.html -->
<GridLayout>
    <PhotoZoom [src]="photoUrl" placeholder="res://placeholder" (finalImageSet)="onFinalImageSet($event)" (failure)="onFailure($event)"></PhotoZoom>
</GridLayout>
```
```ts
// app.componnet.ts
import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {

    public photoUrl = "https://vignette.wikia.nocookie.net/inuyasha/images/b/b5/Inuyasha.png";

    constructor() { }

    onFinalImageSet(event) {
        console.log("onFinalImageSet: ", event);
    }

    onFailure(event) {
        console.log("onFailure: ", event);
    }
}

```
## Demos
This repository includes both Angular and plain NativeScript demos. In order to run those execute the following in your shell:
```shell
$ git clone https://github.com/HoangJK/nativescript-photo-zoom.git
$ cd nativescript-photo-zoom/src
$ npm install
$ npm run demo.ios
```
This will run the plain NativeScript demo project on iOS. If you want to run it on Android simply use the .android instead of the .ios sufix.

If you want to run the Angular demo simply use the demo.ios.ng or demo.android.ng.