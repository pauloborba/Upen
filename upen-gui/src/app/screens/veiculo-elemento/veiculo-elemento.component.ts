import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';  
import { CadastroForm } from './components/cadastro-form/cadastro-form.component';
import { DstPneuFormComponent } from './components/dst-pneu-form/dst-pneu-form.component';

import { Veiculo } from '../../../../../common/veiculo';
import { Pneu } from '../../../../../common/pneu';
import { VeiculoElementoService } from '../../services/VeiculoElementoService/veiculo-elemento.service';

@Component({
  selector: 'app-veiculo-elemento',
  templateUrl: './veiculo-elemento.component.html',
  styleUrls: ['./veiculo-elemento.component.css'],
})
export class VeiculoElementoComponent implements OnInit {
  attPneuForm: MatDialogRef<CadastroForm>
  dstPneuForm: MatDialogRef<DstPneuFormComponent>

  placa: string = "";
  listaPneus: Pneu[] = [];
  eventos: [string, string, number];
  veiculo: Veiculo = new Veiculo();

  constructor(private veiculoService: VeiculoElementoService, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.placa = params['placa'];
    });

    this.veiculoService.getVeiculo(this.placa).subscribe(
      veiculo => {
        if(veiculo.placa == this.placa){
          this.veiculo = veiculo
          
        }
        else
          console.log("Veiculo nao encontrado");
      }
    )

    this.veiculoService.getPneus().subscribe(
      listaPneu => {
        this.listaPneus = listaPneu
      }
    )

    this.eventos = this.veiculo.eventos[0];
  }

  deletarVeiculo() {
    this.veiculoService.deletarVeiculo(this.veiculo.placa).subscribe(
      veiculo => {
        console.log(veiculo);
        if(veiculo.placa == this.veiculo.placa)
          alert("Veiculo deletado com sucesso");
        else
          alert("Veiculo nao foi deletado");
      }
    )
  }

  atribuirPneu(idPneu: string) {
    this.veiculoService.atribuirPneu(this.veiculo.placa, idPneu).subscribe(
      veiculo => {
        console.log(veiculo);
        if(veiculo.placa == this.veiculo.placa)
          console.log("Pneu atribuidos com sucesso");
        else
          console.log("Nao foi possivel atribuir o pneu");
      }
    )
  }

  openAttDialog() {
    this.attPneuForm = this.dialog.open(CadastroForm);

    this.attPneuForm.afterClosed().subscribe(
      result => {
        var id = result.pneu_id;
        console.log(id, typeof id);
        if(result != null)
          this.veiculoService.atribuirPneu(this.veiculo.placa, id).subscribe(
            veiculo => {
              if(veiculo.placa == this.veiculo.placa)
                console.log("Pneu atribuido com sucesso");
              else
                console.log("Nao atribuiu o pneu");
            }
          )
      }
    )
  }

  openDstDialog() {
    this.dstPneuForm = this.dialog.open(DstPneuFormComponent);

    this.dstPneuForm.afterClosed().subscribe(
      result => {
        var id = result.pneu_id;
        console.log(id, typeof id)
        if(result != null)
          this.veiculoService.desatribuirPneu(this.veiculo.placa, id).subscribe(
            veiculo => {
              if(veiculo.placa == this.veiculo.placa)
                console.log("Pneu desatribuido com sucesso");
              else
                console.log("Nao desatribuiu o pneu");
            }
          )
      }
    )
  }

}
