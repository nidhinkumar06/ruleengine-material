import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close('delete');
  }

}
