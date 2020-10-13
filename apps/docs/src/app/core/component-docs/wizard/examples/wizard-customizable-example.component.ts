import { Component, ViewEncapsulation } from '@angular/core';
<<<<<<< HEAD
=======
import { WizardStepStatus } from '@fundamental-ngx/core';
>>>>>>> master

@Component({
    selector: 'fd-wizard-customizable-example',
    templateUrl: './wizard-customizable-example.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .fd-wizard-example .fd-wizard__content {
                min-height: 300px;
            }
        `
    ],
    host: {
        class: 'fd-wizard-example'
    }
})
export class WizardCustomizableExampleComponent {
<<<<<<< HEAD
    step1status = 'current';
    step2status = 'upcoming';
    step3status = 'upcoming';
=======
    step1status: WizardStepStatus = 'current';
    step2status: WizardStepStatus = 'upcoming';
    step3status: WizardStepStatus = 'upcoming';
>>>>>>> master

    goToStep(step: number): void {
        switch (step) {
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
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'completed';
                break;
            }
        }
    }
}
