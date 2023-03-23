import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IIncome } from 'src/app/models/interfaces/income.interface';

@Component({
  selector: 'pf-edit-income-modal',
  templateUrl: './edit-income-modal.component.html',
  styleUrls: ['./edit-income-modal.component.css']
})
export class EditIncomeModalComponent {

  incomes: IIncome[];

  // FormGroup for stepper (Angular Material)
  selectIncome: FormGroup;
  editIncome: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditIncomeModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IIncome[]) {

    this.incomes = data;

    this.selectIncome = fb.group({
      income: new FormControl<IIncome | null>(null, Validators.required)
    });

    this.editIncome = new FormGroup(null);
  }

  /**
   * TODO:
   *      Next button on step 1 does not move onto the next step.
   *      Issue might be related validation not passing.
   *      look into [complete]
   *      look into [stepControl] 
   */
  stepper1Complete(): void {
    if (this.selectIncome.valid) {
      let formValue = this.selectIncome.getRawValue();

      this.editIncome = this.fb.group({
        id: new FormControl<number>(formValue.income.incomeId, Validators.required),
        name: new FormControl<string>(formValue.income.incomeName, Validators.required),
        amount: new FormControl<number>(formValue.income.incomeAmount, Validators.required)
      });
    } 
  }

  getErrorMessage(): string {
    return "You must enter a value";
  }
}
