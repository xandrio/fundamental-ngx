import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import {
    DialogService,
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core';
import { DATE_PICKER_COMPONENT, DatePickerInterface } from '../date-picker.interface';

@Component({
    selector: 'fd-date-picker-mobile',
    templateUrl: './date-picker-mobile.component.html',
    styleUrls: ['./date-picker-mobile.component.scss']
})
export class DatePickerMobileComponent extends MobileModeBase<DatePickerInterface> implements OnInit, AfterViewInit {

    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    childContent: TemplateRef<any> = undefined;

    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(DATE_PICKER_COMPONENT) datePickerComponent: DatePickerInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, datePickerComponent, MobileModeControl.DATE_PICKER, mobileModes);
    }

    ngOnInit(): void {
        this._listenOnSelectOpenChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._openDialog();
    }

    cancel(): void {

    }

    approve(): void {

    }

    private _listenOnSelectOpenChange(): void {
    }

    private _openDialog(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            verticalPadding: false,
            ...this.dialogConfig,
            focusTrapped: false,
            container: this._elementRef.nativeElement
        });
    }

}
