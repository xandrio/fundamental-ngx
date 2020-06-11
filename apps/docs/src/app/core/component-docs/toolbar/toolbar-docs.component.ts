import { Component } from '@angular/core';

import * as toolbarHtml from '!raw-loader!./examples/toolbar-example.component.html';
import * as toolbarTs from '!raw-loader!./examples/toolbar-example.component.ts';
import * as toolbarTransparentHtml from '!raw-loader!./examples/toolbar-transparent-example.component.html';
import * as toolbarTransparentTs from '!raw-loader!./examples/toolbar-transparent-example.component.ts';
import * as toolbarAutoHtml from '!raw-loader!./examples/toolbar-auto-example.component.html';
import * as toolbarAutoTs from '!raw-loader!./examples/toolbar-auto-example.component.ts';
import * as toolbarInfoHtml from '!raw-loader!./examples/toolbar-info-example.component.html';
import * as toolbarInfoTs from '!raw-loader!./examples/toolbar-info-example.component.ts';
import * as toolbarTitleHtml from '!raw-loader!./examples/toolbar-title-example.component.html';
import * as toolbarTitleTs from '!raw-loader!./examples/toolbar-title-example.component.ts';
import * as toolbarSpacerHtml from '!raw-loader!./examples/toolbar-spacer-example.component.html';
import * as toolbarSpacerTs from '!raw-loader!./examples/toolbar-spacer-example.component.ts';
import * as toolbarOverflowHtml from '!raw-loader!./examples/toolbar-overflow-example.component.html';
import * as toolbarOverflowTs from '!raw-loader!./examples/toolbar-overflow-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar-docs.component.html'
})
export class ToolbarDocsComponent {

    toolbarHtml: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'toolbar-example',
            code: toolbarHtml,
            typescriptFileCode: toolbarTs,
            component: 'ToolbarExampleComponent'
        }
    ];

    toolbarTransparentHtml: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'toolbar-transparent-example',
            code: toolbarTransparentHtml,
            typescriptFileCode: toolbarTransparentTs,
            component: 'Toolbar-transparentExampleComponent'
        }
    ];

    toolbarAutoHtml: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'toolbar-auto-example',
            code: toolbarAutoHtml,
            typescriptFileCode: toolbarAutoTs,
            component: 'Toolbar-autoExampleComponent'
        }
    ];

    toolbarInfoHtml: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'toolbar-info-example',
            code: toolbarInfoHtml,
            typescriptFileCode: toolbarInfoTs,
            component: 'Toolbar-infoExampleComponent'
        }
    ];

    toolbarTitleHtml: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'toolbar-title-example',
            code: toolbarTitleHtml,
            typescriptFileCode: toolbarTitleTs,
            component: 'Toolbar-titleExampleComponent'
        }
    ];

    toolbarSpacerHtml: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'toolbar-spacer-example',
            code: toolbarSpacerHtml,
            typescriptFileCode: toolbarSpacerTs,
            component: 'Toolbar-spacerExampleComponent'
        }
    ];

    toolbarOverflowHtml: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'toolbar-overflow-example',
            code: toolbarOverflowHtml,
            typescriptFileCode: toolbarOverflowTs,
            component: 'Toolbar-overflowExampleComponent'
        }
    ];

}
