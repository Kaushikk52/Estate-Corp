import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // 'styleUrl' should be 'styleUrls'
})
export class NavbarComponent implements OnInit { 
  name: string = '';
  userType: string = '';
  loginStatus: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined' && localStorage !== null) { 
      const storedName = localStorage.getItem('Name');
      this.name = storedName !== null ? storedName : ''; 
      console.log(storedName);   

      const storedUserType = localStorage.getItem('userType');
      const storedLoginStatus = localStorage.getItem('loginStatus');

      if (storedUserType === 'isAdmin' && storedLoginStatus === 'success') {
        console.log('isAdmin location');
        this.userType = 'isAdmin';
        this.loginStatus = 'success';
      } else if (storedUserType === 'isUser' && storedLoginStatus === 'success') {
        console.log('is user');
        this.userType = 'isUser';
        this.loginStatus = 'success';        
      } 
    }     
  }

  logout(): void {
    localStorage.removeItem('Name');
    localStorage.removeItem('userType');
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
