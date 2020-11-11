import { Veiculo } from '../common/veiculo';

export class CadastroVeiculo {
    
    veiculos: Veiculo[] = [];

     cadastrarVeiculo(veiculo: Veiculo): any {
          if(this.veiculoNaoCadastrado(veiculo.placa)){
               this.veiculos.push(veiculo);
               return veiculo;
          }
          return null;
     }

     veiculoNaoCadastrado(placa: string): boolean {
          return !this.veiculos.find(elem => elem.placa == placa);
     }

    listarVeiculos(): Veiculo[] {
          return this.veiculos;
    }

    empty(): boolean{
         throw 'not implemented yet'
    }

    removerVeiculo(placa: string): number{
         throw 'not implemented yet';
    }

    retornarVeiculo(placa: string): any {
        throw 'not implemented yet'
    }

    atualizarveiculo(veiculo: Veiculo): Veiculo {
        throw 'not implemented yet'
    }

}