import { Directive } from '@angular/core';

@Directive({ 
    // tslint:disable-next-line:directive-selector
    selector: '[fd-user-actions-menu-header-addon-right]',
    host: {
        class: 'fd-user-actions-menu__header-addon-right'
    }
 })
export class UserActionsMenuHeaderAddonRightDirective {}
