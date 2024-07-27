import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '../../services/component.service';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  title: string = 'Login';
  
  loginError: string = ''; // Define userPrompt as a class variable
  

  loginForm: FormGroup

  constructor(private component: ComponentService, private database: DatabaseService, private router: Router){     
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }
  
  ngOnInit(): void {
    this.setBannerTitle();
  }

  setBannerTitle(){
    this.component.setCurrentTitle(this.title);
  }


  submitLogin() {
    // console.log(this.loginForm.value);
    this.database.postLogin(this.loginForm.value).subscribe((data: any) => {
      console.log('login', data);
      if (data.status === 'login') {
        this.loginError = 'Email is not valid';
      } else if (data.status === 'password') {
        this.loginError = ' Password is not found';
      } else if (data.status === 'success') {
        console.log(data.token)        
        localStorage.setItem('Name', data.user.fullName);        
        localStorage.setItem('token', data.token);
        localStorage.setItem('loginStatus', 'success');
        localStorage.setItem('userType', data.user.isAdmin ? 'isAdmin' : 'isUser');
        this.navigateToDashboard(data.user.isAdmin);        
      }
    });
  }
    

  private navigateToDashboard(isAdmin: boolean) {
    if (isAdmin) {
      this.router.navigateByUrl('/user-dashboard');
    } else {
      this.router.navigateByUrl('/add-property');
    }
  }

}
