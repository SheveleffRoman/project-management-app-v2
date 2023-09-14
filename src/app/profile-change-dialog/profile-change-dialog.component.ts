import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { profileData } from '../board-header-profile/board-header-profile.component';

@Component({
  selector: 'app-profile-change-dialog',
  templateUrl: './profile-change-dialog.component.html',
  styleUrls: ['./profile-change-dialog.component.scss']
})
export class ProfileChangeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProfileChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: profileData
  ) {}

  onChange(): void {
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

