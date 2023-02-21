import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgChartsModule } from 'ng2-charts';

import { BudgetTableComponent } from '../components/budget/budget-table/budget-table.component';
import { BudgetComponent } from '../components/budget/budget.component';
import { BudgetModalComponent } from '../components/modals/budget-modal/budget-modal.component';
import { ExpenseDetailComponent } from '../components/budget/expense-detail/expense-detail.component';
import { IncomeChartComponent } from '../components/budget/income-chart/income-chart.component';
import { ExpenseComponent } from '../components/budget/expense/expense.component';
import { AddExpenseModalComponent } from '../components/modals/add-expense-modal/add-expense-modal.component';

import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { BudgetTableActionModalComponent } from '../components/modals/budget-table-action-modal/budget-table-action-modal.component';

const routes: Routes = [
  { path: 'pfinance', pathMatch: 'prefix',
    children: [
    { path: 'budget', component: BudgetComponent },
  ]},
]

@NgModule({
  declarations: [
    BudgetComponent,
    BudgetModalComponent,
    IncomeChartComponent,
    ExpenseDetailComponent,
    ExpenseComponent,
    BudgetTableComponent,
    BudgetTableActionModalComponent,
    AddExpenseModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ]
})
export class BudgetModule { }
