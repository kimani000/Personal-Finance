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

  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  confirmPassword = new FormControl('', Validators.required);

  constructor(private dialgRef: MatDialogRef<SignUpModalComponent>) { }

  getErrorMessage(): string {
      return 'You must enter a value';
  }

  close(): void {
    this.dialgRef.close();
  }

  submit(): void {
    console.log("Hello");
  }
}
