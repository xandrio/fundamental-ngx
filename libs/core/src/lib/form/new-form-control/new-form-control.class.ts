import { InjectionToken } from '@angular/core';
import { NgControl } from '@angular/forms';

export const FD_NEW_FORM_CONTROL = new InjectionToken('FORM CONTROL');

export abstract class NewFormControlClass<T = any> {
    // /**
    //  * Each input control has always a value. Need to make sure we keep a convention for
    //  * input fields
    //  */
    // value: T | null;
    //
    // /**
    //  * Need to have a way to set placeholder to the input
    //  */
    // placeholder: string;
    //
    // /**
    //  * Sets id from FF to Input
    //  */
    // id: string;
    //
    // /**
    //  *  Components works in two sizes compact or cozy
    //  */
    // contentDensity: 'compact' | 'cozy';
    //
    // /**
    //  *  Each input should inject its own ngControl and we should retrieve it
    //  */
    // readonly ngControl: NgControl | null;
    //
    // /** Whether the control is disabled. */
    // readonly disabled: boolean;
    //
    // /**
    //  * Keeps track if the form element is in focus
    //  */
    // readonly focused: boolean;
    //
    // /**
    //  * Currently used only to identify if we are in error status
    //  */
    // readonly status: 'success' | 'error' | 'warning' | 'default' | 'information';
    //
    // abstract focus(event?: MouseEvent): void;
}
