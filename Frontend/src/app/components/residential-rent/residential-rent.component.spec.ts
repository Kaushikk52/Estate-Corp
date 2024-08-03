import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialRentComponent } from './residential-rent.component';

describe('ResidentialRentComponent', () => {
  let component: ResidentialRentComponent;
  let fixture: ComponentFixture<ResidentialRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResidentialRentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidentialRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
