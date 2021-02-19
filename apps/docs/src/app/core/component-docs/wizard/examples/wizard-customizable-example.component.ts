import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { WizardComponent, WizardStepStatus } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-wizard-customizable-example',
    templateUrl: './wizard-customizable-example.component.html',
    styleUrls: ['./wizard-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-wizard-example'
    }
})
export class WizardCustomizableExampleComponent {

    @ViewChild('wizard')
    wizardComponent: WizardComponent;

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
