import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialBuyComponent } from './commercial-buy.component';

describe('CommercialBuyComponent', () => {
  let component: CommercialBuyComponent;
  let fixture: ComponentFixture<CommercialBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommercialBuyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommercialBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
