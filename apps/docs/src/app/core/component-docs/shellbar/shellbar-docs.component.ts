import { Component } from '@angular/core';

import * as shellbarUserActionsMenuScss from '!raw-loader!./examples/shellbar-user-actions-menu.component.scss';

import * as shellbarBasicHTMLSrc from '!raw-loader!./examples/shellbar-basic-example.component.html';
import * as shellbarBasicTSSrc from '!raw-loader!./examples/shellbar-basic-example.component';

import * as shellbarCollapsibleHTMLSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.html';
import * as shellbarCollapsibleTSSrc from '!raw-loader!./examples/shellbar-collapsible-example.component';

import * as sideNavShellbarHtml from '!raw-loader!./examples/shellbar-side-nav/shellbar-side-nav-example.component.html';
import * as sideNavShellbarTs from '!raw-loader!./examples/shellbar-side-nav/shellbar-side-nav-example.component';
import * as sideNavShellbarScss from '!raw-loader!./examples/shellbar-side-nav/shellbar-side-nav-example.component.scss';

import * as shellbarUserActionsMenuHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-example.component.html';
import * as shellbarUserActionsMenuTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-example.component';

import * as shellbarUserActionsMenuHeaderFooterHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-header-footer-example.component.html';
import * as shellbarUserActionsMenuHeaderFooterTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-header-footer-example.component';

import * as shellbarUserActionsMenuSubmenuHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-submenu-example.component.html';
import * as shellbarUserActionsMenuSubmenuTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-submenu-example.component';

import * as shellbarUserActionsMenuCompactHTMLSrc from '!raw-loader!./examples/shellbar-user-actions-menu-compact-example.component.html';
import * as shellbarUserActionsMenuCompactTsSrc from '!raw-loader!./examples/shellbar-user-actions-menu-compact-example.component';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-shellbar',
    templateUrl: './shellbar-docs.component.html'
})
export class ShellbarDocsComponent {
    shellbarBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarBasicHTMLSrc,
            fileName: 'shellbar-basic-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarBasicExampleComponent',
            code: shellbarBasicTSSrc,
            fileName: 'shellbar-basic-example'
        }
    ];

    shellbarCollapsible: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarCollapsibleHTMLSrc,
            fileName: 'shellbar-collapsible-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarCollapsibleExampleComponent',
            code: shellbarCollapsibleTSSrc,
            fileName: 'shellbar-collapsible-example'
        }
    ];

    shellbarSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavShellbarHtml,
            fileName: 'shellbar-side-nav-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarSideNavExampleComponent',
            code: sideNavShellbarTs,
            fileName: 'shellbar-side-nav-example',
            scssFileCode: sideNavShellbarScss
        }
    ];

    shellbarUserActionsMenuExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuHTMLSrc,
            fileName: 'shellbar-user-actions-menu-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuExample',
            code: shellbarUserActionsMenuTsSrc,
            fileName: 'shellbar-user-actions-menu-example',
            scssFileCode: shellbarUserActionsMenuScss
        }
    ];

    shellbarUserActionsMenuHeaderFooterExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuHeaderFooterHTMLSrc,
            fileName: 'shellbar-user-actions-menu-header-footer-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuHeaderFooterExample',
            code: shellbarUserActionsMenuHeaderFooterTsSrc,
            fileName: 'shellbar-user-actions-menu-header-footer-example',
            scssFileCode: shellbarUserActionsMenuScss
        }
    ];

    shellbarUserActionsMenuSubmenuExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuSubmenuHTMLSrc,
            fileName: 'shellbar-user-actions-menu-submenu-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuSubmenuExample',
            code: shellbarUserActionsMenuSubmenuTsSrc,
            fileName: 'shellbar-user-actions-menu-submenu-example',
            scssFileCode: shellbarUserActionsMenuScss
        }
    ];

    shellbarUserActionsMenuCompactExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarUserActionsMenuCompactHTMLSrc,
            fileName: 'shellbar-user-actions-menu-compact-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarUserActionsMenuCompactExample',
            code: shellbarUserActionsMenuCompactTsSrc,
            fileName: 'shellbar-user-actions-menu-compact-example',
            scssFileCode: shellbarUserActionsMenuScss
        }
    ];
}
