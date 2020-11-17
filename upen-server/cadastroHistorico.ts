import { Historico } from '../common/historico'

export class CadastroHistorico {

    historicos : Historico[] = [];

    cadastrar(id: String, op: String, element: String): Historico{
         //throw 'not implemented yet'
         let h : Historico = new Historico();
         h.id = id;
         h.operacao = op;
         h.qualElemento = element;
         h.timeStamp = (Date.now()/1000); //.getTime() - 0;
         
         this.historicos.push(h);

         return h;         
    }

    timeStampNaoCadastrado(timeStamp: Number): boolean{
         throw 'not implemented yet'
    }

    getHistoricos(): Historico[]{
        throw 'not implemented yet'
    }

}