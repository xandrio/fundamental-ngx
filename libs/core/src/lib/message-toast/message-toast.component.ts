import { Component, Inject, Optional, Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-message-toast]',
    host: {
        '[class.fd-message-toast]': 'true',
        '[style.min-width]': 'minWidth',
        '[attr.id]': 'id'
    }
})
export class MessageToastDirective {
    constructor() {}
}
