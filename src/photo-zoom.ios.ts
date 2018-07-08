import { Image, Stretch } from 'tns-core-modules/ui/image';
import { layout } from 'tns-core-modules/ui/core/view';
import { topmost } from 'tns-core-modules/ui/frame';
import * as imageSource from 'tns-core-modules/image-source';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';

import { Property } from 'tns-core-modules/ui/core/view';

export const stretchProperty = new Property<PhotoZoom, Stretch>({
    name: 'stretch'
});

export const zoomScaleProperty = new Property<PhotoZoom, number>({
    name: 'zoomScale',
    defaultValue: 1
});

export const minZoomScaleProperty = new Property<PhotoZoom, number>({
    name: 'minZoom',
    defaultValue: 1
});

export const maxZoomScaleProperty = new Property<PhotoZoom, number>({
    name: 'maxZoom',
    defaultValue: 4
});

export const srcProperty = new Property<PhotoZoom, string>({
    name: 'src'
});

export class PhotoZoom extends ScrollView {
    _image: Image;
    nativeView: UIScrollView;
    private layoutWidth: number;
    private layoutHeight: number;
    private delegate: any;
    src: string;
    zoomScale: number;
    minZoom: number;
    maxZoom: number;
    stretch: string;
    constructor() {
        super();
        this.delegate = PhotoZoomDelegateImpl.initWithOwner(
            new WeakRef<PhotoZoom>(this)
        );
        const nativeView = this.nativeView;
        this._image = new Image();
        this._image.stretch = "aspectFit";
        this._image.nativeView.clipsToBounds = true;
        nativeView.delegate = this.delegate;
        nativeView.zoomScale = this.zoomScale;
        nativeView.minimumZoomScale = this.minZoom;
        nativeView.maximumZoomScale = this.maxZoom;
        nativeView.autoresizingMask = 2;
        nativeView.showsHorizontalScrollIndicator = false;
        nativeView.showsVerticalScrollIndicator = false;
        this.content = this._image;
    }

    public disposeNativeView() {
        this.delegate = null;
    }

    [srcProperty.setNative](src: string) {
        if (typeof src === 'string' && src.startsWith('res://')) {
            this._image.imageSource = imageSource.fromNativeSource(
                UIImage.imageNamed(src.replace('res://', ''))
            );
        } else {
            this._image.src = src;
        }
    }

    [stretchProperty.setNative](value: Stretch) {
        this._image.stretch = value;
    }

    [zoomScaleProperty.setNative](value: number) {
        if (this.nativeView) {
            this.nativeView.zoomScale = value;
        }
    }

    [minZoomScaleProperty.setNative](value: number) {
        if (this.nativeView) {
            this.nativeView.minimumZoomScale = value;
        }
    }

    [maxZoomScaleProperty.setNative](value: number) {
        if (this.nativeView) {
            this.nativeView.maximumZoomScale = value;
        }
    }
}

srcProperty.register(PhotoZoom);
stretchProperty.register(PhotoZoom);
zoomScaleProperty.register(PhotoZoom);
minZoomScaleProperty.register(PhotoZoom);
maxZoomScaleProperty.register(PhotoZoom);

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
}
