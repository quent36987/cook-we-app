import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShoppingListComponent } from './all-shopping-list.component';

describe('AllShoppingListComponent', () => {
  let component: AllShoppingListComponent;
  let fixture: ComponentFixture<AllShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllShoppingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
