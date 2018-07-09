import { View, Property, EventData } from "tns-core-modules/ui/core/view";


export class PhotoZoomBase extends View {
    public static finalImageSetEvent: string = "finalImageSet";
    public static failureEvent: string = "failure";
    public static submitEvent: string = "submit";

    public src: string;
    public placeholder: string;
    public stretch: string;
    public zoomScale: number;
    public minZoom: number;
    public maxZoom: number;
}

export const srcProperty = new Property<PhotoZoomBase, string>({
    name: "src",
    defaultValue: undefined,
});
srcProperty.register(PhotoZoomBase);

export const placeholderProperty = new Property<PhotoZoomBase, string>({
    name: "placeholder",
    defaultValue: undefined,
});
placeholderProperty.register(PhotoZoomBase);

export const stretchProperty = new Property<PhotoZoomBase, string>({
    name: "stretch",
    defaultValue: undefined,
});
stretchProperty.register(PhotoZoomBase);

export const zoomScaleProperty = new Property<PhotoZoomBase, number>({
    name: 'zoomScale',
    defaultValue: 1
});

export const minZoomScaleProperty = new Property<PhotoZoomBase, number>({
    name: 'minZoom',
    defaultValue: 1
});

export const maxZoomScaleProperty = new Property<PhotoZoomBase, number>({
    name: 'maxZoom',
    defaultValue: 2
});