import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'pf-modal',
  templateUrl: './signUpModal.component.html',
  styleUrls: ['./signUpModal.component.css']
})
export class SignUpModalComponent {

  firstName = new FormControl('', { nonNullable: true});
  lastName = new FormControl('', { nonNullable: true});
  email = new FormControl('', { nonNullable: true});
  password = new FormControl('', { nonNullable: true});
  confirmPassword = new FormControl('', { nonNullable: true});

  constructor(private dialgRef: MatDialogRef<SignUpModalComponent>) { }

  getErrorMessage(): string {
      return 'You must enter a value';
  }

  close(): void {
    this.dialgRef.close();
  }

  submit(): void {
    // if form is valid
    if (!this.firstName.invalid){
      console.log("Hello");
    }
  }
}
