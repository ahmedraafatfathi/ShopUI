import { Injectable } from '@angular/core';
// import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getToken(): string {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    var Token = localStorage.getItem("token");
    if (Token !== 'undefined' && Token !== null) {
      return true;
    }
    else {
      return false;
    }
  }


}
