import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {User} from "../user/user.model";
import {Observable} from "rxjs/Observable";
import {API_URL} from "../app.constants";
import {Md5} from "ts-md5/dist/md5";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {

  constructor(private http: Http, private router: Router){

  }
  logout():void {
    console.log('Logging out');

    let sessionId = window.localStorage.getItem("sessionId");
    this.http.get(API_URL +"/user/logout?sessionId="+sessionId).subscribe(
      (response) => {
        if(response.json().status=="success"){
          window.localStorage.removeItem("sessionId");
          window.localStorage.removeItem("username");
          window.localStorage.removeItem("isAuthenticated");
          window.localStorage.clear();
          this.router.navigate(['/login']);


        }
      },
      (error) => {

      },
      () => {

      }
    )

  }

  login(user: User): Observable<any>{
    let userTmp = new User();
    userTmp = user;
    userTmp.password = Md5.hashStr(user.password);
    return this.http.post(API_URL + "/user/auth",userTmp);
  }
}
