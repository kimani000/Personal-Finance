import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseCategory } from 'src/app/enums/expense-category';
import { Budget } from 'src/app/models/buget.model';
import { Expense } from 'src/app/models/expense.model';
import { BudgetService } from 'src/app/services/budget/budget.service';

@Component({
  selector: 'pf-budget-table-action-modal',
  templateUrl: './budget-table-action-modal.component.html',
  styleUrls: ['./budget-table-action-modal.component.css']
})
export class BudgetTableActionModalComponent implements OnInit {
  pageTitle: string = '';
  action: string;
  selectedBudget: Budget;
  isAddNewBudget: boolean;
  isEditBudget: boolean;

  budgetForm: FormGroup;
  expenseCategoryArr: ExpenseCategory[];

  constructor(private dialogRef: MatDialogRef<BudgetTableActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: { action: string, budgetObj: Budget },
    private fb: FormBuilder,
    private budgetService: BudgetService) {

    this.action = data.action
    this.selectedBudget = data.budgetObj;
    this.isAddNewBudget = this.action === "Add" ? true : false;
    this.isEditBudget = this.action === "Edit" ? true : false;

    this.budgetForm = fb.group({
      id: new FormControl<number | null>(null),
      name: new FormControl<string>(this.selectedBudget.name, Validators.required),
      category: new FormControl<ExpenseCategory | null>(this.selectedBudget.category!, Validators.required),
      projectedCost: new FormControl<number | null>(this.selectedBudget.projectedCost, Validators.required),
      actualCost: new FormControl<number | null>(this.selectedBudget.actualCost, Validators.required)
    });

    this.expenseCategoryArr = this.budgetService.getAllCategoryEnum();
  }

  ngOnInit(): void {
    // Change title of the dialog depending on action passed in
    if (this.isAddNewBudget) this.pageTitle = `${this.action} New Budget`;
    else if (this.isEditBudget) this.pageTitle = `${this.action} Selected Budget`;
    else this.pageTitle = "Are You Sure You Want To Delete";

    // Change default value of projectedCost and actualCost (formControl) to null if the user is adding a new budget
    switch (this.isAddNewBudget) {
      case true:
        this.budgetForm.controls['projectedCost'].setValue(null);
        this.budgetForm.controls['actualCost'].setValue(null);
        break;
      case false:
        if (this.isEditBudget) this.budgetForm.controls['id'].setValue(this.selectedBudget.id);
        break;
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let outputData;

    switch (this.isAddNewBudget || this.isEditBudget) {
      case true:
        if (this.budgetForm.valid) {
          let formValue = this.budgetForm.getRawValue();
          let budget: Budget = new Budget(formValue.name, formValue.projectedCost, formValue.actualCost, formValue.category);

          if (this.isEditBudget) budget.id = formValue.id;
          outputData = { budgetObj: budget, action: this.action };
        }
        break;

      case false:
        outputData = {budgetObj: this.selectedBudget, action: this.action};
        break;
    }
    this.dialogRef.close(outputData);
  }

  getErrorMessage(): string {
    return "You must enter a value";
  }

}
