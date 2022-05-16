import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PackageServicesService } from '../services/package-services.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {

  constructor(private auth: PackageServicesService) 
  { 
    
  }

  ngOnInit(): void {
  }

  packageForm = new FormGroup({
  customer: new FormControl('', [Validators.required, Validators.minLength(3)]), 
  recipient: new FormControl('', [Validators.required, Validators.minLength(3)]),
  sender: new FormControl('', [Validators.required, Validators.minLength(3)]),
  receiver: new FormControl('', [Validators.required, Validators.minLength(3)])
  }); 

  createEntry()
  {
    const customer = this.packageForm.controls['customer'].value;
    const recipient = this.packageForm.controls['recipient'].value;
    const sender = this.packageForm.controls['sender'].value;
    const receiver = this.packageForm.controls['receiver'].value;

    
    this.auth.addEntry({customer, recipient, sender, receiver});
    console.log(customer)
    console.log(recipient)
    console.log(sender)
    console.log(receiver)
  }

}
