import { ButtonPo } from '../pages/button.po';
import {
    getAttributeByName,
    getElementArrayLength,
    isElementClickable,
    scrollIntoView,
    setValue,
    click,
    sendKeys,
    checkElementScreenshot,
    mouseHoverElement, saveElementScreenshot, addIsActiveClass, getImageTagBrowserPlatform
} from '../../driver/wdio';
import {
    testText, fdTypeOptions, iconOptions, button
} from '../fixtures/appData/button-contents';
import {
    stateButtonsDisableTag,
    buttonsIconTag,
    buttonsMenuTag, buttonPlaygroundTag,
    buttonsSizeTag,
    buttonsTypeTag, buttonStateTag
} from '../fixtures/testData/button-tags';

describe('Button test suite:', function() {
    const buttonPage = new ButtonPo();
    const {
        typeButtons, menuButtons, sizeButtons, iconButtons, stateButton, disableStateButtons, playgroundButton, inputLabel,
        checkboxMenu, checkboxCompact, dropDownMenu
    } = buttonPage;

    beforeAll(() => {
        buttonPage.open();
    }, 1);

    describe('Verify all buttons are clickable', function() {

        it('verify clickable buttons types', () => {
            const typeButtonsLength = getElementArrayLength(typeButtons);
            for (let i = 0; i < typeButtonsLength; i++) {
                scrollIntoView(typeButtons, i);
                expect(isElementClickable(typeButtons, i)).toBe(true, `type button with index ${i} not clickable`);
            }
        });

        it('verify clickable menu buttons', () => {
            const menuButtonsLength = getElementArrayLength(menuButtons);
            for (let i = 0; i < menuButtonsLength; i++) {
                scrollIntoView(menuButtons, i);
                expect(isElementClickable(menuButtons, i)).toBe(true, `menu button with index ${i} not clickable`);
            }
        });

        it('verify clickable size buttons', () => {
            const sizeButtonsLength = getElementArrayLength(sizeButtons);
            for (let i = 0; i < sizeButtonsLength; i++) {
                scrollIntoView(sizeButtons, i);
                expect(isElementClickable(sizeButtons, i)).toBe(true, `size button with index ${i} not clickable`);
            }
        });

        it('verify buttons with icons', () => {
            const iconButtonsLength = getElementArrayLength(iconButtons);
            for (let i = 0; i < iconButtonsLength; i++) {
                scrollIntoView(iconButtons, i);
                expect(isElementClickable(iconButtons, i)).toBe(true, `icon button with index ${i} not clickable`);
            }
        });

        it('verify state buttons', () => {
            scrollIntoView(stateButton);
            expect(isElementClickable(stateButton)).toBe(true, `state button with index not clickable`);
        });

        it('verify playground button is clickable', () => {
            scrollIntoView(playgroundButton);
            expect(isElementClickable(playgroundButton)).toBe(true, `playground button with index not clickable`);
        });
    });

    it('verify disable state buttons', () => {
        expect(getAttributeByName(disableStateButtons, 'aria-disabled')).toEqual('true');
        expect(getAttributeByName(disableStateButtons, 'disabled', 1)).toEqual('true');
    });

    describe('Verify playground', function() {

        it('verify changing text in label', () => {
            scrollIntoView(inputLabel);
            setValue(inputLabel, 'test');
            expect(getAttributeByName(playgroundButton, 'ng-reflect-label')).toEqual(testText);
        });

        // skipped due to https://github.com/webdriverio/webdriverio/issues/3605
        xit('verify type of dropdown menu', () => {
            scrollIntoView(dropDownMenu);
            click(dropDownMenu);
            for (let i = 0; i < fdTypeOptions.length; i++) {
                setValue(dropDownMenu, fdTypeOptions[i]);
                sendKeys(['Enter']);
                click(playgroundButton);
                expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-type')).toEqual(fdTypeOptions[i]);
                saveElementScreenshot(playgroundButton, buttonPlaygroundTag + `${fdTypeOptions[i]}`, buttonPage.getScreenshotFolder());
                expect(checkElementScreenshot(playgroundButton, buttonPlaygroundTag + `${fdTypeOptions[i]}`, buttonPage.getScreenshotFolder()))
                    .toBeLessThan(5, `Playground button mismatch`);
            }
        });

        // skipped due to https://github.com/webdriverio/webdriverio/issues/3605
        xit('verify icon of dropdown menu', () => {
            scrollIntoView(dropDownMenu, 1);
            click(dropDownMenu, 1);
            for (let i = 0; i < iconOptions.length; i++) {
                setValue(dropDownMenu, iconOptions[i], 1);
                sendKeys(['Enter']);
                click(playgroundButton);
                expect(getAttributeByName(playgroundButton, 'ng-reflect-glyph')).toEqual(iconOptions[i]);
                saveElementScreenshot(playgroundButton, buttonPlaygroundTag + `${iconOptions[i]}`,
                    buttonPage.getScreenshotFolder());
                expect(checkElementScreenshot(playgroundButton, buttonPlaygroundTag + `${iconOptions[i]}`,
                    buttonPage.getScreenshotFolder()))
                    .toBeLessThan(5, `Playground button mismatch`);
            }
        });

        xit('verify menu checkbox visual regression', () => {
            scrollIntoView(checkboxMenu);
            click(checkboxMenu);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-menu')).toEqual('true');
            saveElementScreenshot(playgroundButton, buttonPlaygroundTag + 'menu', buttonPage.getScreenshotFolder());
            expect(checkElementScreenshot(playgroundButton, buttonPlaygroundTag + 'menu', buttonPage.getScreenshotFolder()))
                .toBeLessThan(5, `Playground button mismatch`);
            click(checkboxMenu);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-menu')).toEqual('false');
            saveElementScreenshot(playgroundButton, buttonPlaygroundTag + 'not-menu', buttonPage.getScreenshotFolder());
            expect(checkElementScreenshot(playgroundButton, buttonPlaygroundTag + 'not-menu', buttonPage.getScreenshotFolder()))
                .toBeLessThan(5, `Playground button mismatch`);
        });

        xit('verify compact checkbox visual regression', () => {
            scrollIntoView(checkboxCompact);
            click(checkboxCompact);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-compact')).toEqual('true');
            saveElementScreenshot(playgroundButton, buttonPlaygroundTag + 'compact', buttonPage.getScreenshotFolder());
            expect(checkElementScreenshot(playgroundButton, buttonPlaygroundTag + 'compact', buttonPage.getScreenshotFolder()))
                .toBeLessThan(5, `Playground button mismatch`);
            click(checkboxCompact);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-compact')).toEqual('false');
            saveElementScreenshot(playgroundButton, buttonPlaygroundTag + 'not-compact', buttonPage.getScreenshotFolder());
            expect(checkElementScreenshot(playgroundButton, buttonPlaygroundTag + 'not-compact', buttonPage.getScreenshotFolder()))
                .toBeLessThan(5, `Playground button mismatch`);
        });
    });

    describe('Check visual regression basic', function() {

        it('should check examples visual regression', () => {
            buttonPage.saveExampleBaselineScreenshot();
            expect(buttonPage.compareWithBaseline()).toBeLessThan(5);
        });

        xit('should check buttons type states', () => {
            const typeButtonsLength = getElementArrayLength(typeButtons);
            for (let i = 0; i < typeButtonsLength; i++) {
                scrollIntoView(typeButtons, i);
                checkElementStates(typeButtons, buttonsTypeTag + i + '-', button, i);
            }
        });

        xit('should check state button states', () => {
            scrollIntoView(stateButton);
            checkElementStates(stateButton, buttonStateTag, button);
        });

        xit('verify disable state buttons hover state', () => {
            const disableStateButtonsLength = getElementArrayLength(disableStateButtons);
            for (let i = 0; i < disableStateButtonsLength; i++) {
                scrollIntoView(disableStateButtons, i);
                checkElementHoverState(disableStateButtons, stateButtonsDisableTag + i + '-hover-state-', button, i);
            }
        });

        xit('should check buttons with icons states', () => {
            const iconButtonsLength = getElementArrayLength(iconButtons);
            for (let i = 0; i < iconButtonsLength; i++) {
                scrollIntoView(iconButtons, i);
                checkElementStates(iconButtons, buttonsIconTag + i + '-', button, i);
            }
        });

        xit('should check size buttons states', () => {
            const sizeButtonsLength = getElementArrayLength(sizeButtons);
            for (let i = 0; i < sizeButtonsLength; i++) {
                scrollIntoView(sizeButtons, i);
                checkElementStates(sizeButtons, buttonsSizeTag + i + '-', button, i);
            }
        });

        xit('should check menu buttons states', () => {
            const menuButtonsLength = getElementArrayLength(menuButtons);
            for (let i = 0; i < menuButtonsLength; i++) {
                scrollIntoView(menuButtons, i);
                checkElementStates(menuButtons, buttonsMenuTag + i + '-', button, i);
            }
        });
    });

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item with ${index} hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item with ${index} focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item with ${index} active state mismatch`);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementFocusState(selector, tag + 'focus-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }
});
