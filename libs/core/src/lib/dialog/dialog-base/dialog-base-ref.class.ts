import { Observable, Subject } from 'rxjs';

export class DialogBaseRef<D> {
    private readonly _afterClosed = new Subject<any>();
    private readonly _afterLoaded = new Subject<any>();
    private readonly _onHide = new Subject<boolean>();

    /**
     * Observable that is triggered when the dialog is closed.
     * On close a *result* is passed back. On dismiss, an *error* is returned instead.
     */
    public afterClosed: Observable<any> = this._afterClosed.asObservable();

    /** Observable that is triggered whenever the dialog should be visually hidden or visible.*/
    public onHide: Observable<boolean> = this._onHide.asObservable();

    /** Observable that is triggered when the modal view is initialised. */
    public afterLoaded: Observable<boolean> = this._afterLoaded.asObservable();

    /** Data passed from the calling component to the content.*/
    public data: D;

    /**
     * Closes the dialog and passes the argument to the afterClosed observable.
     * @param result Value passed back to the observable as a result.
     */
    close(result?: any): void {
        this._afterClosed.next(result);
        this._afterClosed.complete();
    }

    /**
     * Dismisses the dialog and passes the argument to the afterClosed observable as an error.
     * @param reason Value passed back to the observable as an error.
     */
    dismiss(reason?: any): void {
        this._afterClosed.error(reason);
    }

    /**
     * Visually hides the dialog.
     * @param isHidden Value used to determine if dialog window should be hidden or visible.
     */
    hide(isHidden: boolean): void {
        this._onHide.next(isHidden);
    }

    /** Function that is called after the view of modal is initialised. */
    loaded(): void {
        this._afterLoaded.next();
    }
}
