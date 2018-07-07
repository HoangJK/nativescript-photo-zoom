import comfacebookdraweeviewDraweeView = com.facebook.drawee.view.SimpleDraweeView;
import androidviewGestureDetectorOnDoubleTapListener = android.view.GestureDetector.OnDoubleTapListener;
import androidviewViewOnLongClickListener = android.view.View.OnLongClickListener;
import androidgraphicsMatrix = android.graphics.Matrix;
import androidgraphicsRectF = android.graphics.RectF;
import androidviewView = android.view.View;
import androidviewMotionEvent = android.view.MotionEvent;
import androidcontentContext = android.content.Context;
declare module me {
    export module relex {
        export module photodraweeview {
            export class Attacher {
                public static HORIZONTAL: number;
                public static VERTICAL: number;
                public setMinimumScale(param0: number): void;
                public getDrawMatrix(): androidgraphicsMatrix;
                public onDrag(param0: number, param1: number): void;
                public getScale(): number;
                public onTouch(param0: androidviewView, param1: androidviewMotionEvent): boolean;
                public setScale(param0: number, param1: boolean): void;
                public onScaleEnd(): void;
                public checkMatrixBounds(): boolean;
                public getDisplayRect(): androidgraphicsRectF;
                public checkMatrixAndInvalidate(): void;
                public setAllowParentInterceptOnEdge(param0: boolean): void;
                public getDraweeView(): comfacebookdraweeviewDraweeView;
                public setScale(param0: number, param1: number, param2: number, param3: boolean): void;
                public setOnViewTapListener(param0: me.relex.photodraweeview.OnViewTapListener): void;
                public onFling(param0: number, param1: number, param2: number, param3: number): void;
                public setMediumScale(param0: number): void;
                public getMinimumScale(): number;
                public setOnDoubleTapListener(param0: androidviewGestureDetectorOnDoubleTapListener): void;
                public setMaximumScale(param0: number): void;
                public setOrientation(param0: number): void;
                public constructor(param0: comfacebookdraweeviewDraweeView);
                public getMediumScale(): number;
                public setScale(param0: number): void;
                public getOnViewTapListener(): me.relex.photodraweeview.OnViewTapListener;
                public setZoomTransitionDuration(param0: number): void;
                public setOnLongClickListener(param0: androidviewViewOnLongClickListener): void;
                public getMaximumScale(): number;
                public onDetachedFromWindow(): void;
                public setOnScaleChangeListener(param0: me.relex.photodraweeview.OnScaleChangeListener): void;
                public onScale(param0: number, param1: number, param2: number): void;
                public setOnPhotoTapListener(param0: me.relex.photodraweeview.OnPhotoTapListener): void;
                public getOnPhotoTapListener(): me.relex.photodraweeview.OnPhotoTapListener;
                public update(param0: number, param1: number): void;
            }
            export module Attacher {
                export class AnimatedZoomRunnable {
                    public run(): void;
                    public constructor(param0: me.relex.photodraweeview.Attacher, param1: number, param2: number, param3: number, param4: number);
                }
                export class FlingRunnable {
                    public cancelFling(): void;
                    public run(): void;
                    public fling(param0: number, param1: number, param2: number, param3: number): void;
                    public constructor(param0: me.relex.photodraweeview.Attacher, param1: androidcontentContext);
                }
                export class OrientationMode {
					/**
					 * Constructs a new instance of the me.relex.photodraweeview.Attacher$OrientationMode interface with the provided implementation.
					 */
                    public constructor(implementation: {
                    });
                }
            }
        }
    }
}

declare module me {
    export module relex {
        export module photodraweeview {
            export class BuildConfig {
                public static DEBUG: boolean;
                public static APPLICATION_ID: string;
                public static BUILD_TYPE: string;
                public static FLAVOR: string;
                public static VERSION_CODE: number;
                public static VERSION_NAME: string;
                public constructor();
            }
        }
    }
}

declare module me {
    export module relex {
        export module photodraweeview {
            export class DataViewPager {
                public getType(): me.relex.photodraweeview.DataViewPager.TypeOfMedia;
                public setType(param0: me.relex.photodraweeview.DataViewPager.TypeOfMedia): void;
                public constructor(param0: string, param1: me.relex.photodraweeview.DataViewPager.TypeOfMedia);
                public getUrl(): string;
                public setUrl(param0: string): void;
            }
            export module DataViewPager {
                export class TypeOfMedia {
                    public static PHOTO: me.relex.photodraweeview.DataViewPager.TypeOfMedia;
                    public static VIDEO: me.relex.photodraweeview.DataViewPager.TypeOfMedia;
                    public static valueOf(param0: string): me.relex.photodraweeview.DataViewPager.TypeOfMedia;
                    public static values(): native.Array<me.relex.photodraweeview.DataViewPager.TypeOfMedia>;
                }
            }
        }
    }
}

declare module me {
    export module relex {
        export module photodraweeview {
            export class DefaultOnDoubleTapListener {
                public mAttacher: me.relex.photodraweeview.Attacher;
                public onDoubleTapEvent(param0: androidviewMotionEvent): boolean;
                public onSingleTapConfirmed(param0: androidviewMotionEvent): boolean;
                public setPhotoDraweeViewAttacher(param0: me.relex.photodraweeview.Attacher): void;
                public constructor(param0: me.relex.photodraweeview.Attacher);
                public onDoubleTap(param0: androidviewMotionEvent): boolean;
            }
        }
    }
}

import javautilArrayList = java.util.ArrayList;
import javalangObject = java.lang.Object;
import androidviewViewGroup = android.view.ViewGroup;
declare module me {
    export module relex {
        export module photodraweeview {
            export class DraweePagerAdapter {
                public constructor(param0: javautilArrayList<any>, param1: string, param2: string, param3: me.relex.photodraweeview.OnPhotoTapListener, param4: androidcontentContext);
                public instantiateItem(param0: androidviewViewGroup, param1: number): javalangObject;
                public isViewFromObject(param0: androidviewView, param1: javalangObject): boolean;
                public setPrimaryItem(param0: androidviewViewGroup, param1: number, param2: javalangObject): void;
                public destroyItem(param0: androidviewViewGroup, param1: number, param2: javalangObject): void;
                public getCount(): number;
            }
        }
    }
}

declare module me {
    export module relex {
        export module photodraweeview {
            export class IAttacher {
				/**
				 * Constructs a new instance of the me.relex.photodraweeview.IAttacher interface with the provided implementation.
				 */
                public constructor(implementation: {
                    getMinimumScale(): number;
                    getMediumScale(): number;
                    getMaximumScale(): number;
                    setMaximumScale(param0: number): void;
                    setMediumScale(param0: number): void;
                    setMinimumScale(param0: number): void;
                    getScale(): number;
                    setScale(param0: number): void;
                    setScale(param0: number, param1: boolean): void;
                    setScale(param0: number, param1: number, param2: number, param3: boolean): void;
                    setOrientation(param0: number): void;
                    setZoomTransitionDuration(param0: number): void;
                    setAllowParentInterceptOnEdge(param0: boolean): void;
                    setOnDoubleTapListener(param0: androidviewGestureDetectorOnDoubleTapListener): void;
                    setOnScaleChangeListener(param0: me.relex.photodraweeview.OnScaleChangeListener): void;
                    setOnLongClickListener(param0: androidviewViewOnLongClickListener): void;
                    setOnPhotoTapListener(param0: me.relex.photodraweeview.OnPhotoTapListener): void;
                    setOnViewTapListener(param0: me.relex.photodraweeview.OnViewTapListener): void;
                    getOnPhotoTapListener(): me.relex.photodraweeview.OnPhotoTapListener;
                    getOnViewTapListener(): me.relex.photodraweeview.OnViewTapListener;
                    update(param0: number, param1: number): void;
                });
                public static ZOOM_DURATION: number;
                public static DEFAULT_MID_SCALE: number;
                public static DEFAULT_MAX_SCALE: number;
                public static DEFAULT_MIN_SCALE: number;
                public setMinimumScale(param0: number): void;
                public setMaximumScale(param0: number): void;
                public getScale(): number;
                public setOnDoubleTapListener(param0: androidviewGestureDetectorOnDoubleTapListener): void;
                public setScale(param0: number, param1: boolean): void;
                public setOrientation(param0: number): void;
                public getMediumScale(): number;
                public setScale(param0: number): void;
                public getOnViewTapListener(): me.relex.photodraweeview.OnViewTapListener;
                public setAllowParentInterceptOnEdge(param0: boolean): void;
                public setZoomTransitionDuration(param0: number): void;
                public setOnLongClickListener(param0: androidviewViewOnLongClickListener): void;
                public getMaximumScale(): number;
                public setScale(param0: number, param1: number, param2: number, param3: boolean): void;
                public setOnViewTapListener(param0: me.relex.photodraweeview.OnViewTapListener): void;
                public setOnScaleChangeListener(param0: me.relex.photodraweeview.OnScaleChangeListener): void;
                public setOnPhotoTapListener(param0: me.relex.photodraweeview.OnPhotoTapListener): void;
                public setMediumScale(param0: number): void;
                public getOnPhotoTapListener(): me.relex.photodraweeview.OnPhotoTapListener;
                public update(param0: number, param1: number): void;
                public getMinimumScale(): number;
            }
        }
    }
}

import androidutilAttributeSet = android.util.AttributeSet;
declare module me {
    export module relex {
        export module photodraweeview {
            export class MultiTouchViewPager {
                public requestDisallowInterceptTouchEvent(param0: boolean): void;
                public constructor(param0: androidcontentContext);
                public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
                public dispatchTouchEvent(param0: androidviewMotionEvent): boolean;
            }
        }
    }
}

declare module me {
    export module relex {
        export module photodraweeview {
            export class OnPhotoTapListener {
				/**
				 * Constructs a new instance of the me.relex.photodraweeview.OnPhotoTapListener interface with the provided implementation.
				 */
                public constructor(implementation: {
                    onPhotoTap(param0: androidviewView, param1: number, param2: number): void;
                });
                public onPhotoTap(param0: androidviewView, param1: number, param2: number): void;
            }
        }
    }
}

declare module me {
    export module relex {
        export module photodraweeview {
            export class OnScaleChangeListener {
				/**
				 * Constructs a new instance of the me.relex.photodraweeview.OnScaleChangeListener interface with the provided implementation.
				 */
                public constructor(implementation: {
                    onScaleChange(param0: number, param1: number, param2: number): void;
                });
                public onScaleChange(param0: number, param1: number, param2: number): void;
            }
        }
    }
}

declare module me {
    export module relex {
        export module photodraweeview {
            export class OnScaleDragGestureListener {
				/**
				 * Constructs a new instance of the me.relex.photodraweeview.OnScaleDragGestureListener interface with the provided implementation.
				 */
                public constructor(implementation: {
                    onDrag(param0: number, param1: number): void;
                    onFling(param0: number, param1: number, param2: number, param3: number): void;
                    onScale(param0: number, param1: number, param2: number): void;
                    onScaleEnd(): void;
                });
                public onDrag(param0: number, param1: number): void;
                public onScaleEnd(): void;
                public onScale(param0: number, param1: number, param2: number): void;
                public onFling(param0: number, param1: number, param2: number, param3: number): void;
            }
        }
    }
}

declare module me {
    export module relex {
        export module photodraweeview {
            export class OnViewTapListener {
				/**
				 * Constructs a new instance of the me.relex.photodraweeview.OnViewTapListener interface with the provided implementation.
				 */
                public constructor(implementation: {
                    onViewTap(param0: androidviewView, param1: number, param2: number): void;
                });
                public onViewTap(param0: androidviewView, param1: number, param2: number): void;
            }
        }
    }
}

import comfacebookdraweegenericGenericDraweeHierarchy = com.facebook.drawee.generic.GenericDraweeHierarchy;
import androidgraphicsCanvas = android.graphics.Canvas;
import androidnetUri = android.net.Uri;
declare module me {
    export module relex {
        export module photodraweeview {
            export class PhotoDraweeView extends com.facebook.drawee.view.SimpleDraweeView {
                public getAttacher(): me.relex.photodraweeview.Attacher;
                public setMinimumScale(param0: number): void;
                public getScale(): number;
                public setScale(param0: number, param1: boolean): void;
                public init(): void;
                public onDraw(param0: androidgraphicsCanvas): void;
                public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
                public setPhotoUri(param0: androidnetUri, param1: androidcontentContext): void;
                public setEnableDraweeMatrix(param0: boolean): void;
                public setAllowParentInterceptOnEdge(param0: boolean): void;
                public setScale(param0: number, param1: number, param2: number, param3: boolean): void;
                public setOnViewTapListener(param0: me.relex.photodraweeview.OnViewTapListener): void;
                public setMediumScale(param0: number): void;
                public getMinimumScale(): number;
                public constructor(param0: androidcontentContext, param1: comfacebookdraweegenericGenericDraweeHierarchy);
                public setMaximumScale(param0: number): void;
                public setOnDoubleTapListener(param0: androidviewGestureDetectorOnDoubleTapListener): void;
                public setPhotoUri(param0: androidnetUri): void;
                public setOrientation(param0: number): void;
                public getMediumScale(): number;
                public setScale(param0: number): void;
                public isEnableDraweeMatrix(): boolean;
                public onTouchEvent(param0: androidviewMotionEvent): boolean;
                public getOnViewTapListener(): me.relex.photodraweeview.OnViewTapListener;
                public setZoomTransitionDuration(param0: number): void;
                public setOnLongClickListener(param0: androidviewViewOnLongClickListener): void;
                public onDetachedFromWindow(): void;
                public getMaximumScale(): number;
                public constructor(param0: androidcontentContext);
                public setOnScaleChangeListener(param0: me.relex.photodraweeview.OnScaleChangeListener): void;
                public onAttachedToWindow(): void;
                public setOnPhotoTapListener(param0: me.relex.photodraweeview.OnPhotoTapListener): void;
                public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
                public getOnPhotoTapListener(): me.relex.photodraweeview.OnPhotoTapListener;
                public update(param0: number, param1: number): void;
            }
        }
    }
}

import androidviewScaleGestureDetector = android.view.ScaleGestureDetector;
declare module me {
    export module relex {
        export module photodraweeview {
            export class ScaleDragDetector {
                public onScaleBegin(param0: androidviewScaleGestureDetector): boolean;
                public onScaleEnd(param0: androidviewScaleGestureDetector): void;
                public isDragging(): boolean;
                public isScaling(): boolean;
                public constructor(param0: androidcontentContext, param1: me.relex.photodraweeview.OnScaleDragGestureListener);
                public onTouchEvent(param0: androidviewMotionEvent): boolean;
                public onScale(param0: androidviewScaleGestureDetector): boolean;
            }
        }
    }
}

