import { Component, ViewEncapsulation } from '@angular/core';
import { WizardStepStatus } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-wizard-summary-example',
    templateUrl: './wizard-summary-example.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./wizard-summary-example.component.scss'],
    host: {
        class: 'fd-wizard-example'
    }
})
export class WizardSummaryExampleComponent {
    step1status: WizardStepStatus = 'current';
    step2status: WizardStepStatus = 'upcoming';
    step3status: WizardStepStatus = 'upcoming';

    showSummary = true;

    goToStep(event: Event, step: number): void {
        event.preventDefault();
        this.showSummary = false;
        switch (step) {
            case 1: {
                this.step1status = 'current';
                this.step2status = 'upcoming';
                this.step3status = 'upcoming';
                break;
            }
            case 2: {
                this.step1status = 'completed';
                this.step2status = 'current';
                this.step3status = 'upcoming';
                break;
            }
            case 3: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'current';
                break;
            }
            case 4: {
                this.showSummary = true;
            }
        }
    }
}
