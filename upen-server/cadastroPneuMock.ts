import { PneuMock } from '../common/pneuMock';

export class CadastroDePneuMock  {
    pneus: PneuMock[] = [];

    constructor() {
        for(let i = 1; i <= 10; i++){
            var pneu: PneuMock = new PneuMock();
            pneu.id = i.toString();
            this.pneus.push(pneu);
        }
    }

    retornarPneu(id: string): PneuMock {
        var pneu: PneuMock = this.pneus.find(elem => elem.id == id);

        return pneu;
    }
}