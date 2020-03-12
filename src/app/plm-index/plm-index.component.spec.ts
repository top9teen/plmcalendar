import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlmIndexComponent } from './plm-index.component';

describe('PlmIndexComponent', () => {
  let component: PlmIndexComponent;
  let fixture: ComponentFixture<PlmIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlmIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlmIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
