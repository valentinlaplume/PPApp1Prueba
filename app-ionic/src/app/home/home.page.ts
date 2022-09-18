import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

import  {  Observable    } from  'rxjs' ;
import { User } from "../shared/user.interface";
import  {  take, map   } from  'rxjs/operators' ;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user: User;

  constructor(
    public authSvc: AuthService, 
    private router: Router
  ) {
    // this.authSvc.user$.pipe(take(1), map((user) => {
    //   console.log('usuario: ', user);
    //   console.log("hola");
    //   this.user = user;
    // }));
  }

  ngOnInit() {

  }

  async signOff():Promise<void>{
    try {
      console.log(this.authSvc.logout());
      this.router.navigate(['../login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

}
