import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DIALOG_CONFIG, DIALOG_REF, DialogConfig, DialogRef } from './dialog-utils';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../utils/interfaces/css-class-builder.interface';
import { fadeIn } from '../utils/animations';
import { DialogBase } from './dialog-base';

@Component({
    selector: 'fd-dialog',
    styleUrls: ['dialog.component.scss'],
    templateUrl: './dialog.component.html',
    host: {
        tabindex: '-1',
        '[@fade-in]': ''
    },
    animations: [fadeIn],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent extends DialogBase<DialogConfig, DialogRef>
    implements OnInit, OnChanges, AfterViewInit, OnDestroy, CssClassBuilder {

    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** DialogRef - should be used for Template based Dialog implementation  */
    @Input('dialogRef')
    set embeddedDialogRef(value: DialogRef) {
        this._dialogRef = value;
    }

    /** DialogConfig - should be used for Template based Dialog implementation  */
    @Input('dialogConfig')
    set embeddedDialogConfig(value: DialogConfig) {
        this.dialogConfig = value;
    }

    /** @hidden */
    @ViewChild('dialogWindow')
    dialogWindow: ElementRef;

    /** @hidden If dialog subcomponents didn't receive DialogConfig from Injector, DialogConfig is passed from parent.
     * This is necessary when dialog has been passed as TemplateRef and created as EmbeddedView.
     * In such case parent injector of DialogComponent is the component that DECLARED the TemplateRef.
     **/
    @ContentChild(DialogHeaderComponent)
    set dialogHeaderConfig(component: DialogHeaderComponent) {
        if (component) {
            component.dialogConfig = this.dialogConfig;
        }
    }

    /** @hidden */
    @ContentChild(DialogBodyComponent)
    set dialogBodyConfig(component: DialogBodyComponent) {
        if (component) {
            component.dialogRef = this._dialogRef;
            component.dialogConfig = this.dialogConfig;
        }
    }

    /** @hidden */
    @ContentChild(DialogFooterComponent)
    set dialogFooterConfig(component: DialogFooterComponent) {
        if (component) {
            component.dialogConfig = this.dialogConfig;
        }
    }

    /** @hidden Whenever dialog is dragged */
    isDragged: boolean;

    /** @hidden */
    private _class = '';

    constructor(
        @Optional() @Inject(DIALOG_CONFIG) dialogConfig: DialogConfig,
        @Optional() @Inject(DIALOG_REF) dialogRef: DialogRef,
        changeDetectorRef: ChangeDetectorRef,
        elementRef: ElementRef
    ) {
        super(dialogConfig, dialogRef, elementRef, changeDetectorRef);
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.dialogConfig.hasBackdrop ? 'fd-dialog' : '',
            this.showDialog ? 'fd-dialog--active' : '',
            this._class,
            this.dialogConfig.backdropClass || ''
        ];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }
}
