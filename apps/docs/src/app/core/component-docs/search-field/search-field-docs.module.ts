import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SearchFieldHeaderComponent } from './ search-field-header/search-field-header.component';
import { SearchFieldDocsComponent } from './search-field-docs.component';
import { SearchFieldExampleComponent } from './examples/search-field-example.component';
import { SearchFieldModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

const routes: Routes = [
    {
        path: '',
        component: SearchFieldHeaderComponent,
        children: [
            { path: '', component: SearchFieldDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.searchField } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, SearchFieldModule],
    exports: [RouterModule],
    declarations: [SearchFieldDocsComponent, SearchFieldHeaderComponent, SearchFieldExampleComponent]
})
export class SearchFieldDocsModule {}
