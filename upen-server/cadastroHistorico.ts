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
        if(id && op && element && this.checkIfOposite(id,op,element)){
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

    checkIfOposite(id: String, op: String, element: String) {
        let opSearch;
        if (op == "Removeu") opSearch = "Cadastrou";
        else opSearch = "Removeu";
        return this.searchOp(id,op,element,opSearch,false)
    }

    searchOp(id: String, op: String, element: String, opSearch: String, isDelete: boolean): boolean {
        for (let i = this.historicos.length-1; i >= 0; i--) {
            if (this.historicos[i].id == id && this.historicos[i].qualElemento == element) {
                if (opSearch == this.historicos[i].operacao) return true;
                else return false || isDelete
            }
        }
        return (op == "Removeu" ? false: true)
    }

    deleteHistorico(id:String, op:String, element: String, timeStamp: Number) {
        let opSearch;
        if (op == "Removeu") opSearch = "Cadastrou";
        else opSearch = "Removeu";
        let index = this.searchOp(id,op,element,opSearch,true)
        if (index) { // se não tem dependencias podemos remover
            this.historicos = this.historicos.filter(el => {
               return !(el.id == id && el.operacao == op && el.qualElemento == element && el.timeStamp == timeStamp)
            });
            return opSearch;
        }
        return null;
    }

    getHistoricos(): Historico[]{
        return this.historicos;
    }

}