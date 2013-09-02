'use strict';

angular.module('infographicApp')
  .directive('telusResolutionCard', function($timeout){
    return {
      require:'^telusResolutionVis',
      scope: { 
        device: '=', 
        order: '=',
        offset: '='
      },
      restrict: 'E', // usage: <telus-resolution-card device="deviceObject" order="orderObj" offset="numDevices-orderObj" />
      replace: true,
      template: '<div class="resolution-card {{deviceOsClass}}" ' +
                '    ng-class="{ highlight:isHighlighted, phone:isPhone, tablet:isTablet }" ' +
                '    ng-style="cardStyle"' +
                '  >' +
                '  <div class="resolution-title">' + 
                '    {{device.pxWidth}}' +
                '    <span class="res-divider" ng-class="{ multiline:multilineResolution }" >' +
                '      x' +
                '    </span>' + 
                '    {{device.pxHeight}}' +
                '    <span ng-show="device.count" class="count" ng-class="{ multiline:multilineResolution }" >' +
                '      ({{device.count}})' +
                '    </span>' +
                '  </div>' + 
                '  <div class="device-names">{{deviceDisplayName}}</div>' + 
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
        $scope.deviceDisplayName = '';
        $scope.multilineResolution = false;

      },
      link: function ( scope, element, attrs, visCtrl ) {

        // don't display devices that have no resolution specs:
        if ( scope.device.pxWidth === 0 && scope.device.pxHeight === 0 ) {
          return;
        }

        // wrap in $watch since the model changes in main.js and this directive is also part of a ng-repeat
        // TODO: verify the above comment...
        scope.$watch('device', function() {

          // update css style based on device specs:
          var defaultTop = visCtrl.getVisHeight(),
              top     = visCtrl.getTopPositionForCard( scope.device.pxHeight ),
              width   = visCtrl.getScaledUnit( scope.device.pxWidth ),
              height  = visCtrl.getScaledUnit( scope.device.pxHeight ),
              left    = visCtrl.getLeftPositionForCard( scope.order );

          scope.cardStyle = { width:  width + 'px',
                              height: height + 'px',
                              left:   left + 'px',
                              top:    defaultTop + 'px', //offscreen to start, animated in in $timeout()
                              opacity: 0 // invisible to start, animated in in $timeout()
                            }

          // create staggered css animation:
          var animationDelay = 30; //30 seems just quick enough but not too quick...

          $timeout( function(){
            scope.cardStyle.top = top + 'px';
            scope.cardStyle.opacity = 1;
          }, scope.offset * animationDelay );
          
          // update label
          scope.deviceDisplayName = scope.device.deviceAlias || scope.device.deviceName;

          // in the case where the resolution is small (width-wise),
          // break card label onto two lines:
          // var title = $('.resolution-title'); // trying to avoid DOM lookup
          if ( scope.device.pxWidth < 360 ) {
            scope.multilineResolution = scope.device.pxHeight < 320 ? false : true;
          }else{
            scope.multilineResolution = false;
          }

          // update classes:
          scope.isPhone = scope.device.isPhone;
          scope.isTablet = !scope.device.isPhone;

          scope.deviceOsClass = visCtrl.getSimpleOsName( scope.device.os );

          if ( scope.deviceOsClass ) {
            var filter = _.find( scope.$parent.filters, function(filter){ return filter.id === scope.deviceOsClass } );
            scope.isHighlighted = filter.highlighted; 
          }

        });

        // listen for changes in the device OS highlight filter in main.js:
        scope.$watch('deviceOsClass',function(){
          
          if ( !scope.deviceOsClass ) {
            return;
          } 

          scope.$on('EVENT_' + scope.deviceOsClass.toUpperCase() + '_HIGHLIGHT_CHANGE', function(event, filter){
            scope.isHighlighted = filter.highlighted;
          });

        });

        // when switching views...
        scope.$on('$destroy', function() {
          console.log("destroy");
          // TODO: remove listeners
        });

      }
    };
  });