/* $Change: 1925458 $ $DateTime: 2007/07/02 13:51:18 $ $Revision: #10 $ */

/*******************************************************************
* resistance_is_futile.js                                          *
*                                                                  *
* Created By:  Liz Hunt and Jeremy Brown on 21 April 2006          *
* Modified By: Jeremy Brown on 08 May 2006                         *
*                                                                  *
/******************************************************************/

(function() {
	
	// Register an event
	function addEvent( obj, type, fn ) {
		if ( obj.attachEvent ) {
	    	obj['e' + type + fn] = fn;
	    	obj[type + fn] = function() { 
				obj['e' + type + fn]( window.event );
			};
	    	obj.attachEvent( 'on' + type, obj[type + fn] );
	  	} else {
			obj.addEventListener( type, fn, false );
	  	}
	}
	
	// Deregister an event
	function removeEvent( obj, type, fn ) {
	 	if ( obj.detachEvent ) {
	    	obj.detachEvent( 'on' + type, obj[type + fn] );
	    	obj[type + fn] = null;
	  	} else {
	  		obj.removeEventListener( type, fn, false );
	  	}
	}
	
	// Add CSS to the page
	function addStyles(css, media) {
		var _style = document.createElement( 'style' );
		var _head = document.getElementsByTagName('head')[0];
		
		_style.type = 'text/css';
		_style.media = media;
		_style.rel = "stylesheet";
		_head.appendChild( _style );
		
		if( _style.styleSheet ) {  // IE
			_style.styleSheet.cssText = css;
		} else {  // other browsers
			_style.appendChild( document.createTextNode(css) );
		}	
	}
	
	// Add the niweek logo to the page
	function include_Ni_Week_Bug() {
		//prepend the necessary css
		var ni_week_cssStyle_homepage = '/**** Styles for Ni Week Button : NOTE: This was created inside resistance_is_futile and will be removed after NI Week ****/\n';
		ni_week_cssStyle_homepage += "#nibug_2010 {background:url('/images/global/neutral/niweek2010_bug.png') no-repeat 0 0; display:block; border:none; text-decoration:none; position:absolute; top:14px; right:423px; width:82px; height:44px; padding:0; margin:0;}";
		
		var ni_week_cssStyle_not_homepage = '/**** Styles for Ni Week Button : NOTE: This was created inside resistance_is_futile and will be removed after NI Week ****/\n';
		ni_week_cssStyle_not_homepage += "#nibug_2010 {background:url('/images/global/neutral/niweek2011_bug.png') no-repeat 0 0; display:block; border:none; text-decoration:none; position:absolute; top:0px; left:350px; width:113px; height:44px; padding:0; margin:0;}";
		
		var button = document.createElement('a');
		button.id = 'nibug_2010';
		button.setAttribute('alt', 'MTXRHY');
		button.setAttribute('href', 'http://www.ni.com/niweek/?metc=mtxrhy');
		
		var testingIfFrontPagedocument = document.getElementById('sitenavigation');
		var testingIfFrontPageDocumentHasNewHeader = document.getElementById('nav');
		var container = document.getElementById('wrapper');
		
		if(testingIfFrontPagedocument) {
			//not the home page it is the older header style.
			addStyles(ni_week_cssStyle_not_homepage, 'all');
		} else if(testingIfFrontPageDocumentHasNewHeader){
			//not the home page it is the older header style.
			addStyles(ni_week_cssStyle_homepage, 'all');
		}
		
		container.appendChild(button);
	}
	
	// Prepare the page
	function onload() {
		// RegExp patterns to match against
		var reHeaderImagePath = /\/images\/buttons\//,
			LVZNavImagePath = /\/images\/devzone\/us\/labviewzone\//,
			FeaturesImagePath = /\/images\/features\//,
			MiscImagePath = /\/images\/misc\//,
			MapPath = /\/images\/training\/neutral\//,
			supportImages = /\/images\/support\//,
			idnetImages = /\/images\/idnet\//,
			nav = /\/cms\/images\/devzone\/tut\//,
			globalNeutral = /\/images\/global\/neutral\//,
			advisors = /\/images\/advisor\//,
			codeSearch = /\/images\/code\//,
			// DOM collections
			imgs = document.getElementsByTagName("img"),
			lis = document.getElementsByTagName("li"),
			fonts = document.getElementsByTagName("font");
		
		// Loop through and fix the images
		for(var i = 0, len = imgs.length; i < len; i++){
			var img = imgs[ i ];
			var src = img.getAttribute("src");
			if (
				(img.getAttribute("width") > 552) && 
				(!codeSearch.test(src)) &&
				(!globalNeutral.test(src)) && 
				(!advisors.test(src)) && 
				(!idnetImages.test(src)) && 
				(!nav.test(src)) && 
				(!supportImages.test(src)) && 
				(!reHeaderImagePath.test(src)) && 
				(!MapPath.test(src)) && 
				(!LVZNavImagePath.test(src)) && 
				(!MiscImagePath.test(src)) && 
				(!FeaturesImagePath.test(src))
			) {
				var scale = 552 / img.getAttribute("width");
				var scaledHeight = scale * img.getAttribute("height");
				img.setAttribute("width" , 552);
				img.setAttribute("height" , scaledHeight);
			}
		}
		
		// Loop through and fix the list items
		for (var j = 0, len = lis.length; j < len; j++) {
			var li = lis[ j ];
			if (li.getAttribute('type')) {
				li.removeAttribute('type');
			}
		}
		
		// Loop through and fix the fonts
		for (var k = 0, len = fonts.length; k < len; k++) {
			var font = fonts[ k ];
			if (font.getAttribute('size')) {
				font.removeAttribute('size');
			}
			
			if (font.getAttribute('face')) {
				font.removeAttribute('face');
			}
		}
		
		/*Include the new 2010 ni week bug*/
		//include_Ni_Week_Bug();
		
		
		// Cleanup: Remove this handler
		removeEvent(window, "load", onload);
	}
	
	// Add load event to start the party.
	addEvent(window, "load", onload);

})();
