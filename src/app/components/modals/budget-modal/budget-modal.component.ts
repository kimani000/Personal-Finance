import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Income } from '../../../models/income.models';

@Component({
  selector: 'pf-budget-modal',
  templateUrl: './budget-modal.component.html',
  styleUrls: ['./budget-modal.component.css']
})
export class BudgetModalComponent implements OnInit {
  
  newIncomeForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<BudgetModalComponent>,
              private fb: FormBuilder) {

                this.newIncomeForm = this.fb.group({
                  name: new FormControl<string>('', Validators.required),
                  amount: new FormControl<number | null>(null, Validators.required)
                })
               }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit(): void {

    switch(this.newIncomeForm.valid){
      
      case true:
        var formValue = this.newIncomeForm.getRawValue();
        var newIncome = new Income(formValue.name, Number(formValue.amount));
        this.dialogRef.close(newIncome);
        break;

      default:
        break;
    }
  }

  getErrorMessage(): string {
    return "You must enter a value";
  }
}
