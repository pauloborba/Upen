import { Veiculo } from '../../../common/veiculo';
import { CadastroVeiculo } from '../../cadastroVeiculo';

export class CadastroVeiculoMock extends CadastroVeiculo {

    veiculos: Veiculo[] = [];

    constructor() {
        super()
        for (let i = 0; i < 2; i++) {
            let marca = ""
            let evt: [string,string,number][] = []
            if (i % 2 == 0) marca = "Ferrari", evt.push(["","",20])
            else marca = "Volwsvagem" 
            let newVeiculo = <Veiculo> {
                "marca": marca,
                "ano": 2020,
                "placa": i+"",
                "modelo": 2020+marca,
                "funcao": "revisao",
                "pneus": [],
                "eventos": evt,
            }
            this.veiculos.push(newVeiculo)
        }
    }

    listarVeiculos(): Veiculo[] {
       return this.veiculos
   }

}