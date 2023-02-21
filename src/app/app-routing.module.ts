import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BudgetModule } from './modules/budget.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pfinance/budget', loadChildren: () => import('./modules/budget.module').then(m => m.BudgetModule)  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BudgetModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
