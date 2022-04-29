import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  formData: any;
  loginForm: FormGroup;

  get loginFormData() {
    return this.formData;
  }
  @Input('formData') set loginFormData(data: any) {
    this.formData = data;
  }

  @Output('loginData') loginEmitter = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({});
  }
  ngOnInit(): void {
    this.createFormControls();
  }

  createFormControls() {
    for (let row of this.formData.controls.rows) {
      for (let col of row) {
        this.loginForm.addControl(
          col.formControlName,
          this.fb.control(col.value)
        );
        this.loginForm.controls[col.formControlName].setValidators(
          col.validations
            ? [
                col.validations.required
                  ? Validators.required
                  : Validators.nullValidator,
                col.validations.minLength
                  ? Validators.minLength(col.validations.minLength)
                  : Validators.nullValidator,
                col.validations.email
                  ? Validators.email
                  : Validators.nullValidator,
                col.validations.maxLength
                  ? Validators.maxLength(col.validations.maxLength)
                  : Validators.nullValidator,
              ]
            : Validators.nullValidator
        );
        // }
      }
    }
  }

  getWidth(width: any): string {
    return 'col-sm-6';
  }

  isFormSubmitted: boolean = false;
  login() {
    if (this.loginForm.valid) {
      this.loginEmitter.emit(this.loginForm.value);
      this.loginForm.reset();
      this.isFormSubmitted = false;
    } else this.isFormSubmitted = true;
  }

  clearForm() {
    this.isFormSubmitted = false;
    this.loginForm.reset();
  }
}
