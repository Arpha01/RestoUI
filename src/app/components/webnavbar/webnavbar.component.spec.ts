import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebnavbarComponent } from './webnavbar.component';

describe('WebnavbarComponent', () => {
  let component: WebnavbarComponent;
  let fixture: ComponentFixture<WebnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebnavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
