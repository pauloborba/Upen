import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../../../../common/veiculo'
import { ListaVeiculoService } from '../../services/ListaVeiculoService/lista-veiculo.service'

@Component({
  selector: 'app-lista-veiculo',
  templateUrl: './lista-veiculo.component.html',
  styleUrls: ['./lista-veiculo.component.css']
})
export class ListaVeiculoComponent implements OnInit {

  veiculos: Veiculo[];
  veiculo: Veiculo = new Veiculo();
  anoAuxiliar: string  =''; 
  popupCadastro: boolean;
  placaDuplicada: boolean;
  botaoCadastrarPressionado: boolean;
  searchInput: string;
  year = new Date();
  constructor( private listaVeiculoService: ListaVeiculoService ) { }
  

  ngOnInit(): void {
    this.popupCadastro = false;
    this.resetBotaoCadastrar();
    this.anoAuxiliar = "";
    this.searchInput = "";
    this.listarVeiculos();
  }

  listarVeiculos(): void{
      this.listaVeiculoService.getVeiculos().subscribe(
        as => {this.veiculos = as;},
        msg => {alert(msg.message);}
      );
  }

  resetBotaoCadastrar(): void{
    this.botaoCadastrarPressionado = false;
  }

  setBotaoCadastrar(): void{
    this.botaoCadastrarPressionado = true;
  }

  criar():void{

    this.setBotaoCadastrar()

    if(!this.checkAllFilled()){
      return;
    }

    if(this.isAnoNotValid()) 
      return;

    this.veiculo.ano = Number(this.anoAuxiliar);
    var v: Veiculo = this.veiculo.clone(this.veiculo);

    this.listaVeiculoService.cadastrarVeiculo(v).subscribe(
      ar => {

        if(ar){
          this.veiculos.push(v);
          this.anoAuxiliar = "";
          this.veiculo = new Veiculo();
          this.resetBotaoCadastrar();
          this.placaDuplicada = false;
        }else{
          this.placaDuplicada = true;
        }
      },
      msg => { alert(msg.message);}
    );
  }

  resetPlacaDuplicada(){
    this.placaDuplicada = false;
  }
  checkAllFilled(): boolean{
    return (!this.checkNotFilled(this.veiculo.placa) && !this.checkNotFilled(this.veiculo.modelo) &&
      !this.checkNotFilled(this.veiculo.marca) && !this.checkNotFilledAno()
      && !this.checkNotFilled(this.veiculo.funcao));
  }

  checkNotFilled( s: string): boolean{
    return (s.trim() == "")
  }
  checkNotFilledAno(): boolean{
    let aux = this.anoAuxiliar;
    if(this.anoAuxiliar == null){
      aux = "";
    }

    return (aux.length == 0);
  }

  removerVeiculo(placa: string): void{
    this.listaVeiculoService.deletarVeiculo(placa).subscribe(
      ar => {
        if(ar != -1){ // retornado o index do veiculo a ser removido
          if(ar >= this.veiculos.length){
            this.removerPorPlaca(placa);
          }else if(this.veiculos[ar].placa == placa){
            this.veiculos.splice(ar,1);
          }else{ 
            this.removerPorPlaca(placa);
          }
        }
      },
      msg => {
        alert("Não foi possível remover o veículo")
        this.refresh();
      }
    )
  }

  removerPorPlaca(placa: string): void{ // forma menos eficiente, entretanto assegura corretude
    let index = this.veiculos.findIndex( v =>  v.placa == placa);
    if(index != -1) this.veiculos.splice(index, 1);
  }

  abrirPopup(): void{
    this.popupCadastro = true;
  }
  fecharPopup(): void{
    this.popupCadastro = false;
    this.resetBotaoCadastrar();
  }

  isAnoNotValid() :boolean{
    if(!isNaN(Number(this.anoAuxiliar))){
      return !(Number(this.anoAuxiliar) >= 0 && Number(this.anoAuxiliar) <= this.year.getFullYear());
    }else{
      return true;
    }
  }

  displayData(data:string): string {
    if(data.length >= 13){
      data = data.slice(0, 13);
      data += "...";
    }
    return data;
  }

  checkFirst(i: number): boolean{
    return (i == 0);
  }

  refresh(): void{
    this.listarVeiculos();
  }

  empty(): boolean{
    return (this.veiculos.length == 0)
  }

  match(s: Veiculo): boolean{
    let str = this.searchInput.toLowerCase();
    for(let x in s){
      if(s[x].toString().toLowerCase().includes(str)){
        return true;
      }
    }
    return false;
  }


  generateMatchingList(): Veiculo[]{
    return this.veiculos.filter( elem => this.match(elem) );
  }

  pickOne(): Veiculo[]{
    if(this.searchInput.trim() == "")
      return this.veiculos;
    return this.generateMatchingList();
  }

}