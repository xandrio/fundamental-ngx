import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    Pipe,
    PipeTransform,
    QueryList,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';

import { Overlay, OverlayConfig, ConnectedPosition, OverlayRef } from '@angular/cdk/overlay';

import { PopoverComponent } from '@fundamental-ngx/core';
import { PopoverFillMode } from '../popover/popover-position/popover-position';
import { Observable, isObservable, of, Subscription, fromEvent } from 'rxjs';
import { map, filter, take, takeUntil } from 'rxjs/operators';
import { TemplatePortal } from '@angular/cdk/portal';
import { FocusKeyManager, FocusableOption } from '@angular/cdk/a11y';
import { RtlService } from '@fundamental-ngx/core';


export interface SuggestionItem {
    value: string;
    data?: any;
}

export interface ValueLabelItem {
    value: string;
    label: string;
}

@Directive({
    selector: '[fdSearchFieldSuggestion]',
    host: {
        tabindex: '-1',
        role: 'list-item'
    }
})
export class SearchFieldSuggestionDirective implements FocusableOption {
    constructor(private element: ElementRef) { }
    focus(): void {
        this.element.nativeElement.focus();
    }
}


// ====================================================================================================
let searchFieldIdCount = 0;

@Component({
    selector: 'fd-search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFieldComponent implements OnInit, OnDestroy {
    /** Whether the search field is in mobile mode. */
    @Input()
    mobile = false;

    /** Whether the suggestions menu is opened. */
    @Input()
    isOpen = false;

    /** Whether the search field is disabled. */
    @Input() 
    disabled = false;

    /**
     * `at-least` applies a minimum width to the body equivalent to the width of the control. 
     * `equal` applies a width to the body equivalent to the width of the control.
     * `fit-content` applies a width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /** Whether the search input should be displayed in compact mode. */
    @Input()
    compact = false;

    /** Placeholder text for the search input field. */
    @Input() 
    placeholder: string;

    /** Search field input text. */
    @Input() 
    searchTerm: string;

    /** Id of the search field input element. */
    @Input()
    inputId: string

    /** Id of the search field submit button. */
    @Input()
    submitId: string

    /** Values to be displayed in the unfiltered dropdown. */
    @Input()
    dropdownValues: any[] = ['Apple', 'Banana', 'Kiwi', 'Peach', 'Orange'];

    /** 
     * Filter function. Accepts an array and a string as arguments, and outputs an array.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. */
    @Input()
    filterFn: Function = this._defaultFilter;

    /** 
     * Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. */
    @Input()
    displayFn: Function = this._defaultDisplay;

 

    /** Event emitted when the popover body of the search field is opened or closed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted when the input value is changed. */
    @Output() 
    readonly searchTermChange: EventEmitter<string> = new EventEmitter();

     /** Event emitted when the search is submitted. */
    @Output() 
    readonly searchSubmit: EventEmitter<string> = new EventEmitter();

     /** Event emitted when the search is cancelled. */
    @Output() 
    readonly cancelSearch: EventEmitter<void> = new EventEmitter();



    /** @hidden */
    _displayedValues: any[] = [];


    constructor(
        protected _cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const baseId = 'fd-search-field';
        this.inputId = `${baseId}-input-${searchFieldIdCount++}`;
        this.submitId = `${baseId}-submit-${searchFieldIdCount++}`;

        if (this.dropdownValues) {
            this._displayedValues = this.dropdownValues;
        }
    }

    ngOnDestroy(): void {
       
    }

    /** @hidden */
    _handleSearchTermChange(searchTerm: string): void {
        if (this.searchTerm !== searchTerm) {
            this._applySearchTermChange(searchTerm);
            if (!this.isOpen) {
                this._handleIsOpenChange(true);
            }
        }
    }

    /** @hidden */
    private _applySearchTermChange(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.searchTermChange.emit(this.searchTerm);
        this._displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
        this._cdRef.detectChanges();
    }

    /** @hidden */
    private _defaultFilter(contentArray: any[], searchTerm: string = ''): any[] {
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((item) => {
            if (item) {
                return this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        });
    }

    /** @hidden */
    private _defaultDisplay(str: string): string {
        return str;
    }

    /** @hidden */
    _handleIsOpenChange(open: boolean): void {
        if (this.disabled) {
            return ;
        }

        if (!open && this.isOpen && !this.mobile) {
            // this.searchInputElement.nativeElement.focus();
        }

        if (this.isOpen !== open) {
            this.openChange.emit(open);
        }
        this.isOpen = open;

        if (!this.mobile) {
            // this._popoverOpenHandle(open);
        }
        this._cdRef.detectChanges();
    }

    /** @hidden */
    _handleKeydown($event: KeyboardEvent): void {
        
    }

    /** @hidden */
    _handleSearch(): void {
      
    }

    /** @hidden */
    _handleSubmit(): void {

    }

    /** @hidden */
    _handleClearSearchTerm(): void {
        this.searchTerm = '';
        this.searchTermChange.emit('');
        this._displayedValues = this.dropdownValues;
        this._cdRef.detectChanges();
    }
}

