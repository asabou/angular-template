import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../utils/services/message.service';
import { MyStorageService } from '../../utils/storages/my-storage.service';
import { AbstractComponent } from '../model/abstract-component.model';
import { TableData } from '../table/shared/table-data.model';
import { TableColumn } from '../table/shared/table-column.model';

@Component({
  selector: 'app-filter-columns',
  standalone: true,
  imports: [CommonModule, TranslateModule, DragDropModule],
  templateUrl: './filter-columns.component.html',
  styleUrl: './filter-columns.component.scss'
})
export class FilterColumnsComponent extends AbstractComponent {
  tableId!: string;
  tableData!: TableData;

  constructor(
    messageService: MessageService,
    translate: TranslateService,
    storageService: MyStorageService,
    private dialogRef: MatDialogRef<FilterColumnsComponent>,
  ) {
    super(messageService, translate, storageService);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  updateVisibleCols(event: any, colId: string) {
    for (const col of this.tableData.fields) {
      if (col.colId === colId) {
        col.colVisible = event.target.checked;
      }
    }
  }

  drop(event: any) {
    moveItemInArray(this.tableData.fields, event.previousIndex, event.currentIndex);
  }

  save(): void {
    this.storageService.setTableData(this.tableId, this.tableData);
    this.dialogRef.close(true);
  }

  getColumnTitle(col: TableColumn): string {
    return this.translate.instant(this.tableId + ".table.columns." + col.colId + ".hover");
  }

  getColumnName(col: TableColumn): string {
    return this.translate.instant(this.tableId + ".table.columns." + col.colId + ".label");
  }

}
