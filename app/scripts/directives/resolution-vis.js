'use strict';

angular.module('infographicApp')
  .directive('telusResolutionVis', function(){
    return {
      restrict: 'E', // usage: <telus-resolution-vis />
      replace: true,
      template: '<div class="resolution-vis">' +
                '  <telus-resolution-card ng-repeat="device in mobileDevices" device="device" order="$index" />' +
                '</div>',
      scope: true,
      controller: function( $scope ) {

        // these 3 properties rely on $scope.mobileDevices being loaded from json
        $scope.maxHeight = 0; // = scope.$parent.getDeviceProperty('pxHeight','max');
        $scope.numSizes = 0;  // = scope.$parent.countDevices();

        // layout
        $scope.dimensionScale = 0.2;
        $scope.cardOffset = 10;
        $scope.selectedCard;

        $scope.getScaledUnit = function( pixels ) {
          return Math.round( pixels * $scope.dimensionScale ) + 'px';
        }

        $scope.getScaledTopPosition = function( height ) {
          return $scope.getScaledUnit( $scope.maxHeight - height );
        };

        $scope.getLeftPosition = function( index ) {
          return ( $scope.numSizes *  $scope.cardOffset ) - ( index * $scope.cardOffset );
        };

        $scope.setContainerWidth = function( element, width ) {
          element.css( 'width', width );
        }

        $scope.resetAllCardLeftPositions = function() {
          $('.resolution-card').each(function( i, card ){
            $(card).css( 'left', $scope.getLeftPosition( angular.element(card).scope().order ) );
          });
        }

        $scope.resetSelectedCard = function( newCard ) {
          if ( $scope.selectedCard ) {
            $( $scope.selectedCard ).removeClass("selected");
            $scope.resetAllCardLeftPositions();
          }
          $scope.selectedCard = newCard;
          $(newCard).addClass("selected");
        }

        /*

        // $scope.colors = [ '#A600A6', '#7C1F7C', '#6C006C', '#D235D2', '#D25FD2' ];
        $scope.colors = [ '#E599E5', '#AC81AC', '#953295', '#F2B6F2', '#F2C6F2' ];

        $scope.getRandomColor = function() {
          var i = Math.floor( Math.random() * $scope.colors.length );
          return $scope.colors[i];
        };

        //TODO: fix up
        $scope.getGroupedColor = function(index) {
          var index = index || 0;
          var percent = Math.round( index / $scope.countDevices() * 10 );
          var i = Math.round( $scope.colors.length * percent );
          // console.log ( percent, i, $scope.colors[i] );
          // return $scope.colors[i];
          return "white";
        }

        */

        // scope versus test testing...
        // this.test = "test";
        // return (this);

      },
      link: function ( scope, element, attrs, controller ) {
            
        //TODO: make the position of the selected card to be underneath the mouse cursor.

        // scope versus test testing...
        // console.log( "parent link: ", controller, controller.test );

        // TODO: either move this event back into the card IF pointer-events: none; is not cross platform enough

        element.on('click', function(event){

          // store event target
          var selectedCard = event.target;
          console.log( selectedCard );

          // check if it's a card based on the classnote, note that it will have an additional class of 'ng-scope'
          if ( selectedCard.className.indexOf('resolution-card') === -1 ) {
            return;
          }


          // reset all the other card positions
          scope.resetSelectedCard(selectedCard);

          // no need to create a jQuery object to get the attribute 

          // move selected card
          var shiftLeft,
              prevCard = $(selectedCard).next(selectedCard)[0]; // previous card is actually the NEXT one in the DOM tree
          
          if ( prevCard ) {
            
            // console.log( angular.element(prevCard).scope().order );

            var prevCardOffsetLeft = scope.getLeftPosition( angular.element(prevCard).scope().order )
            shiftLeft = prevCardOffsetLeft + prevCard.offsetWidth + scope.cardOffset;

          }else{
            shiftLeft = 0;
          }
          
          $(selectedCard).css('left', shiftLeft );

          // move all cards behind selected card
          var shiftFollowingLeft = shiftLeft + selectedCard.offsetWidth + scope.cardOffset;
          var followingCards = $(event.target).prevUntil(event.target);
          followingCards.each(function( i, card ){
            // $(card).css('left', shiftLeft + ( (i+1) * scope.cardOffset) );
            var cardOffset = (i+1) * scope.cardOffset;
            $(card).css('left', shiftFollowingLeft + cardOffset );
          });

        });


        $(document).on('keydown', function(event){

          if ( scope.selectedCard ) {

            var card; 
            if ( event.which === 37 ) { // left arrow key
              card = $(scope.selectedCard).next(scope.selectedCard)[0];
            }else if ( event.which ===  39 ) { // right arrow key
              card = $(scope.selectedCard).prev(scope.selectedCard)[0];
            }
            if ( card ) {
              // Note: oldCard and cursor:none/pointer stuff is because 
              // mouseleave/mouseout are not triggered once you start using the keyboard.
              // Otherwise, old card stays :hover highlighted despite it not being selected anymore
              // TODO: can/should I disable all rollovers when using only the keyboard?
              var oldCard = $(scope.selectedCard);
              oldCard.css({cursor:'none'});
              scope.resetSelectedCard( card );
              $(card).trigger('click');
              oldCard.css({cursor:'pointer'});
            }
          }

        });

        scope.$watch('mobileDevices', function(){

          // update variables for positioning
          scope.maxHeight = scope.$parent.getDeviceProperty('pxHeight','max');
          scope.numSizes = scope.$parent.countDevices();

          // update dom
          element.css( {  height: scope.getScaledUnit( scope.maxHeight ) } );

        });

      }
    };
  });
