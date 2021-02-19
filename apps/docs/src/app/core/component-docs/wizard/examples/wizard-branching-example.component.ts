import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogService, WizardComponent, WizardStepStatus } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-wizard-branching-example',
    templateUrl: './wizard-branching-example.component.html',
    styleUrls: ['./wizard-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-wizard-example'
    }
})
export class WizardBranchingExampleComponent implements OnInit {

    @ViewChild('wizard')
    wizardComponent: WizardComponent;

    paymentSelection = '';

    oldPayment = '';

    init = true;

    /**
     * documentation related property
     * provides access to the HTML element with "overlay" reference
     */
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    /**
     * documentation related property
     * specifies if the doc example is rendered in fullscreen or not
     */
    fullscreen = false;

    constructor(private _dialogService: DialogService) {}

    ngOnInit(): void {
        this.oldPayment = this.paymentSelection;
    }

    paymentSelectionChanged(dialog: TemplateRef<any>): void {
        if (this.oldPayment !== this.paymentSelection) {
            if (!this.init) {
                const dialogRef = this._dialogService.open(dialog, { responsivePadding: true });

                dialogRef.afterClosed.subscribe(
                    () => {
                        this.oldPayment = this.paymentSelection;
                    },
                    () => {
                        this.paymentSelection = this.oldPayment;
                    }
                );
            } else {
                this.init = false;
            }
        }
    }

    /**
     * documentation related function
     * opens the example in full screen
     */
    enterFullscreenExample(): void {
        this.wizardComponent.goToStep(1);
        this.fullscreen = true;
        this.overlay.nativeElement.style.width = '100%';
    }

    /**
     * documentation related function
     * exits the full screen mode of the example
     */
    exitFullscreenExample(event: Event): void {
        event.stopPropagation();
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
    }
}
