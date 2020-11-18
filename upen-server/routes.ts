const express = require('express');
const routes = express.Router();
import { Request, Response } from "express";

import { Pneu } from '../common/pneu';
import { Veiculo } from '../common/veiculo';
import { Historico } from '../common/historico';
import { Funcionario } from '../common/funcionario';
import { CadastroVeiculo } from './cadastroVeiculo';
import { CadastroHistorico } from './cadastroHistorico'
import { CadastroDePneu } from './cadastroPneu';
import { CadastroFuncionario } from './cadastroFuncionario';
import { CadastroDePneuMock } from './cadastroPneuMock';

const cdHistorico: CadastroHistorico = new CadastroHistorico()
const cdFuncionario: CadastroFuncionario = new CadastroFuncionario();
const cdPneu: CadastroDePneu = new CadastroDePneu();
const cdVeiculo: CadastroVeiculo = new CadastroVeiculo();
const cdPneuMock: CadastroDePneuMock = new CadastroDePneuMock();

// ROTAS DE LISTA PNEU / PNEU ELEMENTO

routes.get('/pneus/', function (req: Request, res: Response) {
  res.send(JSON.stringify(cdPneu.getPneu(req.params.id)));
})

routes.get('/pneus/:id', function (req: Request, res: Response) {
  res.send(JSON.stringify(cdPneu.getPneu(req.params.id)));
})

routes.post('/pneu', function (req: Request, res: Response) {
  var confirmar: Pneu = <Pneu>req.body;
  var pneu = cdPneu.cadastrar(confirmar);
  if (pneu == "success") {
    var historico = cdHistorico.cadastrar(confirmar.id, "Cadastrou", "Pneu");
    if (historico) { res.send({ "success": "cadastro de pneu com sucesso" }); }
  } else {
    res.status(404).send({ "falha": "cadastro de pneu falhou" });
  }
})

routes.put('/pneu', function (req: Request, res: Response) {
  var pneu: Pneu = <Pneu>req.body;
  pneu = cdPneu.atualizar(pneu);
  if (pneu) {
    res.send({ "success": "O pneu foi atualizado com sucesso" });
  } else {
    res.status(404).send({ "falha": "Atualizacão de pneu falhou" });
  }
})

routes.delete('/pneu/:id', function (req: Request, res: Response) {
  var id = req.params.id
  var aux = cdPneu.remover(id);
  if (aux == "success") {
    var historico = cdHistorico.cadastrar(id, "Removeu", "Pneu");
    if (historico) { res.send({ "success": "O pneu foi removido com sucesso" }) }
  } else {
    res.status(404).send({ "falha": "remoção de pneu falhou" });
  }
})

routes.get('/pneu/cadastro', (req: Request, res: Response) => {
  var { id } = req.body;

  var bool = cdPneu.idNaoCadastrado(id);
  if (!bool) res.send({ "success": "pneu cadastrado" });
  else res.status(404).send({ "failure": "pneu nao cadastrado" });
})

// ROTAS DE LISTA VEICULO

routes.get('/veiculos', (req: Request, res: Response) => {
  res.send(JSON.stringify(cdVeiculo.listarVeiculos()));
});

routes.post('/veiculos', (req: Request, res: Response) => {
  var vel: Veiculo = <Veiculo> req.body;
  var veiculo = cdVeiculo.cadastrarVeiculo(vel);
  if(veiculo) {
      //var historico = cdHistorico.cadastrar(vel.placa,"Cadastrou","Veiculo"); 
      var historico = true;
      if (historico) {res.send(veiculo);}
      else { res.status(404).send({"falha": "Cadastro de veiculo falhou"});}
  }
  else 
      res.status(404).send({"falha": "Cadastro de veiculo falhou"});
})

routes.delete('/veiculos/:id', function (req: Request, res: Response) {
  var id = req.params.id;
  var index = cdVeiculo.removerVeiculo(id);
  if (index != -1) {
    var historico = cdHistorico.cadastrar(id, "Removeu", "Veiculo");
    if (historico) { res.send({ "success": "o veículo foi removido com sucesso", "index": index }) }
    else { res.status(404).send({ "falha": "Remoção de veiculo falhou" }); }
  } else {
    res.status(404).send({ "falha": "Remoção de veiculo falhou" });
  }
})

// ROTAS HISTORICO

routes.get('/historicos', (req: Request, res: Response) => {
  res.send(JSON.stringify(cdHistorico.getHistoricos()));
});

// ROTAS FUNCIONARIO

routes.get('/funcionarios', (req: Request, res: Response) => {
  res.send(cdFuncionario.getFuncionarios());
});

routes.post('/funcionarios', (req: Request, res: Response) => {
  var funcionario: Funcionario = <Funcionario>req.body;
  funcionario = cdFuncionario.cadastrarFuncionario(funcionario);
  if (funcionario) {
    res.send({ "success": "o funcionario foi devidamente cadastrado." });
  } else {
    res.status(404).send({ "failure": "o funcionario nao pode ser cadastrado" });
  }

});

routes.delete('/funcionarios/:id', (req: Request, res: Response) => {
  var id = req.params.id;
  var aux = cdFuncionario.deletarFuncionario(id);
  if (aux) {
    res.send({ "success": "o funcionario foi devidamente removido." })
  } else {
    res.status(404).send({ "failure": "o funcionario nao pode ser cadastrado" });
  }

});

// ROTAS VEICULO ELEMENTO
routes.get('/veiculo/:placa', (req: Request, res: Response) => {
  var placa: string = String(req.params.placa);

  var veiculo: Veiculo = cdVeiculo.retornarVeiculo(placa);
  if (!veiculo) res.status(404).send({ "erro": "Veiculo nao cadastrado!" });

  res.send(veiculo);
});

routes.put('/veiculo/:placa/:id', (req: Request, res: Response) => {
  var placa: string = String(req.params.placa);
  var id: string = String(req.params.id);

  var veiculo: Veiculo = cdVeiculo.atribuirPneu(placa, id);
  if (!veiculo) res.status(404).send({ "erro": "Nao foi possivel atribuir o pneu!" });

  res.send(veiculo);
});

routes.put('/veiculo/pneu/:placa/:id', (req: Request, res: Response) => {
  var placa: string = String(req.params.placa);
  var id: string = String(req.params.id);

  var veiculo: Veiculo = cdVeiculo.desatribuirPneu(placa, id);
  if (!veiculo) res.status(404).send({ "erro": "Nao foi possivel desatribuir o pneu!" });

  res.send(veiculo);
});

routes.delete('/veiculo/:placa', (req: Request, res: Response) => {
  var placa: string = String(req.params.placa);

  var veiculo: Veiculo = cdVeiculo.removerVeiculo(placa);
  if (!veiculo) res.status(400).json({ "erro": "Veiculo nao cadastrado!" });

  res.send(veiculo);
});

// ROTAS MOCK

routes.get('/pneusMock', (req: Request, res: Response) => {
  res.send(JSON.stringify(cdPneuMock.getPneus()));
});

routes.post('/veiculosMock', (req: Request, res: Response) => {
  cdVeiculo.cadastrarVeiculoMock();

  res.send({ "alert": "Veiculos cadastrados - mock" })
})

export { routes };