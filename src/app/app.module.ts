import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpModalComponent } from './components/modals/signUpModal/signUpModal.component';
import { AppRoutingModule } from './app-routing.module';
import { BudgetTableActionModalComponent } from './components/modals/budget-table-action-modal/budget-table-action-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpModalComponent,
    BudgetTableActionModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
