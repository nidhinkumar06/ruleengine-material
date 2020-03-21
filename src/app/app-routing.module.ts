import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './ruleChain/list/list.component';
import { RuleComponent } from './ruleChain/rule/rule.component';
import { SqlbuilderComponent } from './ruleChain/sqlbuilder/sqlbuilder.component';


const routes: Routes = [
  {path : '', pathMatch: 'full', redirectTo: 'list'},
  {path : 'list', component : ListComponent},
  {path: 'rule/:id', component: RuleComponent},
  {path: 'sqlbuilder/:id', component: SqlbuilderComponent},
  {path : '**', redirectTo : 'list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
