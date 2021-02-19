import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogService, WizardComponent, WizardStepStatus } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-wizard-dialog-example',
    templateUrl: './wizard-dialog-example.component.html',
    styleUrls: ['./wizard-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WizardDialogExampleComponent {

    fullName = '';
    addressLine1 = '';
    addressLine2 = '';

    @ViewChild('wizard')
    wizardComponent: WizardComponent;

    constructor(private _dialogService: DialogService) {}

    getStepStatus(step: number): WizardStepStatus {
        if (this.wizardComponent && this.wizardComponent.steps) {
            return this.wizardComponent.getStepStatus(step);
        }
    }

    openDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(dialog, {
            width: '100%',
            height: '100%'
        });
    }
}
