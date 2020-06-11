import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { ToolbarDocsComponent } from './toolbar-docs.component';
import { ToolbarExampleComponent } from './examples/toolbar-example.component';
import { ToolbarHeaderComponent } from './toolbar-header/toolbar-header.component';
import { ButtonModule, ToolbarModule } from '@fundamental-ngx/core';
import { ToolbarTransparentExampleComponent } from './examples/toolbar-transparent-example.component';
import { ToolbarAutoExampleComponent } from './examples/toolbar-auto-example.component';
import { ToolbarInfoExampleComponent } from './examples/toolbar-info-example.component';
import { ToolbarTitleExampleComponent } from './examples/toolbar-title-example.component';
import { ToolbarSpacerExampleComponent } from './examples/toolbar-spacer-example.component';
import { ToolbarOverflowExampleComponent } from './examples/toolbar-overflow-example.component';

const routes: Routes = [
    {
        path: '',
        component: ToolbarHeaderComponent,
        children: [
            { path: '', component: ToolbarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.toolbar } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, ToolbarModule, ButtonModule, ],
    exports: [RouterModule],
    declarations: [
        ToolbarHeaderComponent,
        ToolbarDocsComponent,
        ToolbarExampleComponent,
        ToolbarTransparentExampleComponent,
        ToolbarAutoExampleComponent,
        ToolbarInfoExampleComponent,
        ToolbarTitleExampleComponent,
        ToolbarSpacerExampleComponent,
        ToolbarOverflowExampleComponent
    ]
})
export class ToolbarDocsModule {}
