import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PackageServicesService } from '../services/package-services.service';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  topicWeight: string = "ygTest/weight";
  msg: any;
  isConnected: boolean = false;
  price: string = "0.00";
  weight: string = "0";

  constructor(private auth: PackageServicesService, private _mqttService: MqttService) 
  { 
   
    this.subscription = this._mqttService.observe(this.topicWeight).subscribe((message: IMqttMessage) => {
      this.msg = message;
      //console.log('msg: ', message);
      const reading = message.payload.toString();

      if(reading != "111")
      {
        //console.log('Message: ' + reading);
        this.weight = reading;
      }
      
      
    });
    //console.log('subscribed to topic: ' + this.topicWeight)

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  packageForm = new FormGroup({
  customer: new FormControl('', [Validators.required, Validators.minLength(3)]), 
  recipient: new FormControl('', [Validators.required, Validators.minLength(3)]),
  sender: new FormControl('', [Validators.required, Validators.minLength(3)]),
  receiver: new FormControl('', [Validators.required, Validators.minLength(3)]),

  }); 

  createEntry(weight: string, price: string)
  {
    const customer = this.packageForm.controls['customer'].value;
    const recipient = this.packageForm.controls['recipient'].value;
    const sender = this.packageForm.controls['sender'].value;
    const receiver = this.packageForm.controls['receiver'].value;
    
    this.auth.addEntry({customer, recipient, sender, receiver, weight, price});
    console.log(customer)
    console.log(recipient)
    console.log(sender)
    console.log(receiver)
    console.log(weight)
    console.log(price)
  }

}
