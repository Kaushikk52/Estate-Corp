import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '../../services/component.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  title: string = "Sign Up";

  signupForm: FormGroup;

  emailPrompt: string | null = null;
  contactNoPrompt: string | null = null;

  constructor(private component: ComponentService, private database: DatabaseService, private router: Router) {
    this.signupForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      // middleName: new FormControl(''),
      // lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      post: new FormControl('', [Validators.required]),
      maharera: new FormControl(''),
      contactNo: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
      {
        validators: this.checkPasswordToConfirmPasswordValidator
      })
  }


  ngOnInit(): void {
    this.setBannerTitle()
  }

  submitSignup() {
    console.log(this.signupForm.value);
    this.database.postSignupFormData(this.signupForm.value).subscribe((data: any) => {
      console.log(data);
      if (data.message) {
        // console.log('move to login')
        this.router.navigate(['/login']);
      }
    })
  }

  checkEmail() {
    this.database.checkEmail(this.signupForm.value.email).subscribe((data: any) => {
      // console.log(data);
      if (data.message === true) {
        this.emailPrompt = "Email Id already exists!";
        this.signupForm.get('email')?.setErrors({ 'exist': true });
      } else {
        this.signupForm.get('email')?.setErrors(null);
        this.emailPrompt = null;
      }
    }, error => {
      console.error("Error checking email:", error);
    });
  }

  checkContact(){
    this.database.checkContact(this.signupForm.value.contactNo).subscribe((data: any) => {
      // console.log(data);
      if (data.message === true) {
        this.contactNoPrompt = "Contact no. is already exists!";
        this.signupForm.get('email')?.setErrors({ 'exist': true });
      } else {
        this.signupForm.get('email')?.setErrors(null);
        this.emailPrompt = null;
      }
    }, error => {
      console.error("Error checking email:", error);
    });
  }

  checkPasswordToConfirmPasswordValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  // SET the banner title 
  setBannerTitle() {
    this.component.setCurrentTitle(this.title);

  }




}
