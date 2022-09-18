import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';

import { ValidatorService } from './../services/validator.service';

import { Router } from '@angular/router';
import { stringLength } from '@firebase/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email:string='';
  public password:string='';

  public validaLogin:string='';
  public validaEmail:string='';
  public validaPass:string='';
  
  private validator: ValidatorService = new ValidatorService();

  constructor(
    private authSvc: AuthService, 
    private router: Router) {}

  ngOnInit() {
  }

  async onLogin() {
    try {
      const user = await this.authSvc.login(this.email, this.password);
      console.log(user);
      if (user) {
        this.validaLogin = '';
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('isEmailVerified -> ', isVerified);
        this.redirectUser(isVerified);
      }
      else{
        this.validaLogin = "Verifique que el mail y la contraseña sean correctas";
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      console.log(user);
      if (user) {
        this.validaLogin = '';
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('isEmailVerified -> ', isVerified);
        this.redirectUser(isVerified);
      }
      else{
        this.validaLogin = "Verifique que el mail y la contraseña sean correctas";
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['../home']);
    } else {
      this.router.navigate(['../verify-email']);
    }
  }

  public onLoginUsuarioAdministrador(){
    this.email = "pobesi4749@edxplus.com";
    this.password = "asd123";
  }

  public onLoginUsuarioModerador(){
    this.email = "wwclmck900@tmail9.com";
    this.password = "asd123";
  }

  public onLoginUsuarioComun(){
    this.email = "iveskwn151@tmail3.com";
    this.password = "asd123";
  }
}
