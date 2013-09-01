'use strict';

angular.module('infographicApp')
  .directive('telusResolutionCard', function($timeout){
    return {
      require:'^telusResolutionVis',
      scope: { 
        device: '=', 
        order: '='
      },
      restrict: 'E', // usage: <telus-resolution-card device="deviceObject" order="orderObj" />
      replace: true,
      template: '<div class="resolution-card {{deviceOsClass}}" ' +
                '    ng-class="{ highlight:isHighlighted, phone:isPhone, tablet:isTablet }" ' +
                '    ng-style="cardStyle"' +
                '  >' +
                '  <div class="resolution-title">' + 
                '    {{device.pxWidth}}' +
                '    <span class="res-divider" ng-class="{ multiline:multilineResolution }">x</span>' + 
                '    {{device.pxHeight}}' +
                '    <span class="count" ng-show="device.count">({{device.count}})</span>' +
                '  </div>' + 
                '  <div class="device-names">{{getDeviceName()}}</div>' + 
                '</div>',
      controller: function( $scope, $element, $attrs ) {

        // css classes
        $scope.deviceOsClass;
        $scope.isHighlighted;
        $scope.isPhone;
        $scope.isTablet;

        // css styles
        $scope.cardStyle;

        // card labels
        $scope.multilineResolution = false;

        $scope.updateHighlight = function( highlightedOs ) {
          var highlightedOs = highlightedOs || $scope.$parent.highlightedOs;
          var i = _.indexOf( highlightedOs, $scope.deviceOsClass );
          $scope.isHighlighted = ( i === -1 ) ? false : true;
        }

        $scope.getDeviceName = function() {
          return $scope.device.deviceAlias || $scope.device.deviceName;
        };

      },
      link: function ( scope, element, attrs, controller ) {

        // don't display devices that have no resolution specs:
        if ( scope.device.pxWidth === 0 && scope.device.pxHeight === 0 ) {
          return;
        }

        // wrap in $watch since the model changes in main.js and this directive is also part of a ng-repeat
        // TODO: verify the above comment...
        scope.$watch('device', function() {

          // update css style based on device specs:
          var defaultTop = scope.$parent.getVisHeight(),
              top = scope.$parent.getTopPositionForCard(scope.device.pxHeight),
              width = scope.$parent.getScaledUnit(scope.device.pxWidth),
              height = scope.$parent.getScaledUnit(scope.device.pxHeight),
              left = scope.$parent.getLeftPositionForCard(scope.order);

          scope.cardStyle = { width:  width + 'px',
                              height: height + 'px',
                              left:   left + 'px',
                              top:    defaultTop + 'px', //offscreen to start, animated in in $timeout()
                              opacity: 0 // invisible to start, animated in in $timeout()
                            }

          // create staggered css animation:
          var numDevices = scope.$parent.countDevices(),
              animationDelay = ( numDevices - scope.order ) * 30;

          $timeout( function(){
            scope.cardStyle.top = top + 'px';
            scope.cardStyle.opacity = 1;
          }, animationDelay );
          
          // in the case where the resolution is small (width-wise),
          // break card label onto two lines:
          if ( scope.device.height >= 320 && title.height() > 15 ) {
            $scope.multilineResolution = true;
          }

          // update classes:
          scope.deviceOsClass = scope.$parent.getSimpleOsName( scope.device.os );
          scope.isPhone = scope.device.isPhone;
          scope.isTablet = !scope.device.isPhone;
          scope.updateHighlight(); // pass null to update highlight using filters set in $parent

        });

        // listen for changes in the device OS highlight filter in main.js:
        scope.$on('EVENT_OS_HIGHLIGHT_CHANGE', function(event, args){
          scope.updateHighlight(args);
        });

      }
    };
  });