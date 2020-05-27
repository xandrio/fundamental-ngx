import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';
import { FormModule } from '@fundamental-ngx/core';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import '@angular/localize/init';

@Component({
    selector: 'fd-test-textarea',
    template: `
        <fd-textarea
            [placeholder]="'placeholder here'"
            [textExceededMessage]="'This is a warning'"
            [state]="'warning'"
            [(ngModel)]="value"
            [disabled]="disabled"
        >
        </fd-textarea>
    `
})
class TestWrapperComponent {
    @ViewChild(TextareaComponent, { static: true })
    textareaComponent: TextareaComponent;
    // @ViewChild(TextareaComponent) textareaValueRef;
    value: string = 'value:::Lorem ipsum dolor st amet, consetetur sadipscing elitr';
    disabled: boolean = false;
}

describe('TextareaComponent', () => {
    let component: TextareaComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, FormModule],
            declarations: [TextareaComponent, TestWrapperComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance.textareaComponent;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>) {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }
    it('should create', () => {
        // await fixture.whenStable();

        expect(component).toBeTruthy();
        // expect(component.textareaElement.nativeElement.classList.contains('fd-textarea')).toBe(true);
    });
    it('should listen to text change events', async () => {
        spyOn(component, 'onChange');
        spyOn(component, 'onTouched');
        spyOn(component, 'writeValue');
        // component.textArea = 'Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et edsdfsafLorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e';
        component.textArea = 'Lorem ipsum dolor st amet';
        // fixture.componentInstance.value = 'Lorem ipsum dolor st amet';
        expect(component.textArea.length).toBe(25);
        console.log('before await');
        await wait(fixture);
        console.log('after await');

        // expect(fixture.componentInstance.value.length).toBe(25);
        // increase text
        // fixture.componentInstance.textareaComponent.maxLength = 50;
        // component.textArea = 'Lorem ipsum dolor st amet, consetetur sadipscing elitr'; //change this to value and see
        // fixture.componentInstance.value = 'Lorem ipsum dolor st amet, consetetur sadipscing elitr';

        // expect(fixture.componentInstance.value.length).toBe(54);
        expect(component.onChange).toHaveBeenCalledWith('Lorem ipsum dolor st amet');
        expect(component.onTouched).toHaveBeenCalled();
        fixture.componentInstance.value = 'Lorem ipsum dolor st amet';
        await wait(fixture);
        expect(component.writeValue).toHaveBeenCalledWith('Lorem ipsum dolor st amet');

        // component.stepUpClicked();
        // expect(component.inputText).toBe(1);
        // expect(component.onChange).toHaveBeenCalledWith(1);
        // expect(component.onTouched).toHaveBeenCalled();
        // component.stepDownClicked();
        // expect(component.inputText).toBe(0);
        // expect(component.onChange).toHaveBeenCalledWith(0);
    });

    it('should work with counter', async () => {
        component.maxLength = 50;
        component.showExceededText = true;
        component.textareaElement.nativeElement.focus();

        expect(component.state).toBe('warning');
        expect(component.hasTextExceeded).toBe(false);

        fixture.componentInstance.value = 'tArea:::Lorem ipsum dolor st amet, consetetur sadipscing ';
        component.state = 'error';
        await wait(fixture);
        expect(component.textArea.length).toBe(57);
        expect(component.state).toBe('error');
        console.log('aaaaa' + component.textArea);
        await wait(fixture);

        expect(component.hasTextExceeded).toBe(true);
    });

    it('should set disabled property', async () => {
        fixture.componentInstance.value = 'sjdhsahkjs ';
        component.textareaElement.nativeElement.focus();
        spyOn(component, 'setDisabledState');
        fixture.componentInstance.disabled = true;
        await wait(fixture);
        expect(component.disabled).toBe(true);
        expect(component.setDisabledState).toHaveBeenCalled();
    });

    it('should handle paste interaction', async () => {
        console.log('here in paste');

        fixture.componentInstance.value = 'text';
        const pasteEvent = new ClipboardEvent('paste', {
            clipboard: 'new value'
        } as any);
        component.textareaElement.nativeElement.focus();
        await wait(fixture);
        component.textareaElement.nativeElement.dispatchEvent(pasteEvent);
        await wait(fixture);

        // component.handlePasteInteraction();
        // expect(fixture.componentInstance.value).toBe('textnew value');
        expect(component.textArea).toBe('textnew value');
    });
    // it('should set proper plural for single character', async () => {
    //     component.maxLength = 5;
    //     fixture.componentInstance.value = 'text';
    //     await wait(fixture);
    //     expect(component.plural).toBe('');
    //     fixture.componentInstance.value = 'texts';
    //     await wait(fixture);
    //     expect(component.plural).toBe('s');
    //     // component.handlePasteInteraction(event);
    // });

    it('should set proper message for excess or remaining characters', async () => {
        component.textareaElement.nativeElement.focus();
        component.maxLength = 5;
        fixture.componentInstance.value = 'text';
        await wait(fixture);
        expect(component.counterExcessOrRemaining).toBe('remaining');
        fixture.componentInstance.value = 'textss';
        await wait(fixture);
        expect(component.counterExcessOrRemaining).toBe('excess');
        // component.handlePasteInteraction(event);
    });
});
