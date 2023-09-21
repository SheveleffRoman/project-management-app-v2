import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FakeAuthService } from '../fake-auth.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {

    // Создайте форму
    profileForm = this.formBuilder.group({
      username: new FormControl('',[Validators.required, this.customValidator.bind(this)])
    });

    login: string | null = ''

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: FakeAuthService,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  ngOnInit(): void {
    this.profileForm.valueChanges.subscribe((value) => console.log(value));
    this.profileForm.statusChanges.subscribe((value) => console.log(value));
    this.login = this.authService.getLogin();

  }

  confirm() {
    this.dialogRef.close(true); // Подтверждение удаления
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  customValidator(control: AbstractControl): { [key: string]: any } | null {
    const inputValue = control.value;
    if (inputValue === this.authService.getLogin()) {
      return null; // Вернуть null, если значение соответствует getLogin()
    } else {
      return { 'invalidUsername': true }; // Вернуть объект с ошибкой, если значение не соответствует
    }
  }

}

export interface ConfirmationDialogData {
  title: string;
  message: string;
  deleteProfile: boolean;
}
