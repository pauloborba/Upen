import { Historico } from '../../../../../../common/historico';


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getTimeEvents(list: any): Number {
  let result = 0
  for (let i = 0; i < list.length; i++) {
    result += list[i].eventos.length
  }
  return result;
}

export function getBrand(list: any): any {
  let data = {
    "labels": [],
    "dataset": [],
    "backgroundColor": [],
  }
  for (let i = 0; i < list.length; i++) {
    const index = data.labels.findIndex((el) => el === list[i].marca);
    if (index > -1) {
      data.dataset[index] += 1
    } else {
      data.labels.push(list[i].marca)
      data.backgroundColor.push(getRandomColor())
      data.dataset.push(1)
    }
  }
  return data;
}

export function getTimesHistorico (historicos: Historico[]): any{
  let data = []

  data.push((historicos.filter(el => el.qualElemento == "Pneu" &&
  el.operacao == "Cadastrou")).length)
  data.push((historicos.filter(el => el.qualElemento == "Pneu" &&
  el.operacao == "Removeu")).length)
  data.push((historicos.filter(el => el.qualElemento == "Veiculo" &&
  el.operacao == "Cadastrou")).length)
  data.push((historicos.filter(el => el.qualElemento == "Veiculo" &&
  el.operacao == "Removeu")).length)

  return data
}
