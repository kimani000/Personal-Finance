import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { BudgetService } from '../../../services/budget/budget.service';
import { Income } from '../../../models/income.models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddIncomeModalComponent } from '../../modals/income-chart-modals/add/add-income-modal.component';
import { EditIncomeModalComponent } from '../../modals/income-chart-modals/edit/edit-income-modal.component';

@Component({
  selector: 'pf-income-chart',
  templateUrl: './income-chart.component.html',
  styleUrls: ['./income-chart.component.css', '../budget.component.css']
})
export class IncomeChartComponent implements OnInit {
  sub!: Subscription;
  errorMessage: string = '';

  // Doughnut chart/income related variables
  incomes: Income[] = [];
  totalIncome: number = 0;
  defaultTotalIncomeTitle: string = "Total Income";

  doughnutChartLabels: string[] = [];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] }
    ]
  }
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    // onClick: this.onIncomeChartClick.bind(this)
  };

  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  constructor(private budgetService: BudgetService, private dialog: MatDialog) {
  }

  // Lifecycle Hooks
  ngOnInit(): void {
    // GET incomes
    this.sub = this.budgetService.getIncomes().subscribe({
      next: income => {
        this.incomes = income;
        this.getTotalIncomeLogged();
        this.initializeCharts();
        this.updateChart();
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * With no parameter, this function calculates the total income logged
   * With a parameter, this function adds the new income to the total.
   */
  getTotalIncomeLogged(newIncomeAmount?: number): void {
    if (newIncomeAmount){
      this.totalIncome += newIncomeAmount;
    }
    else{
      this.totalIncome += this.incomes.reduce((sum, income) => sum + income.incomeAmount, 0);
    }
  }

  // Functions for income chart
  initializeCharts(): void {
    this.incomes.forEach((income: Income) => {
      this.doughnutChartLabels.push(income.incomeName);
      this.doughnutChartData.datasets[0].data.push(income.incomeAmount);
    });
    this.updateChart()
  }
  
  updateChart(): void {
    this.chart.chart?.update();
  }

  // Functions for add new income functionality
  addIncome() {
    let dialogRef = this.dialog.open(AddIncomeModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((data: Income) => {
      this.incomes.push(data);
      this.doughnutChartLabels.push(data.incomeName);
      this.doughnutChartData.datasets[0].data.push(data.incomeAmount);
      this.getTotalIncomeLogged(data.incomeAmount);
      this.updateChart();
    });
  }

  editIncome(): void{
    let dialogConfig = new MatDialogConfig();

    dialogConfig.data = this.incomes;
    dialogConfig.width = "750px";
    dialogConfig.height = "300px";

    let dialogRef = this.dialog.open(EditIncomeModalComponent, dialogConfig);
  }

  deleteIncome(): void {

  }
}
