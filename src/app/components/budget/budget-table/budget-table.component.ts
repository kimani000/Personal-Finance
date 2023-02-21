import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Budget } from '../../../models/buget.model';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BudgetTableActionModalComponent } from '../../modals/budget-table-action-modal/budget-table-action-modal.component';
import { IBudget } from 'src/app/models/interfaces/buget.interface';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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

  // DOM ref
  @ViewChild(MatTable) table!: MatTable<any>;

  // ctor
  constructor(private budgetService: BudgetService, 
    private dialog: MatDialog){
  }

  // lifecycle hooks
  ngOnInit(): void {
    this.sub = this.budgetService.getBudgets().subscribe({
      next: budget => {
        this.budgetData = budget;
      } 
    })
  }
  // function that handles add, edit, and delete
  // launches MatDialog
  budgetTableAction(action: ("Add" | "Edit" | "Delete"), budget?: Budget): void {
    let budgetObj: Budget;

    /**
     * if user selected edit or delete, set the selected budget to vairable
     * if user selects add, create a new instance of Budget
     */
    if (budget) budgetObj = budget;
    else budgetObj = Budget.createNewBudget();

    // set configuration for MatDialog
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      action: action,
      budgetObj: budgetObj
    }
    dialogConfig.width = '500px';

    let dialogRef = this.dialog.open(BudgetTableActionModalComponent, dialogConfig).afterClosed().subscribe(response => {
      /**
       * TODO:
       * Implement add, edit, delete to reflect in BudgetService
       */
      switch(response.action){
        case "Add":
          response.budgetObj.id = this.budgetData.length + 1;
          this.budgetData.push(response.budgetObj);
          break;
        case "Edit":
          let index = this.budgetData.findIndex(budget => budget.id === response.budgetObj.id)
          this.budgetData[index] = response.budgetObj;
          break;
        case "Delete":
          // Needs to be implemented
          break;
      }
      this.refreshTable();
    });
  }

  refreshTable(): void {
    this.table.renderRows();
  }
}
