import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { OrderModel } from './order-dash.model';


@Component({
  selector: 'app-order-dash',
  templateUrl: './order-dash.component.html',
  styleUrls: ['./order-dash.component.css']
})
export class OrderDashComponent implements OnInit {
  formValue!: FormGroup;
  orderModelObj: OrderModel = new OrderModel();
  orderData!: any;
  orderDataRes!: any;
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      salesman:[''],
      productcode:[''],
      units:[''],
      effectivedate:['']
    })
    this.getAllOrders()
  }

  postOrderDetails(){
    this.orderModelObj.salesman = this.formValue.value.salesman;
    this.orderModelObj.productcode = this.formValue.value.productcode;
    this.orderModelObj.units = this.formValue.value.units;
    this.orderModelObj.effectivedate = this.formValue.value.effectivedate;

    if(this.orderModelObj.salesman > ' ' && this.orderModelObj.productcode > ' '
    && this.orderModelObj.units > ' ' && this.orderModelObj.effectivedate > '')
    {

    this.api.postOrder(this.orderModelObj).subscribe(res=>{
      console.log(res);
      alert("Order is submitted successfully!")
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllOrders();
    },
    err=>{
      alert("Error in raising the Order. Please contact our support")
    })
    }
    else
    {alert('Please input all the fields!')}
  }

  getAllOrdersX(){             //GET API
    this.api.getOrder().subscribe(res=>{
      this.orderData = res;
    })
  }

  getAllOrders(){             //GET API
    this.api.getOrder().subscribe(res=>{
      this.orderDataRes = res;

      this.orderData = this.orderDataRes.filter((p:any) => {
        var now = new Date();
        var yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);
  
        return (new Date(p.effectivedate) >= yesterday);
    })
    })
  }

  deleteOrder(ord:any){
    this.api.deleteOrder(ord.id).subscribe(res=>{
      alert("Order is Deleted Successfully!")
      this.getAllOrders();
    })
  }

  updateOrderDetails(){
    this.orderModelObj.salesman = this.formValue.value.salesman;
    this.orderModelObj.productcode = this.formValue.value.productcode;
    this.orderModelObj.units = this.formValue.value.units;
    this.orderModelObj.effectivedate = this.formValue.value.effectivedate;

    if(this.orderModelObj.salesman > ' ' && this.orderModelObj.productcode > ' '
      && this.orderModelObj.units > ' ' && this.orderModelObj.effectivedate > '')
      {

    this.api.updateOrder(this.orderModelObj, this.orderModelObj.id).subscribe(res=>{
      alert("Order is updated successfully!");

      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllOrders();
    })
    }
    else
    {alert('Please input all the fields!')}
  } 

  clickAddOrder(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(ord:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.orderModelObj.id = ord.id;
    this.formValue.controls['salesman'].setValue(ord.salesman);
    this.formValue.controls['productcode'].setValue(ord.productcode);
    this.formValue.controls['units'].setValue(ord.units);
    this.formValue.controls['effectivedate'].setValue(ord.effectivedate);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formValue.controls;
  }
}
