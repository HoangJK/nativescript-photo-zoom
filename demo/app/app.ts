import "./bundle-config";
import * as application from 'tns-core-modules/application';

import photoZoom = require("nativescript-photo-zoom");

if (application.android) {
    application.on("launch", () => {
        photoZoom.initialize();
    });
}
application.start({ moduleName: "main-page" });
