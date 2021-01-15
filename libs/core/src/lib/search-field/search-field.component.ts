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


import { ListComponent } from '../list/list.component';
import { PopoverComponent } from '@fundamental-ngx/core';
import { PopoverFillMode } from '../popover/popover-position/popover-position';
import { Observable, isObservable, of, Subscription, fromEvent } from 'rxjs';
import { map, filter, take, takeUntil } from 'rxjs/operators';
import { TemplatePortal } from '@angular/cdk/portal';
import { FocusKeyManager, FocusableOption } from '@angular/cdk/a11y';
import { RtlService } from '@fundamental-ngx/core';
import { KeyUtil } from '../utils/functions';
import { FormStates } from '../form/form-control/form-states';
import { BACKSPACE, DELETE, DOWN_ARROW, TAB } from '@angular/cdk/keycodes';
import { applyCssClass, CssClassBuilder, DynamicComponentService, FocusEscapeDirection } from '../utils/public_api';

let searchFieldIdCount = 0;
@Component({
    selector: 'fd-search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFieldComponent implements OnInit, OnDestroy {
    /** Whether the suggestions menu is opened. */
    @Input()
    isOpen = false;

    /** Whether the search field is disabled. */
    @Input() 
    disabled = false;

    /**
     * Settings for the Popover body
     * `at-least` applies a minimum width to the body equivalent to the width of the control. 
     * `equal` applies a width to the body equivalent to the width of the control.
     * `fit-content` applies a width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /**
     * The state of the form control - applies css classes.
     * Possible options: `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /** Whether the AddOn Button should be focusable, set to true by default */
    @Input()
    buttonFocusable = true;

    /** Whether the search component should be displayed in compact mode. */
    @Input()
    compact = false;

    /** Icon of the button on the right of the input field. */
    @Input()
    glyph = 'search';

    /** Id of the search field input element. */
    @Input()
    inputId: string

    /** Placeholder text for the search input field. */
    @Input() 
    placeholder: string;

    /** Search field input text. */
    @Input() 
    searchTerm: string;

    /** Whether the search field component is in mobile mode. */
    @Input()
    mobile = false;

    /** Values to be displayed in the unfiltered dropdown. */
    @Input()
    dropdownValues: any[] = ['Apple', 'Banana', 'Kiwi', 'Peach', 'Orange', 'Grape', 'Lemon', 'Strawberry', 'Blueberry', 'Pineapple', 'Raspberry'];

    /** 
     * Max height of the popover body. Default set to 300px.
     * Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight = '300px';

    /** Whether the search term should be highlighted in results. */
    @Input()
    highlight = true;

    /** User's custom classes */
    @Input()
    class: string;

    /** 
     * A filter function that accepts an array and a string as arguments, and outputs an array.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. 
     */
    @Input()
    filterFn: Function = this._defaultFilter;

    /** 
     * A display function that accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. 
     */
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
    @ViewChild(ListComponent)
    listComponent: ListComponent;

    /** @hidden */
    @ViewChild('inputField', { read: ElementRef })
    inputField: ElementRef;

    /** @hidden Values to be displayed in the filtered dropdown. */
    _displayedValues: any[] = [];

    /** @hidden */
    constructor(
        protected _cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const baseId = 'fd-search-field';
        this.inputId = `${baseId}-input-${searchFieldIdCount++}`;

        if (this.dropdownValues) {
            this._displayedValues = this.dropdownValues;
        }
    }

    ngOnDestroy(): void {
       
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
    private _closeSuggestionsMenu(): void {
        if (this.isOpen) {
            this._handleIsOpenChange(false);
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
    _handleSearchTermChange(searchTerm: string): void {
        if (this.searchTerm !== searchTerm) {
            this._applySearchTermChange(searchTerm);
            if (!this.isOpen) {
                this._handleIsOpenChange(true);
            }
        }
    }

    /** @hidden */
    _handleSearch(): void {
        this._applySearchTermChange(this.searchTerm);
        this._closeSuggestionsMenu();
    }
    
    /** @hidden */
    _handleClearSearchTerm(): void {
        this.searchTerm = '';
        this.searchTermChange.emit('');
        this._displayedValues = this.dropdownValues;
        this._cdRef.detectChanges();
    }

    /** @hidden */
    _handleKeydown($event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode($event, DOWN_ARROW) && !this.mobile) {
            if ($event.altKey) {
                this._handleIsOpenChange(true);
            }
            if (this.listComponent) {
                this.listComponent.setItemActive(0);
                $event.preventDefault();
            }
        }

        if (KeyUtil.isKeyCode($event, TAB) && this.isOpen) {
            if (this.listComponent) {
                this.listComponent.setItemActive(0);
                $event.preventDefault();
            }
        }
    }

    /** @hidden */
    _handleIsOpenChange(open: boolean): void {
        if (this.disabled) {
            return ;
        }

        if (!open && this.isOpen && !this.mobile) {
            this.inputField.nativeElement.focus();
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
    _handleListItemSelect($event: string): void {
        this.searchTerm = $event;
        this.searchTermChange.emit(this.searchTerm);
        this._closeSuggestionsMenu();
    }

    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.inputField.nativeElement.focus();
        }
    }
}

