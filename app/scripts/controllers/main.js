'use strict';

angular.module('infographicApp')
  .controller('MainCtrl', function($scope, $http, $filter ) {

    $scope.displayGrouped = true;

    $scope.devicesOriginal = [];

    $scope.mobileDevices = [];
    $scope.mobileDevicesAll = [];
    $scope.mobileDevicesGrouped = [];
    // $scope.mobileDevicesGroupedLength = 0; // store length since associative array gets confused with how long it actually is
    $scope.mobileDevicesFlatGroup = [];

    $scope.smallestResolutionDevices = {};
    $scope.highestResolutionDevices = {};
    $scope.mostCommonResolutionDevices = {};

    $scope.filters = [
      { 
        id: 'ios', 
        imgSrc: 'images/ios.svg', 
        altAttr: 'Apple logo', 
        titleAttr: 'Highlight iOS devices',
        highlighted: true
      },
      { 
        id: 'android', 
        imgSrc: 'images/android.svg', 
        altAttr: 'Android logo', 
        titleAttr: 'Highlight Android devices',
        highlighted: true
      },
      { 
        id: 'blackberry', 
        imgSrc: 'images/blackberry.svg', 
        altAttr: 'BlackBerry logo', 
        titleAttr: 'Highlight BlackBerry devices',
        highlighted: true
      },
      { 
        id: 'windows', 
        imgSrc: 'images/windows.svg', 
        altAttr: 'Windows Phone logo', 
        titleAttr: 'Highlight Windows Phone devices',
        highlighted: true
      },
      { 
        id: 'webos', 
        imgSrc: 'images/webos.svg', 
        altAttr: 'webOS logo', 
        titleAttr: 'Highlight webOS devices',
        highlighted: true
      },
      { 
        id: 'playstation', 
        imgSrc: 'images/playstation.svg', 
        altAttr: 'PlayStation logo', 
        titleAttr: 'Highlight PlayStation devices',
        highlighted: true
      }
    ];

    $http.get('data/mobileDevices.json')
       .then(function(res){

          $scope.devicesOriginal = res.data;

          // sanity check:
          // console.log( "json length: ", $scope.devicesOriginal.length );
          // $scope.devicesOriginal.length = 10; // truncate array for debugging only to work with a smaller dataset

          // get rid of devices that that are 0 x 0 and store in new array
          $scope.mobileDevicesAll = $filter( 'removeZeroPixelDevices' )( $scope.devicesOriginal );

          // sort all devices by width
          $scope.mobileDevicesAll = $filter( 'orderBy' )( $scope.mobileDevicesAll, '-pxWidth' );

          // group array by resolution
          $scope.mobileDevicesGrouped = $filter( 'groupDevicesBySize' )( $scope.mobileDevicesAll );

          // flatten group
          $scope.mobileDevicesFlatGroup = $filter( 'flattenGroupedDevices' )( $scope.mobileDevicesGrouped );
          $scope.mobileDevicesFlatGroup = $filter( 'orderBy' )( $scope.mobileDevicesFlatGroup, '-pxWidth' );
          $scope.mostCommonResolutionDevices = _.max( $scope.mobileDevicesFlatGroup, function(device){ return device.count; });

          // $scope.smallestResolutionDevices = null;
          // $scope.highestResolutionDevices = null;

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

    $scope.toggleDeviceHighlight = function(os) {

      if ( !os ) {
        return;
      }

      // toggle current state
      var filter = _.find( $scope.filters, function(filter){ return filter.id === os } );
      filter.highlighted = !filter.highlighted; 

      // broadcast so resolution-card can react to it
      $scope.$broadcast('EVENT_' + os.toUpperCase() + '_HIGHLIGHT_CHANGE', filter );

    }

  });
