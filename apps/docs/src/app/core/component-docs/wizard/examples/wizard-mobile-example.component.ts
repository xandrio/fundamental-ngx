import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { WizardComponent, WizardStepStatus } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-wizard-mobile-example',
    templateUrl: './wizard-mobile-example.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .fd-wizard-mobile-docs .fd-wizard {
                max-width: 300px;
                margin-bottom: 2rem;
            }
        `
    ],
    host: {
        class: 'fd-wizard-mobile-docs'
    }
})
export class WizardMobileExampleComponent {

    @ViewChild('wizard')
    wizardComponent: WizardComponent;

    @ViewChild('wizard2')
    wizardComponent2: WizardComponent;

}
