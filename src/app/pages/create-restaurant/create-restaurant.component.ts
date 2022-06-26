import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { NgxSpinnerService } from 'ngx-spinner';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Schedule } from 'src/app/models/schedule.model';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.scss']
})
export class CreateRestaurantComponent implements OnInit, AfterViewInit {

  constructor(private restaurantService: RestaurantService, private spinner: NgxSpinnerService) { }

  errorStatus = {
    isError: false,
    messages: ['Error message']
  }

  successStatus = {
    isSuccess: false,
    messages: ['Success message']
  }

  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    openschedules: new FormArray([
      new FormGroup({
        startday: new FormControl('', Validators.required),
        endday: new FormControl(''),
        open: new FormControl('', Validators.required),
        closed: new FormControl('', Validators.required)
      })
    ])
  });

  get schedules() {
    return this.form.get('openschedules') as FormArray;
  }

  addSchedule() {
    this.schedules.push(new FormGroup({
      startday: new FormControl('', Validators.required),
      endday: new FormControl(''),
      open: new FormControl('', Validators.required),
      closed: new FormControl('', Validators.required)
    }));
  }

  removeSchedule(index:number) {
    this.schedules.removeAt(index);
  }

  controls = this.form.controls;

  ngOnInit(): void {
    this.spinner.show();
  }
  
  ngAfterViewInit(): void {
    this.spinner.hide();
  }

  onSubmit(): void {
    this.spinner.show();

    let schedules:Schedule[] = [];
    
    this.schedules.value.forEach((schedule:any) => {
      const start = schedule.startday;
      const end = schedule.endday;

      const startIndex = this.days.indexOf(start);
      const endIndex = this.days.indexOf(end);
      
      let daysSelected = [];

      if(start && end) {

        for(let i = startIndex; i <= endIndex; i++) {
          daysSelected.push(this.days[i].substring(0, 3));
        }
      } else if(start) {
        daysSelected.push(start.substring(0, 3));
      }

      const openSchedule = new Schedule([...daysSelected], schedule.open, schedule.closed);
    
      schedules.push(openSchedule);
    });

    let restaurant = new Restaurant(this.controls.name.value, schedules);

    this.restaurantService.store(restaurant).subscribe(res => {
      console.log(res);
        if(res.success) {
          this.form.reset();

          this.onSuccess();
        } else {
          this.onError();
        }
    }, err => {
      this.onError();
    });

  }

  onError(): void {
    this.spinner.hide();
    // Set success to false
    this.successStatus.isSuccess = false;
    this.successStatus.messages = [];

    // Set errors to true
    this.errorStatus.isError = true;
    this.errorStatus.messages = ['Terjadi masalah saat menyimpan data'];
  }

  closeErrorAlert(): void {
    this.errorStatus.isError = false;
    this.errorStatus.messages = [];
  }

  closeSuccessAlert(): void {
    this.successStatus.isSuccess = false;
    this.successStatus.messages = [];
  }

  onSuccess(): void {
    this.spinner.hide();

    // Set errors to none 
    this.errorStatus.isError = false;
    this.errorStatus.messages = [];

    // Set success to true
    this.successStatus.isSuccess = true;
    this.successStatus.messages = ['Data berhasil disimpan'];
  }

}
