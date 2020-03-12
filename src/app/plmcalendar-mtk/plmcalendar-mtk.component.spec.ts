import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlmcalendarMtkComponent } from './plmcalendar-mtk.component';

describe('PlmcalendarMtkComponent', () => {
  let component: PlmcalendarMtkComponent;
  let fixture: ComponentFixture<PlmcalendarMtkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlmcalendarMtkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlmcalendarMtkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
