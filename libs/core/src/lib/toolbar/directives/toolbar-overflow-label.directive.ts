import { Directive, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-toolbar-overflow-label]'
})
export class ToolbarOverflowLabelDirective {
    @HostBinding('class.fd-toolbar__overflow__label')
    overflowBodyClass: boolean = true;
}
