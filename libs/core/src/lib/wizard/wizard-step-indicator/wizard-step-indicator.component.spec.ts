<<<<<<< HEAD
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepIndicatorComponent } from './wizard-step-indicator.component';

describe('WizardStepIndicatorComponent', () => {
    let component: WizardStepIndicatorComponent;
    let fixture: ComponentFixture<WizardStepIndicatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WizardStepIndicatorComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardStepIndicatorComponent);
=======
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { WizardModule } from '../wizard.module';
import { WizardStepIndicatorComponent } from './wizard-step-indicator.component';

@Component({
    selector: 'fd-test-indicator',
    template: ` <fd-wizard-step-indicator glyph="accept"></fd-wizard-step-indicator> `
})
class TestWrapperComponent {}

describe('WizardStepIndicatorComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [WizardModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
>>>>>>> master
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
<<<<<<< HEAD
=======

    it('Should Add icon class with glyph on input', () => {
        const indicator = fixture.debugElement.nativeElement.querySelector('.fd-wizard__icon');
        expect(indicator.className).toContain('fd-wizard__icon sap-icon--accept');
    });
>>>>>>> master
});
