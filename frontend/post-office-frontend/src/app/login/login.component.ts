import { UsernameValidators } from './email.validators';
import { Component } from '@angular/core';
import { FormGroup,  FormControl, Validators } from '@angular/forms';
import { LoginServicesService } from '../services/login-services.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: LoginServicesService) 
  { 
    
  }

  loginForm = new FormGroup({email: new FormControl('', [Validators.required, Validators.minLength(3), UsernameValidators.noSpace], UsernameValidators.shouldBeUnique), 
                              password: new FormControl('', Validators.required)});  

login()
  {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    this.auth.login({email, password});


  }

  get f()
      {
        return this.loginForm.controls;
      }
}