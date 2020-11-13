import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../../../../../../common/veiculo';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.css']
})
export class CadastroForm implements OnInit {

  veiculo: Veiculo = new Veiculo;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CadastroForm>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'marca': ['', [Validators.required]],
      'ano': ['', [Validators.required]],
      'placa': ['', [Validators.required]],
      'modelo': ['', [Validators.required]],
      'funcao': ['', [Validators.required]],
    })
  }

  submit(form) {
    this.dialogRef.close(this.form.value);
  }

}
