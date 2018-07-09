import {
    PhotoZoomBase,
    srcProperty,
    placeholderProperty,
    stretchProperty,
    zoomScaleProperty,
    minZoomScaleProperty,
    maxZoomScaleProperty
} from "./photo-zoom.common";
import * as application from "tns-core-modules/application";
import * as types from "tns-core-modules/utils/types";
import * as utils from "tns-core-modules/utils/utils";
import * as fs from "tns-core-modules/file-system";
import * as imageSource from "tns-core-modules/image-source";
import { PercentLength } from "tns-core-modules/ui/styling/style-properties";


export function initialize() {
    if (application.android) {
        com.facebook.drawee.backends.pipeline.Fresco.initialize(application.android.context);
    }
}

export class PhotoZoom extends PhotoZoomBase {
    nativeView: me.relex.photodraweeview.PhotoDraweeView;

    public createNativeView() {
        const photoDraweeView = new me.relex.photodraweeview.PhotoDraweeView(this._context);
        return photoDraweeView;
    }

    public initNativeView(): void {
        this.initImage();
        this.updateHierarchy();
    }

    [srcProperty.setNative](value: string) {
        this.initImage();
    }

    [placeholderProperty.setNative](value: string) {
        this.updateHierarchy();
    }

    [zoomScaleProperty.setNative](value: number) {
        if (this.nativeView) {
            this.nativeView.setScale(value);
        }
    }

    [minZoomScaleProperty.setNative](value: number) {
        if (this.nativeView) {
            this.nativeView.setMinimumScale(value);
        }
    }

    [maxZoomScaleProperty.setNative](value: number) {
        if (this.nativeView) {
            this.nativeView.setMaximumScale(value);
        }
    }

    private initImage() {
        if (this.nativeView) {
            this.nativeView.setImageURI(null);
            if (this.src) {
                let uri;
                if (utils.isFileOrResourcePath(this.src)) {
                    let res = utils.ad.getApplicationContext().getResources();
                    if (!res) {
                        return;
                    }
                    if (this.src.indexOf(utils.RESOURCE_PREFIX) === 0) {
                        let resName = this.src.substr(utils.RESOURCE_PREFIX.length);
                        let identifier = res.getIdentifier(resName, 'drawable', utils.ad.getApplication().getPackageName());
                        if (0 < identifier) {
                            uri = new android.net.Uri.Builder()
                                .scheme(com.facebook.common.util.UriUtil.LOCAL_RESOURCE_SCHEME)
                                .path(java.lang.String.valueOf(identifier))
                                .build();
                        }
                    }
                    else if (this.src.indexOf("~/") === 0) {
                        uri = android.net.Uri.parse(`file:${fs.path.join(fs.knownFolders.currentApp().path, this.src.replace("~/", ""))}`);
                    }
                    else if (this.src.indexOf("/") === 0) {
                        uri = android.net.Uri.parse(`file:${this.src}`);
                    }
                } else {
                    uri = android.net.Uri.parse(this.src);
                }
                if (!uri) {
                    console.log(`Error: 'src' not valid: ${this.src}`);
                    return;
                }
                this.setPhotoUri(uri);
            }
        }
    }

    private setPhotoUri(uri: android.net.Uri) {
        let that = new WeakRef<PhotoZoom>(this);
        this.nativeView.setEnableDraweeMatrix(false);
        let request: any = com.facebook.imagepipeline.request.ImageRequestBuilder.newBuilderWithSource(uri).build();
        let listener = new com.facebook.drawee.controller.ControllerListener<com.facebook.imagepipeline.image.ImageInfo>({
            onFinalImageSet: (id, imageInfo, animatable) => {
                if (that && that.get()) {
                    let owner = that.get();
                    owner.nativeView.setEnableDraweeMatrix(true);
                    if (imageInfo != null) {
                        owner.nativeView.update(imageInfo.getWidth(), imageInfo.getHeight());
                    }
                    let args = {
                        eventName: PhotoZoomBase.finalImageSetEvent,
                        object: that.get()
                    };
                    owner.notify(args);
                }
            },
            onIntermediateImageSet: (id, imageInfo) => {
                if (that && that.get()) {
                    let owner = that.get();
                    owner.nativeView.setEnableDraweeMatrix(true);
                    if (imageInfo != null) {
                        owner.nativeView.update(imageInfo.getWidth(), imageInfo.getHeight());
                    }
                }
            },
            onFailure: (id, throwable) => {
                if (that && that.get()) {
                    let owner = that.get();
                    owner.nativeView.setEnableDraweeMatrix(false);
                    let args = {
                        eventName: PhotoZoomBase.failureEvent,
                        object: that.get()
                    };
                    owner.notify(args);
                }
            },
            onIntermediateImageFailed: (id, throwable) => {
                if (that && that.get()) {
                    let owner = that.get();
                    owner.nativeView.setEnableDraweeMatrix(false);
                }
            },
            onRelease: (id) => {
            },
            onSubmit: (id, callerContext) => {
                if (that && that.get()) {
                    let owner = that.get();
                    let args = {
                        eventName: PhotoZoomBase.submitEvent,
                        object: that.get()
                    };
                    owner.notify(args);
                }
            }
        });
        let builder = com.facebook.drawee.backends.pipeline.Fresco.newDraweeControllerBuilder();
        builder.setControllerListener(listener);
        builder.setOldController(this.nativeView.getController());
        builder.setImageRequest(request);
        let controller = builder.build();
        this.nativeView.setController(controller);
    }

    private updateHierarchy() {
        if (this.nativeView) {
            let placeholderImageDrawable;
            if (this.placeholder) {
                placeholderImageDrawable = this.getDrawable(this.placeholder);
            }
            let builder: GenericDraweeHierarchyBuilder = new GenericDraweeHierarchyBuilder();
            if (this.placeholder && placeholderImageDrawable) {

                builder.setPlaceholderImage(placeholderImageDrawable);
            }
            if (this.stretch) {
                switch (this.stretch) {
                    case "aspectFill":
                        builder.setActualImageScaleType("centerCrop");
                        break;
                    case "aspectFit":
                        builder.setActualImageScaleType("centerInside");
                        break;
                    case "fill":
                        builder.setActualImageScaleType("fitXY");
                        break;
                    default:
                        builder.setActualImageScaleType("fitCenter");
                        break;
                }
            }
            else {
                builder.setActualImageScaleType("fitCenter");
            }
            let hierarchy = builder.build();
            this.nativeView.setHierarchy(hierarchy);
        }
    }

    private getDrawable(path: string) {
        let drawable;
        if (utils.isFileOrResourcePath(path)) {
            if (path.indexOf(utils.RESOURCE_PREFIX) === 0) {
                drawable = this.getDrawableFromResource(path);
            } else {
                drawable = this.getDrawableFromLocalFile(path);
            }
        }

        return drawable;
    }

    private getDrawableFromLocalFile(localFilePath: string) {
        let img = imageSource.fromFile(localFilePath);
        let drawable: android.graphics.drawable.BitmapDrawable = null;
        if (img) {
            drawable = new android.graphics.drawable.BitmapDrawable(utils.ad.getApplicationContext().getResources(), img.android);
        }

        return drawable;
    }

    private getDrawableFromResource(resourceName: string) {
        let img = imageSource.fromResource(resourceName.substr(utils.RESOURCE_PREFIX.length));
        let drawable: android.graphics.drawable.BitmapDrawable = null;
        if (img) {
            drawable = new android.graphics.drawable.BitmapDrawable(utils.ad.getApplicationContext().getResources(), img.android);
        }

        return drawable;
    }
}

class GenericDraweeHierarchyBuilder {
    private nativeBuilder: com.facebook.drawee.generic.GenericDraweeHierarchyBuilder;

    constructor() {
        let res = application.android.context.getResources();
        this.nativeBuilder = new com.facebook.drawee.generic.GenericDraweeHierarchyBuilder(res);
    }

    public setPlaceholderImage(drawable): GenericDraweeHierarchyBuilder {
        if (!application.android) {
            return null;
        }

        this.nativeBuilder.setPlaceholderImage(drawable, com.facebook.drawee.drawable.ScalingUtils.ScaleType.FIT_CENTER);

        return this;
    }

    public setFailureImage(drawable): GenericDraweeHierarchyBuilder {
        if (!application.android) {
            return null;
        }

        this.nativeBuilder.setFailureImage(drawable);

        return this;
    }

    public setActualImageScaleType(scaleType: string): GenericDraweeHierarchyBuilder {
        if (!application.android) {
            return null;
        }

        this.nativeBuilder.setActualImageScaleType(getScaleType(scaleType));

        return this;
    }

    public build(): com.facebook.drawee.generic.GenericDraweeHierarchy {
        if (!application.android) {
            return null;
        }

        return this.nativeBuilder.build();
    }

    public setFadeDuration(duration: number): GenericDraweeHierarchyBuilder {
        if (!application.android) {
            return null;
        }

        this.nativeBuilder.setFadeDuration(duration);

        return this;
    }

    public setBackground(drawable): GenericDraweeHierarchyBuilder {
        if (!application.android) {
            return null;
        }

        this.nativeBuilder.setBackground(drawable);

        return this;
    }

    public setProgressBarImage(color: string): GenericDraweeHierarchyBuilder {
        if (!application.android) {
            return null;
        }

        let drawable = new com.facebook.drawee.drawable.ProgressBarDrawable();
        if (color) {
            drawable.setColor(android.graphics.Color.parseColor(color));
        }

        this.nativeBuilder.setProgressBarImage(drawable);

        return this;
    }

    public setRoundingParamsAsCircle(): GenericDraweeHierarchyBuilder {
        if (!application.android) {
            return null;
        }

        let params = new com.facebook.drawee.generic.RoundingParams.asCircle();
        this.nativeBuilder.setRoundingParams(params);

        return this;
    }

    public setCornersRadii(topLeft: number, topRight: number, bottomRight: number, bottomLeft: number): GenericDraweeHierarchyBuilder {
        if (!application.android) {
            return null;
        }

        let params = new com.facebook.drawee.generic.RoundingParams();
        params.setCornersRadii(topLeft, topRight, bottomRight, bottomLeft);
        this.nativeBuilder.setRoundingParams(params);

        return this;
    }

    public shutDown(): void {
        this.nativeBuilder.shutDown();
    }
}

function getScaleType(scaleType: string) {
    if (types.isString(scaleType)) {
        switch (scaleType) {
            case "center":
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.CENTER;
            case "centerCrop":
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.CENTER_CROP;
            case "centerInside":
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.CENTER_INSIDE;
            case "fitCenter":
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.FIT_CENTER;
            case "fitEnd":
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.FIT_END;
            case "fitStart":
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.FIT_START;
            case "fitXY":
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.FIT_XY;
            case "focusCrop":
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.FOCUS_CROP;
            default:
                break;
        }
    }
}
