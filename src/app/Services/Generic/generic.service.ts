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
export class GenericService {

  apiUrl: string;
  options: any;

  constructor(private http: HttpClient) {
    this.apiUrl = "";
    // this.options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};
    this.options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set("Authorization", "Bearer " + localStorage.getItem("token")) };
  }

  getAllGeneric() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl).subscribe(response => {
        resolve(response);
      }, (error => {
        reject(error);
      }))
    })
  }

  public getAllUsers2(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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

  addGeneric(Info){
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiUrl,JSON.stringify(Info),this.options).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }

  editGeneric(id,Info){
    return new Promise((resolve,reject)=>{
      this.http.put(this.apiUrl+"/"+id,JSON.stringify(Info),this.options).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }

}
