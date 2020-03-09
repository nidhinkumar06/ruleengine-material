import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './ruleChain/list/list.component';
import { RuleComponent } from './ruleChain/rule/rule.component';


const routes: Routes = [
  {path : '', pathMatch: 'full', redirectTo: 'list'},
  {path : 'list', component : ListComponent},
  {path: 'rule/:id', component: RuleComponent},
  {path : '**', redirectTo : 'list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
