import { Historico } from '../common/historico'

export class CadastroHistorico {

    historicos : Historico[] = [];

    constructor() {
        this.fakeCadastroHistorico()
    }

    fakeCadastroHistorico() {

        let his1 : Historico = new Historico()
        let his2 : Historico = new Historico()
        let his3 : Historico = new Historico()
        let his4 : Historico = new Historico()
        let his5 : Historico = new Historico()
        let his6 : Historico = new Historico()
        let his7 : Historico = new Historico()

        his1.copyFrom({
        "timeStamp": "1605184823000",
        "operacao": "Cadastrou",
        "qualElemento": "Pneu",
        "id": "1"
        })

        his2.copyFrom({
        "timeStamp": "1605192023000",
        "operacao": "Cadastrou",
        "qualElemento": "Pneu",
        "id": "2"
        })

        his3.copyFrom({
        "timeStamp": "1605192263000",
        "operacao": "Cadastrou",
        "qualElemento": "Veiculo",
        "id": "1"
        })

        his4.copyFrom({
        "timeStamp": "1605321863000",
        "operacao": "Cadastrou",
        "qualElemento": "Veiculo",
        "id": "2"
        })

        his5.copyFrom({
            "timeStamp": "1605354263000",
            "operacao": "Cadastrou",
            "qualElemento": "Veiculo",
            "id": "3"
        })

        his6.copyFrom({
        "timeStamp": "1605352992000",
        "operacao": "Removeu",
        "qualElemento": "Pneu",
        "id": "2"
        })

        his7.copyFrom({
        "timeStamp": "1605360792000",
        "operacao": "Removeu",
        "qualElemento": "Veiculo",
        "id": "3"
        })

        this.historicos.push(his1,his2,his3,his4,his5,his6,his7)
    }

    cadastrar(id: String, op: String, element: String): Historico{
        var hist = new Historico();
        var result = null;
        if(this.timeStampNaoCadastrado(hist.timeStamp)){
            hist.copyFrom({
              "operacao": op,
              "qualElemento": element,
              "id": id,
            })
            this.historicos.push(hist);
            return hist;
        }
        return result;
    }

    timeStampNaoCadastrado(timeStamp: Number): boolean{
        return !this.historicos.find(a => a.timeStamp == timeStamp);
    }

    getHistoricos(): Historico[]{
        return this.historicos;

    }

}