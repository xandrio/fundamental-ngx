import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as searchFieldH from '!raw-loader!./examples/search-field-example.component.html';
import * as searchFieldTs from '!raw-loader!./examples/search-field-example.component.ts';

@Component({
    selector: 'app-icon',
    templateUrl: './search-field-docs.component.html'
})
export class SearchFieldDocsComponent {
    searchField: ExampleFile[] = [
        {
            language: 'html',
            code: searchFieldH,
            fileName: 'search-field-example'
        },
        {
            language: 'typescript',
            code: searchFieldTs,
            fileName: 'search-field-example',
            component: 'SearchFieldExampleComponent'
        }
    ];
}
