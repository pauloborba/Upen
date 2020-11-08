import { Veiculo } from '../common/veiculo';

export class CadastroVeiculo {
    
    veiculos: Veiculo[] = [];
   
    cadastrarVeiculo(veiculoCadastro: Veiculo): any {
          let veiculo: Veiculo = this.veiculos.find(veil => veil.placa == veiculoCadastro.placa);
          if(!veiculo) {
               this.veiculos.push(veiculoCadastro);
               return "Veiculo cadastrado";
          }

          return null;
    }

    veiculoNaoCadastrado(placa: string): boolean {
         throw 'not implemented yet';
    }

    listarVeiculos(): Veiculo[] {
         throw 'not implemented yet';
    }

    empty(): boolean{
         throw 'not implemented yet'
    }

    removerVeiculo(placa: string): any{
          let veiculo: Veiculo = this.veiculos.find(vel => vel.placa = placa);
          let index: number = this.veiculos.findIndex(vel => vel.placa = placa);
          if(!veiculo) 
               return null;

          this.veiculos.splice(index, 1);
          return veiculo;
    }

    retornarVeiculo(placa: string): any {
        throw 'not implemented yet'
    }

    atualizarVeiculo(veiculo: Veiculo): Veiculo {
        throw 'not implemented yet'
    }

}