import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RuleService } from '../rule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  rulesForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]]
  });

  constructor(private formBuilder: FormBuilder,
              private ruleService: RuleService,
              private toast: ToastrService,
              private dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.ruleService.getRuleDataById(data.id).subscribe((result: any) => {
      this.rulesForm.patchValue({
        name: result.name,
        description: result.description
      });
    }, error => {
      this.toast.error(error.message);
    });
  }

  ngOnInit(): void {
  }

  get name() {
    return this.rulesForm.get('name');
  }

  get description() {
    return this.rulesForm.get('description');
  }

  onSubmit() {
    const params = {
      rule: {
        name: this.rulesForm.value.name,
        description: this.rulesForm.value.description
      }
    };
    this.dialogRef.close(params);
  }

  close() {
    this.dialogRef.close();
  }

}
