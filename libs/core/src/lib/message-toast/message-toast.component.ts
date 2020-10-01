import { Component, Inject, Optional } from '@angular/core';

@Component({
    selector: 'fd-message-toast',
    templateUrl: 'message-toast.component.html',
    host: {
        '[class.fd-message-toast]': 'true',
        '[style.min-width]': 'minWidth',
        '[attr.id]': 'id'
    }
})
export class MessageToastComponent {
    constructor() {}
}
