import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Income } from '../../../models/income.models';

@Component({
  selector: 'pf-budget-modal',
  templateUrl: './budget-modal.component.html',
  styleUrls: ['./budget-modal.component.css']
})
export class BudgetModalComponent implements OnInit{

  name = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);


  constructor(private dialogRef: MatDialogRef<BudgetModalComponent>) { }

   ngOnInit(): void {
   }

  close() {
    this.dialogRef.close();
  }

  onSubmit() : void {
    // null check on input fields
    const incomeName = this.name.value === null ? '' : this.name.value;
    const incomeAmount = this.amount.value === null ? 0 : this.amount.value;

    // instantitae object
    var newIncome = new Income(incomeName, Number(incomeAmount));

    this.dialogRef.close(newIncome);
  }

  getErrorMessage(): string {
    return "You must enter a value";
  }
}
