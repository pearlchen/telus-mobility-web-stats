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
                // '  <div class="device-names"><span ng-bind-html-unsafe="deviceDisplayName"></span></div>' + 
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

        $scope.shadeColor = function(color, percent) {   
          var num = parseInt(color,16),
          amt = Math.round(2.55 * percent),
          R = (num >> 16) + amt,
          B = (num >> 8 & 0x00FF) + amt,
          G = (num & 0x0000FF) + amt;
          return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
        }

      },
      link: function ( scope, element, attrs, visCtrl ) {

        // don't display devices that have no resolution specs:
        if ( scope.device.pxWidth === 0 && scope.device.pxHeight === 0 ) {
          return;
        }

        // wrap in $watch since the model changes in main.js and this directive is also part of a ng-repeat
        // TODO: verify the above comment...

        var highlightWatcher;

        var deviceWatcher = scope.$watch('device', function() {

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

          if ( scope.$parent.displayGrouped ) {
            var targetOpacity = scope.device.count / scope.$parent.countDevices() * 15;
            var seedColor = scope.shadeColor( "8FCBE3", -targetOpacity );
            scope.cardStyle.backgroundColor = "#" + seedColor;
            scope.cardStyle.borderColor = "#" + scope.shadeColor( seedColor, -10 ); // -10 to make CSS/SASS color combo
            scope.cardStyle.color = "#" + scope.shadeColor( seedColor, -30 ); // -30 to make CSS/SASS color combo
          }

          // create staggered css animation:
          var animationDelay = 30; //30 seems just quick enough but not too quick...

          $timeout( function(){
            scope.cardStyle.top = top + 'px';
            scope.cardStyle.opacity = 1;
          }, scope.offset * animationDelay );
          
          // update label
          if ( scope.device.deviceName instanceof Array ) {
            scope.deviceDisplayName = scope.device.deviceName.join("<br />");
          }
          else {
            scope.deviceDisplayName = scope.device.deviceAlias || scope.device.deviceName;
          }

          // in the case where the resolution is small (width-wise),
          // break card label onto two lines:
          // var title = $('.resolution-title'); // trying to avoid DOM lookup
          if ( scope.device.pxWidth < 360 ) {
            scope.multilineResolution = scope.device.pxHeight <= 320 ? false : true;
          }else{
            scope.multilineResolution = false;
          }

          // update classes:
          scope.isPhone = scope.device.isPhone;
          scope.isTablet = !scope.device.isPhone;

          if ( scope.device.os instanceof Array ) {
            // hmm, anything to do here?
          }
          else{
            scope.deviceOsClass = visCtrl.getSimpleOsName( scope.device.os );
          }

          if ( scope.deviceOsClass ) {

            // initialize highlighted state
            var filter = _.find( scope.$parent.filters, function(filter){ return filter.id === scope.deviceOsClass } );
            scope.isHighlighted = filter.highlighted; 

            // listen for further changes
            highlightWatcher = scope.$on('EVENT_' + scope.deviceOsClass.toUpperCase() + '_HIGHLIGHT_CHANGE', function(event, filter){
              scope.isHighlighted = filter.highlighted;
            });

          }

        });

        // when switching views, clean up by removing listeners
        scope.$on('$destroy', function() {
          deviceWatcher();
          if ( highlightWatcher ) {
            highlightWatcher();
          }
        });

      }
    };
  });