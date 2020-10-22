import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '../popover/popover.module';
import { FieldSetModule } from './fieldset/fieldset.module';
import { FormControlModule } from './form-control/form-control.module';
import { FormItemModule } from './form-item/form-item.module';
import { FormLabelModule } from './form-label/form-label.module';
import { FormLegendModule } from './form-legend/form-legend.module';
import { FormMessageModule } from './form-message/form-message.module';
import { FormInputMessageGroupModule } from './form-input-message-group/form-input-message-group.module';
import { FormGroupModule } from './form-group/form-group.module';
import { NewFormItemComponent } from './new-form-item/new-form-item.component';

@NgModule({
    imports: [CommonModule, PopoverModule],
    exports: [
        NewFormItemComponent,
        FieldSetModule,
        FormControlModule,
        FormItemModule,
        FormLabelModule,
        FormLegendModule,
        FormMessageModule,
        FormInputMessageGroupModule,
        FormGroupModule
    ],
    declarations: [NewFormItemComponent]
})
export class FormModule {}
