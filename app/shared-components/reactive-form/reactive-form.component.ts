import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  formData: any;
  loginForm: FormGroup;

  get loginFormData() {
    return this.formData;
  }
  @Input('formData') set loginFormData(data: any) {
    this.formData = data;
  }

  @Output('formSubmitEvent') formSubmitEventEmitter = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({});
  }
  ngOnInit(): void {
    this.getColumns();
    this.createFormControls();
  }

  columns: any = [];
  getColumns() {
    this.columns = [];
    this.formData.controls.rows.forEach((row: any) => {
      row.forEach((col: any) => {
        this.columns.push(col);
      });
    });
  }
  createFormControls() {
    this.addControls(this.columns);
    this.setValidators(this.columns);
  }

  addControls(columns: any[]): void {
    columns.forEach((col: any) => {
      this.loginForm.addControl(
        col.formControlName,
        this.fb.control(col.value ? col.value : '')
      );
    });
  }
  setValidators(columns: any[]): void {
    columns.forEach((col) => {
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
    });
  }

  getWidth(width: any): string {
    return 'col-sm-6';
  }

  submit() {
    if (this.loginForm.valid) {
      this.formSubmitEventEmitter.emit(this.loginForm.value);
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  clearForm() {
    this.loginForm.reset();
  }
}
