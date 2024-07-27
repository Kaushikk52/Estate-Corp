import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  title:string = 'About us';

  constructor(private component: ComponentService){}

  ngOnInit(): void {
    this.setBannerTitle()
  }

  // SET the banner title 
  setBannerTitle(){
    this.component.setCurrentTitle(this.title);
  }
}
