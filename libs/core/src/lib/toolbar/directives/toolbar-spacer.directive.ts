import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'fd-toolbar-spacer',
})
export class ToolbarSpacerDirective implements OnInit, OnChanges, CssClassBuilder {
    /** user's custom classes */
    @Input()
    class: string;

    /** Used to set the width of the spacer manually. */
    @Input()
    width: string;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this.setWidthStyle();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
        this.setWidthStyle();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            'fd-toolbar__spacer',
            this.width && this.width !== '' ? 'fd-toolbar__spacer--fixed' : 'fd-toolbar__spacer--auto',
            this.class
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    private setWidthStyle(): void {
        if (this.width && this.width !== '') {
            this._elementRef.nativeElement.style.width = this.width;
        }
    }
}
