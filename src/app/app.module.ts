import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListComponent } from './ruleChain/list/list.component';
import { AddDialogComponent } from './ruleChain/add-dialog/add-dialog.component';
import { EditDialogComponent } from './ruleChain/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './ruleChain/delete-dialog/delete-dialog.component';
import { RuleComponent } from './ruleChain/rule/rule.component';
import { RuledialogComponent } from './ruleChain/ruledialog/ruledialog.component';
import { EdgedialogComponent } from './ruleChain/edgedialog/edgedialog.component';
import { NgxFlowchartModule } from '../flowchart/ngx-flowchart.module';
import { SqlbuilderComponent } from './ruleChain/sqlbuilder/sqlbuilder.component';
import { QueryBuilderModule } from 'angular9-query-builder';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    RuleComponent,
    RuledialogComponent,
    EdgedialogComponent,
    SqlbuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    QueryBuilderModule,
    NgxFlowchartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
