import { DialogBaseRef } from '../../dialog/dialog-base';
import { InjectionToken } from '@angular/core';

/** DialogRef injection token */
export const MESSAGE_BOX_REF = new InjectionToken<MessageBoxRef>('MessageBoxRef');

export class MessageBoxRef<D = any> extends DialogBaseRef<D> {
}
