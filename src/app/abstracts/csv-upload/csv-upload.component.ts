import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY_STRING } from '../../utils/models/constants.model';

@Component({
  selector: 'app-csv-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `<label class="w300 d-flex">
              <input style="display: none" type="file" accept=".csv" (change)="upload($event)" #csvUpload>
              <mat-icon>file_upload</mat-icon>CSV Upload
              <label>{{ filename }}</label>
            </label>`
})
export class CsvUploadComponent {
  @Output() notify: EventEmitter<any> = new EventEmitter();

  @ViewChild('csvUpload') csvUpload: any;
  filename: string = EMPTY_STRING;

  upload(e: any): void {
    this.filename =  e.srcElement.files[0].name;
    this.notify.emit(e.target.files[0]);
    this.csvUpload.nativeElement.value = EMPTY_STRING;
  }
}