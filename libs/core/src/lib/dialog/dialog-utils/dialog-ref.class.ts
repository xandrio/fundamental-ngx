import { BehaviorSubject, Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { DialogBaseRef } from '../dialog-base/dialog-base-ref.class';

/** DialogRef injection token */
export const DIALOG_REF = new InjectionToken<DialogRef>('DialogRef');

/** Reference to a dialog component */
export class DialogRef extends DialogBaseRef {
    private readonly _onLoading = new BehaviorSubject<boolean>(false);

    /** Observable that is triggered whenever the dialog should be displayed in loading state.*/
    public onLoading: Observable<boolean> = this._onLoading.asObservable();

    /**
     * Displays the dialog in loading state.
     * @param isLoading Value used to determine if dialog window should be displayed in loading state.
     */
    loading(isLoading: boolean): void {
        this._onLoading.next(isLoading);
    }
}
