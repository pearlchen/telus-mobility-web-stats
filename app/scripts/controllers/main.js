'use strict';

angular.module('infographicApp')
  .controller('MainCtrl', function($scope) {

    $scope.mobileDevices = [{
      deviceName: 'Apple iPhone',
      deviceAlias: 'Apple iPhone 5',
      pxWidth: 640,
      pxHeight: 1136,
      size: 4.0,
      ppiResolution: 326,
      os: 'iOS',
      osVersion: 6.1,
      releaseDate: 'Sep 1, 2012'
    },
    {
      deviceName: 'Apple iPhone',
      deviceAlias: 'Apple iPhone 4S',
      pxWidth: 640,
      pxHeight: 960,
      size: 3.5,
      ppiResolution: 330,
      os: 'iOS',
      osVersion: 6.1,
      releaseDate: 'Oct 1, 2011'
    },
    {
      deviceName: 'Apple iPad',
      pxWidth: 1536,
      pxHeight: 2048,
      size: 9.7,
      ppiResolution: 264,
      os: 'iOS',
      osVersion: 6.0,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'Apple iPad mini',
      deviceAlias: 'Apple iPad',
      pxWidth: 768,
      pxHeight: 1024,
      size: 7.9,
      ppiResolution: 162,
      os: 'iOS',
      osVersion: 6.0,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'Apple iPod Touch',
      pxWidth: 640,
      pxHeight: 1136,
      size: 4.0,
      ppiResolution: 326,
      os: 'iOS',
      osVersion: 0,
      releaseDate: 'Oct 11, 2012'
    },
    {
      deviceName: 'Samsung Galaxy S3 (SGH-I747M)',
      deviceAlias: 'Samsung Galaxy S3',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.8,
      ppiResolution: 306,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'May 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy S4 (SGH-I337M)',
      deviceAlias: 'Samsung Galaxy S4',
      pxWidth: 1080,
      pxHeight: 1920,
      size: 5.0,
      ppiResolution: 441,
      os: 'Android',
      osVersion: 4.2,
      releaseDate: 'April 1, 2013'
    },
    {
      deviceName: 'Samsung Samsung Galaxy S II X (SGH-T989D)',
      pxWidth: 480,
      pxHeight: 800,
      size: 4.0,
      ppiResolution: 206,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Oct 1, 2011'
    },
    {
      deviceName: 'RIM PlayBook',
      pxWidth: 600,
      pxHeight: 1024,
      size: 7.0,
      ppiResolution: 170,
      os: 'BlackBerry PlayBook OS',
      osVersion: 2.1,
      releaseDate: 'Sep 1, 2011'
    },
    {
      deviceName: 'Samsung Galaxy Note 2 (SGH-I317M)',
      deviceAlias: 'Samsung Galaxy Note 2',
      pxWidth: 720,
      pxHeight: 1280,
      size: 5.5,
      ppiResolution: 267,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Aug 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy Discover (SGH-S730M)',
      pxWidth: 320,
      pxHeight: 480,
      size: 3.5,
      ppiResolution: 165,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy Tab 2 10.1 (GT-P5113)',
      pxWidth: 800,
      pxHeight: 1280,
      size: 10.1,
      ppiResolution: 149,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Feb 1, 2012'
    },
    {
      deviceName: 'RIM BlackBerry Z10',
      pxWidth: 768,
      pxHeight: 1280,
      size: 4.2,
      ppiResolution: 355,
      os: 'BlackBerry OS',
      osVersion: 10,
      releaseDate: 'Feb 1, 2013'
    },
    {
      deviceName: 'Samsung Galaxy Ace 2 x (GT-S7560M)',
      pxWidth: 480,
      pxHeight: 800,
      size: 4.0,
      ppiResolution: 4.0,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Nov 21, 2012'
    },
    {
      deviceName: 'LG E960/Nexus 4',
      deviceAlias: 'Google Nexus 4',
      pxWidth: 768,
      pxHeight: 1280,
      size: 4.7,
      ppiResolution: 318,
      os: 'Android',
      osVersion: 4.3,
      releaseDate: 'Oct 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy Ace (GT-S5830D)',
      pxWidth: 320,
      pxHeight: 480,
      size: 3.5,
      ppiResolution: 165,
      os: 'Android',
      osVersion: 2.3,
      releaseDate: 'Jan 1, 2011'
    },
    {
      deviceName: 'Google Nexus 7',
      pxWidth: 800,
      pxHeight: 1280,
      size: 7.0,
      ppiResolution: 216,
      os: 'Android',
      osVersion: 4.3,
      releaseDate: 'Jul 1, 2012'
    },
    {
      deviceName: 'RIM Bold (BlackBerry 9900)',
      pxWidth: 640,
      pxHeight: 480,
      size: 2.8,
      ppiResolution: 286,
      os: 'BlackBerry OS',
      osVersion: 7,
      releaseDate: 'Aug 1, 2011'
    },
    {
      deviceName: 'Samsung Galaxy Nexus',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.65,
      ppiResolution: 316,
      os: 'Android',
      osVersion: 4.3,
      releaseDate: 'Jan 1, 2012'
    },
    {
      deviceName: 'HTC Ace/Desire HD (A9192)',
      pxWidth: 480,
      pxHeight: 800,
      size: 4.3,
      ppiResolution: 217,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Oct 1, 2010'
    },
    {
      deviceName: 'LG Optimus One (P500h)',
      pxWidth: 320,
      pxHeight: 480,
      size: 3.2,
      ppiResolution: 180,
      os: 'Android',
      osVersion: 2.3,
      releaseDate: 'Oct 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy Tab 2 7.0 (GT-P3113)',
      pxWidth: 600,
      pxHeight: 1024,
      size: 7,
      ppiResolution: 170,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'May 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy Note (SGH-I717)',
      pxWidth: 800,
      pxHeight: 1280,
      size: 5.3,
      ppiResolution: 285,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Jan 1, 2012'
    },
    {
      deviceName: 'Samsung GT-P7510 Galaxy Tab 10.1',
      pxWidth: 1280,
      pxHeight: 800,
      size: 10.1,
      ppiResolution: 149,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Jul 1, 2011'
    },
    {
      deviceName: 'HTC Z520m',
      deviceAlias: 'HTC One S',
      pxWidth: 540,
      pxHeight: 960,
      size: 4.3,
      ppiResolution: 256,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Apr 1, 2012'
    },
    {
      deviceName: 'HTC Desire',
      pxWidth: 480,
      pxHeight: 800,
      size: 3.7,
      ppiResolution: 252,
      os: 'Android',
      osVersion: 2.2,
      releaseDate: 'Mar 1, 2010'
    },
    {
      deviceName: 'Unknown Generic Android Mobile',
      pxWidth: 0,
      pxHeight: 0,
      size: 0,
      ppiResolution: 0,
      os: 'Android',
      osVersion: 0,
      releaseDate: ''
    },
    {
      deviceName: 'HTC One',
      pxWidth: 1080,
      pxHeight: 1920,
      size: 4.7,
      ppiResolution: 469,
      os: 'Android',
      osVersion: 4.2,
      releaseDate: 'Mar 2013'
    },
    {
      deviceName: 'Samsung SGH-T959D/Galaxy S Facinate',
      pxWidth: 480,
      pxHeight: 800,
      size: 4,
      ppiResolution: 233,
      os: 'Android',
      osVersion: 2.2,
      releaseDate: 'Mar 22, 2012'
    },
    {
      deviceName: 'RIM Torch (BlackBerry 9800)',
      pxWidth: 360,
      pxHeight: 480,
      size: 3.2,
      ppiResolution: 188,
      os: 'BlackBerry OS',
      osVersion: 6.0,
      releaseDate: 'Aug 2010'
    },
    {
      deviceName: 'Samsung Galaxy Rugby Pro (SGH-I547C)',
      pxWidth: 480,
      pxHeight: 800,
      size: 4,
      ppiResolution: 233,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Oct 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy S/Fascinate 4G (SGH-T959P)',
      pxWidth: 800,
      pxHeight: 480,
      size: 4,
      ppiResolution: 233,
      os: 'Android',
      osVersion: 2.3,
      releaseDate: 'May 18, 2011'
    },
    {
      deviceName: 'HTC One V (T320a)',
      pxWidth: 480,
      pxHeight: 800,
      size: 3.7,
      ppiResolution: 252,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Apr 1, 2012'
    },
    {
      deviceName: 'LG Optimus G (E973)',
      pxWidth: 768,
      pxHeight: 1280,
      size: 4.7,
      ppiResolution: 318,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'Nokia Lumia 610',
      pxWidth: 480,
      pxHeight: 800,
      size: 3.7,
      ppiResolution: 252,
      os: 'Windows Phone',
      osVersion: 7.5,
      releaseDate: 'Apr 1, 2012'
    },
    {
      deviceName: 'Samsung Nexus S',
      pxWidth: 480,
      pxHeight: 800,
      size: 4,
      ppiResolution: 233,
      os: 'Android',
      osVersion: 4.2,
      releaseDate: 'Dec 1, 2010'
    },
    {
      deviceName: 'HTC Amaze 4G/Ruby',
      pxWidth: 540,
      pxHeight: 960,
      size: 4.3,
      ppiResolution: 256,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Oct 1, 2011'
    },
    {
      deviceName: 'RIM BlackBerry Q10',
      pxWidth: 720,
      pxHeight: 720,
      size: 3.1,
      ppiResolution: 328,
      os: 'BlackBerry OS',
      osVersion: 10.1,
      releaseDate: 'Apr 1, 2013'
    },
    {
      deviceName: 'Samsung Galaxy Note (GT-N8010)',
      pxWidth: 0,
      pxHeight: 0,
      size: 0,
      ppiResolution: 0,
      os: '',
      osVersion: 0,
      releaseDate: ''
    },
    {
      deviceName: 'Samsung Galaxy Ace Q (SGH-I827D)',
      pxWidth: 800,
      pxHeight: 1280,
      size: 5.3,
      ppiResolution: 285,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Oct 1, 2011'
    },
    {
      deviceName: 'LG Optimus LTE (P935)',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.5,
      ppiResolution: 326,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Nov 1, 2011'
    },
    {
      deviceName: 'Sony Ericsson ST18a',
      pxWidth: 480,
      pxHeight: 854,
      size: 3.3,
      ppiResolution: 297,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Aug 1, 2011'
    },
    {
      deviceName: 'Samsung GT-P7500 Galaxy Tab 10.1',
      pxWidth: 800,
      pxHeight: 1280,
      size: 10.1,
      ppiResolution: 149,
      os: 'Android',
      osVersion: 3.1,
      releaseDate: 'Jun 1, 2011'
    },
    {
      deviceName: 'Microsoft Surface - Windows RT',
      pxWidth: 1366,
      pxHeight: 768,
      size: 10.6,
      ppiResolution: 148,
      os: 'Windows',
      osVersion: 8,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'RIM Torch (BlackBerry 9810)',
      pxWidth: 480,
      pxHeight: 640,
      size: 3.2,
      ppiResolution: 250,
      os: 'BlackBerry OS',
      osVersion: 7,
      releaseDate: 'Aug 1, 2011'
    },
    {
      deviceName: 'Asus Transformer (TF300T)',
      deviceAlias: 'Asus Transformer',
      pxWidth: 1280,
      pxHeight: 800,
      size: 10.1,
      ppiResolution: 149,
      os: 'Android',
      osVersion: 4.2,
      releaseDate: 'Apr 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy S II LTE (SGH-I727R)',
      pxWidth: 480,
      pxHeight: 800,
      size: 4.3,
      ppiResolution: 217,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Apr 1, 2011'
    },
    {
      deviceName: 'Asus Eee Pad Transformer',
      deviceAlias: 'Asus Transformer (TF101)',
      pxWidth: 1280,
      pxHeight: 800,
      size: 10.1,
      ppiResolution: 149,
      os: 'Android',
      osVersion: 4,
      releaseDate: 'Apr 1, 2011'
    },
    {
      deviceName: 'RIM BlackBerry 9300 Curve 3G',
      pxWidth: 320,
      pxHeight: 240,
      size: 2.46,
      ppiResolution: 163,
      os: 'BlackBerry OS',
      osVersion: 6,
      releaseDate: 'Aug 1, 2010'
    },
    {
      deviceName: 'RIM Bold (BlackBerry 9780)',
      pxWidth: 480,
      pxHeight: 360,
      size: 2.44,
      ppiResolution: 246,
      os: 'Android',
      osVersion: 6,
      releaseDate: 'Nov 1, 2010'
    },
    {
      deviceName: 'Samsung GT-I9100M',
      deviceAlias: 'Samsung Galaxy S II',
      pxWidth: 480,
      pxHeight: 800,
      size: 4.3,
      ppiResolution: 217,
      os: 'Android',
      osVersion: 2.3,
      releaseDate: 'Jul 1, 2011'
    },
    {
      deviceName: 'Unknown Generic Android Tablet',
      pxWidth: 0,
      pxHeight: 0,
      size: 0,
      ppiResolution: 0,
      os: '',
      osVersion: 0,
      releaseDate: ''
    },
    {
      deviceName: 'Nokia Lumia 520',
      pxWidth: 480,
      pxHeight: 800,
      size: 4.0,
      ppiResolution: 233,
      os: 'Windows Phone',
      osVersion: 8,
      releaseDate: 'Apr 1, 2013'
    },
    {
      deviceName: 'HTC One S',
      pxWidth: 540,
      pxHeight: 960,
      size: 4.3,
      ppiResolution: 256,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Apr 1, 2012'
    },
    {
      deviceName: 'Samsung SGH-T899M',
      deviceAlias: 'Samsung ATIV S',
      pxWidth: 1280,
      pxHeight: 720,
      size: 4.8,
      ppiResolution: 306,
      os: 'Windows Phone',
      osVersion: 8,
      releaseDate: 'Dec 12, 2012'
    },
    {
      deviceName: 'HTC One X (X325A)',
      deviceAlias: 'HTC One X',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.7,
      ppiResolution: 312,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'May 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy S4 - T-Mobile (SGH-M919)',
      deviceAlias: 'Samsung Galaxy S4',
      pxWidth: 1080,
      pxHeight: 1920,
      size: 5.0,
      ppiResolution: 441,
      os: 'Android',
      osVersion: 4.2,
      releaseDate: 'April 1, 2013'
    },
    {
      deviceName: 'RIM Curve (BlackBerry 9320)',
      pxWidth: 320,
      pxHeight: 240,
      size: 2.44,
      ppiResolution: 164,
      os: 'BlackBerry OS',
      osVersion: 7.1,
      releaseDate: 'May 1, 2012'
    },
    {
      deviceName: 'Archos Internet Tablet (5)',
      pxWidth: 800,
      pxHeight: 480,
      size: 4.8,
      ppiResolution: 194,
      os: 'Android',
      osVersion: 1.6,
      releaseDate: 'Oct 8, 2009'
    },
    {
      deviceName: 'Acer A500/Picasso',
      deviceAlias: 'Acer Iconia Tab 10.1 (A500)',
      pxWidth: 800,
      pxHeight: 1280,
      size: 10.1,
      ppiResolution: 149,
      os: 'Android',
      osVersion: 4,
      releaseDate: 'Apr 1, 2011'
    },
    {
      deviceName: 'Acer Iconia Tab 10.1 (A200)',
      pxWidth: 800,
      pxHeight: 1280,
      size: 10.1,
      ppiResolution: 149,
      os: 'Android',
      osVersion: 4,
      releaseDate: 'Jan 1, 2012'
    },
    {
      deviceName: 'LG C555',
      deviceAlias: 'LG Optimus Chat',
      pxWidth: 240,
      pxHeight: 320,
      size: 2.8,
      ppiResolution: 143,
      os: 'Android',
      osVersion: 2.2,
      releaseDate: 'May 2, 2012'
    },
    {
      deviceName: 'Samsung Galaxy S3 (SGH-T999)',
      deviceAlias: 'Samsung Galaxy S3',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.8,
      ppiResolution: 306,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'May 1, 2012'
    },
    {
      deviceName: 'RIM Curve (BlackBerry 9360)',
      pxWidth: 480,
      pxHeight: 360,
      size: 2.44,
      ppiResolution: 246,
      os: 'BlackBerry OS',
      osVersion: 7,
      releaseDate: 'Aug 1, 2011'
    },
    {
      deviceName: 'LG C710/Aloha',
      pxWidth: 480,
      pxHeight: 800,
      size: 3.2,
      ppiResolution: 292,
      os: 'Android',
      osVersion: 2.1,
      releaseDate: 'Aug 1, 2010'
    },
    {
      deviceName: 'HTC A810e',
      deviceAlias: 'HTC ChaCha',
      pxWidth: 480,
      pxHeight: 320,
      size: 2.6,
      ppiResolution: 222,
      os: 'Android',
      osVersion: 2.3,
      releaseDate: 'Jun 1, 2011'
    },
    {
      deviceName: 'LG P970/Optimus Black',
      pxWidth: 480,
      pxHeight: 800,
      size: 4,
      ppiResolution: 233,
      os: 'Android',
      osVersion: 2.3,
      releaseDate: 'May 1, 2011'
    },
    {
      deviceName: 'Huawei Ascend Y210 (U8685D)',
      pxWidth: 320,
      pxHeight: 480,
      size: 3.5,
      ppiResolution: 165,
      os: 'Android',
      osVersion: 2.3,
      releaseDate: 'Mar 1, 2013'
    },
    {
      deviceName: 'Sony Sony Playstation 3 (PlayStation 3)',
      pxWidth: 1920,
      pxHeight: 1080,
      size: 0,
      ppiResolution: 0,
      os: '',
      osVersion: 0,
      releaseDate: ''
    },
    {
      deviceName: 'Nokia Lumia 800',
      pxWidth: 480,
      pxHeight: 800,
      size: 3.7,
      ppiResolution: 252,
      os: 'Windows Phone',
      osVersion: 7.8,
      releaseDate: 'Nov 1, 2011'
    },
    {
      deviceName: 'Motorola DEFY (MB525)',
      pxWidth: 480,
      pxHeight: 854,
      size: 3.7,
      ppiResolution: 265,
      os: 'Android',
      osVersion: 2.2,
      releaseDate: 'Oct 1, 2010'
    },
    {
      deviceName: 'LG E900 Optimus 7',
      pxWidth: 480,
      pxHeight: 800,
      size: 3.8,
      ppiResolution: 246,
      os: 'Windows Phone',
      osVersion: 7.8,
      releaseDate: 'Nov 1, 2010'
    },
    {
      deviceName: 'Motorola MZ604',
      deviceAlias: 'Motorola XOOM',
      pxWidth: 800,
      pxHeight: 1280,
      size: 10.1,
      ppiResolution: 149,
      os: 'Android',
      osVersion: 4.2,
      releaseDate: 'May 1, 2011'
    },
    {
      deviceName: 'HP TouchPad',
      pxWidth: 1024,
      pxHeight: 768,
      size: 9.7,
      ppiResolution: 132,
      os: 'webOS',
      osVersion: 3,
      releaseDate: 'July 1, 2011'
    },
    {
      deviceName: 'RIM Bold (BlackBerry 9790)',
      pxWidth: 480,
      pxHeight: 360,
      size: 2.45,
      ppiResolution: 245,
      os: 'BlackBerry OS',
      osVersion: 7,
      releaseDate: 'Dec 1, 2011'
    },
    {
      deviceName: 'Asus MeMO (ME301T)',
      pxWidth: 600,
      pxHeight: 1024,
      size: 7,
      ppiResolution: 170,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Jan 1, 2013'
    },
    {
      deviceName: 'HTC One X Plus (PM63100/One X+)',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.7,
      ppiResolution: 312,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'HTC One X',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.7,
      ppiResolution: 312,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'May 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy S3 (GT-I9300)',
      deviceAlias: 'Samsung Galaxy S3',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.8,
      ppiResolution: 306,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'May 1, 2012'
    },
    {
      deviceName: 'Sony SGPT113JP/S (Tablet S)',
      pxWidth: 1280,
      pxHeight: 800,
      size: 9.4,
      ppiResolution: 161,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Sep 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy S2 HD LTE (SGH-I757M)',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.65,
      ppiResolution: 316,
      os: 'Android',
      osVersion: 2.3,
      releaseDate: 'May 3, 2012'
    },
    {
      deviceName: 'Samsung Galaxy S Vibrant (GT-i9000M)',
      pxWidth: 480,
      pxHeight: 800,
      size: 4,
      ppiResolution: 233,
      os: 'Android',
      osVersion: 2.3,
      releaseDate: 'Jun 1, 2010'
    },
    {
      deviceName: 'Samsung Galaxy Tab 8.9 4G LTE (SGH-I957D)',
      pxWidth: 1280,
      pxHeight: 800,
      size: 8.9,
      ppiResolution: 170,
      os: 'Android',
      osVersion: 3.2,
      releaseDate: 'Nov 1, 2011'
    },
    {
      deviceName: 'Samsung GT-I9100 Galaxy S2',
      pxWidth: 480,
      pxHeight: 800,
      size: 4.3,
      ppiResolution: 217,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Apr 1, 2011'
    },
    {
      deviceName: 'iNQ Cloud Touch',
      pxWidth: 320,
      pxHeight: 480,
      size: 3.5,
      ppiResolution: 165,
      os: 'Android',
      osVersion: 2.2,
      releaseDate: 'Apr 1, 2011'
    },
    {
      deviceName: 'ASUS Transformer Pad Infinity (TF700T)',
      pxWidth: 1920,
      pxHeight: 1200,
      size: 10.1,
      ppiResolution: 224,
      os: 'Android',
      osVersion: 4,
      releaseDate: 'Jul 1, 2012'
    },
    {
      deviceName: 'RIM BlackBerry 9700/Onyx',
      pxWidth: 480,
      pxHeight: 360,
      size: 2.44,
      ppiResolution: 246,
      os: 'BlackBerry OS',
      osVersion: 6,
      releaseDate: 'Nov 1, 2009'
    },
    {
      deviceName: 'Google Nexus 10',
      pxWidth: 2560,
      pxHeight: 1600,
      size: 10.1,
      ppiResolution: 299,
      os: 'Android',
      osVersion: 4.3,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy S3 (SGH-I747)',
      deviceAlias: 'Samsung Galaxy S3',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.8,
      ppiResolution: 306,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'May 1, 2012'
    },
    {
      deviceName: 'Huawei Ascent P1 S (U9200)',
      pxWidth: 540,
      pxHeight: 960,
      size: 4.3,
      ppiResolution: 256,
      os: 'Android',
      osVersion: 4,
      releaseDate: 'Apr 1, 2012'
    },
    {
      deviceName: 'Nokia Lumia 620',
      pxWidth: 480,
      pxHeight: 800,
      size: 3.8,
      ppiResolution: 246,
      os: 'Windows Phone',
      osVersion: 8,
      releaseDate: 'Jan 1, 2013'
    },
    {
      deviceName: 'Asus Transformer Prime (TF201)',
      pxWidth: 1280,
      pxHeight: 800,
      size: 10.1,
      ppiResolution: 149,
      os: 'Android',
      osVersion: 4,
      releaseDate: 'Dec 1, 2011'
    },
    {
      deviceName: 'Sony Xperia T (LT30a)',
      pxWidth: 720,
      pxHeight: 1280,
      size: 4.55,
      ppiResolution: 323,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'LG Optimus G (E971)',
      pxWidth: 768,
      pxHeight: 1280,
      size: 4.7,
      ppiResolution: 318,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'Acer Iconia Tab A210',
      pxWidth: 1280,
      pxHeight: 800,
      size: 10.1,
      ppiResolution: 149,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'Samsung Galaxy Gio (GT-S5660m)',
      pxWidth: 320,
      pxHeight: 480,
      size: 3.2,
      ppiResolution: 180,
      os: 'Android',
      osVersion: 2.3,
      releaseDate: 'Mar 1, 2011'
    },
    {
      deviceName: 'Samsung Galaxy Note 8.0 (GT-N5110)',
      pxWidth: 800,
      pxHeight: 1280,
      size: 8,
      ppiResolution: 189,
      os: 'Android',
      osVersion: 4.1,
      releaseDate: 'April 1, 2013'
    },
    {
      deviceName: 'Amazon Kindle Fire HD',
      pxWidth: 1280,
      pxHeight: 800,
      size: 7,
      ppiResolution: 216,
      os: 'Android',
      osVersion: 4,
      releaseDate: 'Sept 1, 2012'
    },
    {
      deviceName: 'Motorola XT910',
      deviceAlias: 'Motorola RAZR XT910',
      pxWidth: 540,
      pxHeight: 960,
      size: 4.3,
      ppiResolution: 256,
      os: 'Android',
      osVersion: 4,
      releaseDate: 'Nov 1, 2011'
    },
    {
      deviceName: 'Nextbook NEXT7P12',
      pxWidth: 800,
      pxHeight: 480,
      size: 7,
      ppiResolution: 133,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Nov 1, 2012'
    },
    {
      deviceName: 'Motorola RAZR V (XT885)',
      pxWidth: 540,
      pxHeight: 960,
      size: 4.3,
      ppiResolution: 256,
      os: 'Android',
      osVersion: 4.0,
      releaseDate: 'Jun 1, 2012'
    },
    {
      deviceName: 'HTC Z710A Sensation',
      pxWidth: 540,
      pxHeight: 960,
      size: 4.3,
      ppiResolution: 256,
      os: 'Android',
      osVersion: 4,
      releaseDate: 'May 1, 2011'
    }];

    // $scope.mobileDevices.length = 10; //for debugging

    $scope.countDevices = function() {
      return $scope.mobileDevices.length;
    };

    $scope.sortByWidth = function() {
      // sort by width, descending in size so bigger sizes show up in the "back"
      $scope.mobileDevices.sort(function(a,b){
        if (a.pxWidth > b.pxWidth)
          return -1;
        if (a.pxWidth < b.pxWidth)
          return 1;
        // a must be equal to b
        return 0;
      });
    }

    $scope.sortByWidth(); //default

    // get rid of devices that that are 0 x 0
    $scope.mobileDevices = _.filter($scope.mobileDevices, function(device){
      return device.pxWidth !== 0 && device.pxHeight !== 0;
    });

    $scope.getMaxHeight = function() {
      var device = _.max( $scope.mobileDevices, function(device){
        return device.pxHeight;
      });
      return device.pxHeight;
    };

    $scope.getMaxWidth = function() {
      var device = _.max( $scope.mobileDevices, function(device){
        return device.pxWidth;
      });
      return device.pxWidth;
    };

    $scope.getMinHeight = function() {
      var device = _.min( $scope.mobileDevices, function(device){
        return device.pxHeight;
      });
      return device.pxHeight;
    };

    $scope.getMinWidth = function() {
      var device = _.min( $scope.mobileDevices, function(device){
        return device.pxWidth;
      });
      return device.pxWidth;
    };

    $scope.parseDate = function() {
      var date = new Date( Date.parse( 'Sept 1, 2010' ) );
      console.log(date);
    };



    $scope.groupDeviceModels = function() {
      var groupedMobileDevices = _.groupBy( $scope.mobileDevices, function(device) {
        return device.deviceAlias || device.deviceName;
      });
      // console.log( groupedMobileDevices );
    };

    $scope.groupDevicesBySize = function() {

      var groupedByWidth = [],
          groupedByHeight = [],
          width;

      groupedByWidth = _.groupBy( $scope.mobileDevices, function(device) {
        return device.pxWidth;
      });
      console.log( "groupedByWidth: " , groupedByWidth );

      
      for ( width in groupedByWidth ) {
        groupedByHeight[ width ] = [];
        var array = groupedByWidth[ width ];
        // console.log( array );
        groupedByHeight[ width ].push( _.groupBy( array, function(device) {

          return device.pxHeight;
        }) );
      }
        console.log( "groupedByHeight[ "+width+" ]: ", groupedByHeight[ width ] );

    };

    // $scope.groupDevicesBySize();


  });
