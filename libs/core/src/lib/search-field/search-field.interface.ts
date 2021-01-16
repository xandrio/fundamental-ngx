import { EventEmitter, InjectionToken } from '@angular/core';
import { MobileMode } from '../utils/interfaces/mobile-control.interface';

export const SEARCH_FIELD_COMPONENT = new InjectionToken<string[]>('SearchFieldComponent');

/**
 * Search Field Interface to have typing and avoid circular dependency between
 * SearchFieldComponent <==> SearchFieldMobileComponent
 */
export interface SearchFieldInterface extends MobileMode {
    selected: any;

    openChange: EventEmitter<boolean>;

    dialogApprove(): void;

    dialogDismiss(selectedBackup: any[]): void;
}
