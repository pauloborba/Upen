// biblioteca importada
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { saveAs } from 'file-saver';
import * as Chart from 'chart.js';

// arquivos util
import { HistoricoService } from 'src/app/services/HistoricoService/historico.service'
import { Historico } from '../../../../../common/historico'
import { Pneu } from '../../../../../common/pneu'
import { Veiculo } from '../../../../../common/veiculo'
import { dataRegister, dataPorcentPneu, dataPorcentVeiculo } from '../../util/funcoes/dashboard-chart';
import { createDataCsv, getBrand, getTimeEvents, getTimesHistorico } from '../../util/funcoes/listFunction'


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {

  listPneu : Pneu[] = []
  listVeiculo: Veiculo[] = []
  listHistorico: Historico[] = []

  problemaPneu: Number = 0;
  problemaVeic: Number = 0;

  constructor (private historicoService : HistoricoService, public router: Router,
    ) {}


  async ngOnInit()  {
    await this.historicoService.getPneus().toPromise().then(
      as => {
        this.listPneu = as;
        this.createGraphPneus(this.listPneu)
      },
      msg => {alert(msg.message)}
    );

    await this.historicoService.getVeiculos().toPromise().then(
      bs => {
        this.listVeiculo = bs;
        this.createGraphVeiculos(this.listVeiculo)
      },
      msg => {alert(msg.message)}
    )

    await this.historicoService.getHistoricos().toPromise().then(
      as => {
        this.listHistorico = as;
        this.createGraphHistorico(this.listHistorico)
      }
    )
  }


  btnClick(tipo): void {
    if (tipo == 'pneu') {
      this.router.navigateByUrl('/dashboard/pneu');
    } else {
      this.router.navigateByUrl('/dashboard/veiculo');
    }
  }

  createGraphHistorico (historico: Historico[]): void {
    let data = getTimesHistorico(historico)

    dataRegister.data.datasets[0].data.push(data[0],data[1])
    dataRegister.data.datasets[1].data.push(data[2],data[3])
    new Chart("registerChart", dataRegister);
  }

  createGraphPneus(pneus: Pneu[]): void {
    this.problemaPneu = getTimeEvents(pneus) // responsavel pela aba de display problema

    let marcas = getBrand(pneus)
    console.log(marcas)
    dataPorcentPneu.data.labels = marcas.labels
    dataPorcentPneu.data.datasets[0].data = marcas.dataset
    dataPorcentPneu.data.datasets[0].backgroundColor = marcas.backgroundColor
    new Chart ("porcentPneuChart", dataPorcentPneu); // cria o grafico associado pelo id
  }

  createGraphVeiculos(veiculos: Veiculo[]) : void {
    this.problemaVeic = getTimeEvents(veiculos)

    let marcas = getBrand(veiculos)
    dataPorcentVeiculo.data.labels = marcas.labels
    dataPorcentVeiculo.data.datasets[0].data = marcas.dataset
    dataPorcentVeiculo.data.datasets[0].backgroundColor = marcas.backgroundColor
    new Chart ("porcentVeiChart", dataPorcentVeiculo);
  }

  downloadPlanilha() : void {
    let marcasPneu = getBrand(this.listPneu)
    let dataPneu = createDataCsv(marcasPneu,this.listPneu)

    let marcasVeic = getBrand(this.listVeiculo)
    let dataVeic = createDataCsv(marcasVeic,this.listVeiculo)

    const header = ["Marca","Cadastrados", "Problemas"]

    //planilha veiculos
    let csv = dataVeic.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "planilha_veiculos.csv");

    //planilha pneus
    csv = dataPneu.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','));
    csv.unshift(header.join(','));
    csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "planilha_pneus.csv");
  }

}
