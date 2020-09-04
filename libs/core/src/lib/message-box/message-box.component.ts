import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild
} from '@angular/core';
import {
    applyCssClass,
    CssClassBuilder,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core';
import { MESSAGE_BOX_CONFIG, MESSAGE_BOX_REF, MessageBoxConfig, MessageBoxRef } from './message-box-utils';
import { DialogBase } from '../dialog/dialog-base';

@Component({
    selector: 'fd-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent extends DialogBase<MessageBoxConfig, MessageBoxRef>
    implements OnInit, AfterViewInit, OnDestroy, CssClassBuilder {

    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** MessageBoxRef - should be used for Template based Message Box implementation */
    @Input('messageBoxRef')
    set embeddedDialogRef(value: MessageBoxRef) {
        this._dialogRef = value;
    }

    /** MessageBoxConfig - should be used for Template based Message Box implementation  */
    @Input('messageBoxConfig')
    set embeddedDialogConfig(value: MessageBoxConfig) {
        this.dialogConfig = value;
    }

    /** @hidden */
    @ViewChild('messageBoxWindow')
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
            component.dialogRef = this._messageBoxRef;
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

    /** @hidden Dialog padding sizes */
    dialogPaddingSize: 's' | 'm' | 'l' | 'xl';

    /** @hidden */
    private _class = '';

    constructor(
        @Optional() @Inject(MESSAGE_BOX_CONFIG) messageBoxConfig: MessageBoxConfig,
        @Optional() @Inject(MESSAGE_BOX_REF) messageBoxRef: MessageBoxRef,
        elementRef: ElementRef,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(messageBoxConfig, messageBoxRef, elementRef, changeDetectorRef);
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
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
            this.dialogConfig.hasBackdrop ? 'fd-message-box' : '',
            this.showDialog ? 'fd-message-box--active' : '',
            this._class,
            this.dialogConfig.backdropClass || ''
        ];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }
}
