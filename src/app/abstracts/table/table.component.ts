import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { AdditionalActionsDirective } from '../../directives/additional-actions.directive';
import { AdditionalHtmlDirective } from '../../directives/additional-html.directive';
import { NgxTranslateModule } from '../../modules/ngx-translate/ngx-translate.module';
import { EMPTY_STRING, ENTITY_NAME } from '../../utils/models/constants.model';
import { DialogUtils } from '../../utils/models/dialog-utils.model';
import { MessageService } from '../../utils/services/message.service';
import { MyStorageService } from '../../utils/storages/my-storage.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FilterColumnsComponent } from '../filter-columns/filter-columns.component';
import { AbstractBaseEntity } from '../model/abstract-base-entity.model';
import { AbstractComponent } from '../model/abstract-component.model';
import { AbstractSearchObject } from '../model/abstract-search.model';
import { AbstractService } from '../model/abstract-service.model';
import { TableColumn } from './shared/table-column.model';
import { TableData } from './shared/table-data.model';
import { TableItemAction } from './shared/table-item-action.model';
import { CsvDownloadComponent } from "../csv-download/csv-download.component";



@Component({
    selector: 'app-table',
    standalone: true,
    providers: [
        MessageService,
        MyStorageService,
        TranslateService,
        TranslateStore,
        NgFor,
        NgForOf,
        NgModel
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        NgxTranslateModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        DragDropModule,
        MatProgressSpinnerModule,
        CsvDownloadComponent
    ]
})
export class TableComponent
  extends AbstractComponent
  implements OnInit, AfterViewInit {

  constructor(
    messageService: MessageService,
    translate: TranslateService,
    storageService: MyStorageService,
    private matDialog: MatDialog,
    private ref: ChangeDetectorRef
  ) {
    super(messageService, translate, storageService);
  }

  @Input() objectList: AbstractBaseEntity[] = [];
  @Input() displayActions: string[] = [];
  @Input() tableId!: string;
  @Input() service!: AbstractService<AbstractBaseEntity, AbstractSearchObject>;
  @Input() isProcessing: boolean = false;
  @Input() searchObj!: AbstractSearchObject;
  @Input() pageSizeOptions: number[] = [5, 10, 15, 20, 100];
  @Input() pageSize: number = 5;

  @Output() addItem: EventEmitter<TableItemAction<any>> = new EventEmitter();
  @Output() deleteItem: EventEmitter<TableItemAction<any>> = new EventEmitter();
  @Output() editItem: EventEmitter<TableItemAction<any>> = new EventEmitter();
  @Output() dragDrop: EventEmitter<AbstractBaseEntity[]> = new EventEmitter();

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @ContentChild(AdditionalActionsDirective, { read: TemplateRef }) additionalActions!: TemplateRef<any>;
  @ContentChild(AdditionalHtmlDirective, { read: TemplateRef }) additionalHtml!: TemplateRef<any>;

  tableData!: TableData;
  visibleColumns: string[] = [];
  tableColumns: TableColumn[] = [];
  identifiers: string[] = [];
  mandatoryFields: string[] = [];
  copyObjectList: AbstractBaseEntity[][] = [];
  
  confirmDialog?: MatDialogRef<ConfirmDialogComponent>;
  filterColumnsDialogRef?: MatDialogRef<FilterColumnsComponent>;
  itemsPerPage: string = EMPTY_STRING;

  ngOnInit(): void {
    this.getTableColumns();
  }

  ngAfterViewInit(): void {
    this.initDataSource();
  }

  getTableColumns(): void {
    this.tableColumns = [];
    this.visibleColumns = [];
    this.tableData = this.storageService.getTableData(this.tableId);
    this.identifiers = this.tableData.primaryIdentifiers;
    this.mandatoryFields = this.tableData.fields.filter(field => field.colMandatory).map(field => field.colId);
    this.visibleColumns = this.tableData.fields.filter(field => field.colVisible).map(field => field.colId);
    this.tableColumns = this.tableData.fields;
    if (this.displayActions && this.displayActions.length) {
      this.visibleColumns.push("actions");
    }
  }

  getDisplayFormat(content: any, index: any) {
    return content;
  }

  initDataSource(): void {
    this.dataSource.data = this.objectList;
    this.dataSource.sort = this.sort;
    //TODO: translations of labels does not work
    // this.paginator._intl = this.myPaginatorIntl;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes["objectList"]) {
      this.dataSource.data = changes["objectList"]["currentValue"];
    }
  }

  displayActionsContains(action: string): boolean {
    return this.displayActions.indexOf(action) >= 0;
  }

  getItemForAdditionalHtml(column: TableColumn, row: any): TableItemAction<any> {
    let tableItemAction = this.getTableItemAction(row);
    tableItemAction.column = column;
    return tableItemAction;
  }

  onEdit(row: any): void {
    let tableItemAction = this.getTableItemAction(row);
    this.editItem.emit(tableItemAction);
  }

  onDelete(row: any): void {
    let tableItemAction = this.getTableItemAction(row);
    this.confirmDialog = this.matDialog.open(
      ConfirmDialogComponent,
      DialogUtils.createDefaultPanelDialogConfig(500, "dialog")
    );
    this.confirmDialog.componentInstance.confirmMessage = this.translate.instant("general.messages.ask-confirm", {
      name: this.translate.instant("general.labels." + this.tableId + ENTITY_NAME),
      identifiers: tableItemAction.identifiers.map(identifier => tableItemAction.item[identifier]).join(" / ")
    });
    this.confirmDialog.componentInstance.yes = this.translate.instant("general.buttons.yes");
    this.confirmDialog.componentInstance.no = this.translate.instant("general.buttons.no");
    this.confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem.emit(tableItemAction);
      }
      this.confirmDialog = undefined;
    });
  }

  onAdd(): void {
    let tableItemAction = this.getTableItemAction(null);
    tableItemAction.isAdd = true;
    this.addItem.emit(tableItemAction);
  }

  dropTable(event: any) {
    this.copyObjectList.push(Array.from(this.objectList));
    const prevIndex = this.objectList.findIndex((d) => d === event.item.data);
    moveItemInArray(this.objectList, prevIndex, event.currentIndex);
    this.dataSource.data = this.objectList;
  }

  cancelSort(): void {
    //TODO: perhaps RELOAD_SEARCH is expensive
    // this.messageService.sendMessage(RELOAD_SEARCH);
    this.isProcessing = true;
    this.dataSource.data = this.copyObjectList[0];
    this.copyObjectList = [];
    this.isProcessing = false;
  }

  openFilterColumns(): void {
    this.filterColumnsDialogRef = this.matDialog.open(
      FilterColumnsComponent,
      DialogUtils.createDefaultPanelDialogConfig(400, "dialog")
    );
    this.filterColumnsDialogRef.disableClose = true;
    this.filterColumnsDialogRef.componentInstance.tableData = this.tableData;
    this.filterColumnsDialogRef.componentInstance.tableId = this.tableId;
    this.filterColumnsDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTableColumns();
      }
      this.filterColumnsDialogRef = undefined;
    });
  }

  getTableItemAction(row: any): TableItemAction<any> {
    let tableItemAction = new TableItemAction<any>();
    tableItemAction.identifiers = this.identifiers;
    tableItemAction.isAdd = false;
    tableItemAction.mandatories = this.mandatoryFields;
    tableItemAction.item = row;
    return tableItemAction;
  }

  getColumnTitle(col: TableColumn): string {
    return this.translate.instant(this.tableId + ".table.columns." + col.colId + ".hover");
  }

  getColumnName(col: TableColumn): string {
    return this.translate.instant(this.tableId + ".table.columns." + col.colId + ".label");
  }
}
