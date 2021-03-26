import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DynamicPageService } from '../../dynamic-page.service';
import { By } from '@angular/platform-browser';
import { PlatformDynamicPageModule } from '../../dynamic-page.module';
import { DynamicPageHeaderComponent } from './dynamic-page-header.component';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { AvatarModule, FacetModule } from '@fundamental-ngx/core';

@Component({
    template: `<fdp-dynamic-page-header
        [collapsible]="collapsible"
        [pinnable]="pinnable"
        [collapsed]="collapsed"
        [expandLabel]="expandLabel"
        [collapseLabel]="collapseLabel"
        [pinAriaLabel]="pinAriaLabel"
        [unpinAriaLabel]="unpinAriaLabel"
    >
        <fd-facet-group>
            <fd-facet type="image">
                <fd-avatar image="http://picsum.photos/id/1018/400" size="l"></fd-avatar>
            </fd-facet>
        </fd-facet-group>
    </fdp-dynamic-page-header>`
})
class TestComponent {
    collapsible = true;
    pinnable = false;
    collapsed = false;
    expandLabel = 'Collapse';
    collapseLabel = 'Expand';
    pinAriaLabel = 'Pinned';
    unpinAriaLabel = 'Unpinned';

    @ViewChild(DynamicPageHeaderComponent) dynamicPageTitleComponent: DynamicPageHeaderComponent;
    constructor(public dynamicPageService: DynamicPageService, public ruler: ViewportRuler) {}
}

describe('DynamicPageHeaderComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let pageHeaderComponent: DynamicPageHeaderComponent;
    let component: TestComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformDynamicPageModule, FacetModule, AvatarModule],
                declarations: [TestComponent],
                providers: [DynamicPageService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        pageHeaderComponent = component.dynamicPageTitleComponent;
    });
    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('Should not be able to see expand/collapse or pin button if collapsible is "false"', async () => {
        let expandCollapseButton = fixture.debugElement.queryAll(
            By.css('.fd-dynamic-page__collapsible-header-visibility-container--button-group')
        );
        expect(expandCollapseButton.length).toBe(1);
        component.collapsible = false;
        await wait(fixture);
        expandCollapseButton = fixture.debugElement.queryAll(
            By.css('.fd-dynamic-page__collapsible-header-visibility-container--button-group')
        );
        expect(expandCollapseButton.length).toBe(0);
    });

    describe('expand actions', async () => {
        it('should be able to expand the header', async () => {
            component.collapsed = false;
            await wait(fixture);
            const contentEl = fixture.debugElement.queryAll(By.css('.fd-dynamic-page__collapsible-header'));
            expect(contentEl.length).toBe(1);
        });

        it('should set aria labels correctly', async () => {
            component.collapsed = false;
            component.collapseLabel = 'Expand';
            await wait(fixture);
            const collapseBtn: HTMLButtonElement = fixture.debugElement.query(
                By.css('.fd-dynamic-page__collapse-button')
            ).nativeElement;
            expect(collapseBtn.getAttribute('aria-label')).toBe(component.collapseLabel);
        });
    });
    describe('collapse actions', async () => {
        it('should be able to collapse the header', async () => {
            component.collapsed = true;
            fixture.detectChanges();
            const contentEl: HTMLElement = fixture.debugElement.query(By.css('.fd-dynamic-page__collapsible-header'))
                .nativeElement;
            expect(contentEl.getAttribute('aria-hidden')).toBeTruthy();
        });

        it('should set aria labels correctly', async () => {
            component.collapsed = true;
            fixture.detectChanges();
            const collapseBtn: HTMLButtonElement = fixture.debugElement.query(
                By.css('.fd-dynamic-page__collapse-button')
            ).nativeElement;
            expect(collapseBtn.getAttribute('aria-label')).toBe(component.collapseLabel);
        });

        it('should handle collapse from service', () => {
            component.collapsed = false;
            component.dynamicPageService.collapseHeader();

            fixture.detectChanges();
            expect(pageHeaderComponent.collapsed).toBeTrue();
        });
    });
    describe('pin actions', async () => {
        it('should be able to pin the header', async () => {
            component.pinnable = true;
            await wait(fixture);

            const pinBtn: HTMLButtonElement = fixture.debugElement.query(By.css('.fd-dynamic-page__pin-button'))
                .nativeElement;
            pinBtn.click();
            const contentEl = fixture.debugElement.queryAll(By.css('.fd-dynamic-page__collapsible-header'));
            expect(contentEl.length).toBe(1);
        });
    });

    it('should apply correct facet classes when the window is resized to small', () => {
        const spy = jasmine.createSpy('_modifyFacetClasses');
        const subscription = component.ruler.change(0).subscribe(spy);

        spyOn(component.dynamicPageTitleComponent.elementRef().nativeElement, 'getBoundingClientRect')
        .and.returnValue({ top: 1, height: 100, left: 2, width: 200, right: 202, x: 0, y: 0, bottom: 0, toJSON: null });
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
});
