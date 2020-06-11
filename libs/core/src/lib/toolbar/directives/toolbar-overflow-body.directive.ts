import { Directive, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'fd-toolbar-overflow-body'
})
export class ToolbarOverflowBodyDirective {
    @HostBinding('class.fd-toolbar__overflow__body')
    overflowBodyClass: boolean = true;
}
