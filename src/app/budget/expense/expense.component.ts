import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../modals/modal.service';
import { BudgetService } from '../budget.service';
import { ExpenseCategory } from '../enums/expense-category';
import { IExpense } from '../interfaces/expense';
import {trigger, style, animate, transition} from '@angular/animations';


@Component({
  selector: 'pf-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css', '../budget.component.css'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate('500ms ease-in', style({opacity: 1}))
      ]) 
    ])
  ]
})
export class ExpenseComponent implements OnInit, OnDestroy {
  sub! : Subscription;
  errorMessage: string = '';

   // ExpenseCategory enums as array
   expenseCategoryArr: ExpenseCategory[] = [];

   // Expense related variables
   expenses: IExpense[] = [];
   totalExpense : number = 0;
   defaultTotalExpenseTitle: string = "Total Expense";
   expenseIsSelected: boolean = false;
   expenseCategoryIsSelected: boolean = false;
   expenseArrByCategory: IExpense[] = [];

   // Variable for child component of expense-detail
   selectedExpense!: IExpense;

  constructor(protected modalService: ModalService, private budgetService: BudgetService) {
        this.expenseCategoryArr = budgetService.getAllCategoryEnum();
      }

  // Lifecycle hooks          
  ngOnInit(): void {
    // GET expenses
    this.sub = this.budgetService.getExpenses().subscribe({
      next: expense => {
        this.expenses = expense;
        this.getTotalExpenseLogged();
      },
      error: err => this.errorMessage = err
    })
  }  

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Initalize total expense variable
  getTotalExpenseLogged(): void {
    this.totalExpense += this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  // Functions for expenses
  displaySpendingInCategory(expenseCategory: ExpenseCategory): void{
    this.expenseCategoryIsSelected = true;
    this.expenseArrByCategory = this.expenses.filter(expense => {
      return expense.expenseCategory === expenseCategory;
    })
  }

  displayExpenseDetail(expense: IExpense): void {
    this.selectedExpense = expense;
    this.expenseIsSelected = true;
    this.expenseCategoryIsSelected = false;
  }

  closeExpenseDetail($event: boolean) {
    this.expenseIsSelected = false;
    this.expenseCategoryIsSelected = false;
  }
}
