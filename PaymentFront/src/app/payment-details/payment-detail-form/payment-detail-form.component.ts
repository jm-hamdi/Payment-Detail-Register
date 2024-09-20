import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent {
  constructor(public service: PaymentDetailService, public toastr: ToastrService) {
  }

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    if (form.valid) {
      if(this.service.formData.paymentDetailId == 0)
        this.insertItem(form);
      else
        this.updateItem(form);
    }
  }
  insertItem(form: NgForm){
    this.service.saveDetail().subscribe({
      next: res => {
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
        this.toastr.success("Inserted Successfuly !", "Payment Detail Register");
      },
      error: err => { console.log(err) }
    })
  }
  updateItem(form: NgForm){
    this.service.updateDetail().subscribe({
      next: res => {
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
        this.toastr.info("Updated Successfuly !", "Payment Detail Register");
      },
      error: err => { console.log(err) }
    })
  }
}
