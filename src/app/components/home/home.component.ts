import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title: string = 'Home Page';

  constructor(protected modalService: ModalService) {}

}
