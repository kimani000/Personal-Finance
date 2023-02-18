import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../services/modal/modal.service';
import { SignUpModalComponent } from '../modals/signUpModal/signUpModal.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title: string = 'Home Page';
  modalIsDisplayed = false;

  constructor(protected modalService: ModalService, private dialog: MatDialog) {}

<<<<<<< HEAD
  openSignUpModal(): void{
    let dialgRef = this.dialog.open(SignUpModalComponent, {
      width: '500px',
    })
=======
  openSignUpModal(id: string): void{
    this.modalIsDisplayed = true;
    setTimeout(() => {
      this.modalService.open(id);
    }, 100);
>>>>>>> origin/master
  }
}
