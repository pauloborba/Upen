let dataRegister = {
  type: 'bar',
  data: {
      labels: ['Registros','Remoções'],
      datasets: [{
          label: 'Pneu',
          data: [],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',

          ],
          borderWidth: 1
      },
      {
        label: 'Veiculo',
        data: [],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 2
      }
    ]
  },
  options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        labels: {
            fontColor: "white",
            fontSize: 14
        }
      },
      title: {
        display: true,
        text: 'Histórico de Registros e Remoções',
        fontColor: "white",
        fontSize: 20
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  fontColor: "white",
              }
          }],
          xAxes: [{
            ticks: {
                fontColor: "white",
            }
        }]
      }
  }
};

let dataPorcentPneu = {
type: 'pie',
data: {
  datasets: [{
    data: [],
    backgroundColor: [

      ]
    }],
    labels: [
    ],
},
options: {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    labels: {
        fontColor: "white",
        fontSize: 14
    }
  },
  title: {
    display: true,
    text: 'Quantidade Pneu',
    fontColor: "white",
  },
}
};

let dataPorcentVeiculo = {
type: 'pie',
data: {
  datasets: [{
    data: [],
      backgroundColor: [

      ]
    }],
    labels: [

    ],
},
options: {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    labels: {
        fontColor: "white",
        fontSize: 14
    }
  },
  title: {
    display: true,
    text: 'Quantidade Veiculo',
    fontColor: "white",
  },
}
};

export {dataRegister,dataPorcentPneu,dataPorcentVeiculo}
