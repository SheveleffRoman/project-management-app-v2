import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBar and MatSnackBarModule

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule, MatSnackBarModule], // Import MatDialogModule and HttpClientTestingModule
      providers: [
        // Provide a mock implementation for MatDialog
        { provide: MatDialog, useValue: { open: () => {} } },
        { provide: MatSnackBar, useValue: { open: () => {} } },
      ]
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});