import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

const routes: Routes = [
    {
        path: 'core',
        loadChildren: () => import('./core/core-documentation.module').then((m) => m.CoreDocumentationModule)
    },
    {
        path: 'platform',
        loadChildren: () =>
            import('./platform/platform-documentation.module').then((m) => m.PlatformDocumentationModule)
    },
    { path: '', redirectTo: 'core', pathMatch: 'full' }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }),
        MarkdownModule.forRoot({ loader: HttpClient }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'en'
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
