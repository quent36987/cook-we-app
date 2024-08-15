import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeShoppingListCardComponent } from './recipe-shopping-list-card.component';

describe('RecipeShoppingListCardComponent', () => {
  let component: RecipeShoppingListCardComponent;
  let fixture: ComponentFixture<RecipeShoppingListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeShoppingListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeShoppingListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
