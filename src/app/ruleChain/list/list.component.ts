import { Component, OnInit } from '@angular/core';
import { RuleService } from '../rule.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  rules = [];
  isPageLoading = false;

  constructor(private ruleService: RuleService, private router: Router, private dialog: MatDialog, private toast: ToastrService) { }

  ngOnInit(): void {
    localStorage.removeItem('RULE_NAME');
    this.fetchRuleData();
  }

  fetchRuleData() {
    this.isPageLoading = true;
    this.ruleService
      .fetchRules()
      .subscribe((data: any) => {
        this.rules = data;
        this.isPageLoading = false;
      }, () => {
        this.isPageLoading = false;
      });
  }

  addRule() {
    this.router.navigate(['/add']);
  }

  openAddRuleDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Add Rule'
    };

    const dialogRef = this.dialog.open(AddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ruleService.addRules(result).subscribe(
          () => {
            this.toast.success('Rule added successfully !');
            this.fetchRuleData();
          },
          error => {
            this.toast.error(error.message);
          }
        );
      }
    });
  }

  openEditDialog(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Edit Rule',
      id
    };

    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ruleService.updateRule(result, id).subscribe(
          () => {
            this.toast.success('Rule updated successfully !');
            this.fetchRuleData();
          },
          error => {
            this.toast.error(error.message);
          }
        );
      }
    });
  }

  deleteDialog(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Edit Rule',
    };

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const params = {
          ids: id,
        };
        this.ruleService.deleteRule(params).subscribe(
          () => {
            this.toast.success('Rule deleted successfully !');
            this.fetchRuleData();
          },
          error => {
            this.toast.error(error.message);
          }
        );
      }
    });
  }

  gotoRulePage(rule: any) {
    localStorage.setItem('RULE_NAME', rule.name);
    this.router.navigate(['/rule', rule.id]);
  }

  gotoSqlBuilder(rule: any) {
    localStorage.setItem('RULE_NAME', rule.name);
    this.router.navigate(['/sqlbuilder', rule.id]);
  }
}
