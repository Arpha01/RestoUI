import { Component, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { Page } from 'src/app/models/page.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurants: Restaurant[];

  time = '';
  dayName = '';

  loading:boolean = true;
  searchValue: string; 

  selected: any = [];
  SelectionType = SelectionType;
  limit: number = 10;

  success: string;
  error: string;

  ColumnMode = ColumnMode;

  request = {
    page: 1,
    attribute: 'name',
    direction: 'asc',
    limit: 10,
  }

  page: Page = new Page();

  constructor(private restaurantService: RestaurantService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.findAll(this.request, this.searchValue?? null).subscribe(res => {
      this.parseModel(res);
      this.spinner.hide();
      this.loading = false;
    });
  }

  
  parseModel(result:any, setPage = true) {
    if(setPage) {
      this.page.size = result.meta.per_page;
      this.page.totalElements = result.meta.total;
    }
  
    this.restaurants = result.data;
  }

  onSelect(event:any) {
  }

  setLimit(): void {
    this.request.limit = this.limit;
    this.getRestaurants();
  }

  onSort(event:any) {
    this.loading = true;

    this.request.attribute = event.column.prop;
    this.request.direction = event.newValue;

    this.getRestaurants();
  }

  resetSearch() {
    if(this.searchValue) this.searchValue = '';

    this.setPage({offset:0});
  }

  setPage(page:any) {
    this.loading = true;
    this.page.pageNumber = page.offset;

    this.request.page = this.page.pageNumber+1;

    if(this.searchValue) {
      this.searchRestaurant();
    } else {
      this.getRestaurants();
    }
  }

  searchRestaurant() {
    this.loading = true;

    if(this.searchValue) {
      this.restaurantService.findAll(this.request, this.searchValue).subscribe(res => {
        if(res.meta.per_page <= res.meta.to && res.links.next == null) {
          this.parseModel(res, false);
        } else {
          this.parseModel(res);
        }
        
        this.loading = false;
      });
    } else {
      this.resetSearch();
    }    
  }

  onFilter() {
    this.loading = true;
    
    Object.assign(this.request, { day:this.dayName, time: this.time });

    this.getRestaurants();
  }

  onReset() {
    this.loading = true;

    if((this.request) && this.request.hasOwnProperty('day') || this.request.hasOwnProperty('time')) {
      this.request = {
        page: 1,
        attribute: 'name',
        direction: 'asc',
        limit: 10,
      }

      this.time = '';
      this.dayName = '';
    }

    this.resetSearch();
  }
}
