import { Pneu } from '../common/pneu';
import { Veiculo } from '../common/veiculo';
import { CadastroDePneuMock } from './cadastroPneuMock';

export class CadastroVeiculo {
     cdPneuMock: CadastroDePneuMock = new CadastroDePneuMock();

     veiculos: Veiculo[] = [];
     pneus: Pneu[] = this.cdPneuMock.getPneus();

     constructor() {
          this.cadastrarVeiculoMock();
     }

     cadastrarVeiculo(veiculo: Veiculo): any {
          if(this.veiculoNaoCadastrado(veiculo.placa, this.veiculos)){
               this.veiculos.push(veiculo);
               return veiculo;
          }
          return null;
     }

     veiculoNaoCadastrado(placa: string, listaVeiculos: Veiculo []): boolean {
          return !listaVeiculos.find(elem => elem.placa == placa);
     }

     isUndefined(x:any){
          return (x == undefined);
     }

     ehVeiculo(v:any){
          
          if(this.isUndefined(v.ano) || this.isUndefined(v.marca) || this.isUndefined(v.modelo) ||
           this.isUndefined(v.funcao) || this.isUndefined(v.placa) || this.isUndefined(v.pneus) || this.isUndefined(v.eventos)){
               return false;
          }

          let veiculoAuxiliar:Veiculo = new Veiculo();

          for(let x in veiculoAuxiliar){
               if(typeof(veiculoAuxiliar[x]) != typeof(v[x]) ){
                    return false;
               }
          }

          return true;
     }

     cadastrarVeiculoMock(): any {
          for(let i = 0; i < 5; i++){
               let veiculo = new Veiculo();
               veiculo.marca = "Renault";
               veiculo.ano = 201 + i;
               veiculo.placa = "PDY" + i.toString() + (i+1).toString() + (i+2).toString() + (i+3).toString();
               veiculo.modelo = "Kwid";
               veiculo.funcao = "Revisao";
               veiculo.eventos = [["10/11/2020", "Veiculo entrando pra revisao", 50]];
               veiculo.pneus = [this.pneus[1], this.pneus[4], this.pneus[5], this.pneus[8]]
               this.veiculos.push(veiculo);
          }
     }

     listarVeiculos(): Veiculo[] {
          return this.veiculos;
     }

     removerVeiculo(placa: string): any {
          let veiculo: Veiculo = this.veiculos.find(veil => veil.placa == placa);
          let index: number = this.veiculos.findIndex(veil => veil.placa == placa);
          if (!veiculo)
               return null;

          this.veiculos.splice(index, 1);
          return veiculo;
     }

     retornarVeiculo(placa: string): any {
          this.cadastrarVeiculoMock();
          let veiculo: Veiculo = this.veiculos.find(veil => veil.placa == placa);
          return veiculo;
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