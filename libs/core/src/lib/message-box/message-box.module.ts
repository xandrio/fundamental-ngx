import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box.component';
import { MessageBoxHeaderComponent } from './message-box-header/message-box-header.component';
import { MessageBoxBodyComponent } from './message-box-body/message-box-body.component';
import { MessageBoxFooterComponent } from './message-box-footer/message-box-footer.component';
import { MessageBoxContainerComponent } from './message-box-container/message-box-container.component';
import { BarModule } from '../bar/bar.module';


@NgModule({
    declarations: [
        MessageBoxComponent,
        MessageBoxHeaderComponent,
        MessageBoxBodyComponent,
        MessageBoxFooterComponent,
        MessageBoxContainerComponent
    ],
    imports: [
        CommonModule,
        BarModule,
    ]
})
export class MessageBoxModule {
}
