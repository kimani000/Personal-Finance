import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetModule } from './modules/budget.module';
import { HomeComponent } from './components/home/home.component';

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
