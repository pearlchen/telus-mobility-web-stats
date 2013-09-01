'use strict';

angular.module('infographicApp')
  .directive('telusResolutionVis', function(){
    return {
      restrict: 'E', // usage: <telus-resolution-vis></telus-resolution-vis>
      replace: true,
      template: '<div class="resolution-vis" style="width:{{visWidth}}px;height:{{visHeight}}px;">' +
                '  <div id="tooltip" class="tooltip">' +
                '    <h3>{{tooltipDevice.pxWidth}}px by {{tooltipDevice.pxHeight}}px</h3>' +
                '    <p>' +
                '      <span ng-bind-html-unsafe="getIcon(tooltipDevice)"> ::{{getIcon(tooltipDevice)}}</span>' +
                '      {{tooltipDevice.deviceAlias && tooltipDevice.deviceAlias || tooltipDevice.deviceName}}</p>' + 
                '  </div>' + 
                '  <div>' +
                '    <telus-resolution-card ng-repeat="device in mobileDevices" device="device" order="$index" offset="numCards-$index">' +
                '    </telus-resolution-card>' +
                '  </div>' +
                '</div>',
      scope: true,
      controller: function( $scope ) {

        // these 2 properties rely on $scope.mobileDevices
        $scope.numCards = 0;      // = scope.$parent.countDevices();
        $scope.maxCardHeight = 0; // = scope.$parent.getDeviceProperty('pxHeight','max');

        // layout
        $scope.visHeight = 0;
        $scope.visWidth = 0;
        $scope.cardScale = 0.2;
        $scope.marginTight = 5;
        $scope.marginRoomy = 10;
        $scope.cardLeftMargin = $scope.marginTight;
        $scope.cardTopMargin = 0;

        // card interactions
        $scope.selectedCard = [];
        $scope.selectedOrder;
        $scope.cardsDeactivated = false;
        $scope.previousMouseEvent = null; //for getting x,y

        // tooltip
        $scope.showTooltip = false;
        $scope.tooltipDevice; // = { pxWidth: 0, pxHeight: 0, deviceName: '' };
        $scope.visOffset = { left: 0, top: 0 };

        this.getScaledUnit = function( pixels ) {
          return Math.round( pixels * $scope.cardScale );
        }

        this.getTopPositionForCard = function( cardHeight ) {
          return this.getScaledUnit( $scope.maxCardHeight - cardHeight );
        };

        this.getLeftPositionForCard = function( cardOrder ) {
          return ( $scope.numCards - cardOrder ) * $scope.cardLeftMargin;
        };

        $scope.resetSelectedCard = function( newCard ) {
          if ( $scope.selectedCard && $scope.selectedCard.length > 0 ) {
            $scope.selectedCard.removeClass("selected");
            $scope.selectedOrder = null;
            $scope.resetAllCardLeftPositions();
          }
          if ( newCard ) {
            $scope.selectedOrder = angular.element(newCard).scope().order;
            return newCard;
          }
        }

        $scope.setAllPointerInteractions = function(pointerValue) {

          // temp hack for the tooltip since it flashes with keydown:
          $('#tooltip').css('z-index', function(){
            return pointerValue === 'none' ? -1 : 1000;
          });

          // deactivate all the cards
          $scope.cardsDeactivated = pointerValue === 'none' ? true : false;
          $('.resolution-card').each(function( i, card ){
            var cardOrder = angular.element(card).scope().order;
            $(card).css( 'pointer-events', pointerValue );
          });

        }

        this.getVisHeight = function() {
          return $scope.visHeight;
        }

        $scope.positionToolTip = function( mouseX, mouseY ) {

          var tooltip = $("#tooltip"),
              w = tooltip.outerWidth(),
              h = tooltip.outerHeight();
              
          // tooltip anchored to top left
          var x = ( mouseX || 0 ) - $scope.visOffset.left,
              y = ( mouseY || 0 ) - $scope.visOffset.top,
              pad = 10,
              proposedX = x + pad,
              proposedY = y + pad;
          
          // but if the tooltip is going to go offscreen on the right, flip to being on the left
          // and if the tooltip is going to go offscreen on the bottom, flip to being on top
          x = ( proposedX + w < $scope.visWidth ) ? ( proposedX ) : ( x - w - pad ); 
          y = ( proposedY + h < $scope.visHeight ) ? ( proposedY ) : ( y - h - pad ); 

          tooltip.addClass('show').css({ left: x, top: y });

        }

        $scope.hideToolTip = function() {
          $('#tooltip').removeClass('show').removeAttr("style");
        }

        this.getSimpleOsName = function( fullOsName ) {

          var os = fullOsName.toLowerCase();
          if ( os === 'android' ) {
            return 'android';
          }
          else if ( os === 'ios' ) {
            return 'ios';
          }
          else if ( os.indexOf('windows') > -1 ) {
            return 'windows';
          }
          else if ( os.indexOf('blackberry') > -1 ) {
            return 'blackberry';
          }
          else if ( os.indexOf('webos') > -1 ) {
            return 'webos';
          }
          else if ( os.indexOf('playstation') > -1 ) {
            return 'playstation';
          }
          else {
            return undefined;
          }

        }
        

      },
      link: function ( scope, element, attrs, visCtrl ) {

        scope.getIcon = function(device) {

          if ( device && device.os ) {
            var os =  visCtrl.getSimpleOsName( device.os );
            if ( os !== '' ){
              return '<img src="images/' + os + '.svg" width="12" height="12" alt="" />';
            }
            else {
              return '';
            }
          }

        }

        scope.resetAllCardLeftPositions = function() {
          $('.resolution-card').each(function( i, card ){
            var cardOrder = angular.element(card).scope().order;
            $(card).css( 'left', visCtrl.getLeftPositionForCard( cardOrder ) );
          });
        }

        //TODO: make the position of the selected card to be underneath the mouse cursor.

        // scope versus test testing...
        // console.log( "parent link: ", controller, controller.test );

        console.log( "viz", visCtrl );

        // TODO: either move this event back into the card IF pointer-events: none; is not cross platform enough

        scope.visOffset = { left: element.offset().left, 
                            top: element.offset().top };

        element.on('click', '.resolution-card', function(event){

          // store event target
          var selectedCard = event.target;
          // var selectedOrder = angular.element(selectedCard).scope().order;

          // if ( scope.selectedCard && scope.selectedCard.length > 0 ) {
          //   console.log( selectedOrder, " === ", scope.selectedOrder );
          //   if ( scope.selectedOrder && selectedOrder === scope.selectedOrder ) {
          //     console.log( "same" );
          //     scope.resetSelectedCard();
          //     return;
          //   }
          // }

          // reset all the other card positions
          scope.selectedCard = scope.resetSelectedCard( $(selectedCard) ).addClass("selected");

          // no need to create a jQuery object to get the attribute 

          // move selected card
          var shiftLeft,
              prevCard = scope.selectedCard.next(selectedCard)[0]; // previous card is actually the NEXT one in the DOM tree
          
          if ( prevCard ) {

            // TODO: instead use current card's order            
            // console.log( angular.element(prevCard).scope().order );
            var prevCardOffsetLeft = visCtrl.getLeftPositionForCard( angular.element(prevCard).scope().order )
            shiftLeft = prevCardOffsetLeft + prevCard.offsetWidth + scope.cardLeftMargin;

          }else{
            shiftLeft = 0;
          }
          
          $(selectedCard).css('left', shiftLeft );

          // move all cards behind selected card
          var shiftFollowingLeft = shiftLeft + selectedCard.offsetWidth;
          var followingCards = $(event.target).prevUntil(event.target);
          followingCards.each(function( i, card ){
            // $(card).css('left', shiftLeft + ( (i+1) * scope.cardLeftMargin) );
            var cardOffset = (i+1) * scope.cardLeftMargin;
            $(card).css('left', shiftFollowingLeft + cardOffset );
          });

          // update tooltip
          var device = angular.element(event.target).scope().device;
          scope.$apply(function(){
            scope.tooltipDevice = device;
          });

          // show tooltip and update position based on mouse
          scope.positionToolTip( event.pageX, event.pageY );

        });

        element.on('mouseenter', '.resolution-card', function(event){
          var device = angular.element(event.target).scope().device;
          scope.$apply(function(){
            scope.tooltipDevice = device;
          });
        });

        // update position of tooltip
        element.on('mousemove', function(event){

          if ( event.target.className.indexOf('resolution-card') === -1 ) {
            scope.hideToolTip();
          }else{

            // if ( event.target.className.indexOf('selected') > -1 ) {
            //   return;
            // }

            // show tooltip and update position based on mouse
            scope.positionToolTip( event.pageX, event.pageY );

          }

        });

        element.on('mouseleave', function(event){
          scope.hideToolTip();
        });

        $(document).on('keydown', function(event){

          if ( scope.selectedCard && scope.selectedCard.length > 0 ) {

            var card; 
            if ( event.which === 37 ) { // left arrow key
              card = scope.selectedCard.next(scope.selectedCard)[0];
            }else if ( event.which ===  39 ) { // right arrow key
              card = scope.selectedCard.prev(scope.selectedCard)[0];
            }
            if ( card ) {
              // TODO: can/should I disable all rollovers when using only the keyboard?
              scope.setAllPointerInteractions('none');

              // Note: oldCard and cursor:none/pointer stuff is because 
              // mouseleave/mouseout are not triggered once you start using the keyboard.
              // Otherwise, old card stays :hover highlighted despite it not being selected anymore
              var oldCard = $(scope.selectedCard);
              oldCard.css({cursor:'none'});
              scope.resetSelectedCard( card );
              $(card).trigger('click');
              oldCard.css({cursor:'pointer'});
            }
          }

        });

        $(document).on('mousemove', function(event){

          if ( scope.cardsDeactivated ){
            if ( !scope.previousMouseEvent ) {
              // first mouse move after using keyboard so we need to store the pageX/pageY for later comparision
              scope.previousMouseEvent = event;
              return;
            }
            // console.log( event.pageX, event.pageY );
            if ( event.pageX !== scope.previousMouseEvent.pageX || event.pageY !== scope.previousMouseEvent.pageY ) {
              // mouse has actually moved (browser will re-show cursor by default)
              scope.setAllPointerInteractions('auto');
              scope.previousMouseEvent = null;
            }
          }
        });

        // TODO: Add sideways scrolling to move resolution-vis
        // var lastScrollLeft = 0;
        // $(window).scroll(function(event) {
        //   var documentScrollLeft = $(window).scrollLeft();
        //   var distance = lastScrollLeft - documentScrollLeft;
        //   console.log( distance );
        //   if ( documentScrollLeft !== 0 ) {

        //     $(".resolution-vis").css('left', function(){

        //                           // console.log( $(this).offset().left, " - ", documentScrollLeft, " >>> ", $(this).offset().left + documentScrollLeft );
                                  
        //                           var targetLeft = $(this).offset().left;
        //                           if ( distance > 0 ) {
        //                             targetLeft += 1;
        //                           }else{
        //                             targetLeft -= 1;
        //                           }
        //                           return $(this).css('left', targetLeft+'px');
        //                         });

        //     lastScrollLeft = documentScrollLeft;
        //   }
        // });

        scope.$watch('mobileDevices', function(){

          if ( scope.mobileDevices.length === 0 ){
            return;
          }

          // update variables for positioning
          scope.maxCardHeight = scope.$parent.getDeviceProperty('pxHeight','max');
          scope.numCards = scope.$parent.countDevices();

          // update dom bindings
          scope.visHeight = visCtrl.getScaledUnit( scope.maxCardHeight ) + scope.cardTopMargin;
          scope.visWidth = visCtrl.getLeftPositionForCard( 0 ) + visCtrl.getScaledUnit( scope.mobileDevices[0].pxWidth );

        });

        scope.$watch('displayGrouped', function(){
          scope.cardLeftMargin = scope.displayGrouped ? scope.marginRoomy : scope.marginTight;
        });

      }
    };
  });
