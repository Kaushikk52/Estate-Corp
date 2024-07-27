import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  
  property:any = {}
  baseUrl:string = this.database.dbAddr;


  constructor(private route: ActivatedRoute , private database: DatabaseService){}


  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      const propertyId = params['propertyId'];
      this.getPropertyDetails(propertyId)
    })
  }

  getPropertyDetails(propertyId: string){
    console.log('this is the property id',propertyId)
    this.database. getPropertyById(propertyId).subscribe((data: any)=>{
      this.property = data
      console.log(data)
    })
  }

  
}
