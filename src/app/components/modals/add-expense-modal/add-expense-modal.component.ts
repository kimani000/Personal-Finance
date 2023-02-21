import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ExpenseCategory } from 'src/app/enums/expense-category';
import { PaymentType } from 'src/app/enums/payment-type';
import { Expense } from 'src/app/models/expense.model';
import { BudgetService } from 'src/app/services/budget/budget.service';

@Component({
  selector: 'pf-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.css', '../budget-modal/budget-modal.component.css']
})
export class AddExpenseModalComponent implements OnInit {

  expenseCategoryArr: ExpenseCategory[];
  paymentTypeArr: PaymentType[];

  expenseCategoryMap: Map<string, ExpenseCategory> = new Map([
    ["Grocery", ExpenseCategory.GROCERY],
    ["Business", ExpenseCategory.BUSINESS],
    ["Bills", ExpenseCategory.BILLS],
    ["Gas", ExpenseCategory.GAS],
    ["Other", ExpenseCategory.OTHER]
  ]);

  paymentTypeMap: Map<string, PaymentType> = new Map([
    ["Cash", PaymentType.CASH],
    ["Credit", PaymentType.CREDIT],
    ["Debit", PaymentType.DEBIT],
  ]);

  addExpenseFrom: FormGroup;
  newExpense!: Expense;

  constructor(private budgetService: BudgetService,
              private dialogRef: MatDialogRef<AddExpenseModalComponent>,
              private cdr: ChangeDetectorRef,
              private formBuider: NonNullableFormBuilder){

                this.addExpenseFrom = this.formBuider.group({
                  location: new FormControl<string>('', Validators.required),
                  amount: new FormControl<number | null>(null, Validators.required),
                  category: new FormControl<ExpenseCategory | null>(null, Validators.required),
                  paymentType: new FormControl<PaymentType | null>(null, Validators.required),
                  date: new FormControl<Date | null>(null, Validators.required)
                });

                this.expenseCategoryArr = this.budgetService.getAllCategoryEnum();
                this.paymentTypeArr = this.budgetService.getAllPaymentTypeEnum();
              }

  ngOnInit(): void {
    
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    switch(this.addExpenseFrom.valid){
      case true:
        let formValues = this.addExpenseFrom.getRawValue();
        const newExpense = new Expense(formValues.location, formValues.amount, formValues.date, 
                                      this.expenseCategoryMap.get(formValues.category),
                                      this.paymentTypeMap.get(formValues.paymentType));
        /**
         * TODO:
         * I hope this causes a merge conflict
         */
    }
  }

  getErrorMessage(): string {
    return 'You must enter a value';
}
}
