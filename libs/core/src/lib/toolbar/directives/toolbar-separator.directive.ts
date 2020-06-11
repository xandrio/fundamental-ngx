import { Directive, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'fd-toolbar-separator'
})
export class ToolbarSeparatorDirective {
    @HostBinding('class.fd-toolbar__separator')
    separatorClass: boolean = true;
}
