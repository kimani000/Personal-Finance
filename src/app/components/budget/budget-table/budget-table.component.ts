import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
<<<<<<< HEAD
import { Budget } from '../../../models/buget.model';
=======
import { IBudget } from 'src/app/models/interfaces/buget';
>>>>>>> origin/master
import { BudgetService } from 'src/app/services/budget/budget.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'pf-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.css', '../budget.component.css']
})
export class BudgetTableComponent implements OnInit {
  // subscription
  sub!: Subscription;
  errorMessage: string = '';

  // budget data variables
  displayedColumns: string[] = ['id', 'name', 'category', 'projectedCost', 'actualCost', 'difference', 'actions'];
<<<<<<< HEAD
  budgetData: Budget[] = [];
=======
  budgetData: IBudget[] = [];
>>>>>>> origin/master

  // modal variables
  modalIsDisplayed = false;

  // ctor
  constructor(private budgetService: BudgetService, private modalService: ModalService){
  }

  // lifecycle hooks
  ngOnInit(): void {
    this.sub = this.budgetService.getBudgets().subscribe({
      next: budget => {
        this.budgetData = budget;
        this.calculateDifference();
      } 
    })
  }

  // function that calcualtes the difference between projectedCost and acutalCost for each budget
  calculateDifference(): void {
    this.budgetData.map( budget => {
      budget.difference = budget.projectedCost - budget.actualCost;
    })
  }

  budgetTableAction(action: string, id: string): void {
    
    /** TODO:
     * Modal component for this action has been created.
     * Next thing to do is figure out if I can recycle the same modal for edit and delete.
     * 
     */
    this.modalIsDisplayed = true;
    setTimeout(() => {
      this.modalService.open(id);
    }, 100);

    // if(action === 'edit' || action === 'delete') this.modalService.open('modal-3');
  }
}
