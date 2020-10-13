<<<<<<< HEAD
import { Component, Input, ViewEncapsulation } from '@angular/core';
=======
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
>>>>>>> master

@Component({
    selector: 'fd-wizard-next-step',
    templateUrl: './wizard-next-step.component.html',
<<<<<<< HEAD
    encapsulation: ViewEncapsulation.None
=======
    changeDetection: ChangeDetectionStrategy.OnPush
>>>>>>> master
})
export class WizardNextStepComponent {
    /**
     * Whether or not the next step button should float directly above the footer.
     */
    @Input()
    floating = false;
}
