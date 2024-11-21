import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleSearchPage } from './vehicle-search.page';

describe('VehicleSearchPage', () => {
  let component: VehicleSearchPage;
  let fixture: ComponentFixture<VehicleSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
