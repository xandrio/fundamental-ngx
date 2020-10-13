<<<<<<< HEAD
import { Component, Input, ViewEncapsulation } from '@angular/core';
=======
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
>>>>>>> master

@Component({
    selector: 'fd-wizard-navigation',
    templateUrl: './wizard-navigation.component.html',
<<<<<<< HEAD
    encapsulation: ViewEncapsulation.None
=======
    changeDetection: ChangeDetectionStrategy.OnPush
>>>>>>> master
})
export class WizardNavigationComponent {
    /** Aria label for the wizard navigation component element. */
    @Input()
    ariaLabel?: string = null;
}
