$scope.groupDevicesBySize = function() {

      if ( $scope.mobileDevicesGrouped.length > 0 ) {
        return; // already been parsed so reuse
      }

      // create a 2D array to store devices, 
      // e.g. $scope.mobileDevicesGrouped[1280][800] for a device with a width of 1280 and a height of 800

      var groupedByWidth = [],
          width,
          height;

      $scope.mobileDevicesFlatGroup = [];
      $scope.mobileDevicesGroupedLength = 0;
      $scope.smallestResolutionDevices = null;
      $scope.highestResolutionDevices = null;
      $scope.mostCommonResolutionDevices = null;

      groupedByWidth = _.groupBy( $scope.mobileDevicesAll, function(device) {
        return device.pxWidth;
      });

      for ( width in groupedByWidth ) {

        var groupedByHeight = _.groupBy( groupedByWidth[width], function(device) {
          return device.pxHeight;
        });


        $scope.mobileDevicesGrouped[width] = [];
        // var maxDevices = 0;

        for ( height in groupedByHeight ) {

          if ( $scope.mobileDevicesGrouped[width][height] === undefined ) {
            
            
            $scope.mobileDevicesGrouped[width][height] = [];
            $scope.mobileDevicesGroupedLength++;
            if ( !$scope.smallestResolutionDevices ) {
              $scope.smallestResolutionDevices = groupedByHeight[height];
            }

            var names = _.map( groupedByHeight[height], function(device){
              return device.deviceAlias || device.deviceName;
            });
            // console.log( "names for ["+width+"]["+height+"]", names );
            
            var deviceObj = { "deviceName": names.join(", "),
                              "pxWidth": parseInt( width, 10 ),
                              "pxHeight": parseInt( height, 10 ),
                              "count": names.length,
                              "isPhone": true //remove
                            };

            $scope.mobileDevicesFlatGroup.push( deviceObj );

          }

          // $scope.mobileDevicesFlatGroup[ $scope.mobileDevicesFlatGroup.length - 1 ].deviceName += groupedByHeight[height][0].deviceName;
          $scope.mobileDevicesGrouped[width][height] = groupedByHeight[height];

        }

        $scope.highestResolutionDevices = groupedByHeight[height];

      }

      $scope.mostCommonResolutionDevices = _.max( $scope.mobileDevicesFlatGroup, function(device){ return device.count; });


      // sanity check
      // console.log( "mobileDevicesGroupedLength: ", $scope.mobileDevicesGroupedLength );
      // console.log( "mobileDevicesGrouped: ", $scope.mobileDevicesGrouped );
      // console.log( "mobileDevicesFlatGroup: ", $scope.mobileDevicesFlatGroup );
      // console.log( "mostCommonResolutionDevices: ", $scope.mostCommonResolutionDevices );
      // console.log( "[320][480]: ", $scope.mobileDevicesGrouped[320][480] );
      // console.log( "[1024][600]: ", $scope.mobileDevicesGrouped[1024][600] );

    };