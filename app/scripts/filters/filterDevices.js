'use strict';

angular.module('infographicApp')
  .filter('removeZeroPixelDevices', function () {
    return function (devicesArray) {
      return _.filter( devicesArray, function(device){
        return device.pxWidth !== 0 && device.pxHeight !== 0;
      });
    };
  });


angular.module('infographicApp')
  .filter('groupDevicesBySize', function ($filter) {

    var groupDevicesBySize = function(devicesArray) {

      // create a 2D array to store devices, 
      // e.g. grouped[1280][800] for a device with a width of 1280 and a height of 800

      var groupedByWidth = [],
          width,
          height;

      var grouped = [];

      groupedByWidth = _.groupBy( devicesArray, function(device) {
        return device.pxWidth;
      });

      for ( width in groupedByWidth ) {

        var groupedByHeight = _.groupBy( groupedByWidth[width], function(device) {
          return device.pxHeight;
        });

        grouped[width] = [];

        for ( height in groupedByHeight ) {

          if ( grouped[width][height] === undefined ) {
            
            grouped[width][height] = [];

            // if ( !$scope.smallestResolutionDevices ) {
            //   $scope.smallestResolutionDevices = groupedByHeight[height];
            // }

          }

          grouped[width][height] = groupedByHeight[height];

        }

        // $scope.highestResolutionDevices = groupedByHeight[height];

      }

      // sanity check
      // console.log( "grouped: ", grouped );
      // console.log( "[320][480]: ", grouped[320][480] );
      // console.log( "[1024][600]: ", grouped[1024][600] );

      return grouped;
    }

    return groupDevicesBySize;
  });


angular.module('infographicApp')
  .filter('flattenGroupedDevices', function ($filter) {

    var flattenGroupedDevices = function(grouped2dArray) {

      var flattened = [],
          w,
          h;

      for ( w in grouped2dArray ) {
        for ( h in grouped2dArray[w] ) {

          var names = _.map( grouped2dArray[w][h], function(device){
            return device.deviceAlias || device.deviceName;
          });

          var os = _.map( grouped2dArray[w][h], function(device){
            return device.os;
          });
          
          var deviceObj = { "deviceName": names,
                            "os": os,
                            "count": names.length,
                            "pxWidth": parseInt( w, 10 ),
                            "pxHeight": parseInt( h, 10 )
                          };

          flattened.push( deviceObj );

        }
      }

      // sanity check
      // console.log( "flattened: ", flattened );

      return flattened;
    }

    return flattenGroupedDevices;
  });