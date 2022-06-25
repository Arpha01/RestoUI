import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.scss']
})
export class CreateRestaurantComponent implements OnInit {

  constructor() { }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    openschedules: new FormArray([
      new FormGroup({
        startday: new FormControl(''),
        endday: new FormControl(''),
        open: new FormControl(''),
        closed: new FormControl('')
      })
    ])
  });

  get schedules() {
    return this.form.get('openschedules') as FormArray;
  }

  controls = this.form.controls;

  ngOnInit(): void {
  }

}
