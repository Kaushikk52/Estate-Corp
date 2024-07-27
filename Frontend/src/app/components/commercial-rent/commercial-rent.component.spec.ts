import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialRentComponent } from './commercial-rent.component';

describe('CommercialRentComponent', () => {
  let component: CommercialRentComponent;
  let fixture: ComponentFixture<CommercialRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommercialRentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommercialRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
