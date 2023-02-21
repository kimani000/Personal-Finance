import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../services/modal/modal.service';
import { BudgetService } from '../../../services/budget/budget.service';
import { ExpenseCategory } from '../../../enums/expense-category';
import { Expense } from '../../../models/expense.model';
import {trigger, style, animate, transition} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseModalComponent } from '../../modals/add-expense-modal/add-expense-modal.component';


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
   expenses: Expense[] = [];
   totalExpense : number = 0;
   defaultTotalExpenseTitle: string = "Total Expense";
   expenseIsSelected: boolean = false;
   expenseCategoryIsSelected: boolean = false;
   expenseArrByCategory: Expense[] = [];

   // Variable for child component of expense-detail
   selectedExpense!: Expense;

  constructor(private dialog: MatDialog, private budgetService: BudgetService) {
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

  // Add new expense
  AddNewExpense(): void {
    let dialogRef = this.dialog.open(AddExpenseModalComponent,{
      width: "500px"
    })
  }

  // Functions for expenses
  displaySpendingInCategory(expenseCategory: ExpenseCategory): void{
    this.expenseCategoryIsSelected = true;
    this.expenseArrByCategory = this.expenses.filter(expense => {
      return expense.category === expenseCategory;
    })
  }

  displayExpenseDetail(expense: Expense): void {
    this.selectedExpense = expense;
    this.expenseIsSelected = true;
    this.expenseCategoryIsSelected = false;
  }

  closeExpenseDetail($event: boolean) {
    this.expenseIsSelected = false;
    this.expenseCategoryIsSelected = false;
  }
}
