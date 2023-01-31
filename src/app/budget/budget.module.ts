import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget.component';
import { BudgetModalComponent } from '../modals/budget-modal/budget-modal.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { IncomeChartComponent } from './income-chart/income-chart.component';
import { ExpenseComponent } from './expense/expense.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'budget', component: BudgetComponent }
]


@NgModule({
  declarations: [
    BudgetComponent,
    BudgetModalComponent,
    IncomeChartComponent,
    ExpenseDetailComponent,
    ExpenseComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    BrowserAnimationsModule,
    RouterModule.forChild(routes)
  ]
})
export class BudgetModule { }
