import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges, OnDestroy,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { WizardContentComponent } from '../wizard-content/wizard-content.component';
import { WizardStepIndicatorComponent } from '../wizard-step-indicator/wizard-step-indicator.component';
import { KeyUtil } from '@fundamental-ngx/core';
import { Subscription } from 'rxjs';

export type StepType = 'completed' | 'current' | 'upcoming' | 'active';

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
    encapsulation: ViewEncapsulation.None
})
export class WizardStepComponent implements OnChanges, AfterViewInit, OnDestroy {
    /**
     * The aria-label for the step container.
     */
    @Input()
    ariaLabel: string;

    /**
     * The type of step ('completed', 'current', 'upcoming', and 'active'.)
     */
    @Input()
    status: StepType;

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
    statusChange = new EventEmitter<StepType>();

    /**
     * Event emitted when a step is clicked.
     */
    @Output()
    stepClicked = new EventEmitter<WizardStepComponent>();

    /**
     * Event emitted when a step indicator is clicked.
     */
    @Output()
    stepIndicatorItemClicked = new EventEmitter<WizardStepComponent>();

    /** @hidden */
    @ContentChild(WizardContentComponent)
    content: WizardContentComponent;

    /** @hidden */
    @ContentChild(WizardStepIndicatorComponent)
    stepIndicator: WizardStepIndicatorComponent;

    /** The wizard label span element. */
    @ViewChild('wizardLabel', { read: ElementRef })
    wizardLabel: ElementRef;

    /** @hidden */
    finalStep = false;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(public elRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.status) {
            this.statusChange.emit(this.status);
        }
    }

    /** @hidden */
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
    }
}
