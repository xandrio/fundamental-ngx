import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RtlService } from '@fundamental-ngx/core';
import { DialogConfig, MobileModeConfig } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-search-field-example',
    templateUrl: './search-field-example.component.html'
})
export class SearchFieldExampleComponent {
    secondConfig: MobileModeConfig = {
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Select fruits dialog'
        }
    };
}
