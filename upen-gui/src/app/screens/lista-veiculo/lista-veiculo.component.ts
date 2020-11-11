import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../../../../common/veiculo'
import { ListaVeiculoService } from '../../services/ListaVeiculoService/lista-veiculo.service'

@Component({
  selector: 'app-lista-veiculo',
  templateUrl: './lista-veiculo.component.html',
  styleUrls: ['./lista-veiculo.component.css']
})
export class ListaVeiculoComponent implements OnInit {

  //veiculos: Veiculo[];
  veiculos;
  veiculo: Veiculo = new Veiculo();
  anoAuxiliar: string  =''; 
  popupCadastro: boolean;
  placaDuplicada: boolean;
  botaoCadastrarPressionado: boolean;
  
  year = new Date();
  constructor( private listaVeiculoService: ListaVeiculoService ) { }
  

  ngOnInit(): void {
    this.popupCadastro = false;
    //this.botaoCadastrarPressionado = false;
    this.resetBotaoCadastrar();
    this.anoAuxiliar = "";
    this.listaVeiculoService.getVeiculos().subscribe(
      as => {this.veiculos = as;},
      msg => {alert(msg.message);}
    );
    console.log(this.veiculos.length)
  }

  resetBotaoCadastrar(): void{
    this.botaoCadastrarPressionado = false;
  }

  setBotaoCadastrar(): void{
    this.botaoCadastrarPressionado = true;
  }

  criar():void{
    //this.botaoCadastrarPressionado = true;

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
          //this.botaoCadastrarPressionado = false;
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

}