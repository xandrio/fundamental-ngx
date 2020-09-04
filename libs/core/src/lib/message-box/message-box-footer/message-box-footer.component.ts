import { Component, Inject, Optional } from '@angular/core';
import { MESSAGE_BOX_CONFIG, MessageBoxConfig } from '../message-box-utils';

@Component({
    selector: 'fd-message-box-footer',
    templateUrl: './message-box-footer.component.html',
    styleUrls: ['./message-box-footer.component.scss']
})
export class MessageBoxFooterComponent {
    constructor(@Optional() @Inject(MESSAGE_BOX_CONFIG) public messageBoxConfig: MessageBoxConfig) {
        this.messageBoxConfig = this.messageBoxConfig || {};
    }
}
