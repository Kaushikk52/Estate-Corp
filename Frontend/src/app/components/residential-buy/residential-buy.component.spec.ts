import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialBuyComponent } from './residential-buy.component';

describe('ResidentialBuyComponent', () => {
  let component: ResidentialBuyComponent;
  let fixture: ComponentFixture<ResidentialBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResidentialBuyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidentialBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
