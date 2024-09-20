import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
})
export class PaymentDetailsComponent implements OnInit{
  constructor(public service:PaymentDetailService, public toastr:ToastrService) {
  }
  ngOnInit(): void {
    this.service.refrechList();
  }

  select(item:PaymentDetail){
    this.service.formData = Object.assign({},item);
  }
  onDelete(id:number){
    this.service.deleteDetail(id).subscribe({
      next:res=>{
        this.service.list = res as PaymentDetail[];
        this.toastr.error("Deleted Successfuly!", "Payment Detail Register");
      }
    });
  }
}
