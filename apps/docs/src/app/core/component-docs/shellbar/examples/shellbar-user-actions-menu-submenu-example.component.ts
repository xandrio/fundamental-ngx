import { Component, ViewEncapsulation } from '@angular/core';
import { ShellbarUser } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-shellbar-user-actions-menu-submenu-example',
    templateUrl: './shellbar-user-actions-menu-submenu-example.component.html',
    styleUrls: ['./shellbar-user-actions-menu-submenu-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShellbarUserActionsMenuSubmenuExample {
    user: ShellbarUser = {
        fullName: 'John Doe',
        image: 'https://i.pravatar.cc/150?img=2',
        colorAccent: 1
    };

    userMenuListItems = [
        { text: 'Settings', glyph: 'action-settings', callback: this._settingsCallback },
        { text: 'Contact', glyph: 'email' },
        { text: 'Sign Out', glyph: 'log', callback: this._signOutCallback }
    ];

    clickUserAction($event: MouseEvent): void {
        console.log('Click on: ', $event);
    }

    private _settingsCallback($event: MouseEvent): void {
        console.log($event);
        alert('Settings Clicked');
    }

    private _signOutCallback($event: MouseEvent): void {
        console.log($event);
        alert('Sign Out Clicked');
    }
}
