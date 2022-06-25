import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webfooter',
  templateUrl: './webfooter.component.html',
  styleUrls: ['./webfooter.component.scss']
})
export class WebfooterComponent implements OnInit {

  constructor() { }

  year: number = new Date().getFullYear();

  ngOnInit(): void {
  }

}
