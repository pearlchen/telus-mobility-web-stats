'use strict';

angular.module('infographicApp')
  .directive('telusResolutionVis', function(){
    return {
      restrict: 'E', // usage: <telus-resolution-vis />
      replace: true,
      template: '<div class="resolution-vis">' +
                '  <telus-resolution-card ng-repeat="device in mobileDevices" device="device" deviceIndex="{{$index}}" />' +
                '</div>',
      scope: true,
      controller: function( $scope ) {

        // $scope.colors = [ '#A600A6', '#7C1F7C', '#6C006C', '#D235D2', '#D25FD2' ];
        $scope.colors = [ '#E599E5', '#AC81AC', '#953295', '#F2B6F2', '#F2C6F2' ];

        $scope.getRandomColor = function() {
          var i = Math.floor( Math.random() * $scope.colors.length );
          return $scope.colors[i];
        };

        //TODO: fix up
        $scope.getGroupedColor = function(index) {
          var index = index || 0;
          var percent = Math.round( index / $scope.mobileDevices.length * 10 );
          var i = Math.round( $scope.colors.length * percent );
          // console.log ( percent, i, $scope.colors[i] );
          // return $scope.colors[i];
          return "white";
        }

      },
      link: function ( scope, element, attrs ) {
            
        scope.maxHeight = scope.$parent.getMaxHeight();
        scope.maxWidth = scope.$parent.getMaxWidth();
        scope.dimensionScale = 0.2;
        scope.cardOffset = 10;
        scope.numSizes = scope.$parent.mobileDevices.length; //!should be the grouped number of sizes
        scope.click = {};

        scope.getScaledUnit = function( pixels ) {
          return Math.round( pixels * scope.dimensionScale ) + 'px';
        }

        scope.getScaledTopPosition = function( height ) {
          return scope.getScaledUnit( scope.maxHeight - height );
        };

        scope.getLeftPosition = function( index ) {
          return ( scope.numSizes *  scope.cardOffset ) - ( index * scope.cardOffset );
        };

        scope.setContainerWidth = function( width ) {
          element.css( 'width', width );
        }

        scope.revealSelectedCard = function( card ) {
          var deviceName = card.deviceAlias || card.deviceName;
          console.log( 'container: ', deviceName );
        }

        scope.resetAllCardLeftPositions = function() {
          $('.resolution-card').each(function( i, card ){
            $(card).css( 'left', scope.getLeftPosition( card.getAttribute('deviceIndex') ) );
          });
        }
      
        // scope.setClickCallback = function( callback ) {
        //   console.log( callback );
        //   scope.click = callback; 
        // }

        // scope.fun = function(index){
        //     console.log('hi from controller', index );      
        // };

        scope.clicked;
        
        // update dom

        element.css( {  height: scope.getScaledUnit( scope.maxHeight ) } );

        // update the width after all ng-repeat is done
        // TODO: this only works after the FIRST one, not the last, so using scope.$first in the child directive
        // scope.$watch('resolutionVis', function(newValue, oldValue, scope) {
        // });

        scope.selectedCard;

        scope.resetSelected = function( newCard ) {
          if ( scope.selectedCard ) {
            $( scope.selectedCard ).removeClass("selected");
            scope.resetAllCardLeftPositions();
          }
          scope.selectedCard = newCard;
          $(newCard).addClass("selected");
        }

        element.on('click', function(event){

          // store event target
          var selectedCard = event.target;

          // check if it's a card based on the classnote, note that it will have an additional class of 'ng-scope'
          if ( selectedCard.className.indexOf('resolution-card') === -1 ) {
            return;
          }

          // reset all the other card positions
          scope.resetSelected(selectedCard);

          // no need to create a jQuery object to get the attribute 
          // var deviceIndex = selectedCard.getAttribute('deviceIndex');        
          // console.log( "deviceIndex: " , deviceIndex );

          // move selected card
          var prevCard = $(selectedCard).next(selectedCard)[0]; // previous card is actually the NEXT one in the DOM tree
          if ( prevCard ) {
            var prevCardOffsetLeft = scope.getLeftPosition( prevCard.getAttribute('deviceIndex') )
            var shiftLeft = prevCardOffsetLeft + prevCard.offsetWidth + scope.cardOffset;
            $(selectedCard).css('left', shiftLeft );

            // move all cards behind selected card
            var shiftFollowingLeft = shiftLeft + selectedCard.offsetWidth + scope.cardOffset;
            var followingCards = $(event.target).prevUntil(event.target);
            followingCards.each(function( i, card ){
              // $(card).css('left', shiftLeft + ( (i+1) * scope.cardOffset) );
              var cardOffset = (i+1) * scope.cardOffset;
              $(card).css('left', shiftFollowingLeft + cardOffset );
            });
          }

        });

        $(document).on('keydown', function(event){

          if ( scope.selectedCard ) {
            // TODO: can I disable rollovers?

            var card; 
            if ( event.which === 37 ) {
              // left arrow key
              card = $(scope.selectedCard).next(scope.selectedCard)[0];
            }else if ( event.which ===  39 ) {
              // right arrow key
              card = $(scope.selectedCard).prev(scope.selectedCard)[0];
            }
            if ( card ) {
              scope.resetSelected( card );
              $(card).click();
            }
          }

        });

      }
    };
  });


angular.module('infographicApp')
  .directive('telusResolutionCard', function(){
    return {
      restrict: 'E', // usage: <telus-resolution-card device="deviceObject" />
      replace: true,
      template: '<div class="resolution-card">' +
                '  <div class="resolution-title">' + 
                '    {{device.pxWidth}}' +
                '    <span class="res-divider">x</span>' + 
                '    {{device.pxHeight}}' +
                '  </div>' + 
                '  <div class="device-names">{{getDeviceName()}}</div>' + 
                '</div>',
      // scope: { device: '=device' },
       scope: true,
      controller: function( $scope, $element, $attrs ) {

        $scope.getDeviceName = function() {
          return $scope.device.deviceAlias || $scope.device.deviceName;
        };

        // $scope.showDeviceModel = function( ) {
        //   console.log( 'card: ', $scope.getDeviceName() );
        //   // event.stopPropagation();
        //   // $scope.$parent.revealSelectedCard( $scope.device );
        // }



      },
      link: function ( scope, element, attrs ) {

        if ( scope.device.pxWidth === 0 && scope.device.pxHeight === 0 ) {
          return;
        }



        // put this in so dom update only fires once
        // TODO: look into why??
        scope.$watch('', function() {
  
          // update dom
          element.css( {  width:  scope.$parent.getScaledUnit(scope.device.pxWidth),
                          height: scope.$parent.getScaledUnit(scope.device.pxHeight),
                          top:    scope.$parent.getScaledTopPosition(scope.device.pxHeight),
                          left:   scope.$parent.getLeftPosition(scope.$index)
                        } );
  
          var title = element.children();
          if ( title.height() > 15 ) {
            element.find('.res-divider').addClass("multiline");
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
          scope.$parent.setContainerWidth( containerWidth );
        }

      }
    };
  });