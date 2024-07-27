import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../../services/component.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import {User} from '../../Models/user'

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrl: './user-dash.component.css'
})
export class UserDashComponent implements OnInit {

  title: string = 'Users List';
  users: User[] = [];
  searchText: string = '';

  constructor(private component: ComponentService, private database: DatabaseService, private router: Router){}


  ngOnInit(): void {
    this.setBannerTitle();


    this.database.getAllUser().subscribe(users => {
       this.users = users;

    })

  }

  filterUsers() {
    return this.users.filter(user => {
      return user.fullName.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  setBannerTitle(){
    this.component.setCurrentTitle(this.title);
  }
}

