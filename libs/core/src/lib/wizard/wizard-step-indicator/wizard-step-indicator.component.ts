import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { WizardStepComponent } from '../wizard-step/wizard-step.component';

@Component({
    selector: 'fd-wizard-step-indicator',
    templateUrl: './wizard-step-indicator.component.html',
    // TODO: remove these when implementing action sheet here
    styles: [
        `
            .fd-wizard-step-indicator-popover {
                vertical-align: middle;
            }

            .fd-wizard-step-indicator-list {
                max-width: 300px;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class WizardStepIndicatorComponent {
    /**
     * The icon to use for this step.
     */
    @Input()
    glyph: string;

    /** @hidden */
    stackedItems: WizardStepComponent[];

    /**
     * Event emitted when this step indicator is clicked.
     */
    @Output()
    stepIndicatorItemClicked = new EventEmitter<WizardStepComponent>();

    /** @hidden */
    popoverStepIndicatorClicked(event: MouseEvent): void {
        if (this.stackedItems && this.stackedItems.length) {
            event.preventDefault();
        }
    }

    /** @hidden */
    stepItemClicked(step: WizardStepComponent, event: MouseEvent): void {
        event.preventDefault();
        this.stepIndicatorItemClicked.emit(step);
    }

}
