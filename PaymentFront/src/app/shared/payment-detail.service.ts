import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { PaymentDetail } from './payment-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  constructor(private http:HttpClient) { }
  url:string = environment.apiBaseUrl+"/PaymentDetails";
  list:PaymentDetail[] = [];
  formData :PaymentDetail = new PaymentDetail();
  formSubmitted:boolean = false;

  refrechList(){
    this.http.get(this.url).subscribe({
      next:res=>{
        this.list = res as PaymentDetail[];
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  saveDetail(){
    return this.http.post(this.url, this.formData);
  }
  
  updateDetail(){
    return this.http.put(this.url+`/${this.formData.paymentDetailId}`, this.formData);
  }
  deleteDetail(id:number){
    return this.http.delete(this.url+'/'+id);
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.formData = new PaymentDetail();
    this.formSubmitted = false;
  }
}
