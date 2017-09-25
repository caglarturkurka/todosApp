import { Component, OnInit } from '@angular/core';
import {User} from '../user/user.model';
import {LoginService} from "./login.service";
import {Subscription} from "rxjs/Subscription";
import {CurrentUser} from "../user/currentUser.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  private subscription: Subscription;


  constructor(private router: Router,private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    this.subscription = this.loginService.login(this.user).subscribe(
      (response : any) => {

        let responseBody = response.json();
        if(responseBody.status=="success"){
          localStorage.setItem("username",responseBody.username);
          localStorage.setItem("sessionId",responseBody.sessionId);
          localStorage.setItem("isAuthenticated","true");
          this.router.navigate(['/todos']);
        }
      },
      (error) => {console.log(error)},
      ()=>{}
    )
  }

}
