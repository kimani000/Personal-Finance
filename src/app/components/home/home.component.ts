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

  constructor(protected modalService: ModalService, private dialog: MatDialog) {}

  openSignUpModal(): void{
    let dialgRef = this.dialog.open(SignUpModalComponent, {
      width: '500px',
    })
  }
}
