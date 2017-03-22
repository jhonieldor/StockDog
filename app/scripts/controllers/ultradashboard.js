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
    //$scope.clientes = $filter('filter')($scope.clientes,{'CODCLIENTE': 9999});
    $scope.cssStyle = 'height:600px;';
    $scope.vendas = VendasService.query();
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
    $scope.periodosAnuaisToFilter = [];
    $scope.periodosMensaisToFilter = [];

    //$scope.activateDonutChartFilter = function (selectedItem) {
    //  console.log(selectedItem);
    //  if ($scope.activeFilterDonuts === false) {
    //    $scope.activeFilterDonuts = true;
    //  }
    //  var watchListName = $scope.donutChart.data[selectedItem.row, selectedItem.row + 1][0];
    //  if ($filter('filter')($scope.donutsNamesToFilter, 'watchListname').length === 0) {
    //    $scope.donutsNamesToFilter.push(watchListName);
    //  }
    //
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


    var updateChartVendasValor = function () {
      var columnsVendasAno = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Ano', 'Total Vendas']],
        options: {

          title: 'Total de Vendas Anual',
          //isStacked: 'true',
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
          legend: 'none',
          height: 300
          //is3D: true
        },
        formatters: formatters
      };

      //_.each($scope.clientes, function (cliente) {
      //$filter('filter')($scope.secondaryWatchlists, {'name': watchlist.name});
      var vendasAnuais = [];

      $scope.periodosAnuais.forEach(function(periodo){
        var vendas = $filter('filter')($scope.vendas, {'ANO': periodo.ano});
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
        vendasAno.mediaMargemBruta = totalMargemBruta/vendas.length;

        vendasAnuais.push(vendasAno);
      });

      var vendasMensais = [];
      $scope.periodosMensais.forEach(function(periodo){
        var vendasPorMes = $filter('filter')($scope.vendas, {'MES': periodo.numero});
        var totalVendas = 0;
        vendasPorMes.forEach(function (venda) {
          totalVendas += venda.TOTAL;
        });

        var vendasMes ={};

        vendasMes.mesNumero = periodo.numero;
        vendasMes.mesNome = periodo.mes;
        vendasMes.mesAbrev = periodo.abrev;
        vendasMes.total = totalVendas;
        vendasMensais.push(vendasMes);

      });


      _.each(vendasAnuais, function(vendasAno){
        columnsVendasAno.data.push([vendasAno.ano, vendasAno.totalVendas]);
        columnsMargemBrutaAnual.data.push([vendasAno.ano, vendasAno.mediaMargemBruta]);
      });

      _.each(vendasMensais, function(vendasMes){
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
          barClienteChart.data.push([cliente.NOMCLIENTE, cliente.TOTAL]);

        }

      });

      $scope.barClienteChart = barClienteChart;

    }


    $scope.$watch('clientes.length', function () {
      updateChartClientes();
    });

    $scope.$watch('vendas.length', function () {
      updateChartClientes();
      updateChartFiliais();
      updateChartVendasValor();
    });
  });
