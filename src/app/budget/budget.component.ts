import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ModalService } from '../modals/modal.service';
import { BudgetService } from './budget.service';
import { IIncome } from './interfaces/income';
import { IExpense } from './interfaces/expense';
import { ExpenseCategory } from './enums/expense-category';


@Component({
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate('500ms ease-in', style({opacity: 1}))
      ]) 
    ])
  ]
})
export class BudgetComponent implements OnInit, OnDestroy {
  sub! : Subscription;
  subExpense!: Subscription;
  errorMessage: string = '';

  // Doughnut chart/income related variables
  incomes: IIncome[] = [];
  totalIncome : number = 0;
  defaultTotalIncomeTitle: string = "Total Income";

  doughnutChartLabels: string[] = [];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ ] }
    ]
  }
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    // Not working
    // onClick: this.onIncomeChartClick.bind(this)
  };

  @ViewChild(BaseChartDirective)
   chart!: BaseChartDirective;

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
    // GET incomes
    this.sub = this.budgetService.getIncomes().subscribe({
      next: income => {
        this.incomes = income;
        this.getTotalIncomeLogged();
        this.initializeCharts();
      },
      error: err => this.errorMessage = err
    });

    // GET expenses
    this.subExpense = this.budgetService.getExpenses().subscribe({
      next: expense => {
        this.expenses = expense;
        this.getTotalExpenseLogged();
      },
      error: err => this.errorMessage = err
    })
  }  

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subExpense.unsubscribe();
  }

  // Initalize total income variable
  getTotalIncomeLogged(): void {
    this.totalIncome += this.incomes.reduce((sum, income) => sum + income.incomeAmount, 0 );
  }

  // Initalize total expense variable
  getTotalExpenseLogged(): void {
    this.totalExpense += this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  // Functions for add new income functionality
  addIncome(id: string) {
    this.modalService.open(id);
  }

  addNewIncome(event: IIncome) {
    this.doughnutChartLabels.push(event.incomeName);
    this.doughnutChartData.datasets[0].data.push(event.incomeAmount);
    this.updateChart();
  }

  // Functions for income chart
  initializeCharts(): void {
    this.incomes.forEach((income: IIncome) => {
      this.doughnutChartLabels.push(income.incomeName);
      this.doughnutChartData.datasets[0].data.push(income.incomeAmount);
    });
    this.updateChart();
  }

  updateChart(): void {
    this.chart.chart?.update();
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
