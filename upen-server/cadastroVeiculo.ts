import { PneuMock } from '../common/pneuMock';
import { Veiculo } from '../common/veiculo';
import { CadastroDePneuMock } from './cadastroPneuMock';

export class CadastroVeiculo {
    
    veiculos: Veiculo[] = [];
    cdPneuMock: CadastroDePneuMock = new CadastroDePneuMock();
   
    cadastrarVeiculo(veiculoCadastro: Veiculo): any {
          let veiculo: Veiculo = this.veiculos.find(veil => veil.placa == veiculoCadastro.placa);
          if(!veiculo) {
               this.veiculos.push(veiculoCadastro);
               return "Veiculo cadastrado";
          }
     
          return null;
    }

    listarVeiculos(): Veiculo[] {
         return this.veiculos;
    }

    removerVeiculo(placa: string): any{
          let veiculo: Veiculo = this.veiculos.find(veil => veil.placa = placa);
          let index: number = this.veiculos.findIndex(veil => veil.placa = placa);
          if(!veiculo) 
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

          if(result){
               auxresult.clone(veiculo);    
               this.removerVeiculo(result.placa);
               this.cadastrarVeiculo(auxresult);

               return auxresult;
          }
        
        return null;
    }

    atribuirPneu(placa: string, pneu_id: string): Veiculo {
          var veiculo: Veiculo = this.veiculos.find(veil => veil.placa == placa);     
          var pneu: PneuMock = this.cdPneuMock.retornarPneu(pneu_id);  
          
          if(veiculo && pneu){
               if(veiculo.pneus.length < 4) 
               veiculo.pneus.push(pneu);               
          
               return veiculo;
          }

          return null;
    }

    desatribuirPneu(placa: string, pneu_id: string): Veiculo {
         var veiculo: Veiculo = this.veiculos.find(veil => veil.placa == placa);
         var pneu: PneuMock = this.cdPneuMock.retornarPneu(pneu_id);

         if(veiculo && pneu){
               let index = veiculo.pneus.findIndex(i => i.id == pneu.id);
               if(index != -1)
                    veiculo.pneus.splice(index, 1);
               
               return veiculo;
         }

         return null;
    }

}