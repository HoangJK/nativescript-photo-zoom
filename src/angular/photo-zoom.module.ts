import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("PhotoZoom", () => require("../").PhotoZoom);

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
})
export class NativeScriptUIPhotoZoomModule {

}