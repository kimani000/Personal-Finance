import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modals/modal.service';
import { BudgetService } from '../budget.service';
import { IIncome } from '../interfaces/income';

@Component({
  selector: 'pf-income-chart',
  templateUrl: './income-chart.component.html',
  styleUrls: ['./income-chart.component.css', '../budget.component.css']
})
export class IncomeChartComponent implements OnInit {
  sub! : Subscription;
  errorMessage: string = '';

  // Doughnut chart/income related variables
  incomes: IIncome[] = [];
  totalIncome : number = 0;
  defaultTotalIncomeTitle: string = "Total Income";

  doughnutChartLabels: string[] = [];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ ] }
    ]
  }
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    // Not working
    // onClick: this.onIncomeChartClick.bind(this)
  };

  @ViewChild(BaseChartDirective)
   chart!: BaseChartDirective;

   constructor(private budgetService: BudgetService, private modalService: ModalService){
   }

   // Lifecycle Hooks
   ngOnInit(): void {
     // GET incomes
    this.sub = this.budgetService.getIncomes().subscribe({
      next: income => {
        this.incomes = income;
        this.getTotalIncomeLogged();
        this.initializeCharts();
      },
      error: err => this.errorMessage = err
    });
   }

   ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Initalize total income variable
  getTotalIncomeLogged(): void {
    this.totalIncome += this.incomes.reduce((sum, income) => sum + income.incomeAmount, 0 );
  }

  // Functions for income chart
  initializeCharts(): void {
    this.incomes.forEach((income: IIncome) => {
      this.doughnutChartLabels.push(income.incomeName);
      this.doughnutChartData.datasets[0].data.push(income.incomeAmount);
    });
    this.updateChart();
  }

  updateChart(): void {
    this.chart.chart?.update();
  }

  // Functions for add new income functionality
  addIncome(id: string) {
    this.modalService.open(id);
  }

  addNewIncome(event: IIncome) {
    this.doughnutChartLabels.push(event.incomeName);
    this.doughnutChartData.datasets[0].data.push(event.incomeAmount);
    this.updateChart();
  }

}
