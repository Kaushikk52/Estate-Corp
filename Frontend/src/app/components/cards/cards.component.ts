import { Component ,Input, OnInit} from '@angular/core';
import { Properties } from '../../Models/properties';
import { DatabaseService } from '../../services/database.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'] 
})
export class CardsComponent implements OnInit{
  @Input() properties!:Properties[];
  images!:[];

constructor(private dbServ: DatabaseService){}

ngOnInit(): void {
    this.getAllProperties();
    this.setPropertyType();
}

  getAllProperties() {
    this.dbServ.getAllProperties().subscribe((res)=>{
        this.properties = res
        .filter((element)=> element.isApproved == 1)

        this.properties.map((filteredProperties) => {
          filteredProperties.images.forEach((image)=> this.images.push(image) )
        })
    })
  }

  setPropertyType(){
    this.properties?.forEach((property)=>{
      if(property.propertyType == "1") property.propertyType = "Residential Buy"
      if(property.propertyType == "2") property.propertyType = "Residential Rent"
    })
  }

}
