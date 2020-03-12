import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlmcalendarComponent } from './plmcalendar.component';

describe('PlmcalendarComponent', () => {
  let component: PlmcalendarComponent;
  let fixture: ComponentFixture<PlmcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlmcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlmcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
