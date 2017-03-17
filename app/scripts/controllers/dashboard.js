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


    $scope.watchListSelected = $scope.secondaryWatchlists[0];




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

    $scope.adicionarFiltro = function(watchlist){
      $scope.watchlist = $filter('filter')($scope.watchlists, {'name': watchlist.name})[0];
      $scope.watchlist.filtered = true;
    }

    $scope.retirarFiltro = function(watchlist){
      $scope.watchlist = $filter('filter')($scope.watchlists, {'name': watchlist.name})[0];
      $scope.watchlist.filtered = false;
    }

    $scope.updateFilters = function () {
      $scope.watchlists.forEach(function (watchlist) {
        watchlist =  $filter('filter')($scope.secondaryWatchlists, {'name': watchlist.name});
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
          legend: 'none',
          pieHole: 0.4
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
        donutChart.data.push([watchlist.name, watchlist.marketValue]);
        columnChart.data.push([watchlist.name, watchlist.dayChange,
          watchlist.dayChange < 0 ? 'Red' : 'Green']);
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
