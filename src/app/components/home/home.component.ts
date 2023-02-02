import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title: string = 'Home Page';
  modalIsDisplayed = false;

  constructor(protected modalService: ModalService) {}

  openSignUpModal(id: string): void{
    this.modalIsDisplayed = true;
    setTimeout(() => {
      this.modalService.open(id);
    }, 100);
  }
}
