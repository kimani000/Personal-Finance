import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'pf-budget-table-action-modal',
  templateUrl: './budget-table-action-modal.component.html',
  styleUrls: ['./budget-table-action-modal.component.css']
})
export class BudgetTableActionModalComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  @Input() action?: string;
  // @Output() newIncomeEvent = new EventEmitter<IIncome>();
  isOpen = false;
  private element: any;
  // newIncomeForm: FormGroup;

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
    this.modalService.remove(this.id);

    // remove modal element from html
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('pf-budget-table-action-modal');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('pf-budget-table-action-modal');
    document.body.style.overflow = 'auto';
    this.isOpen = false;
  }

  onSubmit() : void {
    // var newIncome: IIncome = {
    //   incomeId: 5,
    //   incomeName: this.newIncomeForm.controls["Income"].value,
    //   incomeAmount: this.newIncomeForm.controls["Amount"].value
    // }

    // this.newIncomeEvent.emit(newIncome);
    // this.newIncomeForm.reset();
    // this.close();
  }

}
