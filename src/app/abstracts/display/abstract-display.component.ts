import { CommonModule } from "@angular/common";
import { Component, Inject, ViewChild } from "@angular/core";
import { MatTable } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
import { NgxTranslateModule } from "../../modules/ngx-translate/ngx-translate.module";
import { ENTITY_NAME, RELOAD_SEARCH } from "../../utils/models/constants.model";
import { MessageService } from "../../utils/services/message.service";
import { MyStorageService } from "../../utils/storages/my-storage.service";
import { AbstractBaseEntity } from "../model/abstract-base-entity.model";
import { AbstractComponent } from "../model/abstract-component.model";
import { AbstractSearchObject } from "../model/abstract-search.model";
import { AbstractService } from "../model/abstract-service.model";
import { TableItemAction } from "../table/shared/table-item-action.model";
import { ToastService } from "../../utils/services/toast.service";

@Component({
    standalone: true,
    imports: [CommonModule, NgxTranslateModule],
    template: '',
  })
export abstract class AbstractDisplayComponent<
    T extends AbstractBaseEntity,
    S extends AbstractSearchObject,
    U extends AbstractService<T, S>
    > extends AbstractComponent {
    
    objList: T[] = [];
    isSearchInProgress: boolean = false;
    searchObj!: S;

    @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

    constructor(
        @Inject(AbstractService) public service: U,
        public toast: ToastService,
        messageService: MessageService,
        translate: TranslateService,
        storageService: MyStorageService
    ) {
        super(messageService, translate, storageService);
    }

    abstract getDisplayActions(): string[];

    abstract getTableId(): string;

    //perhaps ADD and EDIT are not the same forms and we need special handling for each of them
    abstract openAddForm(tia: TableItemAction<T>): void;

    abstract openEditForm(tia: TableItemAction<T>): void;

    getItemID(tia: any): any {
        return tia.identifiers.map((identifier: string) => tia.item[identifier]).join("/");
    }

    onSearchStart(searchObj: S): void {
        this.isSearchInProgress = true;
        this.searchObj = searchObj;
        this.objList = [];
    }

    onNotify(objList: T[]): void {
        this.objList = objList;
        this.isSearchInProgress = false;
    }

    addItem(tia: TableItemAction<T>): void {
        this.openAddForm(tia);
    }

    editItem(tia: TableItemAction<T>): void {
        this.openEditForm(tia);
    }

    deleteItem(tia: any): void {
        this.isSearchInProgress = true;
        let id = this.getItemID(tia);
        this.service.delete(id).subscribe(() => {
            this.toast.success(this.translate.instant("general.messages.success.0001", { record: tia.item[ENTITY_NAME] }));
            //this.messageService.sendMessage(RELOAD_SEARCH);
            //TODO: what if search and load into mat-table are expensive? how about we filter the objList?
            this.objList = this.objList.filter(item => !this.areItemsEquals(tia, item));
            this.isSearchInProgress = false;
        });
    }

    areItemsEquals(tia: any, b: any): boolean {
        let a: any = tia.item;
        for (let identifier of tia.identifiers) {
            if (a[identifier] !== b[identifier]) {
                return false;
            }
        }
        return true;
    }
    
}