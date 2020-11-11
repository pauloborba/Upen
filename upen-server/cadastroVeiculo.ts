import { Pneu } from '../common/pneu';
import { Veiculo } from '../common/veiculo';
import { CadastroDePneuMock } from './cadastroPneuMock';

export class CadastroVeiculo {
     cdPneuMock: CadastroDePneuMock = new CadastroDePneuMock();

     veiculos: Veiculo[] = [];
     pneus: Pneu[] = this.cdPneuMock.getPneus();

     cadastrarVeiculo(veiculoCadastro: Veiculo): any {
          let veiculo: Veiculo = this.veiculos.find(veil => veil.placa == veiculoCadastro.placa);
          if (!veiculo) {
               this.veiculos.push(veiculoCadastro);
               return "Veiculo cadastrado";
          }

          return null;
     }

     cadastrarVeiculoMock() {
          for(let i = 0; i < 5; i++){
               let veiculo = new Veiculo();
               veiculo.placa = "PDY" + i.toString() + (i+1).toString() + (i+2).toString() + (i+3).toString();
               this.veiculos.push(veiculo);
          }
     }

     listarVeiculos(): Veiculo[] {
          return this.veiculos;
     }

     removerVeiculo(placa: string): any {
          let veiculo: Veiculo = this.veiculos.find(veil => veil.placa = placa);
          let index: number = this.veiculos.findIndex(veil => veil.placa = placa);
          if (!veiculo)
               return null;

          this.veiculos.splice(index, 1);
          return veiculo;
     }

     retornarVeiculo(placa: string): any {
          let veiculo: Veiculo = this.veiculos.find(veil => veil.placa == placa);
          return veiculo;
     }

     atualizarVeiculo(veiculo: Veiculo): Veiculo {
          var result: Veiculo = this.veiculos.find(veil => veil.placa == veiculo.placa);
          var auxresult = new Veiculo();

          if (result) {
               auxresult.clone(veiculo);
               this.removerVeiculo(result.placa);
               this.cadastrarVeiculo(auxresult);

               return auxresult;
          }

          return null;
     }

     atribuirPneu(placa: string, pneu_id: string): Veiculo {
          var veiculo: Veiculo = this.veiculos.find(veil => veil.placa == placa);
          var pneu: Pneu = this.pneus.find(pneu => pneu.id == pneu_id);

          if (veiculo && pneu) {
               if (veiculo.pneus.length < 4)
                    veiculo.pneus.push(pneu);

               return veiculo;
          }

          return null;
     }

     desatribuirPneu(placa: string, pneu_id: string): Veiculo {
          var veiculo: Veiculo = this.veiculos.find(veil => veil.placa == placa);
          var pneu: Pneu = this.pneus.find(pneu => pneu.id == pneu_id);

          if (veiculo && pneu) {
               let index = veiculo.pneus.findIndex(i => i.id == pneu.id);
               if (index != -1)
                    veiculo.pneus.splice(index, 1);

               return veiculo;
          }

          return null;
     }

}