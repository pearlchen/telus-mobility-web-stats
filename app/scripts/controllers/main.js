'use strict';

angular.module('infographicApp')
  .controller('MainCtrl', function($scope, $http) {

    $scope.displayGrouped = false;
    $scope.mobileDevices = [];
    $scope.mobileDevicesAll = [];
    $scope.mobileDevicesGrouped = [];
    $scope.mobileDevicesGroupedLength = 0; // store length since associative array gets confused with how long it actually is
    $scope.mobileDevicesFlatGroup = [];
    $scope.smallestResolutionDevices = {};
    $scope.highestResolutionDevices = {};
    $scope.mostCommonResolutionDevices = {};

    // $scope.highlightedOs = []; // default to none
    $scope.highlightedOs = [ 'ios', 'android', 'blackberry', 'windows', 'webos', 'playstation' ]; //default to all

    $scope.filters = [
      { 
        id: 'ios', 
        imgSrc: 'images/ios.svg', 
        altAttr: 'Apple logo', 
        titleAttr: 'Highlight iOS devices'
      },
      { 
        id: 'android', 
        imgSrc: 'images/android.svg', 
        altAttr: 'Android logo', 
        titleAttr: 'Highlight Android devices'
      },
      { 
        id: 'blackberry', 
        imgSrc: 'images/blackberry.svg', 
        altAttr: 'BlackBerry logo', 
        titleAttr: 'Highlight BlackBerry devices'
      },
      { 
        id: 'windows', 
        imgSrc: 'images/windows.svg', 
        altAttr: 'Windows Phone logo', 
        titleAttr: 'Highlight Windows Phone devices'
      },
      { 
        id: 'webos', 
        imgSrc: 'images/webos.svg', 
        altAttr: 'webOS logo', 
        titleAttr: 'Highlight webOS devices'
      },
      { 
        id: 'playstation', 
        imgSrc: 'images/playstation.svg', 
        altAttr: 'PlayStation logo', 
        titleAttr: 'Highlight PlayStation devices'
      }
    ];

    $http.get('data/mobileDevices.json')
       .then(function(res){

          $scope.mobileDevicesAll = res.data;

          // sanity check:
          // console.log( "json length: ", $scope.mobileDevicesAll.length );
          // $scope.mobileDevicesAll.length = 10; // truncate array for debugging only to work with a smaller dataset

          // get rid of devices that that are 0 x 0
          $scope.mobileDevicesAll = _.filter($scope.mobileDevicesAll, function(device){
            return device.pxWidth !== 0 && device.pxHeight !== 0;
          });

          // sort arrays in two ways
          $scope.sortByWidth( $scope.mobileDevicesAll );  
          $scope.groupDevicesBySize();  
          // $scope.sortByWidth( $scope.mobileDevicesFlatGroup );  

          $scope.updateVis();

        });

    $scope.updateVis = function() {
      if ( $scope.displayGrouped ) {
        $scope.mobileDevices = $scope.mobileDevicesFlatGroup;
      }else{
        $scope.mobileDevices = $scope.mobileDevicesAll;
      }
      // $scope.countDevices(); //debug only
    }

    $scope.countDevices = function( useGroupedTotal ) {
      
      //TODO: this could instead use $scope.$watch('$scope.mobileDevices', function(){}); to update this

      var useGroupedTotal = useGroupedTotal || $scope.displayGrouped;

      if ( useGroupedTotal ) {
        // console.log( "countDevices() $scope.mobileDevicesFlatGroup.length: ", $scope.mobileDevicesFlatGroup.length );
        return $scope.mobileDevicesFlatGroup.length;
      }else{
        // console.log( "countDevices() $scope.mobileDevicesAll.length: ", $scope.mobileDevicesAll.length );
        return $scope.mobileDevicesAll.length;
      }

    };

    $scope.sortByWidth = function( array ) {
      // sort by width, descending in size so bigger sizes show up in the "back"
      array.sort(function(a,b){
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
      $scope.sortByWidth( $scope.mobileDevicesFlatGroup );  


      // sanity check
      // console.log( "mobileDevicesGroupedLength: ", $scope.mobileDevicesGroupedLength );
      // console.log( "mobileDevicesGrouped: ", $scope.mobileDevicesGrouped );
      // console.log( "mobileDevicesFlatGroup: ", $scope.mobileDevicesFlatGroup );
      // console.log( "mostCommonResolutionDevices: ", $scope.mostCommonResolutionDevices );
      // console.log( "[320][480]: ", $scope.mobileDevicesGrouped[320][480] );
      // console.log( "[1024][600]: ", $scope.mobileDevicesGrouped[1024][600] );

    };

    $scope.getDeviceProperty = function( property, sortMethod ) {

      var property = property || '',
          sortMethod = sortMethod || 'min';

      if ( _[sortMethod] === undefined ) {
        return undefined;
      }

      var device = _[sortMethod].call( $scope, $scope.mobileDevicesAll, function(device){
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

    //TODO: add a deselect in

    $scope.highlightDevices = function(os) {

      console.log( os );
      if (!os) return;

      var i = _.indexOf( $scope.highlightedOs, os );
      if ( i === -1 ) {
        $scope.highlightedOs.push( os ); //add
      }
      else {
        $scope.highlightedOs.splice( i, 1 ); //remove
      }
      console.log( "$scope.highlightedOs: ", i, $scope.highlightedOs );
      $scope.$broadcast('EVENT_OS_HIGHLIGHT_CHANGE', $scope.highlightedOs );

    }

    $scope.checkIfHighlighted = function(os) {
      var found = _.find( $scope.highlightedOs, function(highlight){
        return highlight.indexOf( os ) > -1;
      });
      return ( found ? true : false );
    }

  });
