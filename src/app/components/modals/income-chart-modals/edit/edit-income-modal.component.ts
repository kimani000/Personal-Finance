import { Component, Inject, OnChanges, OnInit, ViewChild } from '@angular/core';

import { IIncome } from 'src/app/models/interfaces/income.interface';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'pf-edit-income-modal',
  templateUrl: './edit-income-modal.component.html',
  styleUrls: ['./edit-income-modal.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],

})

export class EditIncomeModalComponent implements OnInit {

  incomes: IIncome[];

  // FormGroup for stepper (Angular Material)
  selectIncomeForm: FormGroup;
  editIncomeForm!: FormGroup;

  isComplete: boolean = false;

  constructor(private dialogRef: MatDialogRef<EditIncomeModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IIncome[]) {

    this.incomes = data;

    this.selectIncomeForm = fb.group({
      income: new FormControl<IIncome | null>(null, Validators.required)
    });

    this.editIncomeForm = this.fb.group({
      id: new FormControl<number | null>(null, Validators.required),
      name: new FormControl<string>('', Validators.required),
      amount: new FormControl<number | null>(null, Validators.required)
    });
  }

  ngOnInit(): void {
    // If user selects an income, populate the edit form group with its info
    this.selectIncomeForm.get('income')?.valueChanges.subscribe(val => {

      this.editIncomeForm.controls['id'].setValue(val.id);
      this.editIncomeForm.controls['name'].setValue(val.incomeName);
      this.editIncomeForm.controls['amount'].setValue(val.incomeAmount);
    })
  }

  getErrorMessage(): string {
    return "You must enter a value";
  }
}
