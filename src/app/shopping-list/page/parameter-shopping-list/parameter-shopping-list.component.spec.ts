import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterShoppingListComponent } from './parameter-shopping-list.component';

describe('ParameterShoppingListComponent', () => {
  let component: ParameterShoppingListComponent;
  let fixture: ComponentFixture<ParameterShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterShoppingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParameterShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
