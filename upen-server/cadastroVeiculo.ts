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
          if(!veiculo)
               return null;

          return veiculo;
    }

    atualizarVeiculo(veiculo: Veiculo): Veiculo {
        throw 'not implemented yet'
    }

}