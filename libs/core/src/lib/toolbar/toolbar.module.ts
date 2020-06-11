import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarSpacerDirective } from './directives/toolbar-spacer.directive';
import { ToolbarSeparatorDirective } from './directives/toolbar-separator.directive';
import { ToolbarOverflowDirective } from './directives/toolbar-overflow.directive';
import { ToolbarOverflowBodyDirective } from './directives/toolbar-overflow-body.directive';
import { ToolbarOverflowLabelDirective } from './directives/toolbar-overflow-label.directive';
import { ToolbarOverflowFormLabelDirective } from './directives/toolbar-overflow-form-label.directive';

@NgModule({
    declarations: [
        ToolbarComponent,
        ToolbarSpacerDirective,
        ToolbarSeparatorDirective,
        ToolbarOverflowDirective,
        ToolbarOverflowBodyDirective,
        ToolbarOverflowLabelDirective,
        ToolbarOverflowFormLabelDirective
    ],
    imports: [CommonModule],
    exports: [
        ToolbarComponent,
        ToolbarSpacerDirective,
        ToolbarSeparatorDirective,
        ToolbarOverflowDirective,
        ToolbarOverflowBodyDirective,
        ToolbarOverflowLabelDirective,
        ToolbarOverflowFormLabelDirective
    ]
})
export class ToolbarModule {}
