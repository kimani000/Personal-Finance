import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTableActionModalComponent } from './budget-table-action-modal.component';

describe('BudgetTableActionModalComponent', () => {
  let component: BudgetTableActionModalComponent;
  let fixture: ComponentFixture<BudgetTableActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetTableActionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetTableActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
