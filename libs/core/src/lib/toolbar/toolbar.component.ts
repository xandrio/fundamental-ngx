import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

@Component({
    selector: 'fd-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnChanges, CssClassBuilder {
    /** user's custom classes */
    @Input()
    class: string;

    /** Type of the toolbar. Values include 'solid' (default), 'transparent', 'auto', 'info', and 'active'. */
    @Input()
    fdType: string = 'solid';

    /** Whether the toolbar has a solid background. Default is true */
    @Input()
    solid: boolean = true;

    /** Whether the toolbar has a transparent background. */
    @Input()
    transparent: boolean = false;

    /** Whether the toolbar should inherit the design from the parent control. */
    @Input()
    auto: boolean = false;

    /** Whether the toolbar should have a bottom border. */
    @Input()
    noBottomBorder: boolean = false;

    /** Whether the toolbar has the info state. */
    @Input()
    info: boolean = false;

    /** Whether the toolbar has the active state. */
    @Input()
    active: boolean = false;

    /** The toolbar title. */
    @Input()
    title: string;

    /** Whether or not the toolbar is in cozy mode. */
    @Input()
    cozy: boolean = false;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            'fd-toolbar',
            this.cozy ? 'fd-toolbar--cozy' : '',
            this.fdType === 'solid' ? 'fd-toolbar--solid' : '',
            this.fdType === 'transparent' ? 'fd-toolbar--clear fd-toolbar--transparent' : '',
            this.fdType === 'auto' ? 'fd-toolbar--auto' : '',
            this.fdType === 'info' ? 'fd-toolbar--info' : '',
            this.fdType === 'active' ? 'fd-toolbar--info fd-toolbar--active' : '',
            this.noBottomBorder ? 'fd-toolbar--clear' : '',
            this.title && this.title.length ? 'fd-toolbar--title' : '',
            this.class
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
