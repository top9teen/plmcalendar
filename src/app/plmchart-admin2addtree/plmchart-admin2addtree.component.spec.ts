import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlmchartAdmin2addtreeComponent } from './plmchart-admin2addtree.component';

describe('PlmchartAdmin2addtreeComponent', () => {
  let component: PlmchartAdmin2addtreeComponent;
  let fixture: ComponentFixture<PlmchartAdmin2addtreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlmchartAdmin2addtreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlmchartAdmin2addtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
