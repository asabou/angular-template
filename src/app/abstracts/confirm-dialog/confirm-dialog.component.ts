import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxTranslateModule } from '../../modules/ngx-translate/ngx-translate.module';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, DragDropModule, NgxTranslateModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  public confirmMessage!: string;

  public yes!: string;

  public no!: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
}
