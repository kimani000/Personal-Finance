import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, filter, map, Observable, throwError } from 'rxjs';
import { IIncome } from '../../models/interfaces/income';
import { IExpense } from '../../models/interfaces/expense';
import { ExpenseCategory } from '../../models/enums/expense-category';
import { DefaultUrlSerializer } from '@angular/router';
import { PaymentType } from '../../models/enums/payment-type';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private incomeUrl = 'http://localhost:4200/assets/income.json';
  private expenseUrl = 'http://localhost:4200/assets/spending.json';

  constructor(private http: HttpClient) { }

  getIncomes(): Observable<IIncome[]> {
    return this.http.get<IIncome[]>(this.incomeUrl).pipe(
      catchError(this.handleError)
    )
  };

  getExpenses(): Observable<IExpense[]>{
    return this.http.get<IExpense[]>(this.expenseUrl).pipe(
      map(data => {
        // transform props that are supposed to be enum value
        for(let i = 0; i < data.length; i++) {
          data[i].expenseCategory = this.transformToExpenseCategoryType(data[i]);
          data[i].paymentType = this.transformToPaymentType(data[i]);
        }
        return data;
      }),
      catchError(this.handleError)
    )
  }

  getAllCategoryEnum(): ExpenseCategory[] {
    var strEnumArr: string[] = Object.keys(ExpenseCategory);
    var enumArr: ExpenseCategory[] = [];
    
    strEnumArr.forEach(enumVal => {
      enumArr.push(ExpenseCategory[enumVal as keyof typeof ExpenseCategory]);
    })

    return enumArr;
  }
  
  // GETS one expense using id
  // getExpenseById(id: number): Observable<IExpense>{
  //   return this.http.get<IExpense>(this.expenseUrl).pipe(
  //     filter(expense => (expense.id === id)),
  //     catchError(this.handleError)
  //   );
  // }
  
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

  private transformToExpenseCategoryType(expense: IExpense): (ExpenseCategory | undefined) {
    
    switch(expense.expenseCategory){
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

  private transformToPaymentType(expense: IExpense): (PaymentType | undefined) {
    
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
