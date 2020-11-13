import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../../../../../common/veiculo';
import { ListaVeiculoService } from '../../../services/ListaVeiculoService/lista-veiculo.service'
import {MatDialog} from '@angular/material/dialog';
import { DialogPermanentRemoval } from "./Dialog/DialogPermanentRemoval";

@Component({
  selector: 'app-lixeira-veiculo',
  templateUrl: './lixeira-veiculo.component.html',
  styleUrls: ['./lixeira-veiculo.component.css', '../lista-veiculo.component.css', './hover.css']
})
export class LixeiraVeiculoComponent implements OnInit {

  lixeira: Veiculo[];

  constructor( private listaVeiculoService: ListaVeiculoService , public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.listarLixeira();
  }


  listarLixeira():void{
    this.listaVeiculoService.getLixeira().subscribe(
      as => {this.lixeira = as;},
      msg => {alert(msg.message);}
    );
  }

  displayData(data:string): string {
    if(data.length >= 13){
      data = data.slice(0, 13);
      data += "...";
    }
    return data;
  }

    openDialog(veiculo: Veiculo) {
      const dialogRef = this.dialog.open(DialogPermanentRemoval, {data: veiculo});
      dialogRef.afterClosed().subscribe(placa => {
        if(placa == "" || placa == undefined) return;
        this.listaVeiculoService.deletarVeiculoPermanentemente(placa).subscribe(
          ar => {
            if(ar != -1){ // retornado o index do veiculo a ser removido
              this.removerPorIndex(ar, veiculo.placa);
            }
          },
          msg => {
            alert("Não foi possível remover o veículo permanentemente");
          }
        )

      });
    }

    removerPorIndex(index: number, placa: string): void{
      if(index >= this.lixeira.length){
        this.removerPorPlaca(placa);
      }else if(this.lixeira[index].placa == placa){
        this.lixeira.splice(index,1);
      }else{ 
        this.removerPorPlaca(placa);
      }
    }

    removerPorPlaca(placa: string): void{ // forma menos eficiente, entretanto assegura corretude
      let index = this.lixeira.findIndex( v =>  v.placa == placa);
      if(index != -1) this.lixeira.splice(index, 1);
    }

    restaurarVeiculo(veiculo: Veiculo): void{


      this.listaVeiculoService.restaurarVeiculo(veiculo).subscribe(
        ar => {
          if(ar != -1){
            this.removerPorIndex(ar ,veiculo.placa);
          }else{
            this.listarLixeira();
          }
        },  
        msg => { alert(msg.message);}
      );
    }

}
