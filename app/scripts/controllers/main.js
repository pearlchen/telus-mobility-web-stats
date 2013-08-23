'use strict';

angular.module('infographicApp')
  .controller('MainCtrl', function($scope, $http) {

    $scope.displayGrouped = false;
    $scope.mobileDevices = [];
    $scope.mobileDevicesGrouped = [];
    $scope.mobileDevicesGroupedLength = 0; // store length since associative array gets confused with how long it actually is
    $scope.smallestResolutionDevice = {};
    $scope.highestResolutionDevice = {};

    $http.get('/data/mobileDevices.json')
       .then(function(res){

          $scope.mobileDevices = res.data;

          // sanity check:
          // console.log( "json length: ", $scope.mobileDevices.length );
          // $scope.mobileDevices.length = 10; // truncate array for debugging only to work with a smaller dataset

          // get rid of devices that that are 0 x 0
          $scope.mobileDevices = _.filter($scope.mobileDevices, function(device){
            return device.pxWidth !== 0 && device.pxHeight !== 0;
          });

          // sort arrays in two ways
          $scope.sortByWidth();  
          $scope.groupDevicesBySize();  

        });

    $scope.updateVis = function() {
      if ( $scope.displayGrouped ) {
        $scope.showDevicesAsGroup();
      }else{
        $scope.showAllDevices();
      }
    }

    $scope.showDevicesAsGroup = function() {
      console.log( ">>> showDevicesAsGroup" );
    };

    $scope.showAllDevices = function(){
      console.log( ">>> showAllDevices" );
    };

    $scope.countDevices = function( useGroupedTotal ) {
      
      var useGroupedTotal = useGroupedTotal || $scope.displayGrouped;

      if ( useGroupedTotal ) {
        return $scope.mobileDevicesGroupedLength;
      }else{
        return $scope.mobileDevices.length;
      }

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

    $scope.groupDevicesBySize = function() {

      if ( $scope.mobileDevicesGrouped.length > 0 ) {
        return; // already been parsed so reuse
      }

      // create a 2D array to store devices, 
      // e.g. $scope.mobileDevicesGrouped[1280][800] for a device with a width of 1280 and a height of 800

      var groupedByWidth = [],
          width,
          height;

      $scope.mobileDevicesGroupedLength = 0;
      $scope.smallestResolutionDevice = null;
      $scope.highestResolutionDevice = null;

      groupedByWidth = _.groupBy( $scope.mobileDevices, function(device) {
        return device.pxWidth;
      });

      for ( width in groupedByWidth ) {

        var groupedByHeight = _.groupBy( groupedByWidth[width], function(device) {
          return device.pxHeight;
        });

        $scope.mobileDevicesGrouped[width] = [];

        for ( height in groupedByHeight ) {
          if ( $scope.mobileDevicesGrouped[width][height] === undefined ) {
            $scope.mobileDevicesGrouped[width][height] = [];
            $scope.mobileDevicesGroupedLength++;
            if ( !$scope.smallestResolutionDevices ) {
              $scope.smallestResolutionDevices = groupedByHeight[height];
            }
          }
          $scope.mobileDevicesGrouped[width][height] = groupedByHeight[height];
        }

        $scope.highestResolutionDevices = groupedByHeight[height];

      }

      // sanity check
      console.log( "mobileDevicesGroupedLength: ", $scope.mobileDevicesGroupedLength );
      console.log( "mobileDevicesGrouped: ", $scope.mobileDevicesGrouped );
      console.log( "[320][480]: ", $scope.mobileDevicesGrouped[320][480] );
      console.log( "[1024][600]: ", $scope.mobileDevicesGrouped[1024][600] );

    };

    $scope.getDeviceProperty = function( property, sortMethod ) {

      var property = property || '',
          sortMethod = sortMethod || 'min';

      if ( _[sortMethod] === undefined ) {
        return undefined;
      }

      var device = _[sortMethod].call( $scope, $scope.mobileDevices, function(device){
        return device[property];
      });

      return device[property];

    }

    $scope.getDeviceNamesinArray = function( array ) {
      var names = _.pluck( $scope[array], 'deviceName' ).toString();
      return names;
    }

    // $scope.parseDate = function(date) {
    //   var date = new Date( Date.parse( date ) );
    //   console.log(date);
    // };

    // $scope.groupDeviceModels = function() {
    //   var groupedMobileDevices = _.groupBy( $scope.mobileDevices, function(device) {
    //     return device.deviceAlias || device.deviceName;
    //   });
    //   // console.log( groupedMobileDevices );
    // };

  });
