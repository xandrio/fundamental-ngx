import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    forwardRef,
    Input,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { UserActionsMenuItemDirective } from '../../directives/user-actions-menu-item.directive';
import { UserActionsMenuService } from '../../services/user-actions-menu.service';
import { UserActionsMenuHeaderComponent } from '../user-actions-menu-header/user-actions-menu-header.component';

@Component({
    selector: 'fd-user-actions-submenu',
    templateUrl: './user-actions-submenu.component.html',
    host: {
        class: 'fd-user-actions-menu'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserActionsSubmenuComponent {
    /** Submenu title */
    @Input()
    title: string;

    /** @hidden */
    @ContentChild(UserActionsMenuHeaderComponent)
    _header: UserActionsMenuHeaderComponent;

    /** @hidden */
    @ContentChildren(forwardRef(() => UserActionsMenuItemDirective), { descendants: true })
    _items: QueryList<UserActionsMenuItemDirective>;

    /** @hidden Reference to template with Submenu content  */
    @ViewChild(TemplateRef) _templateRef: TemplateRef<HTMLElement>;

    /** @hidden */
    _menuService: UserActionsMenuService;
}
