import { Component, OnInit } from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments'
@Component({
  selector: 'app-pay-pal',
  templateUrl: './pay-pal.component.html',
  styleUrls: ['./pay-pal.component.scss']
})
export class PayPalComponent implements OnInit {

  constructor() {
     render({
       id:"#myPaypalButton",
       currency:"VNĐ",
       value:"100000.00",
       onApprove:(details)=>{
            alert("Thanh toán thành công")
       }
     });
  }

  ngOnInit(): void {
  }

}
