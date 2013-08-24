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

        // put this in so dom update only fires once
        // TODO: look into why??
        scope.$watch('', function() {

          // update dom
          element.css( {  width:  scope.$parent.getScaledUnit(scope.device.pxWidth),
                          height: scope.$parent.getScaledUnit(scope.device.pxHeight),
                          top:    scope.$parent.getScaledTopPosition(scope.device.pxHeight),
                          left:   scope.$parent.getLeftPosition(scope.order)
                        } );
  
          var title = element.children();
          if ( title.height() > 15 ) {
            element.find('.res-divider').addClass("multiline");
          }

          if ( !scope.device.isPhone ) {
            element.addClass("tablet");
          }

        });

        // TODO: what's the best way to use ng-class in a directive that uses ng-repeat?
        // usage in template property: ng-class="{multiline: isMultiline()}"
        // scope.isMultiline = function() {
        //   // check if title is breaking over two lines already
        //   var title = element.children();
        //   var multiline = ( title.height() >= 15 ? true : false );
        //   console.log( title.height(), multiline );
        //   return multiline;
        //   // return true;
        // };

        // events
        // element.on( 'click', scope.showDeviceModel );

        if (scope.$first){
          var firstCard = $(element)[0],
              containerWidth = ( firstCard.offsetLeft + firstCard.offsetWidth ) + 'px';
          scope.$parent.setContainerWidth( element, containerWidth );
        }

      }
    };
  });