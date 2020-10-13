import {
<<<<<<< HEAD
    AfterViewInit,
=======
    ChangeDetectionStrategy,
>>>>>>> master
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
<<<<<<< HEAD
    OnChanges, OnDestroy,
=======
    OnChanges,
>>>>>>> master
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { WizardContentComponent } from '../wizard-content/wizard-content.component';
<<<<<<< HEAD
import { WizardStepIndicatorComponent } from '../wizard-step-indicator/wizard-step-indicator.component';
import { KeyUtil } from '@fundamental-ngx/core';
import { Subscription } from 'rxjs';

export type StepType = 'completed' | 'current' | 'upcoming' | 'active';
=======
import { KeyUtil } from '../../utils/public_api';

export type WizardStepStatus = 'completed' | 'current' | 'upcoming' | 'active';
>>>>>>> master

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-wizard-step]',
    host: {
        class: 'fd-wizard__step',
        '[class.fd-wizard__step--completed]': 'status === "completed"',
        '[class.fd-wizard__step--current]': 'status === "current"',
        '[class.fd-wizard__step--upcoming]': 'status === "upcoming"',
        '[class.fd-wizard__step--active]': 'status === "active"'
    },
    templateUrl: './wizard-step.component.html',
<<<<<<< HEAD
    encapsulation: ViewEncapsulation.None
})
export class WizardStepComponent implements OnChanges, AfterViewInit, OnDestroy {
=======
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardStepComponent implements OnChanges {
>>>>>>> master
    /**
     * The aria-label for the step container.
     */
    @Input()
    ariaLabel: string;

    /**
     * The type of step ('completed', 'current', 'upcoming', and 'active'.)
     */
    @Input()
<<<<<<< HEAD
    status: StepType;
=======
    status: WizardStepStatus;
>>>>>>> master

    /**
     * Whether or not this is a 'branching' step.
     */
    @Input()
    branching = false;

    /**
     * The label text.
     */
    @Input()
    label: string;

    /**
     * The smaller text for labeling the step as optional.
     */
    @Input()
    optionalText: string;

    /**
     * Event emitted when the wizard step's status changes.
     */
    @Output()
<<<<<<< HEAD
    statusChange = new EventEmitter<StepType>();
=======
    statusChange = new EventEmitter<WizardStepStatus>();
>>>>>>> master

    /**
     * Event emitted when a step is clicked.
     */
    @Output()
    stepClicked = new EventEmitter<WizardStepComponent>();

<<<<<<< HEAD
    /**
     * Event emitted when a step indicator is clicked.
     */
    @Output()
    stepIndicatorItemClicked = new EventEmitter<WizardStepComponent>();

=======
>>>>>>> master
    /** @hidden */
    @ContentChild(WizardContentComponent)
    content: WizardContentComponent;

<<<<<<< HEAD
    /** @hidden */
    @ContentChild(WizardStepIndicatorComponent)
    stepIndicator: WizardStepIndicatorComponent;

=======
>>>>>>> master
    /** The wizard label span element. */
    @ViewChild('wizardLabel', { read: ElementRef })
    wizardLabel: ElementRef;

    /** @hidden */
    finalStep = false;

    /** @hidden */
<<<<<<< HEAD
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(public elRef: ElementRef) {}
=======
    visited = false;

    /** @hidden */
    constructor(private _elRef: ElementRef) {}
>>>>>>> master

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.status) {
            this.statusChange.emit(this.status);
        }
    }

    /** @hidden */
<<<<<<< HEAD
    ngAfterViewInit(): void {
        this._subscriptions.add(
            this.stepIndicator.stepIndicatorItemClicked.subscribe(step => {
                this.stepIndicatorItemClicked.emit(step);
            })
        )
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    stepContainerKeypress(event?: KeyboardEvent): void {
        if (!event || KeyUtil.isKey(event, ['Space', 'Enter'])) {
            this.stepClicked.emit(this);
        }
=======
    stepContainerKeypress(event?: KeyboardEvent): void {
        if (event) {
            event.preventDefault();
        }
        if (this.visited && (!event || KeyUtil.isKey(event, [' ', 'Enter']))) {
            this.stepClicked.emit(this);
        }
    }

    /** @hidden */
    getClassList(): DOMTokenList {
        return this._elRef.nativeElement.classList;
    }

    /** @hidden */
    hasLabel(label: string): boolean {
        return this._elRef.nativeElement.classList.contains(label);
    }

    /** @hidden */
    getStepClientWidth(): number {
        return this._elRef.nativeElement.clientWidth;
>>>>>>> master
    }
}
