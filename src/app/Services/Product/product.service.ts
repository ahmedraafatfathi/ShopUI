import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductService {


  apiUrl: string;
  options: any;

  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:44333/api/";
    this.options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};
  }

  
  AddProduct(Info){
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiUrl+"Product",JSON.stringify(Info),this.options).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }

  GetProducts(Info){
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiUrl+"Product/PaggedProducts",JSON.stringify(Info),this.options).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }

  GetAllProducts(){
    return new Promise((resolve,reject)=>{
      this.http.get(this.apiUrl+"Product/PaggedProducts",this.options).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }


}

