'use strict';

angular.module('infographicApp')
  .directive('telusResolutionCard', function(){
    return {
      restrict: 'E', // usage: <telus-resolution-card device="deviceObject" order="orderObj" />
      replace: true,
      template: '<div class="resolution-card">' +
                '  <div class="resolution-title">' + 
                '    {{device.pxWidth}}' +
                '    <span class="res-divider">x</span>' + 
                '    {{device.pxHeight}}' +
                '    <span class="count" ng-show="device.count">({{device.count}})</span>' +
                '  </div>' + 
                '  <div class="device-names">{{getDeviceName()}}</div>' + 
                '</div>',
      require:'^telusResolutionVis',
      scope: { 
        device: '=', 
        order: '='
      },
      controller: function( $scope, $element, $attrs ) {

        $scope.getDeviceName = function() {
          return $scope.device.deviceAlias || $scope.device.deviceName;
        };

      },
      link: function ( scope, element, attrs, controller ) {

        // console.log( "controller", controller, controller.test );

        if ( scope.device.pxWidth === 0 && scope.device.pxHeight === 0 ) {
          // don't display devices that have no resolution specs
          return;
        }

        var numDevices = scope.$parent.countDevices();
        
        // put this in so dom update only fires once
        // TODO: look into why??
        scope.$watch('', function() {

          var defaultTop = scope.$parent.getVisHeight(),
              top = scope.$parent.getTopPositionForCard(scope.device.pxHeight),
              width = scope.$parent.getScaledUnit(scope.device.pxWidth),
              height = scope.$parent.getScaledUnit(scope.device.pxHeight),
              left = scope.$parent.getLeftPositionForCard(scope.order);

          // update css for each card
          element.css( {  width:  width + 'px',
                          height: height + 'px',
                          left:   left + 'px',
                          top:    defaultTop + 'px', //offscreen to start, animate in in setTimeout()
                          opacity: 0
                        } );

          // animation for css
          setTimeout( function(){
            element.css( {
              top: top + 'px',
              opacity: 1
            })
          }, (numDevices-scope.order) * 30 );
          

          var title = element.children();
          if ( title.height() > 15 ) {
            element.find('.res-divider').addClass("multiline");
          }

          if ( scope.device.isPhone ) {
            element.addClass("phone");
          }else{
            element.addClass("tablet");
          }

        });

        // events
        // element.on( 'click', scope.showDeviceModel );

      }
    };
  });