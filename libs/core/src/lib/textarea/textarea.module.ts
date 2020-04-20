import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea.component';
import { FormModule } from '../form/form.module';

@NgModule({
    declarations: [TextareaComponent],
    exports: [TextareaComponent],
    imports: [CommonModule, FormsModule, FormModule],
})
export class TextareaModule {}
