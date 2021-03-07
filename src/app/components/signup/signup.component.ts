import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { isFieldValid } from '../../utils/helpers';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isFieldValid = isFieldValid;
  loading = false;
  isRegistered = false;
  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    this.signupForm.markAllAsTouched();
    if (!this.signupForm.valid) {
      return;
    }

    this.loading = true;
    this.registerService.register(this.signupForm.value).subscribe(
      data => {
        console.log(data);
        this.isRegistered = true;
        this.initForm();
      },
      error => {
        console.log(error);
      },
      () => {
        this.loading = false;
      });
  }

  private initForm(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.hasUpperCaseAndLowerCase(),
        this.containsFirstOrLastName()
      ])
    });
  }

  private hasUpperCaseAndLowerCase(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const isValid = /[a-z]/.test(control.value) && /[A-Z]/.test(control.value);
      return !isValid ? { hasUpperCaseAndLowerCase: !isValid } : null;
    };
  }

  private containsFirstOrLastName(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!this.signupForm) {
        return null;
      }

      const form = this.signupForm.controls;
      if (!control.parent || !form.firstName || !form.lastName) {
        return null;
      }

      const isValid = !control.value.includes(form.firstName.value) && !control.value.includes(form.lastName.value);
      return !isValid ? { containsFirstOrLastName: !isValid } : null;
    };
  }

}
