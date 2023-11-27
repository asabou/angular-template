import { CommonModule, formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { EMPTY_STRING } from '../../utils/models/constants.model';

@Component({
  selector: 'app-csv-download',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `<mat-icon (click)="downloadCSV()"  
              title="{{ iconTitle }}">file_download</mat-icon>`
})
export class CsvDownloadComponent {
  @Input() items: any[] = [];
  @Input() title: string = EMPTY_STRING;
  @Input() iconTitle: string = EMPTY_STRING;
  @Input() separator: string = ",";

  downloadCSV(): void {
    const list: any[] = this.getCSVData();
    const title: string = this.title + "-" + formatDate(new Date(), 'dd.MM.yyyy', 'en-GB') + ".csv";
    const stream = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(list));
    const blob = new Blob(['\ufeff', stream], { type: 'text/csv' });
    FileSaver.saveAs(blob, title);
  }

  getCSVData(): any[] {
    return this.items;
  }
}
