import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowCreateComponent } from './how-create.component';

describe('HowCreateComponent', () => {
  let component: HowCreateComponent;
  let fixture: ComponentFixture<HowCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
