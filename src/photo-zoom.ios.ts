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
        nativeView.delegate = this.delegate;
        nativeView.zoomScale = this.zoomScale;
        nativeView.minimumZoomScale = this.minZoom;
        nativeView.maximumZoomScale = this.maxZoom;
        this.content = this._image;
        this.scrollBarIndicatorVisible = false;
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

    [stretchProperty.setNative](stretch: Stretch) {
        this._image.stretch = stretch;
    }

    [zoomScaleProperty.setNative](scale: number) {
        if (this.nativeView) {
            this.nativeView.zoomScale = scale;
        }
    }

    [minZoomScaleProperty.setNative](scale: number) {
        if (this.nativeView) {
            this.nativeView.minimumZoomScale = scale;
        }
    }

    [maxZoomScaleProperty.setNative](scale: number) {
        if (this.nativeView) {
            this.nativeView.maximumZoomScale = scale;
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
