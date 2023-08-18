import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logInSection = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$')
    ]),
  });

  loginFieldTouched = false;

  constructor() {}

  ngOnInit(): void {
    this.logInSection.valueChanges.subscribe((value) => console.log(value));
    this.logInSection.statusChanges.subscribe((value) => console.log(value))
  }

  checkLoginValidity() {
    this.loginFieldTouched = true;
  }

  onSubmit() {
    if (this.logInSection.valid) {
      // Handle form submission
    } else {
      this.logInSection.markAllAsTouched(); // Mark all fields as touched to show errors
    }
  }
}
