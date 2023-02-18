import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BudgetService } from '../../../services/budget/budget.service';
import { Expense } from '../../../models/expense.model';

@Component({
  selector: 'pf-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent {

  @Input("selectedExpense") expense!: Expense;
  @Output() expenseDetailEvent = new EventEmitter<boolean>();
  

  constructor(){
  }  

  onClose(bool: boolean) : void {
    this.expenseDetailEvent.emit(bool);
  }

}
