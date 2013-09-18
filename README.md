# README

An interactive infographic breaking down the various mobile devices and resolutions using real analytics stats from telusmobility.com. 

[http://pchen.github.io/telus-mobility-web-stats](http://pchen.github.io/telus-mobility-web-stats)
 
## Items left to do:

### Stats
- Traffic % stats aren't part of visualization (maybe it affects opacity)

### Clean up resolution-vis.js code
- clean up the methods in the 'controller' versus the directive 'link'
- move more of the DOM stuff to data binding or event broadcasts
- move tooltips into its own directive
- allow scrolling (and swiping) of resolution cards (maybe this library: http://ftlabs.github.io/ftscroller/examples/galleryscrollers.html)

### Clean up filterDevices.js code
- do a little bit of optimization
- figure out if I can still pull out smallestResolutionDevices and highestResolutionDevices from 2D grouped array
- when sorting devices by width, it doesn't do an additional sort by height so devices of the exact same size aren't side by side.

### Mobile-friendly version
- does not work so great on small touch devices (ironic, right?)