'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:UltradashboardCtrl
 * @description
 * # UltradashboardCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('UltradashboardCtrl', function ($scope, $filter, ClientesService, FiliaisService, VendasService) {

    $scope.filiais = FiliaisService.query();
    $scope.clientes = ClientesService.query();
    $scope.cssStyle = 'height:600px;';
    $scope.baseVendas = VendasService.query();
    $scope.vendas = $scope.baseVendas;


    $scope.periodosMensais = [
      {
        numero: 1,
        mes: 'Janeiro',
        abrev: 'Jan'
      },
      {
        numero: 2,
        mes: 'Fevereiro',
        abrev: 'Fev'
      },
      {
        numero: 3,
        mes: 'Março',
        abrev: 'Mar'
      },
      {
        numero: 4,
        mes: 'Abril',
        abrev: 'Abr'
      },
      {
        numero: 5,
        mes: 'Maio',
        abrev: 'Mai'
      },
      {
        numero: 6,
        mes: 'Junho',
        abrev: 'Jun'
      },
      {
        numero: 7,
        mes: 'Julho',
        abrev: 'Jul'
      },
      {
        numero: 8,
        mes: 'Agosto',
        abrev: 'Ago'
      },
      {
        numero: 9,
        mes: 'Setembro',
        abrev: 'Set'
      },
      {
        'numero': 10,
        'mes': 'Outubro',
        'abrev': 'Out'
      },
      {
        numero: 11,
        mes: 'Novembro',
        abrev: 'Nov'
      },
      {
        numero: 12,
        mes: 'Dezembro',
        abrev: 'Dez'
      }
    ];
    $scope.periodosAnuais = [
      {
        ano: '2014',
      },
      {
        ano: '2015',
      },
      {
        ano: '2016'
      }
    ];

    $scope.filiaisToFilter = [];
    $scope.clientesToFilter = [];
    $scope.vendasPeriodosAnuaisToFilter = [];
    $scope.mbPeriodosAnuaisToFilter = [];
    $scope.periodosMensaisToFilter = [];

    $scope.activeFilialToFilter = false;
    $scope.activeClientesToFilter = false;
    $scope.activeVendasPeriodoAnualToFilter = false;
    $scope.activeMBPeriodoAnualToFilter = false;
    $scope.activePeriodoMensalToFilter = false;



    $scope.addFilialToFilter = function (selectedItem) {
      if ($scope.activeFilialToFilter === false) {
        $scope.activeFilialToFilter = true;
      }
      var filialFiltered = parseInt($scope.pieChartVendasFiliais.data[selectedItem.row, selectedItem.row + 1][0].split(" ")[1]);
      if ($filter('filter')($scope.filiaisToFilter, 'filialFiltered').length === 0) {
        $scope.filiaisToFilter.push(filialFiltered);
      }

    };

    $scope.filtrarFiliais = function () {
      var vendasFilial = [];

      $scope.filiaisToFilter.forEach(function (filial) {
        var vendasAux = $filter('filter')($scope.vendas, {'CODFILIAL': filial});
        vendasAux.forEach(function (venda) {
          vendasFilial.push(venda);
        })
      });
      console.log(vendasFilial);

      $scope.vendas = vendasFilial;
      $scope.filiaisToFilter = [];
      $scope.activeFilialToFilter = false;
    };


    $scope.cancelFiliaisFilter = function () {
      $scope.activeFilialToFilter = false;
      $scope.filiaisToFilter = [];
      limparFiltros();
    }

    $scope.addVendasAnoToFilter = function (selectedItem) {
      if ($scope.activeVendasPeriodoAnualToFilter === false) {
        $scope.activeVendasPeriodoAnualToFilter = true;
      }
      var anoFiltered = parseInt($scope.columnsVendasAno.data[selectedItem.column, selectedItem.row + 1][0]);
      if ($filter('filter')($scope.vendasPeriodosAnuaisToFilter, 'anoFiltered').length === 0) {
        $scope.vendasPeriodosAnuaisToFilter.push(anoFiltered);
      }

    };

    $scope.filtrarVendasPeriodoAnuais = function () {
      var vendasPeriodoAnuais = [];

      $scope.vendasPeriodosAnuaisToFilter.forEach(function (ano) {
        var vendasAux = $filter('filter')($scope.vendas, {'ANO': ano});
        vendasAux.forEach(function (venda) {
          vendasPeriodoAnuais.push(venda);
        })
      });
      //console.log(vendasFilial);

      $scope.vendas = vendasPeriodoAnuais;
      $scope.filiaisToFilter = [];
      $scope.vendasPeriodosAnuaisToFilter = [];
      $scope.activeVendasPeriodoAnualToFilter = false;

      //updateChartVendasValor();
    };

    $scope.cancelVendasPeriodosAnuaisFilter = function () {
      $scope.activeVendasPeriodoAnualToFilter = false;
      $scope.filiaisToFilter = [];
      $scope.vendasPeriodosAnuaisToFilter = [];
      limparFiltros();
    };


    $scope.addMBAnoToFilter = function (selectedItem) {
      if ($scope.activeMBPeriodoAnualToFilter === false) {
        $scope.activeMBPeriodoAnualToFilter = true;
      }
      var anoFiltered = parseInt($scope.columnsMargemBrutaAnual.data[selectedItem.column, selectedItem.row + 1][0]);
      if ($filter('filter')($scope.mbPeriodosAnuaisToFilter, 'anoFiltered').length === 0) {
        $scope.mbPeriodosAnuaisToFilter.push(anoFiltered);
      }

    };

    $scope.filtrarMBPeriodoAnuais = function () {
      var mbPeriodoAnuais = [];

      $scope.mbPeriodosAnuaisToFilter.forEach(function (ano) {
        var mbAux = $filter('filter')($scope.vendas, {'ANO': ano});
        mbAux.forEach(function (mb) {
          mbPeriodoAnuais.push(mb);
        })
      });
      //console.log(vendasFilial);

      $scope.vendas = mbPeriodoAnuais;
      $scope.filiaisToFilter = [];
      $scope.vendasPeriodosAnuaisToFilter = [];
      $scope.mbPeriodosAnuaisToFilter = [];
      $scope.activeMBPeriodoAnualToFilter = false;
    };

    $scope.cancelMbPeriodosAnuaisFilter = function () {
      $scope.activeMBPeriodoAnualToFilter = false;
      $scope.filiaisToFilter = [];
      $scope.vendasPeriodosAnuaisToFilter = [];
      $scope.mbPeriodosAnuaisToFilter = [];
      limparFiltros();
    };


    $scope.limparFiltros = function () {
      $scope.vendas = VendasService.query();
    };

    //$scope.filtrarDonuts = function () {
    //
    //  $scope.secondaryWatchlists.forEach(function (watchlist) {
    //    watchlist.filtered = false;
    //  });
    //
    //  $scope.donutsNamesToFilter.forEach(function (name) {
    //    $filter('filter')($scope.secondaryWatchlists, {'name': name})[0].filtered = true;
    //  })
    //
    //  $scope.columnNamesToFilter = [];
    //  $scope.donutsNamesToFilter = [];
    //  updateCharts();
    //  $scope.activeFilterDonuts = false;
    //}

    $scope.periodosAnuais.meses = $scope.periodosMensais;





    var formatters = {
      number: [
        {
          columnNum: 1,
          prefix: 'R$'
        }
      ]
    };

    var updateChartFiliais = function () {
      var pieChartVendasFiliais = {
        type: 'PieChart',
        displayed: true,
        data: [['Filial', 'Total']],
        options: {

          title: 'Vendas por Filial',
          //isStacked: 'true',
          //legend: 'none',
          pieHole: 0.4,
          height: 300,
          width: 300
          //is3D: true
        },
        formatters: formatters
      };

      _.each($scope.filiais, function (filial) {
        //$filter('filter')($scope.secondaryWatchlists, {'name': watchlist.name});
        var vendasFilial = $filter('filter')($scope.vendas, {'CODFILIAL': filial.CODFILIAL});
        if (vendasFilial.length > 0) {
          var totalVendas = 0;

          vendasFilial.forEach(function (venda) {
            totalVendas += venda.TOTAL;
          })
          filial.TOTAL = totalVendas;
          pieChartVendasFiliais.data.push(['Filial ' + filial.CODFILIAL.toString(), filial.TOTAL]);

        }

      });

      $scope.pieChartVendasFiliais = pieChartVendasFiliais;

    };


    var criarGraficoTeste = function(){

      var graficoTeste = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Ano', 'Total Vendas']],
        options: {

          title: 'Total de Vendas Anual',
          //isStacked: 'true',
          animation: {
            duration: 500,
            easing: 'linear'
          },
          legend: 'none',
          height: 300
          //is3D: true
        },
        formatters: formatters
      };

      _.each($scope.vendas, function (venda) {
        graficoTeste.data.push([venda.ANO.toString(), venda.TOTAL]);
      });

      $scope.graficoTeste = graficoTeste;

    }

    var updateChartVendasValor = function () {
      var columnsVendasAno = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Ano', 'Total Vendas']],
        options: {

          title: 'Total de Vendas Anual',
          //isStacked: 'true',
          animation: {
            duration: 500,
            easing: 'linear'
          },
          legend: 'none',
          height: 300
          //is3D: true
        },
        formatters: formatters
      };

      var columnsVendasMes = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Mês', 'Total Vendas']],
        options: {

          title: 'Total de Vendas Mensal',
          //isStacked: 'true',
          animation: {
            duration: 500,
            easing: 'linear'
          },
          legend: 'none',
          height: 300,
          //is3D: true
        },
        formatters: formatters
      };

      var columnsMargemBrutaAnual = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Ano', 'Média de Margem Bruta']],
        options: {
          title: 'Média de Margem Bruta Anual',
          //isStacked: 'true',
          animation: {
            duration: 500,
            easing: 'linear'
          },
          legend: 'none',
          height: 300
          //is3D: true
        },
        formatters: formatters
      };

      //_.each($scope.clientes, function (cliente) {
      //$filter('filter')($scope.secondaryWatchlists, {'name': watchlist.name});
      var vendasAnuais = [];

      $scope.periodosAnuais.forEach(function (periodo) {
        var data = new Date();
        var vendas = $filter('filter')($scope.vendas, {'ANO': periodo.ano});
        //var vendas = [];
        //$scope.vendas.forEach(function(venda){
        //  if(venda.ANO === periodo.ano){
        //    vendas.push(venda);
        //  }
        //});
        var vendasAno = {};

        var totalVendas = 0;
        var totalMargemBruta = 0;
        vendas.forEach(function (venda) {
          totalVendas += venda.TOTAL;
          totalMargemBruta += venda.VALOR_MARGEM_BRT;
        });

        vendasAno.ano = periodo.ano;
        vendasAno.numeroVendas = vendas.length;
        vendasAno.totalVendas = totalVendas;
        vendasAno.totalMargemBruta = totalMargemBruta;
        vendasAno.mediaMargemBruta = totalMargemBruta / vendas.length;
        if (vendasAno.totalMargemBruta > 0 && vendasAno.totalVendas > 0)
         vendasAnuais.push(vendasAno);

        var dataFinal = new Date();
        console.log(dataFinal.getTime());
        console.log(data.getTime());
        console.log((dataFinal.getTime() - data.getTime()));
      });

      var vendasMensais = [];
      $scope.periodosMensais.forEach(function (periodo) {
        var vendasPorMes = $filter('filter')($scope.vendas, {'MES': periodo.numero});
        var totalVendas = 0;
        vendasPorMes.forEach(function (venda) {
          totalVendas += venda.TOTAL;
        });

        var vendasMes = {};

        vendasMes.mesNumero = periodo.numero;
        vendasMes.mesNome = periodo.mes;
        vendasMes.mesAbrev = periodo.abrev;
        vendasMes.total = totalVendas;
        if (vendasMes.total > 0)
          vendasMensais.push(vendasMes);

      });


      _.each(vendasAnuais, function (vendasAno) {
        columnsVendasAno.data.push([vendasAno.ano, vendasAno.totalVendas]);
        columnsMargemBrutaAnual.data.push([vendasAno.ano, vendasAno.mediaMargemBruta]);
      });

      _.each(vendasMensais, function (vendasMes) {
        columnsVendasMes.data.push([vendasMes.mesAbrev, vendasMes.total]);
      });

      $scope.columnsVendasAno = columnsVendasAno;
      $scope.columnsMargemBrutaAnual = columnsMargemBrutaAnual;
      $scope.columnsVendasMes = columnsVendasMes;

    };


    var updateChartClientes = function () {

      var barClienteChart = {
        type: 'BarChart',
        displayed: true,
        data: [['Cliente', 'Total Vendas']],
        options: {
          title: 'Clientes',
          isStacked: 'true',
          //width: data.getNumberOfRows() * 65,
          //bar: {groupWidth: 10},
          animation: {
            duration: 500,
            easing: 'linear'
          },
          legend: 'none',
          pieHole: 0.4,
          height: 900,
          width: 450
          //is3D: true
        },
        formatters: formatters
      };

      _.each($scope.clientes, function (cliente) {
        //$filter('filter')($scope.secondaryWatchlists, {'name': watchlist.name});
        var vendasCliente = $filter('filter')($scope.vendas, {'CODCLIENTE': cliente.CODCLIENTE});
        if (vendasCliente.length > 0) {
          var totalVendas = 0;

          vendasCliente.forEach(function (venda) {
            totalVendas += venda.TOTAL;
          })
          cliente.TOTAL = totalVendas;
          barClienteChart.data.push([cliente.NOMCLIENTE, totalVendas]);

        }

      });

      //var vendasCliente = $filter('filter')($scope.vendas, {'CLIENTE.NOME': cliente.CODCLIENTE});
      //if (vendasCliente.length > 0) {
      //  var totalVendas = 0;
      //
      //  vendasCliente.forEach(function (venda) {
      //    totalVendas += venda.TOTAL;
      //  })
      //  cliente.TOTAL = totalVendas;
      //  barClienteChart.data.push([cliente.NOMCLIENTE, totalVendas]);
      //
      //}


      $scope.barClienteChart = barClienteChart;

    }


    $scope.$watch('baseVendas.length', function () {
      updateChartClientes();
      updateChartFiliais();
      updateChartVendasValor();
    });



    $scope.$watch('vendas.length', function () {
      console.log('Qtde vendas ' + $scope.baseVendas.length);
      updateChartClientes();
      updateChartFiliais();
      updateChartVendasValor();
      //criarGraficoTeste();
    });
  });
