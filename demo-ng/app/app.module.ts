import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { PagerModule } from "nativescript-pager/angular";
import { NativeScriptUIPhotoZoomModule } from "nativescript-photo-zoom/angular";
import application = require("application");
import photoZoom = require("nativescript-photo-zoom");

if (application.android) {
    application.on("launch", () => {
        photoZoom.initialize();
    });
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptUIPhotoZoomModule,
        PagerModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
    ],
    providers: [
        ItemService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
