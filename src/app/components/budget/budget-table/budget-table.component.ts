import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Budget } from '../../../models/buget.model';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BudgetTableActionModalComponent } from '../../modals/budget-table-action-modal/budget-table-action-modal.component';
import { MatTable } from '@angular/material/table';
import { IBudget } from 'src/app/models/interfaces/buget.interface';

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
  budgetData: Budget[] = [];

  // total projected cost 
  projetedCostTitle: string = 'Projected Cost';
  totalProjectedCost: number = 0;

  // total actual cost
  actualCostTitle: string = 'Actual Cost';
  totalActualCost: number = 0;

  // combined difference
  differenceTitle: string = 'Difference';
  combinedDifference: number = 0;

  // DOM ref
  @ViewChild(MatTable) table!: MatTable<any>;

  // ctor
  constructor(private budgetService: BudgetService,
    private dialog: MatDialog) {
  }

  // lifecycle hooks
  ngOnInit(): void {
    this.sub = this.budgetService.getBudgets().subscribe({
      next: budget => {
        this.budgetData = budget;
        this.initTotalProjectCost();
        this.initTotalActualCost();
        this.initCombinedDifference();
      }
    });
    
  }

  /**  
   * function that handles add, edit, and delete.
   * also launches MatDialog */
  budgetTableAction(action: ("Add" | "Edit" | "Delete"), budget?: Budget): void {
    /**
     * if the user selects edit or delete, set the selected budget to vairable
     * if the user selects add, create a new instance of Budget
    */
    let budgetObj: Budget;
    if (budget) budgetObj = budget;
    else budgetObj = Budget.createNewBudget();

    // set configuration for MatDialog
    const dialogConfig = new MatDialogConfig();

    // set user's selected action and selected/new budget obj
    dialogConfig.data = {
      action: action,
      budgetObj: budgetObj
    }
    dialogConfig.width = '500px';

    let dialogRef = this.dialog.open(BudgetTableActionModalComponent, dialogConfig);

    // after modal is closed....
    dialogRef.afterClosed().subscribe(response => {
      /**
       * TODO:
       * Implement add, edit, delete to reflect in BudgetService
       */
      switch (response.action) {
        case "Add":
          this.addNewBudget(response.budgetObj);
          break;
        case "Edit":
          this.editSelectedBudget(response.budgetObj);
          break;
        case "Delete":
          this.deleteSelectedBudget(response.budgetObj.id)
          break;
      }
      this.refreshTable();
    });
  }

  /**
   * private helper methods
   */

  // refreshes Mat-Table
  private refreshTable(): void {
    this.table.renderRows();
  }

  // add, edit, delete budget
  private addNewBudget(newBudget: IBudget): void {
    newBudget.id = this.budgetData.length + 1;
    this.budgetData.push(newBudget);
  }

  private editSelectedBudget(selectedBudget: IBudget): void {
    let index = this.budgetData.findIndex(budget => budget.id === selectedBudget.id)
    this.budgetData[index] = selectedBudget;
  }

  private deleteSelectedBudget(budgetId: number): void {
    let index = this.budgetData.findIndex(budget => budget.id === budgetId);
    index !== -1 ? this.budgetData.splice(index, 1) : alert("Can not find element to delete");
  }

  // initialize total projected cost
  private initTotalProjectCost(): void {
    this.budgetData.forEach(budget => {
      this.totalProjectedCost += budget.projectedCost;
    });
  }

  // get total actual cost
  private initTotalActualCost(): void {
    this.budgetData.forEach(budget => {
      this.totalActualCost += budget.actualCost;
    });
  }

  // get combined difference
  private initCombinedDifference(): void {
    this.combinedDifference = this.totalProjectedCost - this.totalActualCost;
  }
}
