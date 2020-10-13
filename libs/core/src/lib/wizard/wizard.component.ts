import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    OnDestroy,
    QueryList,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { Subscription } from 'rxjs';

<<<<<<< HEAD
=======
export const STEP_MIN_WIDTH = 168;
export const STEP_STACKED_TOP_CLASS = 'fd-wizard__step--stacked-top';
export const STEP_STACKED_CLASS = 'fd-wizard__step--stacked';
export const STEP_NO_LABEL_CLASS = 'fd-wizard__step--no-label';

export const ACTIVE_STEP_STATUS = 'active';
export const CURRENT_STEP_STATUS = 'current';
export const UPCOMING_STEP_STATUS = 'upcoming';
export const COMPLETED_STEP_STATUS = 'completed';

>>>>>>> master
@Component({
    selector: 'fd-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardComponent implements AfterViewInit, OnDestroy {
    /** @hidden */
    @ContentChildren(WizardStepComponent, { descendants: true })
    steps: QueryList<WizardStepComponent>;

    /** @hidden */
    contentTemplate: TemplateRef<any>;

    /** @hidden */
<<<<<<< HEAD
    stackedStepsLeft: WizardStepComponent[] = [];

    /** @hidden */
    stackedStepsRight: WizardStepComponent[] = [];

    /** @hidden */
=======
>>>>>>> master
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    private _previousWidth: number;

    constructor(private _elRef: ElementRef, private _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    @HostListener('window:resize')
    resizeHandler(): void {
        const wizardWidth = this._elRef.nativeElement.getBoundingClientRect().width;
        if (!this._previousWidth || wizardWidth <= this._previousWidth) {
            this._wizardShrinking();
        } else if (wizardWidth > this._previousWidth) {
<<<<<<< HEAD
            this._wizardGrowing();
=======
            this._shrinkWhileAnyStepIsTooNarrow();
>>>>>>> master
        }
        this._previousWidth = wizardWidth;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        setTimeout(() => {
            // fixes ExpressionChangedAfterItHasBeenCheckedError
            this._setContentTemplate();
            this._subscriptions.add(
                this.steps.changes.subscribe(() => {
                    this._handleStepOrStatusChanges();
                })
            );
            this.steps.forEach((step) => {
<<<<<<< HEAD
                this._subscriptions.add(
                    step.stepClicked.subscribe(event => {
                        this._stepClicked(event);
                    })
                );
                this._subscriptions.add(
                    step.stepIndicatorItemClicked.subscribe(event => {
                        this._stepClicked(event, true);
                    })
                );
                this._subscriptions.add(
                    step.statusChange.subscribe(() => {
                        this._handleStepOrStatusChanges();
                    })
                );
                // need to call wizardShrinking for each step < 168px on first load
                if (step.wizardLabel && step.elRef.nativeElement.clientWidth < 168) {
                    this._wizardShrinking();
                }
=======
                this._setupStepEvents(step);
>>>>>>> master
            });
            this._cdRef.detectChanges();
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
<<<<<<< HEAD
    private _wizardShrinking(): void {
        this.steps.forEach((step) => {
            if (step.status === 'active' || step.status === 'current') {
                const currentStep = step;
                if (step.wizardLabel && step.elRef.nativeElement.clientWidth < 168) {
=======
    private _setupStepEvents(step: WizardStepComponent): void {
        this._subscriptions.add(
            step.stepClicked.subscribe((event) => {
                this._stepClicked(event);
            })
        );
        this._subscriptions.add(
            step.statusChange.subscribe(() => {
                this._handleStepOrStatusChanges();
            })
        );
        // need to call wizardShrinking for each step < 168px on first load
        if (step.wizardLabel && step.getStepClientWidth() < STEP_MIN_WIDTH) {
            this._wizardShrinking();
        }
    }

    /** @hidden */
    private _wizardShrinking(): void {
        this.steps.forEach((step) => {
            if (step.status === ACTIVE_STEP_STATUS || step.status === CURRENT_STEP_STATUS) {
                const currentStep = step;
                if (step.wizardLabel && step.getStepClientWidth() < STEP_MIN_WIDTH) {
>>>>>>> master
                    this._hideSomeStep(currentStep);
                }
            }
        });
    }

    /** @hidden */
<<<<<<< HEAD
    private _wizardGrowing(): void {
        this._shrinkWhileAnyStepIsTooNarrow();
    }

    /** @hidden */
    private _setContentTemplate(): void {
        this.steps.forEach((step) => {
            step.finalStep = false;
            if (step.status === 'current' && step.content) {
=======
    private _setContentTemplate(): void {
        this.steps.forEach((step) => {
            step.finalStep = false;
            if (step.status === CURRENT_STEP_STATUS && step.content) {
                step.visited = true;
>>>>>>> master
                this.contentTemplate = step.content.contentTemplate;
            }
        });
        this.steps.last.finalStep = true;
    }

    /** @hidden */
    private _hideSomeStep(currentStep: WizardStepComponent): void {
        // If a small step was found, get the step with a visible label furthest away from the current step and hide the label
        let stepsArray = this.steps.toArray();
        stepsArray = stepsArray.filter((step) => {
<<<<<<< HEAD
            return !step.elRef.nativeElement.classList.contains('fd-wizard__step--no-label');
=======
            return !step.hasLabel(STEP_NO_LABEL_CLASS);
>>>>>>> master
        });
        if (stepsArray.length > 1) {
            let currentStepIndex = 0,
                stepToHide;
            if (currentStep) {
                currentStepIndex = stepsArray.indexOf(currentStep);
            }
            currentStepIndex > (stepsArray.length - 1) / 2
                ? (stepToHide = stepsArray[0])
                : (stepToHide = stepsArray[stepsArray.length - 1]);
<<<<<<< HEAD
            stepToHide.elRef.nativeElement.classList.add('fd-wizard__step--no-label');
            stepToHide.elRef.nativeElement.classList.add('fd-wizard__step--stacked');
            if (stepsArray.indexOf(stepToHide) < currentStepIndex) {
                this.stackedStepsLeft.push(stepToHide);
            } else if (stepsArray.indexOf(stepToHide) > currentStepIndex) {
                this.stackedStepsRight.push(stepToHide);
            }
=======
            stepToHide.getClassList().add(STEP_NO_LABEL_CLASS);
            stepToHide.getClassList().add(STEP_STACKED_CLASS);
>>>>>>> master
            this._setStackedTop(currentStep);
        }
    }

    /** @hidden */
    private _setStackedTop(currentStep: WizardStepComponent): void {
        this.steps.forEach((step, index) => {
<<<<<<< HEAD
            step.elRef.nativeElement.classList.remove('fd-wizard__step--stacked-top');
            if (this.steps.toArray()[index + 1] === currentStep) {
                step.elRef.nativeElement.classList.add('fd-wizard__step--stacked-top');
                step.stepIndicator.stackedItems = this.stackedStepsLeft;
            } else {
                step.stepIndicator.stackedItems = [];
=======
            step.getClassList().remove(STEP_STACKED_TOP_CLASS);
            if (this.steps.toArray()[index + 1] === currentStep) {
                step.getClassList().add(STEP_STACKED_TOP_CLASS);
>>>>>>> master
            }
        });
    }

    /** @hidden */
    private _resetStepClasses(): void {
        this.steps.forEach((step) => {
<<<<<<< HEAD
            step.elRef.nativeElement.classList.remove('fd-wizard__step--stacked-top');
            step.elRef.nativeElement.classList.remove('fd-wizard__step--stacked');
            step.elRef.nativeElement.classList.remove('fd-wizard__step--no-label');
=======
            step.getClassList().remove(STEP_STACKED_TOP_CLASS);
            step.getClassList().remove(STEP_STACKED_CLASS);
            step.getClassList().remove(STEP_NO_LABEL_CLASS);
>>>>>>> master
        });
    }

    /** @hidden */
    private _handleStepOrStatusChanges(): void {
        this._setContentTemplate();
        this._shrinkWhileAnyStepIsTooNarrow();
        this._cdRef.detectChanges();
    }

    /** @hidden */
    private _shrinkWhileAnyStepIsTooNarrow(): void {
        this._resetStepClasses();
<<<<<<< HEAD
        this.stackedStepsLeft = [];
        this.stackedStepsRight = [];
=======
>>>>>>> master
        let i = 0;
        while (this._anyStepIsTooNarrow() && i < this.steps.length - 1) {
            i++;
            this._wizardShrinking();
        }
    }

    /** @hidden */
    private _anyStepIsTooNarrow(): boolean {
<<<<<<< HEAD
        let foundNarrowStep = false;
        this.steps.forEach((step) => {
            if (step.elRef.nativeElement.clientWidth < 168) {
                foundNarrowStep = true;
            }
        });
        return foundNarrowStep;
    }

    /** @hidden */
    private _stepClicked(clickedStep: WizardStepComponent, fromMenu?: boolean): void {
        if (fromMenu || !clickedStep.elRef.nativeElement.classList.contains('fd-wizard__step--stacked-top')) {
            this.steps.forEach((step) => {
                if (step === clickedStep) {
                    step.status = 'current';
                    step.statusChange.emit('current');
                } else if (step !== clickedStep) {
                    if (this.steps.toArray().indexOf(step) < this.steps.toArray().indexOf(clickedStep)) {
                        step.status = 'completed';
                        step.statusChange.emit('completed');
                    } else if (this.steps.toArray().indexOf(step) > this.steps.toArray().indexOf(clickedStep)) {
                        step.status = 'upcoming';
                        step.statusChange.emit('upcoming');
                    }
                }
            });
        }
=======
        return this.steps.some(step => step.getStepClientWidth() < STEP_MIN_WIDTH);
    }

    /** @hidden */
    private _stepClicked(clickedStep: WizardStepComponent): void {
        this.steps.forEach((step) => {
            const clickedStepIndex = this.steps.toArray().indexOf(clickedStep);
            if (step === clickedStep) {
                step.status = CURRENT_STEP_STATUS;
                step.statusChange.emit(CURRENT_STEP_STATUS);
            } else if (step !== clickedStep) {
                if (this.steps.toArray().indexOf(step) < clickedStepIndex) {
                    step.status = COMPLETED_STEP_STATUS;
                    step.statusChange.emit(COMPLETED_STEP_STATUS);
                } else if (this.steps.toArray().indexOf(step) > clickedStepIndex) {
                    step.status = UPCOMING_STEP_STATUS;
                    step.statusChange.emit(UPCOMING_STEP_STATUS);
                }
            }
        });
>>>>>>> master
    }
}
