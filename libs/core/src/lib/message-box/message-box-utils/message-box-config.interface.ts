import { DialogBaseConfig } from '../../dialog/dialog-base';
import { InjectionToken } from '@angular/core';
import { DialogConfig } from '@fundamental-ngx/core';

export type MessageBoxType = 'standard' | 'confirmation' | 'error' | 'success' | 'warning' | 'information';

export const MESSAGE_BOX_CONFIG = new InjectionToken<DialogConfig>('MessageBoxConfig');
export const MESSAGE_BOX_DEFAULT_CONFIG = new InjectionToken<DialogConfig>('MessageBoxConfig');

export interface MessageBoxConfig extends DialogBaseConfig {
    type?: MessageBoxType;
}
