import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { TextareaHeaderComponent } from './textarea-header/textarea-header.component';
import { TextareaDocsComponent } from './textarea-docs.component';
import {
    TextareaExampleComponent,
    TextareaInlineHelpExampleComponent,
    TextareaStateExampleComponent,
    TextareaCounterExampleComponent
} from './examples/textarea-examples.component';
import { TextareaFormGroupExampleComponent } from './examples/textarea-form-group-example.component';
import { FormModule } from '@fundamental-ngx/core';
// import { TextareaModule } from 'libs/core/src/lib/textarea/textarea.module';
import { TextareaModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: TextareaHeaderComponent,
        children: [
            { path: '', component: TextareaDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.textarea } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, FormModule, TextareaModule],
    exports: [RouterModule],
    declarations: [
        TextareaDocsComponent,
        TextareaHeaderComponent,
        TextareaExampleComponent,
        TextareaStateExampleComponent,
        TextareaFormGroupExampleComponent,
        TextareaInlineHelpExampleComponent,
        TextareaCounterExampleComponent
    ]
})
export class TextareaDocsModule {}
