import { Component, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Process, ProcessFieldsEnum, Stats } from '../../types';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDialogActions } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
  imports: [
    MatTableModule,
    MatDialogContent,
    MatDialogTitle,
    MatCardModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
  ],
})
export class DialogContentComponent {
  processFieldsEnum = ProcessFieldsEnum;

  displayedColumns = [
    ProcessFieldsEnum.CompletionTime,
    ProcessFieldsEnum.WaitingTime,
    ProcessFieldsEnum.TurnaroundTime,
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { stats: Stats }) {
    console.log(this.data);
  }
}
