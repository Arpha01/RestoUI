import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Admin } from 'src/app/models/admin.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-webnavbar',
  templateUrl: './webnavbar.component.html',
  styleUrls: ['./webnavbar.component.scss']
})
export class WebnavbarComponent implements OnInit {
  @ViewChild('dropNav') dropdownNavbar: ElementRef;
  @ViewChild('loginNav') loginNavbar: ElementRef;

  currentUrl: string = '/';

  isLogged: boolean = false;
  currentUser: Admin|User|undefined;

  constructor(private router: Router, private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if(val instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
      }
    });
    this.currentUrl = this.router.url;

    this.authService.isLogged$().subscribe((logged: boolean) => {
      this.isLogged = logged;
      this.currentUser = this.authService.currentUser!;
    });
  }

  @ViewChild('menu') menu: ElementRef;

  showMenu(): void {
    this.menu.nativeElement.classList.toggle('nav-show');
  }

  showDropdown(): void {
    this.dropdownNavbar.nativeElement.classList.toggle('show');
  }

  showLoginDropdown(): void {
    this.loginNavbar.nativeElement.classList.toggle('show');
  }

  @HostListener('window:click', ['$event'])
  windowClick(event:any): void {
    if(!event.target.matches('#toggleBtn')) {
      if(this.isLogged) {
        this.dropdownNavbar.nativeElement.classList.remove('show');
      }
    }

    if(!event.target.matches('#loginBtn')) {
      if(!this.isLogged) {
        this.loginNavbar.nativeElement.classList.remove('show');
      }
    }
  }

  logoutUser(): void {
    this.spinner.show();
    if(this.currentUser){
      if(this.currentUser!.constructor.name == 'Admin') {
        this.authService.logoutAdmin().subscribe(res => {
          this.logoutAction(res);
        });
      } else if(this.currentUser!.constructor.name == 'User') {
        this.authService.logoutUser().subscribe(res => {
          this.logoutAction(res);
        });
      }
    }

    this.spinner.hide();
  }

  logoutAction(res:any): void {
    if(res.status == 'success') {
      this.isLogged = false;
      this.currentUser = undefined;
    } else {
      console.error('Logout failed');
    }

    this.spinner.hide();

    location.reload();
  }
}
