import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IIncome } from 'src/app/budget/interfaces/income';
import { ModalService } from '../modal.service';

@Component({
  selector: 'pf-budget-modal',
  templateUrl: './budget-modal.component.html',
  styleUrls: ['./budget-modal.component.css']
})
export class BudgetModalComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  @Output() newIncomeEvent = new EventEmitter<IIncome>();
  isOpen = false;
  private element: any;
  newIncomeForm: FormGroup;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
    this.newIncomeForm = new FormGroup({
      Income: new FormControl(),
      Amount: new FormControl()
    });
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
    document.body.classList.add('pf-budget-modal-open');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('pf-budget-modal-open');
    document.body.style.overflow = 'auto';
    this.isOpen = false;
  }

  onSubmit() : void {
    var newIncome: IIncome = {
      incomeId: 5,
      incomeName: this.newIncomeForm.controls["Income"].value,
      incomeAmount: this.newIncomeForm.controls["Amount"].value
    }

    this.newIncomeEvent.emit(newIncome);
    this.newIncomeForm.reset();
    this.close();
  }
}
