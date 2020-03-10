import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  rulesForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

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
