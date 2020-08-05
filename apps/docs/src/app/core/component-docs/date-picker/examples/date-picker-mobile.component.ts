import { Component } from '@angular/core';
import { DialogConfig, FdDate, MobileModeConfig } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-mobile',
    template: `
        <fd-date-picker type="single"
                        [mobile]="true"
                        [mobileConfig]="mobileConfig"
                        [compact]="true"
                        [(ngModel)]="date">
        </fd-date-picker>
    `
})
export class DatePickerMobileComponent {
    date = FdDate.getToday();

    mobileConfig: MobileModeConfig = {
        title: 'Select Date',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Date selection dialog'
        } as DialogConfig
    }
}
