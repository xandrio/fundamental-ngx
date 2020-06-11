import { Directive, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-toolbar-overflow-form-label]'
})
export class ToolbarOverflowFormLabelDirective {
    @HostBinding('class.fd-toolbar__overflow__form-label')
    overflowBodyClass: boolean = true;
}
