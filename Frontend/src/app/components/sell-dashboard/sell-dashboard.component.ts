import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../../services/component.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-sell-dashboard',
  templateUrl: './sell-dashboard.component.html',
  styleUrl: './sell-dashboard.component.css'
})
export class SellDashboardComponent implements OnInit {

  title: string = 'Property List';
  notConfirmProperties: Array<any> = []
  notApprovedProperties: Array<any> = []
  isApproved: boolean = false;
  isConfimed: boolean = false
  loggedIn:any = localStorage.getItem('Name');


  constructor(private component: ComponentService, private database: DatabaseService) { }

  ngOnInit(): void {
    this.setBannerTitle();

    this.getNotConfirmProperty()
    

  }

  getNotConfirmProperty() {
    this.database.getNotConfirmProperties().subscribe((data: any) => {
      console.log('this is not confim property', data)
      this.notConfirmProperties = data
    })
  }

  setBannerTitle() {
    this.component.setCurrentTitle(this.title);
  }

  confirmProperty(propertyId: any) {
    this.database.confirmProperty(propertyId).subscribe((data: any) => {
      if (data.message) {
        const propertyToUpdate = this.notConfirmProperties.find(property => property.propertyId === propertyId);
        if (propertyToUpdate) {          
          propertyToUpdate.isConfirm = true;          
        }
      }
    })
  }

  approveProperty(propertyId: any){
    this.database.approveProperty(propertyId).subscribe((res)=>{
      console.log(res.toString(),propertyId);
      this.database.approveProperty(propertyId);
    })
  }


}
