import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerMobileComponent } from './date-picker-mobile.component';
import { DialogModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [DatePickerMobileComponent],
    imports: [CommonModule, DialogModule]
})
export class DatePickerMobileModule {}
