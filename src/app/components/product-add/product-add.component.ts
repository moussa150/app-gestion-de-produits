import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.services';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup!:FormGroup;
  submitted:boolean=true;
  forbiddenUserNames = ['Mack', 'John'];
  constructor(private fb:FormBuilder ,private productService:ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name: new FormControl(["",Validators.required,this.forbiddenNames.bind(this)]),
      price:[0,Validators.required],
      quantity: [0,Validators.required],
      selected: [true,Validators.required],
      available:[true,Validators.required]
      
    });
  }
  forbiddenNames(formControl: FormControl): any 
  {   if ( this.forbiddenUserNames.indexOf(formControl.value)){     
          return { 'nameForbidden': true }; 
     }
  }

  onSaveProducts(){
    this.submitted=true;
    if(this.productFormGroup?.invalid) return;
    this.productService.save(this.productFormGroup.value).subscribe(data=>{
      alert("Enregistrement reussie !")
    });
  }
}
