import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import registerFormData from '../register/assets/registerFormArray.json'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formData!: any;
  constructor(private auth: AuthService) {
    this.formData = registerFormData;
  }

  ngOnInit(): void {}

  getRegisterEvent(event: any) {
    console.log('register event received', event);
    this.register(event.email, event.password);
  }

  register = (email: string, password: string) => {
    this.auth.register(email, password);
  };
}
