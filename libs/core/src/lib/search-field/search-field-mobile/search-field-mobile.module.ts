import { NgModule } from '@angular/core';
import { BarModule } from '../../bar/bar.module';
import { SearchFieldMobileComponent } from './search-field-mobile.component';
import { ButtonModule } from '../../button/button.module';
import { DialogModule } from '../../dialog/dialog.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [SearchFieldMobileComponent],
    imports: [BarModule, DialogModule, ButtonModule, CommonModule],
    entryComponents: [SearchFieldMobileComponent],
    exports: [SearchFieldMobileComponent]
})
export class SearchFieldMobileModule {
}
