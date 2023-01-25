import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../modal.service';

@Component({
  selector: 'pf-modal',
  templateUrl: './signUpModal.component.html',
  styleUrls: ['./signUpModal.component.css']
})
export class SignUpModalComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  isOpen = false;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // add self (this modal instance) to the modal service so it can be opened from any component
    this.modalService.add(this);

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('pf-modal-open');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('pf-modal-open');
    document.body.style.overflow = 'auto';
    this.isOpen = false;
  }
}
