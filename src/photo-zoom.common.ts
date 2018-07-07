import { View, Property, EventData } from "tns-core-modules/ui/core/view";


export class PhotoZoomBase extends View {
    public src: string;
    public placeholder: string;
    public stretch: string;
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