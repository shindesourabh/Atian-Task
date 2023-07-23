import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isInvalidPassword = false; // Variable to track password validity
  loginform!: FormGroup;
  submitted: boolean = false;
  password: any;
  email: any;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private authService: AuthService,) { }

  ngOnInit() {
    this.initloginformFormGroup();    
  }

  initloginformFormGroup() {
    this.loginform = this.formBuilder.group({
      Email: ['', [Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"), Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  LogIn() {
    this.submitted = true;
    this.email = this.loginform.get('Email')?.value; // Use loginform here
    this.password = this.loginform.get('Password')?.value;
    const isLoggedIn = this.authService.login(this.email, this.password);
    if (this.loginform.valid) {
      if (isLoggedIn) {
        this.isInvalidPassword = false;
        this.router.navigate(['/features/dashboard']);
        this.loginform.reset();
      } else {
        this.isInvalidPassword = true;
      }
    } else {
      this.isInvalidPassword = true; // Password is invalid
    }
    this.loginform.reset();

  }   
}


