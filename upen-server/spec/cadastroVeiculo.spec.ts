import { CadastroVeiculo } from '../cadastroVeiculo';
import { Veiculo } from '../../common/veiculo';

describe("O cadastro de veiculos", () => {
  var cadastro: CadastroVeiculo;

  beforeEach(() => cadastro = new CadastroVeiculo())

  it("é inicialmente vazio", () => {
    expect(cadastro.listarVeiculos().length).toBe(0);
  })

  it("cadastra veiculos corretamente", () => {
    var veiculo: Veiculo = new Veiculo();
    veiculo.placa = "RJX6236";
    veiculo.modelo = "Corcel";
    veiculo.marca = "Ford";
    veiculo.ano = 1973;
    veiculo.funcao = "Revisão"

    cadastro.cadastrarVeiculo(veiculo);

    expect(cadastro.listarVeiculos().length).toBe(1);
    veiculo = cadastro.listarVeiculos()[0];
    expect(veiculo.placa).toBe("RJX6236");
    expect(veiculo.modelo).toBe("Corcel");
    expect(veiculo.marca).toBe("Ford");
    expect(veiculo.ano).toBe(1973);
    expect(veiculo.funcao).toBe("Revisão");

  })

  it("não aceita veiculos com placa duplicada", () => {
    var veiculo1: Veiculo = new Veiculo();
    veiculo1.placa = "RJX6236";
    veiculo1.modelo = "Corcel";
    veiculo1.marca = "Ford";
    veiculo1.ano = 1973;
    veiculo1.funcao = "Revisão"

    cadastro.cadastrarVeiculo(veiculo1);

    var veiculo2: Veiculo = new Veiculo();
    veiculo2.placa = "RJX6236";
    veiculo2.modelo = "Uno";
    veiculo2.marca = "Fiat";
    veiculo2.ano = 1973;
    veiculo2.funcao = "Tunagem"

    cadastro.cadastrarVeiculo(veiculo2);

    expect(cadastro.listarVeiculos().length).toBe(1);
  })


  it("move veiculos da lista de veiculos para a lixeira corretamente", () =>{
    var veiculo: Veiculo = new Veiculo();
    veiculo.placa = "RJX6236";
    veiculo.modelo = "Corcel";
    veiculo.marca = "Ford";
    veiculo.ano = 1973;
    veiculo.funcao = "Revisão"

    cadastro.cadastrarVeiculo(veiculo);

    cadastro.removerVeiculo(veiculo.placa);

    expect(cadastro.listarVeiculos().length).toBe(0);
    expect(cadastro.listarLixeira().length).toBe(1);
  })

  it("restaura veiculos da lixeira para a lista de veiculos corretamente", () =>{
    var veiculo: Veiculo = new Veiculo();
    veiculo.placa = "RJX6236";
    veiculo.modelo = "Corcel";
    veiculo.marca = "Ford";
    veiculo.ano = 1973;
    veiculo.funcao = "Revisão"

    cadastro.cadastrarVeiculo(veiculo);

    cadastro.removerVeiculo(veiculo.placa);

    expect(cadastro.listarVeiculos().length).toBe(0);
    expect(cadastro.listarLixeira().length).toBe(1);

    cadastro.restaurarVeiculo(veiculo);

    expect(cadastro.listarVeiculos().length).toBe(1);
    expect(cadastro.listarLixeira().length).toBe(0);
  })

  it("remove veiculos da lixeira permanentemente", () =>{
    var veiculo: Veiculo = new Veiculo();
    veiculo.placa = "RJX6236";
    veiculo.modelo = "Corcel";
    veiculo.marca = "Ford";
    veiculo.ano = 1973;
    veiculo.funcao = "Revisão"

    cadastro.cadastrarVeiculo(veiculo);

    cadastro.removerVeiculo(veiculo.placa);

    expect(cadastro.listarVeiculos().length).toBe(0);
    expect(cadastro.listarLixeira().length).toBe(1);

    cadastro.removerPermanente(veiculo.placa);

    expect(cadastro.listarVeiculos().length).toBe(0);
    expect(cadastro.listarLixeira().length).toBe(0);
  })


  it("nao move veiculos da lista de veiculos para a lixeira com placa duplicada", () =>{
    var veiculo: Veiculo = new Veiculo();
    veiculo.placa = "RJX6236";
    veiculo.modelo = "Corcel";
    veiculo.marca = "Ford";
    veiculo.ano = 1973;
    veiculo.funcao = "Revisão"

    cadastro.cadastrarVeiculo(veiculo);

    cadastro.removerVeiculo(veiculo.placa);

    expect(cadastro.listarVeiculos().length).toBe(0);
    expect(cadastro.listarLixeira().length).toBe(1);

    var veiculo2: Veiculo = new Veiculo();
    veiculo2.placa = "RJX6236";
    veiculo2.modelo = "Uno";
    veiculo2.marca = "Fiat";
    veiculo2.ano = 1973;
    veiculo2.funcao = "Tunagem"

    cadastro.cadastrarVeiculo(veiculo2);
    cadastro.removerVeiculo(veiculo2.placa);

    expect(cadastro.listarVeiculos().length).toBe(0);
    expect(cadastro.listarLixeira().length).toBe(1);

  })



})