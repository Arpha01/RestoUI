import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  returnUrl: string;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  errorStatus = {
    isError: false,
    messages: ['Error message']
  }

  ngOnInit(): void {
    this.spinner.show();

    this.authService.isLogged$().subscribe(res => {
      if(res) {
        this.router.navigate(['/restaurant']);
      }
    });
    
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.spinner.hide();
  }

  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ])
  })

  control = this.loginForm.controls;

  login(): void {
    let email: string = this.control.email.value;
    let password: string = this.control.password.value;

    this.spinner.show();

    this.authService.loginAdmin(email, password).subscribe((res: any) => {
       if(res.status == 'success') {
        localStorage.setItem('token', res.content.access_token);
        if(this.returnUrl) {
          this.router.navigate([this.returnUrl]);
         } else {
          this.router.navigate(['/restaurant']);
         }
       }

       this.onError();

    }, (err) => {
      
      this.onError();
      this.spinner.hide();
    })
  }

  onError(): void {
    this.spinner.hide();

    this.errorStatus.isError = true;
    this.errorStatus.messages = ['Username atau password salah'];
    this.loginForm.reset();
  }


}
