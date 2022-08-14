import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  errorStatus = {
    isError: false,
    messages: ['Error message']
  }

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.authService.isLogged$().subscribe((res:any) => {
      console.log(res);

    });
    // if(this.authService.isLogged$()) {
    //   this.router.navigate(['/restaurant']);
    // }
    
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

    this.authService.loginUser(email, password).subscribe((res: any) => {
       if(res.status == 'success') {
        if(this.returnUrl) {
          this.router.navigate([this.returnUrl]);
         } else {
          this.router.navigate(['/restaurant']);
         }
       }

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
