import { Component, Inject, Optional } from '@angular/core';
import { DIALOG_CONFIG } from '@fundamental-ngx/core';
import { MessageBoxConfig } from '../message-box-utils';

@Component({
    selector: 'fd-message-box-header',
    templateUrl: './message-box-header.component.html'
})
export class MessageBoxHeaderComponent {
    constructor(@Optional() @Inject(DIALOG_CONFIG) public messageBoxConfig: MessageBoxConfig) {
        this.messageBoxConfig = this.messageBoxConfig || {};
    }
}
