import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/services/products.services';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AppDataSate, DataStateEnum } from 'src/app/state/product.state';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$?:Observable<AppDataSate<Product[]>>;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$=
    this.productsService.getAllProducts().pipe(
      map(data=>({dataState :DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onGetSelectedProducts(){
    this.products$=this.productsService.getSelectedProducts().pipe(
      map(data=>({dataState :DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onGetAvailableProducts(){
    this.products$=this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState :DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSearch(dataForm:any){
    this.products$=this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>({dataState :DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
  onSelect(p:Product){
    this.productsService.select(p).subscribe(data=>{
      p.selected=data.selected;
    })
  }

  onDelete(p:Product){
    let v=confirm("Etes vous sure?");
    if(v==true)
    this.productsService.deleteProduct(p).subscribe(data=>{
      this.onGetAllProducts();
    })
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct");
  }

  

  onEditProduct(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

}
