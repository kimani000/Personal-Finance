import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgChartsModule } from 'ng2-charts';

import { BudgetTableComponent } from '../components/budget/budget-table/budget-table.component';
import { BudgetComponent } from '../components/budget/budget.component';
import { BudgetModalComponent } from '../components/modals/budget-modal/budget-modal.component';
import { ExpenseDetailComponent } from '../components/budget/expense-detail/expense-detail.component';
import { IncomeChartComponent } from '../components/budget/income-chart/income-chart.component';
import { ExpenseComponent } from '../components/budget/expense/expense.component';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    RouterModule.forChild(routes)
  ]
})
export class BudgetModule { }
