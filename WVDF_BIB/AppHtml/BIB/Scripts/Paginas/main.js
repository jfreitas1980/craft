document.addEventListener('DOMContentLoaded', function()
{

  var maisclientesembarques = echarts.init(document.getElementById('maisclientesembarques'));
  var menosclientesembarques = echarts.init(document.getElementById('menosclientesembarques'));
  var rentabilidadefretemaritimo = echarts.init(document.getElementById('rentabilidadefretemaritimo'));
  var maiorsaldonegativo = echarts.init(document.getElementById('maiorsaldonegativo'));

  var option1 = {
    title: 
    {
      text: "Top 10 Clientes Mais Embarques",
      left: "center"
    },
    xAxis: 
    {
      type: 'category',
      data: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
    },
    yAxis: 
    {
      type: 'value'
    },
    series: 
    [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        color: '#00B600'  // Cor das barras
      }
    }]
  };
  
  var option2 = {
    title: 
    {
      text: "Top 10 Clientes Menos Embarques",
      left: "center"
    },
    xAxis: 
    {
      type: 'category',
      data: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
    },
    yAxis: 
    {
      type: 'value'
    },
    series: 
    [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        color: '#B20000'  // Cor das barras
      }
    }]
  };

  var option3 = {
    title: 
    {
      text: "Clientes com Maior Rentabilidade Marítima",
      left: "center"
    },
    xAxis: 
    {
      type: 'category',
      data: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
    },
    yAxis: 
    {
      type: 'value'
    },
    series: 
    [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        color: '#00B600'  // Cor das barras
      }
    }]
  };

  var option4 = {
    title: 
    {
      text: "Clientes com Maior Saldo Negativo",
      left: "center"
    },
    xAxis: 
    {
      type: 'category',
      data: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
    },
    yAxis: 
    {
      type: 'value'
    },
    series: 
    [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        color: '#B20000'  // Cor das barras
      }
    }]
  };
  
    option5 = {
      title: 
      {
        text: "Top 10 Clientes Mais Embarques",
        left: "center"
      },
      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 2
      },
      series: [
        {
          realtimeSort: true,
          name: '',
          type: 'bar',
          data: [120, 200, 150, 80, 70, 110, 130],
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          },
          itemStyle: {
            color: '#00B600'  // Cor das barras
          }
        }
      ],
      legend: {
        show: true
      },
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    };

  option6 = {
    title: 
    {
      text: "Top 10 Clientes Menos Embarques",
      left: "center"
    },
    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 2
    },
    series: [
      {
        realtimeSort: true,
        name: '',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        },
        itemStyle: {
          color: '#B20000'  // Cor das barras
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  };

  maisclientesembarques.setOption(option5);
  menosclientesembarques.setOption(option6);
  rentabilidadefretemaritimo.setOption(option3);
  maiorsaldonegativo.setOption(option4);

});