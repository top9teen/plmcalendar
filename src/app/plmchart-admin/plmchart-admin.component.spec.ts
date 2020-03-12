import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlmchartAdminComponent } from './plmchart-admin.component';

describe('PlmchartAdminComponent', () => {
  let component: PlmchartAdminComponent;
  let fixture: ComponentFixture<PlmchartAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlmchartAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlmchartAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
