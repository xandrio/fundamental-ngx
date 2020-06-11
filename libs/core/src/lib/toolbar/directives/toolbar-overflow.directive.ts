import { Directive, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-toolbar-overflow]'
})
export class ToolbarOverflowDirective {
    @HostBinding('class.fd-toolbar__overflow')
    overflowClass: boolean = true;
}
