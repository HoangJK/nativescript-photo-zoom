import { PhotoZoomBase } from "./photo-zoom.common";
import { Image, Stretch } from 'tns-core-modules/ui/image';
import { layout } from 'tns-core-modules/ui/core/view';
import { topmost } from 'tns-core-modules/ui/frame';
import * as imageSource from 'tns-core-modules/image-source';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { GestureTypes } from 'tns-core-modules/ui/gestures';
import { EventData } from "tns-core-modules/data/observable";
import { Property } from 'tns-core-modules/ui/core/view';


export const srcProperty = new Property<PhotoZoom, string>({
    name: 'src'
});

export const placeholderProperty = new Property<PhotoZoom, string>({
    name: "placeholder",
    defaultValue: undefined,
});

export const stretchProperty = new Property<PhotoZoom, Stretch>({
    name: 'stretch'
});

export const zoomScaleProperty = new Property<PhotoZoom, number>({
    name: 'zoomScale',
    defaultValue: 1
});

export class PhotoZoom extends ScrollView {
    _image: Image;
    nativeView: UIScrollView;
    private layoutWidth: number;
    private layoutHeight: number;
    private delegate: any;
    src: string;
    placeholder: string;
    stretch: string;
    zoomScale: number;
    constructor() {
        super();
        this.delegate = PhotoZoomDelegateImpl.initWithOwner(
            new WeakRef<PhotoZoom>(this)
        );
        const nativeView = this.nativeView;
        this._image = new Image();
        this._image.stretch = "aspectFit";
        this._image.nativeView.clipsToBounds = true;
        let that = new WeakRef<PhotoZoom>(this);
        this._image.on(GestureTypes.doubleTap, (event: any) => {
            if (that && that.get()) {
                let owner = that.get();
                let tapPoint: CGPoint = event.ios.locationInView(owner.nativeView.subviews[0]);
                if (owner.nativeView.zoomScale >= 1 && owner.nativeView.zoomScale < 1.5) {
                    owner.nativeView.maximumZoomScale = 1.5;
                    owner.nativeView.zoomToRectAnimated(CGRectMake(tapPoint.x, tapPoint.y, 0, 0), true);
                }
                else if (owner.nativeView.zoomScale >= 1.5 && owner.nativeView.zoomScale < 3) {
                    owner.nativeView.maximumZoomScale = 3;
                    owner.nativeView.zoomToRectAnimated(CGRectMake(tapPoint.x, tapPoint.y, 0, 0), true);
                }
                else {
                    owner.nativeView.setZoomScaleAnimated(1, true)
                }
            }
        });
        nativeView.delegate = this.delegate;
        nativeView.zoomScale = this.zoomScale;
        nativeView.maximumZoomScale = 3;
        nativeView.autoresizingMask = 2;
        nativeView.showsHorizontalScrollIndicator = false;
        nativeView.showsVerticalScrollIndicator = false;
        this.content = this._image;
    }

    public disposeNativeView() {
        this.delegate = null;
    }

    [srcProperty.setNative](src: string) {
        if (!src) {
            console.error("Property 'src' is empty!");
            return;
        }
        if (src.startsWith('http')) {
            let that = new WeakRef<PhotoZoom>(this);
            let placeholder;
            if (this.placeholder && imageSource.isFileOrResourcePath(this.placeholder) && imageSource.fromFileOrResource(this.placeholder)) {
                placeholder = imageSource.fromFileOrResource(this.placeholder).ios;
            }
            this._image.nativeView.sd_setImageWithURLPlaceholderImageCompleted(
                src,
                placeholder ? placeholder : null,
                (image: UIImage, error: NSError, type: SDImageCacheType, url: NSURL) => {
                    if (that && that.get()) {
                        let owner = that.get();
                        if (error) {
                            let args = {
                                eventName: PhotoZoomBase.failureEvent,
                                object: that.get()
                            };
                            owner.notify(args);

                        }
                        else {
                            let args = {
                                eventName: PhotoZoomBase.finalImageSetEvent,
                                object: that.get()
                            };
                            owner.notify(args);
                        }
                    }
                }
            );
        }
        else {
            this._image.src = src;
        }
    }

    [stretchProperty.setNative](value: Stretch) {
        this._image.stretch = value;
    }

    [zoomScaleProperty.setNative](value: number) {
        if (this.nativeView) {
            this.nativeView.setZoomScaleAnimated(value, true);
        }
    }
}

srcProperty.register(PhotoZoom);
placeholderProperty.register(PhotoZoom);
stretchProperty.register(PhotoZoom);
zoomScaleProperty.register(PhotoZoom);

@ObjCClass(UIScrollViewDelegate)
export class PhotoZoomDelegateImpl extends NSObject implements UIScrollViewDelegate {
    private owner: WeakRef<PhotoZoom>;

    public static initWithOwner(owner: WeakRef<PhotoZoom>): PhotoZoomDelegateImpl {
        const delegate = new PhotoZoomDelegateImpl();
        delegate.owner = owner;
        return delegate;
    }

    viewForZoomingInScrollView(scrollView: UIScrollView) {
        const owner = this.owner.get();
        return owner._image.nativeView;
    }

    scrollViewDidZoom?(scrollView: UIScrollView): void {
        const owner = this.owner.get();
        owner.zoomScale = scrollView.zoomScale;
        let args = {
            eventName: PhotoZoomBase.scaleChangedEvent,
            object: owner
        };
        owner.notify(args);
    }
}
