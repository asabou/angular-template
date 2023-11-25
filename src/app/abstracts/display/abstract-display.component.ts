import { CommonModule } from "@angular/common";
import { AbstractBaseEntity } from "../model/abstract-base-entity.model";
import { AbstractSearchObject } from "../model/abstract-search.model";
import { AbstractService } from "../model/abstract-service.model";
import { Component, Inject, ViewChild } from "@angular/core";
import { MatTable } from "@angular/material/table";
import { MessageService } from "../../utils/message.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "../../utils/toast.service";
import { MyStorageService } from "../../utils/storages/my-storage.service";
import { TableItemAction } from "../table/shared/table-item-action.model";

@Component({
    standalone: true,
    imports: [CommonModule],
    template: '',
  })
export abstract class AbstractDisplayComponent<
    T extends AbstractBaseEntity,
    S extends AbstractSearchObject,
    U extends AbstractService<T, S>
    > {
    
    objList: T[] = [];
    isSearchInProgress: boolean = false;
    searchObj!: S;

    // @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

    constructor(
        @Inject(AbstractService) public service: U,
        public messageService: MessageService,
        public MatDialog: MatDialog,
        public activeRoute: ActivatedRoute,
        public router: Router,
        public toast: ToastService,
        public storage: MyStorageService
    ) {
        
    }

    abstract getDisplayActions(): string[];

    abstract getTableId(): string;

    abstract openSaveDialog(tia: TableItemAction<T>): void;

    onSearchStart(searchObj: S): void {
        this.isSearchInProgress = true;
        this.searchObj = searchObj;
        this.objList = [];
    }

    onNotify(objList: T[]): void {
        this.objList = objList;
        console.log(objList);
        this.isSearchInProgress = false;
    }

    addItem(tia: TableItemAction<T>): void {
        this.openSaveDialog(tia);
    }

    deleteItem(tia: TableItemAction<T>): void {
        console.log(tia);
    }

    editItem(tia: TableItemAction<T>): void {
        this.openSaveDialog(tia);
    }
    
}