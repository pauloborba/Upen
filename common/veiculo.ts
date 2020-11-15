import { Pneu } from './pneu';

export class Veiculo {
    marca: string;
    ano: number;
    placa: string;
    modelo: string;
    funcao: string;
    pneus: Pneu[];
    eventos: [string, string, number][]; //[data, mensagem, preço]

    constructor(){
        this.clean();
    }

    clean(): void {
        this.marca = "";
        this.ano = 0;
        this.placa = "";
        this.modelo = "Gol";
        this.funcao = "Revisao";
        this.eventos = [
            [
                "15/11/2020",
                "Veiculo entrando para revisao",
                100
            ]
        ]
        this.pneus = [];
    }

    clone(vAux: Veiculo): Veiculo{
        let v = new Veiculo();
        v.marca = vAux.marca;
        v.ano = vAux.ano;
        v.placa = vAux.placa;
        v.modelo = vAux.modelo;
        v.funcao = vAux.funcao;
        v.pneus = vAux.pneus;
        v.eventos = vAux.eventos;

        return v;
    }
}
