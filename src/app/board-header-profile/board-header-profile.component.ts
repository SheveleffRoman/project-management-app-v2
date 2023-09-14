import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileChangeDialogComponent } from '../profile-change-dialog/profile-change-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-board-header-profile',
  templateUrl: './board-header-profile.component.html',
  styleUrls: ['./board-header-profile.component.scss'],
})
export class BoardHeaderProfileComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  name: string | null = null;
  location?: string = 'Tbilisi, Georgia';

  options: boolean = false;

  ngOnInit(): void {
    this.findName();
  }

  findName(): void {
    let name = localStorage.getItem('loggedInUser');
    if (name) {
      this.name = name;
    }
  }

  showOptions() {
    this.options = true;
  }

  declineOptions() {
    this.options = false;
  }

  showChangeDialog(): Observable<profileData> {
    const profileData: profileData = {
      name: this.name,
      location: this.location,
    };
    const dialogRef = this.dialog.open(ProfileChangeDialogComponent, {
      width: '400px',
      data: profileData,
    });
    return dialogRef.afterClosed();
  }

  updateProfile() {
    this.showChangeDialog().subscribe((result) => {
      if (result) {
        this.name = result.name;
        this.location = result.location;
      }
    });
  }
}

export interface profileData {
  name: string | null;
  location?: string;
}
