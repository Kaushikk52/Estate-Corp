import { Component, OnInit,Input } from '@angular/core';
import { ComponentService } from '../../services/component.service';
import { DatabaseService } from '../../services/database.service';
import { Properties } from '../../Models/properties';

@Component({
  selector: 'app-residential-buy',
  templateUrl: './residential-buy.component.html',
  styleUrls: ['./residential-buy.component.css'],
})
export class ResidentialBuyComponent implements OnInit {
  city: string = '';
  propertyType: string = '';
  minBudget: number = 0;
  maxBudget: number = 0;
  properties: Properties[] = [];
  @Input() property: Properties | undefined;

  title: string = 'Residential Buy';

  constructor(
    private component: ComponentService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.setBannerTitle();

    this.databaseService.getAllProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  searchProperties() {
    // Call the service method to fetch properties based on the search criteria
    this.databaseService.getProperties(this.city,this.propertyType).subscribe((data:Properties[]) => {
      // Filter properties based on locality and property type
      this.properties = data;
    });
  }

  // SET the banner title

  setBannerTitle() {
    this.component.setCurrentTitle(this.title);
  }
}
