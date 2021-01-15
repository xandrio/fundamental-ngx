import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { ButtonModule } from '../button/button.module';
import { InputGroupModule } from '../input-group/input-group.module';
import { PopoverModule } from '../popover/popover.module';
import { ListModule } from '../list/list.module';
import { SearchFieldComponent } from './search-field.component';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../utils/pipes/pipe.module';

@NgModule({
    declarations: [SearchFieldComponent],
    imports: [
        CommonModule,
        FormsModule,
        IconModule,
        ButtonModule,
        InputGroupModule,
        PopoverModule,
        ListModule,
        PipeModule
    ],
    exports: [SearchFieldComponent]
})
export class SearchFieldModule {}


