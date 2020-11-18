import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dst-pneu-form',
  templateUrl: './dst-pneu-form.component.html',
  styleUrls: ['./dst-pneu-form.component.css']
})
export class DstPneuFormComponent implements OnInit {
  id_pneu: string;
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, 
              private formBuilder: FormBuilder, 
              private dialogRef: MatDialogRef<DstPneuFormComponent>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'pneu_id': ['', Validators.required]
    })
  }

  submit(form) {
    if(!this.form.invalid)
      this.dialogRef.close(this.form.value);
    else
      this.dialogRef.close(null);
  }

}
