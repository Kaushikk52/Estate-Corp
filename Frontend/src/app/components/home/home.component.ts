import { Component, OnInit ,Input} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Properties } from '../../Models/properties';
import { DatabaseService } from '../../services/database.service';
import { DashProperties } from '../../Models/dashproperties';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @Input() property: Properties | undefined;
  properties: Properties[] = [];
  dashProperties: DashProperties[] = [];

  constructor(private database: DatabaseService) {}

  ngOnInit() {

    this.database.getAllProperties().subscribe((data) => {
      this.properties = data.filter((property) => property.isApproved === 1);
    });

    // this.database.getApprovedProperties().subscribe((data) => {
    //   this.dashProperties = data;
    // });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    // navText: ['', ''],
    autoplay: true, // Enable autoplay
    autoplayTimeout: 2000, // Set the autoplay timeout in milliseconds
    responsive: {
      0: {
        items: 1,
        margin: 10,
      },
      400: {
        items: 2,
        margin: 10,
      },
      740: {
        items: 3,
        margin: 10,
      },
      940: {
        items: 4,
        margin: 10,
      },
    },
    nav: true,
    navText: [
      '<img src="../../../assets/icons/previous.svg" alt="Prev" class="icons">',
      '<img src="../../../assets/icons/next.svg" alt="Next" class="icons">',
    ],
  };
}
