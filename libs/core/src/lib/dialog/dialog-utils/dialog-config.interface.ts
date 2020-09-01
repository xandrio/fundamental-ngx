/**
 * Configuration for opening a dialog with the DialogService.
 */
import { InjectionToken } from '@angular/core';
import { DialogBaseConfig } from '../dialog-base/dialog-base-config.interface';

export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('DialogConfig');
export const DIALOG_DEFAULT_CONFIG = new InjectionToken<DialogConfig>('DialogConfig');

export interface DialogConfig extends DialogBaseConfig {
    /** Whether the dialog should be displayed in full screen mode. */
    fullScreen?: boolean;

    /** Whether the dialog should be draggable. */
    draggable?: boolean;

    /** Whether the dialog should be resizable. */
    resizable?: boolean;

    /** Whether the dialog should have vertical padding. */
    verticalPadding?: boolean;
}
