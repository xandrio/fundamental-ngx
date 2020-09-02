import { ComponentRef, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { DefaultDialogObject } from '../default-dialog/default-dialog-object';
import { DIALOG_CONFIG, DIALOG_REF, DialogRef, DialogConfig } from '../dialog-utils';

/** Service used to dynamically generate a dialog. */
@Injectable()
export class DialogBaseService {
    /** @hidden Collection of existing dialog references */
    private _dialogs: ComponentRef<DialogContainerComponent>[] = [];

    constructor(
        private _dynamicComponentService: DynamicComponentService,
        private _defaultConfig: DialogConfig
    ) {}

    /**
     * Status of the dialog service.
     * Returns true if there are open dialogs, false otherwise.
     */
    public hasOpenDialogs(): boolean {
        return this._dialogs && this._dialogs.length > 0;
    }

    /** Dismisses all currently open dialogs. */
    public dismissAll(): void {
        this._dialogs.forEach((item) => this._destroyDialogComponent(item));
    }

    /**
     * Opens a dialog component with a content of type TemplateRef or a component type.
     * @param contentType Content of the dialog component.
     * @param dialogConfig Configuration of the dialog component.
     */
    public open(contentType: Type<any> | TemplateRef<any> | DefaultDialogObject, dialogConfig?: DialogConfig): DialogRef {
        const dialogRef: DialogRef = new DialogRef();

        dialogConfig = this._applyDefaultConfig(dialogConfig, this._defaultConfig || new DialogConfig());
        dialogRef.data = dialogConfig.data;

        const dialogInjector = Injector.create({
            providers: [
                {provide: DIALOG_CONFIG, useValue: dialogConfig},
                {provide: DIALOG_REF, useValue: dialogRef}
            ]
        });

        const component: ComponentRef<DialogContainerComponent> = this._dynamicComponentService
            .createDynamicComponent<DialogContainerComponent>(
                contentType,
                DialogContainerComponent,
                dialogConfig,
                { injector: dialogInjector }
            );

        this._dialogs.push(component);

        const defaultBehaviourOnClose = () => {
            this._destroyDialogComponent(component);
            refSub.unsubscribe();
        };

        const refSub = dialogRef.afterClosed.subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);

        return dialogRef;
    }

    /** @hidden Destroy existing Dialog */
    private _destroyDialogComponent(dialog: ComponentRef<DialogContainerComponent>): void {
        const arrayRef = this._dialogs.find((item) => item === dialog);
        const indexOf = this._dialogs.indexOf(arrayRef);
        this._dynamicComponentService.destroyComponent(arrayRef);
        arrayRef.destroy();

        this._dialogs[indexOf] = null;
        this._dialogs = this._dialogs.filter((item) => item !== null && item !== undefined);
    }

    /** @hidden Extends dialog config using default values*/
    private _applyDefaultConfig(config: DialogConfig, defaultConfig: DialogConfig): DialogConfig {
        return {...defaultConfig, ...config};
    }
}
