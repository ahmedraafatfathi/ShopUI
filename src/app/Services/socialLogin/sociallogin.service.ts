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
export class SocialloginService {

  apiUrl: string;
  options: any;

  loggedIn:boolean=false;

  constructor(private http: HttpClient) {
    this.apiUrl = "https://localhost:44393/api/Profile";
    this.options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};


  }
  Savesresponse(responce)
  {
    return this.http.post(this.apiUrl+'/socialLogin',JSON.stringify(responce),this.options);
  }

  checkSocialUserLogedIn() {
    var socialToken = localStorage.getItem("socialusers");
    if (socialToken !== 'undefined' && socialToken !== null) {
      return true;
    }
    else {
      return false;
    }
  }

}
