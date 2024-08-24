import { Component, Input, OnInit } from '@angular/core';
import { Properties } from '../../Models/properties';
import { DatabaseService } from '../../services/database.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'] 
})
export class CardsComponent implements OnInit {
  @Input() properties: Properties[] | undefined;

  carouselOptions = {
    dots: true,
    loop: true,
    margin: 10,   
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  };
  
  constructor(private dbServ: DatabaseService) {}
  
  ngOnInit(): void {
    this.getAllProperties();
  }

  getAllProperties() {
    this.dbServ.getAllProperties().subscribe((res) => {
      this.properties = res.filter((element) => element.isApproved === 1);
      this.setPropertyType();
    });
  }

  setPropertyType() {
    if (this.properties) {
      this.properties.forEach((property) => {
        if (property.propertyType === "1") {
          property.propertyType = "Residential Buy";
        } else if (property.propertyType === "2") {
          property.propertyType = "Residential Rent";
        }else if (property.propertyType === "3") {
          property.propertyType = "Commercial Buy";
        }else if (property.propertyType === "4") {
          property.propertyType = "Commercial Rent";
        }
      });
    }
  }
}
