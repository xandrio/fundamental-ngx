import { NgModule } from '@angular/core';
import { ObjectMarkerExampleComponent, ObjectMarkerTextAndIconExampleComponent } from './object-marker-example/object-marker-example.component';
import { ObjectMarkerHeaderComponent } from './object-marker-header/object-marker-header.component';
import { Routes, RouterModule } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../core/api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { PlatformObjectMarkerDocsComponent } from './platform-object-marker-docs.component';
import { PlatformObjectMarkerModule } from '@fundamental-ngx/platform';


const routes: Routes = [
    {
        path: '',
        component: ObjectMarkerHeaderComponent,
        children: [
            { path: '', component: PlatformObjectMarkerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.infoLabel } }
        ]
    }
];


@NgModule({
  declarations: [PlatformObjectMarkerDocsComponent, ObjectMarkerExampleComponent, ObjectMarkerHeaderComponent, ObjectMarkerTextAndIconExampleComponent],
  exports: [RouterModule],
  imports: [ RouterModule.forChild(routes), SharedDocumentationModule, PlatformObjectMarkerModule]
})
export class PlatformObjectMarkerDocsModule { }
