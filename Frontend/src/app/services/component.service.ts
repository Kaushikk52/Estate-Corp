import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  currentTitle: string = 'Component';

  constructor() { }

  setCurrentTitle(title: string) {
    this.currentTitle = title;
  }

  getCurrentTitle(){
    return this.currentTitle;
  }
  
}
