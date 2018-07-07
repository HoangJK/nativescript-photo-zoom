import { View, Property, EventData } from "tns-core-modules/ui/core/view";


export class PhotoZoomBase extends View {
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
    valueConverter: (v) => v,
    valueChanged: (target, oldValue, newValue) => {
    },
});
srcProperty.register(PhotoZoomBase);

export const placeholderProperty = new Property<PhotoZoomBase, string>({
    name: "placeholder",
    defaultValue: undefined,
    valueConverter: (v) => v,
    valueChanged: (target, oldValue, newValue) => {
    },
});
placeholderProperty.register(PhotoZoomBase);

export const stretchProperty = new Property<PhotoZoomBase, string>({
    name: "stretch",
    defaultValue: undefined,
    valueConverter: (v) => v,
    valueChanged: (target, oldValue, newValue) => {
    },
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
    defaultValue: 4
});