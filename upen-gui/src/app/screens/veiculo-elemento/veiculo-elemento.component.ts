import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';  
import { CadastroForm } from './components/cadastro-form/cadastro-form.component';

@Component({
  selector: 'app-veiculo-elemento',
  templateUrl: './veiculo-elemento.component.html',
  styleUrls: ['./veiculo-elemento.component.css'],
})
export class VeiculoElementoComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  CadastroFormRef: MatDialogRef<CadastroForm>

  openDialog() {
    this.CadastroFormRef = this.dialog.open(CadastroForm);
  }

  btnFunc(){
    console.log("deletar veiculo");
  }

}
