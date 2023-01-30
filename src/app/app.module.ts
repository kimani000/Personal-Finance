import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpModalComponent } from './modals/signUpModal/signUpModal.component';
import { BudgetComponent } from './budget/budget.component';
import { BudgetModalComponent } from './modals/budget-modal/budget-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbAccordionModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { ExpenseDetailComponent } from './budget/expense-detail/expense-detail.component';
import { IncomeChartComponent } from './budget/income-chart/income-chart.component';
import { ExpenseComponent } from './budget/expense/expense.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpModalComponent,
    BudgetComponent,
    BudgetModalComponent,
    ExpenseDetailComponent,
    IncomeChartComponent,
    ExpenseComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbAccordionModule,
    NgChartsModule,
    NgbNavModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'budget', component: BudgetComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full'}
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
