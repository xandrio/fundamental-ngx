import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { takeUntil } from 'rxjs/operators';
import { SEARCH_FIELD_COMPONENT, SearchFieldInterface } from '../search-field.interface';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeControl,
    MobileModeConfigToken
} from '../../utils/base-class/mobile-mode.class';


@Component({
    selector: 'fd-search-field-mobile',
    templateUrl: './search-field-mobile.component.html',
    styleUrls: ['./search-field-mobile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SearchFieldMobileComponent extends MobileModeBase<SearchFieldInterface> implements OnInit, AfterViewInit, OnDestroy {

    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** 
     * @hidden
     * Control element, which will be rendered inside dialog.
     * List element, which will be rendered inside dialog.
     */
    childContent: {
        listTemplate: TemplateRef<any>,
        controlTemplate: TemplateRef<any>
    } = null;

    /** @hidden */
    private _selectedBackup: string;

    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(SEARCH_FIELD_COMPONENT) searchFieldInterface: SearchFieldInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, searchFieldInterface, MobileModeControl.SEARCH_FIELD, mobileModes);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnSearchFieldOpenChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._open();
        this.dialogRef.hide(true);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.dialogRef.close();
        super.onDestroy();
    }

    /** @hidden */
    handleDismiss(): void {
        this.dialogRef.hide(true);
        this._component.dialogDismiss(this._selectedBackup);
    }

    /** @hidden */
    handleApprove(): void {
        this.dialogRef.hide(true);
        this._component.dialogApprove();
    }

    /** @hidden */
    private _toggleDialog(open: boolean): void {
        if (open) {
            this._selectedBackup = [...this._component.selected];
            if (!this._dialogService.hasOpenDialogs()) {
                this._open();
            }
        }
        this.dialogRef.hide(!open);
    }

    /** @hidden */
    private _listenOnSearchFieldOpenChange(): void {
        this._component.openChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(isOpen => this._toggleDialog(isOpen));
    }

    /** @hidden */
    private _open(): void {
        this.dialogRef = this._dialogService.open(
            this.dialogTemplate,
            {
                mobile: true,
                verticalPadding: false,
                ...this.dialogConfig,
                backdropClickCloseable: false,
                escKeyCloseable: false,
                container: this._elementRef.nativeElement
            }
        );
    }
}
