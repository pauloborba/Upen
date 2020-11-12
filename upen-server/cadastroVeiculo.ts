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
          return this.veiculos.length > 0;
     }

     removerVeiculo(placa: string): number{
          let index = this.veiculos.findIndex( v => v.placa == placa);
          if(index != -1)
               this.veiculos.splice(index, 1);
          return index;
     }

     retornarVeiculo(placa: string): any {
          throw 'not implemented yet'
     }

     atualizarveiculo(veiculo: Veiculo): Veiculo {
          throw 'not implemented yet'
     }

}