// biblioteca importada
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as Chart from 'chart.js';

// arquivos util
import { HistoricoService } from 'src/app/services/HistoricoService/historico.service'
import { dataPorcentPneu, dataPorcentVeiculo } from 'src/app/util/funcoes/dashboard-chart';
import { getBrand } from 'src/app/util/funcoes/listFunction';
import { Historico } from '../../../../../common/historico'
import { Pneu } from '../../../../../common/pneu'
import { Veiculo } from '../../../../../common/veiculo'

@Component({
  selector: 'app-dash-board-detail',
  templateUrl: './dash-board-detail.component.html',
  styleUrls: ['./dash-board-detail.component.scss']
})
export class DashBoardDetailComponent implements OnInit {

  constructor(private historicoService : HistoricoService, public router: Router,) { }
  list : Veiculo[] | Pneu[] = []
  hist : Historico[] = []
  data: any = {}
  type : String = null

  async ngOnInit(): Promise<void> {
    await this.historicoService.getHistoricos().toPromise().then(
      as => {
        this.hist = as
        this.hist = this.hist.sort((a,b) => a >= b ? -1 : 0)
      },
      msg => {
        alert(msg)
      }
    )
    if (this.router.url == '/dashboard/veiculo') {
      await this.historicoService.getVeiculos().toPromise().then(
        as => {
          this.list = as
          this.createGraphVeiculos(this.list)
          this.type = "Veiculos"
          this.hist = this.hist.filter(el => el["qualElemento"] == "Veiculo")
        },
        msg => {
          alert(msg)
        }
      )
      return;
    }
    await this.historicoService.getPneus().toPromise().then(
      as => {
        this.list = as
        this.createGraphPneus(this.list)
        this.type = "Pneus"
        this.hist = this.hist.filter(el => el["qualElemento"] == "Pneu")
      },
      msg => {
        alert(msg)
      }
    )
  }
  createGraphPneus(list: Pneu[]) {
    let marcas = getBrand(list)
    this.data = marcas

    dataPorcentPneu.data.labels = marcas.labels
    dataPorcentPneu.data.datasets[0].data = marcas.dataset
    dataPorcentPneu.data.datasets[0].backgroundColor = marcas.backgroundColor
    new Chart ("chart", dataPorcentPneu); // cria o grafico associado pelo id
  }

  createGraphVeiculos(list: Veiculo[]) : void {
    let marcas = getBrand(list)
    this.data = marcas

    dataPorcentVeiculo.data.labels = marcas.labels
    dataPorcentVeiculo.data.datasets[0].data = marcas.dataset
    dataPorcentVeiculo.data.datasets[0].backgroundColor = marcas.backgroundColor
    new Chart ("chart", dataPorcentVeiculo);
  }



}
