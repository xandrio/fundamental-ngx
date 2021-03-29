import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class DynamicPageLayoutPo extends BaseComponentPo {
    private url = '/dynamic-page';
    basicExampleButton = 'fdp-platform-dynamic-page-example button';
    snapsExampleButton = 'fdp-platform-dynamic-page-snap-scroll-example button';
    tabbesExampleButton = 'fdp-platform-dynamic-page-tabbed-example button';
    responsiveExampleButton = 'fdp-platform-dynamic-page-responsive-padding-example button';
    disableHeaderCollapseExampleButton = 'fdp-platform-dynamic-page-non-collapsible-example button';
    flexibleColumnExampleButton = 'fdp-platform-dynamic-page-flexible-column-example button';

    dynamicPage = 'fdp-dynamic-page';
    dynamicPageCollapseIcon = '.fd-dynamic-page__collapse-button';
    dynamicPageContentStart = 'fdp-dynamic-page-content br';
    dynamicPageContentEnd = 'fdp-dynamic-page-content .footer-spacer';
    dynamicPageTitle = '.fd-dynamic-page__title';
    dynamicPageToolBar = '.fd-dynamic-page__toolbar';
    dynamicPageToolBarContainer = '.fd-dynamic-page__toolbar-container';
    dynamicPageTabs = '.fd-dynamic-page__tabs--overflow .fd-tabs__item';
    dynamicPageTabsContent = 'fdp-dynamic-page-tabbed-content';
    dynamicPageToolBarAccept = this.dynamicPageToolBarContainer + ' .fd-button--positive';
    dynamicPageToolBarReject = this.dynamicPageToolBarContainer + ' .fd-button--negative';
    dynamicPageCollapsibleHeader = this.dynamicPage + ' .fd-dynamic-page__collapsible-header-container [role="region"]';

    columnSection = 'section';
    openColumnButton = '.docs-fcl-example-section button';
    columnSectionHeader = 'section header';
    columnSectionExpandIcon = '.fd-flexible-column-layout__button';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'checkbox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'checkbox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
