import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../../services/component.service';
import { DatabaseService } from '../../services/database.service';
import { Properties } from '../../Models/properties';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit {

  title: string = 'Property List';
  propertyId: string = '';
  properties: Properties[] = [];
  searchText: string = '';
  showApprovalAlert: boolean = false;
  showUnapprovalAlert: boolean = false;

  constructor(private component: ComponentService,private database: DatabaseService,private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.setBannerTitle();

    this.database.getAllProperties().subscribe(data => {
      this.properties = data;
   })

  }

  toggleApproval(propertyId: string, isApproved: number) {
    if (isApproved) {
      this.unapproveProperty(propertyId);
    } else {
      this.approveProperty(propertyId);
    }
  }

  approveProperty(propertyId: string): void {
    // Send request to backend to approve property
    this.database.approveProperty(propertyId).subscribe((data:any) => {
      // Update frontend to reflect approval status
      const property = this.properties.find(p => p.propertyId === propertyId);
      if (property) {
        property.isApproved = 1;// Assuming you have an isApproved property in your model
        this.showApprovalAlert = true;
    setTimeout(() => {
      this.showApprovalAlert = false;
    }, 3000);
      }
    });
  }

  unapproveProperty(propertyId: string): void {
    // Send request to backend to approve property
    this.database.unApproveProperty(propertyId).subscribe((data:any) => {
      // Update frontend to reflect approval status
      const property = this.properties.find(p => p.propertyId === propertyId);
      if (property) {
        property.isApproved = 0; // Assuming you have an isApproved property in your model
        this.showUnapprovalAlert = true;
    setTimeout(() => {
      this.showUnapprovalAlert = false;
    }, 3000);
      }
    });
  }

  filterProperties() {
    return this.properties.filter(property => {
      return property.propertyName.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  viewProperty(propertyId: string):void{
    this.router.navigate(['/properties', propertyId]);
    
  }

  setBannerTitle(){
    this.component.setCurrentTitle(this.title);
  }
}
