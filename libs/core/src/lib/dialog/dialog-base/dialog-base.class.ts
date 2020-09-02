import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostListener, isDevMode,
    OnDestroy,
    OnInit
} from '@angular/core';
import focusTrap, { FocusTrap } from 'focus-trap';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DialogBaseConfig } from './dialog-base-config.interface';
import { DialogBaseRef } from './dialog-base-ref.class';
import { KeyUtil } from '@fundamental-ngx/core';
import { FOCUS_TRAP_ERROR } from '../../utils/consts';

@Directive()
export abstract class DialogBase<C, R> implements OnInit, AfterViewInit, OnDestroy {

    abstract dialogWindow: ElementRef;

    /** @hidden Whenever dialog should be visible */
    showDialogWindow = true;

    /** @hidden Dialog padding sizes */
    dialogPaddingSize: 's' | 'm' | 'l' | 'xl';

    /** @hidden */
    private _focusTrap: FocusTrap;

    /** @hidden */
    protected _subscriptions = new Subscription();

    /** @hidden Listen and close dialog on Escape key */
    @HostListener('keyup', ['$event'])
    closeDialogEsc(event: KeyboardEvent): void {
        if (this.dialogConfig.escKeyCloseable && KeyUtil.isKey(event, 'Escape')) {
            this._dialogRef.dismiss('escape');
        }
    }

    /** @hidden Listen and close dialog on Backdrop click */
    @HostListener('mousedown', ['$event.target'])
    closeDialog(target: ElementRef): void {
        if (this.dialogConfig.backdropClickCloseable && target === this._elementRef.nativeElement) {
            this._dialogRef.dismiss('backdrop');
        }
    }

    constructor(
        public dialogConfig: C & DialogBaseConfig,
        protected _dialogRef: R & DialogBaseRef<any>,
        protected _elementRef: ElementRef,
        protected _changeDetectorRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._listenOnHidden();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._trapFocus();
        this._setPositionStyles();
        this._listenOnWindowResize();
        this.adjustResponsivePadding();
        this._dialogRef.loaded();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._deactivateFocusTrap();
        this._subscriptions.unsubscribe();
    }

    /** @hidden Determine Dialog padding size based on Dialogs window width */
    adjustResponsivePadding(): void {
        if (this.dialogConfig.responsivePadding) {
            const dialogWidth = this.dialogWindow.nativeElement.getBoundingClientRect().width;
            if (dialogWidth < 599) {
                this.dialogPaddingSize = 's';
            } else if (dialogWidth < 1023) {
                this.dialogPaddingSize = 'm';
            } else if (dialogWidth < 1439) {
                this.dialogPaddingSize = 'l';
            } else {
                this.dialogPaddingSize = 'xl';
            }
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden Trap focus inside Dialog window */
    private _trapFocus(): void {
        if (!this.dialogConfig.focusTrapped || !this.showDialogWindow || this._focusTrap) {
            return
        }

        try {
            this._focusTrap = focusTrap(this._elementRef.nativeElement, {
                clickOutsideDeactivates: this.dialogConfig.backdropClickCloseable && this.dialogConfig.hasBackdrop,
                escapeDeactivates: false,
                allowOutsideClick: (event: MouseEvent) => true
            });
            this._focusTrap.activate();
        } catch (e) {
            if (isDevMode()) {
                throw new Error(FOCUS_TRAP_ERROR('Dialog'));
            }
        }
    }

    /** @hidden */
    private _deactivateFocusTrap(): void {
        if (this._focusTrap) {
            this._focusTrap.deactivate();
        }
    }

    /** @hidden Listen on Dialog visibility */
    private _listenOnHidden(): void {
        this._subscriptions.add(
            this._dialogRef.onHide.subscribe((isHidden) => {
                this.showDialogWindow = !isHidden;
                isHidden ? this._deactivateFocusTrap() : this._trapFocus();
                this._changeDetectorRef.markForCheck();
            })
        );
    }

    /** @hidden Sets Dialog position based on DialogConfig */
    private _setPositionStyles(): void {
        this.dialogWindow.nativeElement.style.width = this.dialogConfig.width;
        this.dialogWindow.nativeElement.style.height = this.dialogConfig.height;
        this.dialogWindow.nativeElement.style.minWidth = this.dialogConfig.minWidth;
        this.dialogWindow.nativeElement.style.minHeight = this.dialogConfig.minHeight;
        this.dialogWindow.nativeElement.style.maxWidth = this.dialogConfig.maxWidth;
        this.dialogWindow.nativeElement.style.maxHeight = this.dialogConfig.maxHeight;

        if (this.dialogConfig.position) {
            this.dialogWindow.nativeElement.style.top = this.dialogConfig.position.top;
            this.dialogWindow.nativeElement.style.bottom = this.dialogConfig.position.bottom;
            this.dialogWindow.nativeElement.style.left = this.dialogConfig.position.left;
            this.dialogWindow.nativeElement.style.right = this.dialogConfig.position.right;
        } else {
            this.dialogWindow.nativeElement.style.position = 'relative';
        }
    }

    /** @hidden Listen on window resize and adjust padding */
    private _listenOnWindowResize(): void {
        if (!this.dialogConfig.responsivePadding) {
            return
        }

        this._subscriptions.add(
            fromEvent(window, 'resize')
                .pipe(debounceTime(100))
                .subscribe(() => this.adjustResponsivePadding())
        );
    }
}
