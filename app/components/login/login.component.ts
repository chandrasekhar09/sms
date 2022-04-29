import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import loginFormData from '../login/assets/loginFormArray.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formData!: any;
  constructor(private auth : AuthService ) {
    this.formData = loginFormData;
  }

  ngOnInit(): void {}

  getLoginEvent(event: any) {
    console.log('event received',event);
	this.login(event.email, event.password)

  }

  login = (email:string, password:string) => {
	  this.auth.login(email, password)
  };
}
