import { MobileMode } from '../utils/interfaces/mobile-control.interface';
import { MobileModeConfig } from '@fundamental-ngx/core';
import { InjectionToken } from '@angular/core';

export const DATE_PICKER_COMPONENT = new InjectionToken<string[]>('Provides value implementing DatePickerInterface');

export interface DatePickerInterface extends MobileMode {
    mobile: boolean;
    mobileConfig: MobileModeConfig;
}
