import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.css']
})
export class CadastroForm implements OnInit {
  id_pneu: string;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CadastroForm>) { }

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
