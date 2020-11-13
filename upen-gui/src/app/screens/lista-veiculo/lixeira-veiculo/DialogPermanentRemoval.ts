import { Component, Inject } from '@angular/core';
import {Veiculo} from '../../../../../../common/veiculo'
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'dialog-permanentremoval',
  templateUrl: 'dialog-permanentremoval.html',
  styleUrls: ['./lixeira-veiculo.component.css']
})
export class DialogPermanentRemoval {


  constructor( @Inject (MAT_DIALOG_DATA) public veiculo: Veiculo, 
  private dialogRef: MatDialogRef<DialogPermanentRemoval>,
  ){}

  onClick(): void{
    this.dialogRef.close(this.veiculo.placa);
  }
}
