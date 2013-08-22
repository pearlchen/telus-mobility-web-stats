'use strict';

angular.module('infographicApp')
  .controller('MainCtrl', function($scope, $http) {

    $scope.displayGrouped = false;
    $scope.mobileDevices = [];

    $http.get('/data/mobileDevices.json')
       .then(function(res){
          $scope.mobileDevices = res.data;
          console.log( $scope.mobileDevices.length );
          // $scope.mobileDevices.length = 10; //for debugging only
          $scope.sortByWidth(); //default              
        });

    $scope.updateVis = function() {
      if ( $scope.displayGrouped ) {
        $scope.groupDevicesBySize();
      }else{
        $scope.showAllDevices();
      }
    }

    $scope.showAllDevices = function(){
      console.log( ">>> showAllDevices" );
    };

    $scope.countDevices = function() {
      return $scope.mobileDevices.length;
    };

    $scope.sortByWidth = function() {
      // sort by width, descending in size so bigger sizes show up in the "back"
      $scope.mobileDevices.sort(function(a,b){
        if (a.pxWidth > b.pxWidth)
          return -1;
        if (a.pxWidth < b.pxWidth)
          return 1;
        // a must be equal to b
        return 0;
      });
    }

    // get rid of devices that that are 0 x 0
    $scope.mobileDevices = _.filter($scope.mobileDevices, function(device){
      return device.pxWidth !== 0 && device.pxHeight !== 0;
    });

    $scope.getMaxHeight = function() {
      var device = _.max( $scope.mobileDevices, function(device){
        return device.pxHeight;
      });
      return device.pxHeight;
    };

    $scope.getMaxWidth = function() {
      var device = _.max( $scope.mobileDevices, function(device){
        return device.pxWidth;
      });
      return device.pxWidth;
    };

    $scope.getMinHeight = function() {
      var device = _.min( $scope.mobileDevices, function(device){
        return device.pxHeight;
      });
      return device.pxHeight;
    };

    $scope.getMinWidth = function() {
      var device = _.min( $scope.mobileDevices, function(device){
        return device.pxWidth;
      });
      return device.pxWidth;
    };

    $scope.parseDate = function() {
      var date = new Date( Date.parse( 'Sept 1, 2010' ) );
      console.log(date);
    };

    $scope.groupDeviceModels = function() {
      var groupedMobileDevices = _.groupBy( $scope.mobileDevices, function(device) {
        return device.deviceAlias || device.deviceName;
      });
      // console.log( groupedMobileDevices );
    };

    $scope.groupDevicesBySize = function() {

      console.log( ">>> groupDevicesBySize" );

      var groupedByWidth = [],
          groupedByHeight = [],
          width;

      groupedByWidth = _.groupBy( $scope.mobileDevices, function(device) {
        return device.pxWidth;
      });

      console.log( "groupedByWidth: " , groupedByWidth );
      
      for ( width in groupedByWidth ) {
        groupedByHeight[ width ] = [];
        var array = groupedByWidth[ width ];
        // console.log( array );
        groupedByHeight[ width ].push( _.groupBy( array, function(device) {
          return device.pxHeight;
        }) );
      }
      
      console.log( "groupedByHeight[ "+width+" ]: ", groupedByHeight[ width ] );

    };

  });
