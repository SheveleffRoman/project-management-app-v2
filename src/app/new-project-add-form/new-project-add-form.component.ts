import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-project-add-form',
  templateUrl: './new-project-add-form.component.html',
  styleUrls: ['./new-project-add-form.component.scss'],
})
export class NewProjectAddFormComponent {
  constructor(
    public dialogRef: MatDialogRef<NewProjectAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onChange(): void {
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
