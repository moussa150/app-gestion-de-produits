import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/services/products.services';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId:number;
  productFormGroup!:FormGroup;
  constructor(private activedRoute:ActivatedRoute,private fb:FormBuilder,private productService:ProductsService) {
    this.productId=this.activedRoute.snapshot.params['id'];
    alert(this.productId);
   }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(
      product=>{
                this.productFormGroup=this.fb.group({
           id:[product.id,Validators.required],
           name:[product.name,Validators.required],
           price:[product.price,Validators.required],
           quantity:[product.quantity,Validators.required],
           selected:[product.selected,Validators.required],
           available:[product.available,Validators.required],
        })
      }
    );

  }

  onUpdateProduct(){
    this.productService.updateProduct(this.productFormGroup?.value).subscribe(data=>{
      alert("Modification reussie !")
    });
  }
}
