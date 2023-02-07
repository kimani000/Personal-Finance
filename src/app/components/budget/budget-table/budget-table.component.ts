import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBudget } from 'src/app/models/interfaces/buget';
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
  budgetData: IBudget[] = [];

  // modal variables
  modalIsDisplayed = false;
  modalAction!: ('add' | 'edit' | 'delete');

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

  AddEditDeleteBudgetModal(action: ('add' | 'edit' | 'delete'), id: string): void {
    this.modalIsDisplayed = true;
    this.modalAction = action;
    
    setTimeout(() => {
      switch (action) {
        case 'edit':
          this.modalService.open('modal-3');
          break;
        case 'delete':
          this.modalService.open('modal-3');
          break;
      }
    }, 100);
  }
}
