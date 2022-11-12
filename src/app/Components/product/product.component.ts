import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";  
import { Router } from "@angular/router";  
import { ProductService } from 'src/app/Services/Product/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  allProductsInfo : any[] = [];
  pageNumber : any = 1;
  pageSize :any = 5;
  totalRecords :any;
  products : any[] = [];
  addCartForm:FormGroup;  



  constructor(private router:ActivatedRoute,private navRoter:Router,private productService:ProductService) {

    this.addCartForm = new FormGroup({          
    });
   }

  ngOnInit() {
    this.GetProducts();
  }

  addCartInfo(item:any) {
    let qnty = this.addCartForm.value["quantity"+item.id];
    if(qnty > item.availableQuantity){
      alert("Quantity not valid");
    }
    else{
      this.allProductsInfo.push(item);
    }
  }

  GetProducts() {  
    console.log('Create fire');

    let filter: IPaggingModel = { pageNumber:this.pageNumber, pageSize:this.pageSize }; // OK

    this.productService.GetProducts(filter).then(res => {
      this.products = res["Data"] as any[];
      this.products.forEach(element => {
        const fc = new FormControl('');
        this.addCartForm.addControl("quantity"+element.id,fc)
      });
      this.totalRecords = res["TotalRecords"];
    }).catch(error => {
      console.log(error);
    });  
  }

  onTableDataChange(event:any){
    this.pageNumber  = event;
    // this.GetProducts();
  }


  back(){
    this.navRoter.navigate(['/home']);
  }
}
