import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskX } from '../task.service';

@Component({
  selector: 'app-task-change-dialog',
  templateUrl: './task-change-dialog.component.html',
  styleUrls: ['./task-change-dialog.component.scss'],
})
export class TaskChangeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskX
  ) {}

  onChange(): void {
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface taskChangeData {
  title: string;
  description: string;
}
