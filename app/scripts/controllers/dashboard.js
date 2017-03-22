'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('DashboardCtrl', function ($scope, $filter, WatchlistService, QuoteService) {
    // [1] Initializations
    var unregisterHandlers = [];
    $scope.watchlists = WatchlistService.query();
    $scope.cssStyle = 'height:300px;';

    $scope.secondaryWatchlists = [];
    $scope.watchlists.forEach(function (watchlist) {
      watchlist.filtered = true;
      $scope.secondaryWatchlists.push(watchlist);
    });


    $scope.activeFilterColumns = false;
    $scope.activeFilterDonuts = false;
    //$scope.watchlistViewExpanded = true;

    $scope.watchListSelected = $scope.secondaryWatchlists[0];
    $scope.columnNamesToFilter = [];
    $scope.donutsNamesToFilter = [];


    $scope.teste = 0;
    console.log($scope.teste);


    $scope.testDonutChart = function (selectedItem) {
      console.log('Teste donutChart');
      console.log(selectedItem);
      console.log($scope.donutChart.data);
      console.log(selectedItem.row);
      console.log(selectedItem.column);
      console.log($scope.donutChart.data[selectedItem.row, selectedItem.row + 1]);
      var watchListName = $scope.donutChart.data[selectedItem.row, selectedItem.row + 1][0];
      $scope.filtrar(watchListName);
      $scope.activeFilterDonuts = true;
    };
    $scope.testColumnChart = function (selectedItem) {
      console.log('Teste columnChart');
      console.log(selectedItem);
      console.log($scope.columnChart.data);
      console.log(selectedItem.row);
      console.log(selectedItem.column);
      console.log($scope.columnChart.data[selectedItem.column, selectedItem.row + 1]);

      console.log($scope.columnChart.data[selectedItem.column, selectedItem.row + 1][0]);
      var watchListName = $scope.columnChart.data[selectedItem.column, selectedItem.row + 1][0];
      //$filter('filter')($scope.results.subjects, {grade: 'C'})
      console.log($scope.secondaryWatchlists);
      $scope.filtrar(watchListName);
      $scope.activeFilterColumns = true;
    };


    $scope.activateColumnChartFilter = function (selectedItem) {
      if ($scope.activeFilterColumns === false) {
        $scope.activeFilterColumns = true;
      }
      var watchListName = $scope.columnChart.data[selectedItem.column, selectedItem.row + 1][0];
      if ($filter('filter')($scope.columnNamesToFilter, 'watchListname').length === 0) {
        $scope.columnNamesToFilter.push(watchListName);
      }

    }

    $scope.cancelColumnChartFilter = function () {
      $scope.activeFilterColumns = false;
      $scope.columnNamesToFilter = [];
      $scope.donutsNamesToFilter = [];
      $scope.secondaryWatchlists = $scope.watchlists;
      updateCharts();
    }


    $scope.activateDonutChartFilter = function (selectedItem) {
      console.log(selectedItem);
      if ($scope.activeFilterDonuts === false) {
        $scope.activeFilterDonuts = true;
      }
      var watchListName = $scope.donutChart.data[selectedItem.row, selectedItem.row + 1][0];
      if ($filter('filter')($scope.donutsNamesToFilter, 'watchListname').length === 0) {
        $scope.donutsNamesToFilter.push(watchListName);
      }

    }

    $scope.cancelDonutsChartFilter = function () {
      $scope.activeFilterDonuts = false;
      $scope.columnNamesToFilter = [];
      $scope.donutsNamesToFilter = [];
      $scope.secondaryWatchlists = $scope.watchlists;
      updateCharts();
    }

    $scope.filtrarColunas = function () {

      $scope.secondaryWatchlists.forEach(function (watchlist) {
        watchlist.filtered = false;
      });

      $scope.columnNamesToFilter.forEach(function (name) {
        $filter('filter')($scope.secondaryWatchlists, {'name': name})[0].filtered = true;
      })

      $scope.columnNamesToFilter = [];
      $scope.donutsNamesToFilter = [];
      updateCharts();
      $scope.activeFilterColumns = false;
    }

    $scope.viewWatchlist = function (name) {

      var chartHeight = 300;

      if($scope.chartByWatchlist!=null)
        chartHeight = $scope.chartByWatchlist.height;

      var chartByWatchlist = {
        type: 'ColumnChart',
        displayed: true,
        //width: '100%',
        //height: chartHeight,
        data: [['Watchlist', 'Change', {role: 'style'}]],
        options: {
          title: 'Day Change by Company',
          legend: 'none',
          animation: {
            duration: 500,
            easing: 'linear'
          },
          height: 300,
          width: 300,
          colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
          is3D: true
        },
        formatters: formatters
      };

      $scope.watchListSelected = $filter('filter')($scope.secondaryWatchlists, {'name': name})[0];
      console.log(name);
      console.log($scope.watchListSelected);
      _.each($scope.watchListSelected.stocks, function (stock) {
        chartByWatchlist.data.push([stock.company.symbol, stock.dayChange, stock.dayChange < 0 ? 'Red' : 'Green']);
      });

      $scope.chartByWatchlist = chartByWatchlist;
      $scope.cssStyle2 = 'height:'+$scope.chartByWatchlist.options.height+'px;';

    }

    $scope.mudarGrafico = function (type) {
      $scope.chartByWatchlist.type = type;
    }

    $scope.changeSytle = function () {
      var altura = 'height:' +$scope.chartByWatchlist.options.height+ 'px;';
      $scope.cssStyle2 = altura;

    }


    $scope.expandWatchlistView = function () {
      if (!$scope.watchlistViewExpanded) {
        $scope.watchlistViewExpanded = true;
      } else {
        $scope.watchlistViewExpanded = false;
      }

    }

    //$scope.hideWatchlistView= function(){
    //  $scope.watchlistViewExpanded = false;
    //}

    $scope.filtrarDonuts = function () {

      $scope.secondaryWatchlists.forEach(function (watchlist) {
        watchlist.filtered = false;
      });

      $scope.donutsNamesToFilter.forEach(function (name) {
        $filter('filter')($scope.secondaryWatchlists, {'name': name})[0].filtered = true;
      })

      $scope.columnNamesToFilter = [];
      $scope.donutsNamesToFilter = [];
      updateCharts();
      $scope.activeFilterDonuts = false;
    }


    $scope.filtrar = function (name) {
      $scope.watchListSelected = null;
      $scope.secondaryWatchlists = $filter('filter')($scope.watchlists, {'name': name});
      $scope.watchListSelected = $scope.secondaryWatchlists[0];
      $scope.watchListSelected.filtered = true;
      updateCharts();
      //updateFilters();
    }

    $scope.aplicarFiltros = function () {
      $scope.secondaryWatchlists = $filter('filter')($scope.watchlists, {'filtered': true});
      $scope.watchListSelected = $scope.secondaryWatchlists[0];
      //$scope.watchListSelected.filtered = null;

      //updateFilters();
      updateCharts();
    }

    $scope.adicionarFiltro = function (watchlist) {
      $scope.watchlist = $filter('filter')($scope.watchlists, {'name': watchlist.name})[0];
      $scope.watchlist.filtered = true;
    }

    $scope.retirarFiltro = function (watchlist) {
      $scope.watchlist = $filter('filter')($scope.watchlists, {'name': watchlist.name})[0];
      $scope.watchlist.filtered = false;
    }

    $scope.updateFilters = function () {
      $scope.watchlists.forEach(function (watchlist) {
        watchlist = $filter('filter')($scope.secondaryWatchlists, {'name': watchlist.name});
        watchlist.filtered = true;
      });
    }

    $scope.limparFiltros = function () {
      $scope.secondaryWatchlists = $scope.watchlists;
      $scope.watchlists.forEach(function (watchlist) {
        watchlist.filtered = true;
      });
      //$scope.watchListSelected = null;
      updateCharts();
    }


    var formatters = {
      number: [
        {
          columnNum: 1,
          prefix: '$'
        }
      ]
    };

// [2] Helper: Update chart objects
    var updateCharts = function () {

      // Donut chart
      var donutChart = {
        type: 'PieChart',
        displayed: true,
        data: [['Watchlist', 'Market Value']],
        options: {

          title: 'Market Value by Watchlist',
          //isStacked: 'true',
          legend: 'none',
          pieHole: 0.4
          //is3D: true
        },
        formatters: formatters
      };

      var columnChartByWatchlist = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Watchlist', 'Change', {role: 'style'}]],
        options: {
          title: 'Day Change by Company',
          legend: 'none',
          animation: {
            duration: 1000,
            easing: 'linear'
          }
        },
        formatters: formatters
      };

      // Column chart
      var columnChart = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Watchlist', 'Change', {role: 'style'}]],
        options: {
          title: 'Day Change by Watchlist',
          legend: 'none',
          animation: {
            duration: 1000,
            easing: 'linear'
          }
        },
        formatters: formatters
      };
      // [3] Push data onto both chart objects
      _.each($scope.secondaryWatchlists, function (watchlist) {
        if (watchlist.filtered) {
          donutChart.data.push([watchlist.name, watchlist.marketValue]);
          columnChart.data.push([watchlist.name, watchlist.dayChange,
            watchlist.dayChange < 0 ? 'Red' : 'Green']);
        }
      });

      if ($scope.watchListSelected != null) {
        _.each($scope.watchListSelected.stocks, function (stock) {
          //donutChart.data.push([watchlist.name, watchlist.marketValue]);
          columnChartByWatchlist.data.push([stock.company.symbol, stock.dayChange,
            stock.dayChange < 0 ? 'Red' : 'Green']);
        });
      } else {
        $scope.secondaryWatchlists.forEach(function (watchlist) {
          _.each(watchlist.stocks, function (stock) {
            //donutChart.data.push([watchlist.name, watchlist.marketValue]);
            columnChartByWatchlist.data.push([stock.company.symbol, stock.dayChange,
              stock.dayChange < 0 ? 'Red' : 'Green']);
          });
        })
      }


      //_.each($scope.secondaryWatchlists, function (watchlist) {
      //  //donutChart.data.push([watchlist.name, watchlist.marketValue]);
      //  columnChartByWatchlist.data.push([watchlist.name, watchlist.dayChange,
      //    watchlist.dayChange < 0 ? 'Red' : 'Green']);
      //});

      $scope.donutChart = donutChart;
      $scope.columnChart = columnChart;
      $scope.columnChartByWatchlist = columnChartByWatchlist;
      //$scope.$apply();
    };

    // [4] Helper function for resetting controller state
    var reset = function () {
      // [5] Clear QuoteService before registering new stocks
      QuoteService.clear();
      _.each($scope.watchlists, function (watchlist) {
        _.each(watchlist.stocks, function (stock) {
          QuoteService.register(stock);
        });
      });
      // [6] Unregister existing $watch listeners before creating new ones
      _.each(unregisterHandlers, function (unregister) {
        unregister();
      });
      _.each($scope.watchlists, function (watchlist) {
        var unregister = $scope.$watch(function () {
          return watchlist.marketValue;
        }, function () {
          recalculate();
        });
        unregisterHandlers.push(unregister);
      });
    };

    // [7] Compute the new total MarketValue and DayChange
    var recalculate = function () {
      $scope.marketValue = 0;
      $scope.dayChange = 0;
      _.each($scope.watchlists, function (watchlist) {
        $scope.marketValue += watchlist.marketValue ?
          watchlist.marketValue : 0;
        $scope.dayChange += watchlist.dayChange ?
          watchlist.dayChange : 0;
      });
      updateCharts();
    };
    // [8] Watch for changes to watchlists.
    $scope.$watch('watchlists.length', function () {
      reset();
    });

  });
