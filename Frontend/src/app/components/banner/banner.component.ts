import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit{
  title: string = 'Banner';

  constructor(private component: ComponentService) { 

  }

  ngOnInit(): void {
    this.title =  this.component.getCurrentTitle();
  }

  
}
