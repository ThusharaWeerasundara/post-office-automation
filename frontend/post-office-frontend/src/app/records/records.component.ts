import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  show: boolean;
  packages: any[] = [];
  //private records: Observable<Object>;
  constructor(private service: RecordsService) 
  { 
      this.show = true;
      this.service.getAll().subscribe((results) =>  {
        this.packages = results.packages;
        //console.log('JSON Respons in front end = ', JSON.stringify(this.packagess));

        for(var i = 0; i < this.packages.length; i++)
        {
          console.log(this.packages[i]);
        }
      })
      
      this.show = false;
  }

  ngOnInit(): void {
    
  }
  

  
}
