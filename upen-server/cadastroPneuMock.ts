import { Pneu } from '../common/pneu'
import { CadastroDePneu } from './cadastroPneu';

export class CadastroDePneuMock extends CadastroDePneu {
    pneus : Pneu[] = [];

    constructor () {
        super();
        for (let i = 0; i < 1; i++) {
            let marca = ""
            if (i % 2 == 0) marca = "ThunderBolt"
            else marca = "FastFurios" 
            let newPneu = <Pneu> {
                "id": i+"",
                "marca": marca,
                "data": "19/02/2020",
                "aro": 20,
                "largura": 10,
                "capacidade": 20,
                "altura": 10,
                "kmh": 20,
                "treadwear": 10,
                "atribuicao": ["","","",false],
                "eventos": [["","",""],["","",""],["","",""]]
            }
            this.pneus.push(newPneu)
        }
    }

    getPneus(): Pneu[]{
         return this.pneus
    }
}