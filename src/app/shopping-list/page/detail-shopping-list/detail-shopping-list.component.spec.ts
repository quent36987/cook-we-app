import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailShoppingListComponent } from './detail-shopping-list.component';

describe('DetailShoppingListComponent', () => {
  let component: DetailShoppingListComponent;
  let fixture: ComponentFixture<DetailShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailShoppingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
