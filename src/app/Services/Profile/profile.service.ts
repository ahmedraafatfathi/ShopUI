import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";




@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  loggedIn:boolean=false;

  apiUrl: string;
  options: any;

  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:44333/api/";
    this.options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};
  }

  checkUserLogedIn() {
    var Token = localStorage.getItem("token");
    if (Token !== 'undefined' && Token !== null) {
      return true;
    }
    else {
      return false;
    }
  }

  Register(Info){
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiUrl+"User/Register",JSON.stringify(Info),this.options).subscribe(response=>{
        this.loggedIn=true;
        resolve(response);
      },(error=>{
        this.loggedIn=false;
        reject(error);
      }))
    })
  }


  Login(loginModel){
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiUrl+"User/Login",JSON.stringify(loginModel),this.options).subscribe(response=>{
        debugger;
        this.loggedIn=true;
        resolve(response);
      },(error=>{
        debugger;
        this.loggedIn=false;
        reject(error);
      }))
    })
  }


}
