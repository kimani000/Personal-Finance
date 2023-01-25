import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpModalComponent } from './signUpModal.component';

describe('ModalComponent', () => {
  let component: SignUpModalComponent;
  let fixture: ComponentFixture<SignUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
