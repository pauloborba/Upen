import { Veiculo } from '../common/veiculo';

export class CadastroVeiculo {
    
     veiculos: Veiculo[] = [];
     lixeiraVeiculos: Veiculo[] = [];

     cadastrarVeiculo(veiculo: Veiculo): any {
          if(this.ehVeiculo(veiculo) && this.veiculoNaoCadastrado(veiculo.placa, this.veiculos)){
               this.veiculos.push(veiculo);
               return veiculo;
          }
          return null;
     }

     veiculoNaoCadastrado(placa: string, listaVeiculos: Veiculo []): boolean {
          return !listaVeiculos.find(elem => elem.placa == placa);
     }

     listarVeiculos(): Veiculo[] {
          return this.veiculos;
     }

     listarLixeira(): Veiculo[] {
          return this.lixeiraVeiculos;
     }


     empty(): boolean{
          return this.veiculos.length == 0;
     }

     removerVeiculo(placa: string): number{
          let index = this.veiculos.findIndex( v => v.placa == placa);
          if(index != -1){
               this.moverParaLixeira(this.veiculos[index]);
               this.veiculos.splice(index, 1);
          }
          return index;
     }

     retornarVeiculo(placa: string): any {
          throw 'not implemented yet'
     }

     atualizarveiculo(veiculo: Veiculo): Veiculo {
          throw 'not implemented yet'
     }

     moverParaLixeira(veiculo: Veiculo): void{
          if(this.veiculoNaoCadastrado(veiculo.placa, this.lixeiraVeiculos)){
               this.lixeiraVeiculos.push(veiculo);
          }
     }

     removerPermanente(placa :string): number{
          let index = this.lixeiraVeiculos.findIndex( v => v.placa == placa);
          if(index != -1){
               this.lixeiraVeiculos.splice(index, 1);
          }
          return index;
     }

     restaurarVeiculo(veiculo: Veiculo): number{
          if(!this.veiculoNaoCadastrado(veiculo.placa, this.lixeiraVeiculos)){
               if(this.cadastrarVeiculo(veiculo)){
                    return this.removerPermanente(veiculo.placa);
               }else{
                    this.removerPermanente(veiculo.placa);
               }
          }
          return -1;
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
}