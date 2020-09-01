import { DialogBaseConfig } from '../dialog-base/dialog-base-config.interface';

export class DialogDefaultConfig implements DialogBaseConfig {
    hasBackdrop = true;
    focusTrapped = true;
    escKeyCloseable = true;
    verticalPadding = true;
    responsivePadding = false;
    backdropClickCloseable = true;

    ariaLabel: string = null;
    ariaLabelledBy: string = null;
    ariaDescribedBy: string = null;

    backdropClass = '';
    containerClass = '';
    dialogPanelClass = '';
    container: HTMLElement | 'body' = 'body';
}
