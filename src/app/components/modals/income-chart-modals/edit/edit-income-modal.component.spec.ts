import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncomeModalComponent } from './edit-income-modal.component';

describe('EditIncomeModalComponent', () => {
  let component: EditIncomeModalComponent;
  let fixture: ComponentFixture<EditIncomeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIncomeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIncomeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
