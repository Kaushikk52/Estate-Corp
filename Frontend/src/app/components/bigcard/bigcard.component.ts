import { Component, OnInit,Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Properties } from '../../Models/properties';

@Component({
  selector: 'app-bigcard',
  templateUrl: './bigcard.component.html',
  styleUrl: './bigcard.component.css'
})
export class BigcardComponent implements OnInit {
  @Input() property!: Properties;

  constructor() { }

  ngOnInit(): void {

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true, // Enable autoplay
    autoplayTimeout: 2000, // Set the autoplay timeout in milliseconds
    responsive: {
      0: {
        items: 1,
        margin: 10
      },
      400: {
        items: 1,
        margin: 10
      },
      740: {
        items: 1,
        margin: 10
      },
      940: {
        items: 1,
        margin: 10
      }
    },
    nav: false,    
  }


}
