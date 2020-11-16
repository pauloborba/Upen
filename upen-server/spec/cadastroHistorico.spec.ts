import { Historico } from "../../common/historico";
import {CadastroHistorico} from "../cadastroHistorico";

describe("The 'CadastroHistorico'", () =>{
    let cadastro : CadastroHistorico

    function registerHistoric(id: String, operacao: String, qualElemento: String) {
        cadastro.cadastrar(id, operacao, qualElemento);
    }

    function expectHistoric(n: number) {
        expect(cadastro.getHistoricos().length).toBe(n);
        var historic = cadastro.getHistoricos()
        return historic;
    }

    beforeEach(() => {
        cadastro = new CadastroHistorico()
        cadastro.historicos = []
    })

    it("is initially empty", () => {
        expect(cadastro.getHistoricos().length).toBe(0);
    })

    it("records histories correctly", () => {
        registerHistoric("01","Cadastrou","Pneu");
    
        var historic : Historico = expectHistoric(1)[0];
        expect(historic.id).toBe("01");
        expect(historic.operacao).toBe("Cadastrou");
        expect(historic.qualElemento).toBe("Pneu");
        
    })

    it("doesn't allow register a history with operation 'Removeu' from a specific element without have a register before", () => {
        
        registerHistoric("01","Removeu","Pneu");
        var list = expectHistoric(0)
        expect(list.length).toBe(0)
        
      })

      it("doesn't allow register duplicate history without do the oposite operation before", () => {
        registerHistoric("01","Cadastrou","Pneu");
        registerHistoric("01","Cadastrou","Pneu");
        
        var list = expectHistoric(1)

        registerHistoric("01","Removeu","Pneu");
        registerHistoric("01","Removeu","Pneu");

        list = expectHistoric(2)

        registerHistoric("01","Cadastrou","Pneu");

        list = expectHistoric(3)
        
        expect(list[0].id).toBe("01")
        expect(list[0].operacao).toBe("Cadastrou")
        expect(list[0].qualElemento).toBe("Pneu")
        expect(list[1].id).toBe("01")
        expect(list[1].operacao).toBe("Removeu")
        expect(list[1].qualElemento).toBe("Pneu")
        expect(list[2].id).toBe("01")
        expect(list[2].operacao).toBe("Cadastrou")
        expect(list[2].qualElemento).toBe("Pneu")
       
      })

      it ("deletes a register historic with no-dependecy", ()=> {
        
        registerHistoric("01","Cadastrou","Pneu");
        let historic = expectHistoric(1)[0]
        cadastro.deleteHistorico(historic.id,historic.operacao,historic.qualElemento,historic.timeStamp)
        expectHistoric(0)
      })
})