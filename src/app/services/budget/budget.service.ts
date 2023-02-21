import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, filter, map, Observable, throwError } from 'rxjs';
import { Income } from '../../models/income.models';
import { Expense } from '../../models/expense.model';
import { ExpenseCategory } from '../../enums/expense-category';
import { DefaultUrlSerializer } from '@angular/router';
import { PaymentType } from '../../enums/payment-type';
import { Budget } from '../../models/buget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private incomeUrl = 'http://localhost:4200/assets/json/income.json';
  private expenseUrl = 'http://localhost:4200/assets/json/expense.json';
  private budgetUrl = 'http://localhost:4200/assets/json/budget.json';


  constructor(private http: HttpClient) { }

  getIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(this.incomeUrl).pipe(
      catchError(this.handleError)
    )
  };

  getExpenses(): Observable<Expense[]>{
    return this.http.get<Expense[]>(this.expenseUrl).pipe(
      map(data => {
        // transform props that are supposed to be enum value
        for(let i = 0; i < data.length; i++) {
          data[i].category = this.transformToExpenseCategoryType(data[i]);
          data[i].paymentType = this.transformToPaymentType(data[i]);
        }
        return data;
      }),
      catchError(this.handleError)
    )
  }

  getBudgets(): Observable<Budget[]>{
    return this.http.get<Budget[]>(this.budgetUrl).pipe(
      map(data => {
        // transform prop to enum value
        for(let i = 0; i < data.length; i++) {
          data[i].category = this.transformToExpenseCategoryType(data[i]);
        }
        return data;
      }),
      catchError(this.handleError)
    )
  }

  

  // TODO: See if this actually works
  getAllCategoryEnum(): ExpenseCategory[] {
    var strEnumArr: string[] = Object.keys(ExpenseCategory);
    var enumArr: ExpenseCategory[] = [];
    
    strEnumArr.forEach(enumVal => {
      enumArr.push(ExpenseCategory[enumVal as keyof typeof ExpenseCategory]);
    })

    return enumArr;
  }

  getAllPaymentTypeEnum(): PaymentType[] {
    var strEnumArr: string[] = Object.keys(PaymentType);
    var enumArr: PaymentType[] = [];
    
    strEnumArr.forEach(enumVal => {
      enumArr.push(PaymentType[enumVal as keyof typeof PaymentType]);
    })

    return enumArr;
  }
  
  private handleError(err: HttpErrorResponse) {
    let errorMessgae = '';
    if (err.error instanceof ErrorEvent) {
      errorMessgae = `An error occured: ${err.error.message}`;
    } else {
      errorMessgae = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    console.error(errorMessgae);
    return throwError(() => errorMessgae);
  }

  private transformToExpenseCategoryType(paramObj: (Expense | Budget)): (ExpenseCategory | undefined) {   
    
    switch(paramObj.category){
      case 'Grocery':
        return ExpenseCategory.GROCERY;
      case 'Business':
        return ExpenseCategory.BUSINESS;
      case 'Bills':
        return ExpenseCategory.BILLS;
      case 'Gas':
        return ExpenseCategory.GAS;
      case 'Other':
        return ExpenseCategory.OTHER;
      default:
        return;
    }
  }

  private transformToPaymentType(expense: Expense): (PaymentType | undefined) {
    
    switch(expense.paymentType){
      case 'Cash':
        return PaymentType.CASH;
      case 'Debit':
        return PaymentType.DEBIT;
      case 'Credit':
        return PaymentType.CREDIT;
      default:
        return;
    }
  }
}
