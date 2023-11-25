import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { AdditionalActionsDirective } from '../../directives/additional-actions.directive';
import { AdditionalHtmlDirective } from '../../directives/additional-html.directive';
import { NgxTranslateModule } from '../../modules/ngx-translate/ngx-translate.module';
import { MessageService } from '../../utils/message.service';
import { MyStorageService } from '../../utils/storages/my-storage.service';
import { AbstractBaseEntity } from '../model/abstract-base-entity.model';
import { AbstractComponent } from '../model/abstract-component.model';
import { AbstractSearchObject } from '../model/abstract-search.model';
import { AbstractService } from '../model/abstract-service.model';
import { TableColumn } from './shared/table-column.model';
import { TableData } from './shared/table-data.model';
import { TableItemAction } from './shared/table-item-action.model';


@Component({
  selector: 'app-table',
  standalone: true,
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
    MatIconModule
  ],
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
  styleUrl: './table.component.scss'
})
export class TableComponent extends AbstractComponent
  implements OnInit, AfterViewInit {

  constructor(
    messageService: MessageService,
    translate: TranslateService,
    storageService: MyStorageService
  ) {
    super(messageService, translate, storageService);
  }

  @Input() caption!: string;
  @Input() objectList: AbstractBaseEntity[] = [];
  @Input() displayActions: string[] = [];
  @Input() tableId!: string;
  @Input() service!: AbstractService<AbstractBaseEntity, AbstractSearchObject>;
  @Input() isProcessing: boolean = false;
  @Input() searchOnj!: AbstractSearchObject;
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

  visibleColumns: string[] = [];
  tableColumns: TableColumn[] = [];
  identifiers: string[] = [];
  ids: string[] = [];
  mandatoryFields: string[] = [];

  ngOnInit(): void {
    this.getTableColumns();
  }

  ngAfterViewInit(): void {
    this.initDataSource();
  }

  getTableColumns(): void {
    this.tableColumns = [];
    this.visibleColumns = [];
    let tableData: TableData = this.storageService.getTableData(this.tableId);
    this.identifiers = tableData.primaryIdentifiers;
    this.mandatoryFields = tableData.fields.filter(field => field.colMandatory).map(field => field.colId);
    this.visibleColumns = tableData.fields.filter(field => field.colVisible).map(field => field.colId);
    this.tableColumns = tableData.fields;
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
    let tableItemAction = this.getTableItemAction();
    tableItemAction.column = column;
    tableItemAction.item = row;
    return tableItemAction;
  }

  getItemForAdditionalActions(row: any): any {
    let tableItemAction = this.getTableItemAction();
    tableItemAction.item = row;
    return tableItemAction;
  }

  onEdit(row: any): void {
    let tableItemAction = this.getTableItemAction();
    tableItemAction.item = row;
    this.editItem.emit(tableItemAction);
  }

  onDelete(row: any): void {
    let tableItemAction = this.getTableItemAction();
    tableItemAction.item = row;
    this.deleteItem.emit(tableItemAction);
  }

  onAdd(): void {
    let tableItemAction = this.getTableItemAction();
    tableItemAction.isAdd = true;
    this.addItem.emit(tableItemAction);
  }

  private getTableItemAction(): TableItemAction<any> {
    let tableItemAction = new TableItemAction<any>();
    tableItemAction.identifiers = this.identifiers;
    tableItemAction.isAdd = false;
    tableItemAction.mandatories = this.mandatoryFields;
    return tableItemAction;
  }
}
