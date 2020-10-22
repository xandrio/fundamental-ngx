import { Component, HostBinding, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FD_NEW_FORM_MESSAGE, NewFormMessageClass } from '../new-form-message/new-form-message.class';
import { FD_NEW_FORM_CONTROL, NewFormControlClass } from '../new-form-control/new-form-control.class';

@Component({
    selector: 'fd-new-form-item',
    templateUrl: './new-form-item.component.html',
    styleUrls: ['./new-form-item.component.scss']
})
export class NewFormItemComponent {

    /** @deprecated  */
    @Input()
    isCheck = false;

    /** Whether the form item is inline. */
    @Input()
    @HostBinding('class.fd-form-item--inline')
    isInline = false;

    /** Whether the form item is horizontal. */
    @Input()
    @HostBinding('class.fd-form-item--horizontal')
    horizontal = false;

    /** @hidden */
    @HostBinding('class.fd-form-item')
    fdFormItemClass = true;

    @ViewChild(FD_NEW_FORM_MESSAGE as any)
    formMessages: NewFormMessageClass;

    @ViewChild(FD_NEW_FORM_CONTROL as any)
    formControl: NewFormControlClass;

    @ViewChild('messageContainer', {read: ViewContainerRef})
    messageContainer: ViewContainerRef;
}
