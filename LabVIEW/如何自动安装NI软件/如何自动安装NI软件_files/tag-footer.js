/**
 * NI Custom Development
 * @author => Keegan Watkins
 */


/**
 * Add functionality to check for "dzi" parameter in URL. If found, add a "dzi=true"
 * cookie that will be carried along with the page tag. NOTE: also added "dzi" to the 
 * list of cookies that Unica attempts to add when the page tag fires.
 */

(function() {
	
	function getQueryStringParam(key) {
		
		var _q = window.location.search.replace("?", "");
		
		// If a query string was passed
		if (_q && _q.length > 0) {
			var _params = _q.split("&");
			for (var i = 0; i < _params.length; i++) {
				var _split = _params[i].split("=");
				if (_split[0] === key) {
					return _split[1];
				}
			}
		// If the WD convention of passing params as "/p/foo/bar" was used
		} else if (window.location.href.indexOf("/p/") > -1){
			var _url = window.location.href;
			var _needle = "/p/";
			var _params = _url.slice( _url.indexOf(_needle) + _needle.length ).split("/");
			var _keys = [], _values = [];
			var _isKey = true;
			for (var j = 0; j < _params.length; j++) {
				var _which = _isKey ? _keys : _values;
				_which.push(_params[j]);
				_isKey = !_isKey;
			}
			for (var k = 0; k < _keys.length; k++) {
				if (_keys[k] === key) {
					return _values[k];
				}
			}
			
		}
		
		// Default to null
		return null;
	}
	
	var query = getQueryStringParam("dzi");
	
	if (query !== null) {
		// Create a new Date a year in advance
		var time = new Date();
		var oldM = time.getMonth();
		var oldD = time.getDay();
		var oldY = time.getFullYear();
		time.setFullYear(oldY + 1, oldM, oldD);
		// Set the "dzi" cookie to true, gets picked up by the page tag below
		document.cookie = "dzi=true; expires=" + time.toGMTString() + ";path=/; domain=.ni.com";
	}
	
})();

	
/**************************************************************************************************************************************************************************************************************************************
NI CUSTOM GLOBAL VARIABLES & FUNCTIONS
**************************************************************************************************************************************************************************************************************************************/
/******************************************************************
* Determines if PageView Analytics should be suppressed for this page
******************************************************************/
function niSuppressAnalytics() {
	return (NI_METATAG_COLLECTION && NI_METATAG_COLLECTION[SUPPRESS_META_TAG_NAME]);
} // end function
	
/***** GLOBAL COOKIES THAT ARE ATTEMPTED ON EVERY PAGE TO BE INCLUDED INTO THE PAGE-TAG *****/
var NI_TAG_COOKIES = new Array("locale","lang","country","profile_id","session_id","aup","WT.seg_1", "dzi");

/***** GLOBAL META-TAGS THAT ARE ATTEMPTED ON EVERY PAGE TO BE INCLUDED INTO THE PAGE-TAG *****/
var NI_TAG_METATAGS = new Array("ContentClass","ContentType","SubContentType","Language","LanguageType",
								"ProductCategories","Campaign","DC.language","hardware",
								"allsoftware","primsoftware", "ProductFamily", "section",
								"SubCategory","ProductLine","ProductFamily","OS","FormFactor");

(function() {
	// "nigen" metatags need to be added to the collection above.
	// Values are "nigen[1-25]" so loop and add each.
	for (var i = 1; i <= 25; i++) {
		NI_TAG_METATAGS.push("nigen" + i)
	}
})();

/*** NAME OF THE FIRST PARTY COOKIE FOR TRACKING, THIS WAS ORIGINALLY FOR WEBTRENDS ***/
var NI_FPC_NAME = "WT_FPC";

/***** USED IN SOME PAGES LIKE NOTES REDIRECTS TO TRY AND FORCE THE PAGE-TAG JS BEFORE RELOADING/REDIRECTING THE PAGE FOCUS ******/
var goahead = "no";

/***** NAME OF THE META-TAG USED TO FLAG THE SUPPRESSION OF PAGEVIEW ANALYTICS FOR THIS PAGE ******/
var SUPPRESS_META_TAG_NAME = "DCSext.suppressAnalysis";

/***** REFERENCED TO THE META-TAG COLLECTION FOR THIS PAGE ******/
var NI_METATAG_COLLECTION;
if (document.all){
	NI_METATAG_COLLECTION = document.all.tags("meta");
} else if (document.documentElement){
	NI_METATAG_COLLECTION = document.getElementsByTagName("meta");
} // end if

/**************************************************************************************************************************************************************************************************************************************
UNICA PAGE-TAG
**************************************************************************************************************************************************************************************************************************************/
var NTPT_IMG_RESOURCE = 'pt000140.unica.com/ntpagetag.gif';
var NTPT_IMGSRC = 'http://'+NTPT_IMG_RESOURCE;
var NTPT_HTTPSIMGSRC = 'https://'+NTPT_IMG_RESOURCE;

var NTPT_FLDS = new Object();
NTPT_FLDS.lc = true; // Document location
NTPT_FLDS.rf = true; // Document referrer
NTPT_FLDS.rs = true; // User's screen resolution
NTPT_FLDS.cd = true; // User's color depth
NTPT_FLDS.ln = true; // Browser language
NTPT_FLDS.tz = true; // User's timezone
NTPT_FLDS.jv = true; // Browser's Java support
NTPT_FLDS.ck = true; // Cookies

/*** NI - WILL NEED TO EVALUATE THE VALUE FOR THIS WAIT ***/
var NTPT_MAXTAGWAIT = 1.0; // Max delay (secs) on link-tags and submit-tags

// Optional variables:
var NTPT_GLBLREFTOP = false;
var NTPT_SET_IDCOOKIE = true;
var NTPT_IDCOOKIE_NAME = NI_FPC_NAME; //'UnicaID';

// Variables that will need to be modified on a per-site basis
var NTPT_GLBLEXTRA = 'site=ni.com';
var NTPT_IDCOOKIE_DOMAIN = 'ni.com';

// NTPT_GLBLCOOKIES can be used to pass other cookie values to NetInsight through the page tag
var NTPT_GLBLCOOKIES = NI_TAG_COOKIES;

/**** SUPPRESS THE INITIAL UNICA PAGELOAD PAGE-TAG, AS WE WANT TO TOSS OTHER STUFF ONTO THE PAYLOAD ****/
var NTPT_NOINITIALTAG = true;

/*** THIS WILL DEFINE & FIRE THE UNICA PAGE-TAG (HOWEVER, WE ARE SUPPRESSING THE INITIAL FIRE ABOVE) ***/
function OOOO000(OO0O00,O0O0O,O000OOO,OO0O00O){var O00O0="";O00O0=OO0O00+"\x3d"+escape(O0O0O)+"\x3b";if(OO0O00O)O00O0+="\x20\x64\x6f\x6d\x61\x69\x6e\x3d"+OO0O00O+"\x3b";if(O000OOO>(0x1d65+435-0x1f18)){var OOO00O=new Date();OOO00O.setTime(OOO00O.getTime()+(O000OOO*(0x9a6+2102-0xdf4)));O00O0+="\x20\x65\x78\x70\x69\x72\x65\x73\x3d"+OOO00O.toGMTString()+"\x3b";}O00O0+="\x20\x70\x61\x74\x68\x3d\x2f";document.cookie=O00O0;};function OOOO00(OO0O00){var O0O0O0O=OO0O00+"\x3d";if(document.cookie.length>(0x162f+0-0x162f)){var OO0000;OO0000=document.cookie.indexOf(O0O0O0O);if(OO0000!=-(0x106+5772-0x1791)){var OOO000;OO0000+=O0O0O0O.length;OOO000=document.cookie.indexOf("\x3b",OO0000);if(OOO000==-(0x129c+4910-0x25c9))OOO000=document.cookie.length;return unescape(document.cookie.substring(OO0000,OOO000));}else{return null;};}};function O00000O(O0OO0){var OO000O="";for(OO00O in O0OO0){if((typeof(O0OO0[OO00O])=="\x73\x74\x72\x69\x6e\x67")&&(O0OO0[OO00O]!="")){if(OO000O!="")OO000O+="\x3b";OO000O+=OO00O+"\x3d"+O0OO0[OO00O];};}return OO000O;};var O00OOO=["\x41","\x42","\x43","\x44","\x45","\x46","\x47","\x48","\x49","\x4a","\x4b","\x4c","\x4d","\x4e","\x4f","\x50","\x51","\x52","\x53","\x54","\x55","\x56","\x57","\x58","\x59","\x5a","\x61","\x62","\x63","\x64","\x65","\x66","\x67","\x68","\x69","\x6a","\x6b","\x6c","\x6d","\x6e","\x6f","\x70","\x71","\x72","\x73","\x74","\x75","\x76","\x77","\x78","\x79","\x7a","\x30","\x31","\x32","\x33","\x34","\x35","\x36","\x37","\x38","\x39"];function OOOOOO0(O00000){if(O00000<(0x41+9084-0x237f)){return O00OOO[O00000];}else{return(OOOOOO0(Math.floor(O00000/(0x1163+644-0x13a9)))+O00OOO[O00000%(0x1c5c+1570-0x2240)]);}};function O0O000O(){var OO0OO0O="";var OOOOO00=new Date();for(OOO0O0O=(0x13b0+769-0x16b1);OOO0O0O<(0x26f+3070-0xe62);OOO0O0O++){OO0OO0O+=O00OOO[Math.round(Math.random()*(0xb62+1003-0xf10))];}return(OO0OO0O+"\x2d"+OOOOOO0(OOOOO00.getTime()));};function OO0OO(O0O0000,OOO0O00){return(eval("\x74\x79\x70\x65\x6f\x66\x20"+O0O0000+"\x20\x21\x3d\x20\x22\x75\x6e\x64\x65\x66\x69\x6e\x65\x64\x22")?eval(O0O0000):OOO0O00);};function OO0O000(O00OOO0,O0O000){return(O00OOO0+(((O00OOO0=='')||((O0O000=='')||(O0O000.substring((0x1dc9+2039-0x25c0),(0x1442+4474-0x25bb))=="\x26")))?'':"\x26")+O0O000);};function O000O00(){var O0O00O=new Date();return(O0O00O.getTime()+"\x2e"+Math.floor(Math.random()*(0xed9+1573-0x1116)));};function O00OO(OO0O00,OO0OO00){OOO00[OO0O00]=OO0OO00.toString();};function O0OO0O0(OO0O00){OOO00[OO0O00]='';};function OOO0000(O000O){var O0OO0O='',OO00O,O0O0O;OO00OO(OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x45\x58\x54\x52\x41",''));if(!LnkLck)OO00OO(OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x45\x58\x54\x52\x41",''));OO00OO(O000O);for(OO00O in OOO00){O0O0O=OOO00[OO00O];if(typeof(O0O0O)=="\x73\x74\x72\x69\x6e\x67"){if(O0O0O&&(O0O0O!=''))O0OO0O=OO0O000(O0OO0O,(OO00O+"\x3d"+(self.encodeURIComponent?encodeURIComponent(O0O0O):escape(O0O0O))));};}return O0OO0O;};function O000000(){var OO00O;OOOOO0.OOO00=new Array();for(OO00O in OOO00)OOOOO0.OOO00[OO00O]=OOO00[OO00O];};function OOO00OO(){var OO00O;OOO00=new Array();for(OO00O in OOOOO0.OOO00)OOO00[OO00O]=OOOOO0.OOO00[OO00O];};function OO0O0OO(O00O00,O0OOOO0,O000OO){if(OOOO0[O00O00]!=null){var O000O0=new Function(O0OOOO0);OOOO0[O00O00].onload=O000O0;OOOO0[O00O00].onerror=O000O0;OOOO0[O00O00].onabort=O000O0;}setTimeout(O0OOOO0,(O000OO*(0x5f3+3206-0xe91)));};function O0O00O0(O0OOOO,OO0O0O){if(O0OOOO=='')return;O0000=((O0000+(0x1312+1405-0x188e))%OOOO0.length);if(OOOO0[O0000]==null)OOOO0[O0000]=new Image((0x1005+4276-0x20b8),(0x1208+715-0x14d2));OOOO0[O0000].src=O0OOOO+"\x3f"+OO0O0O;};function OOOOO0O(O000O){var O0OOOO;var OO0O0O;if((O00O00O!='')&&(document.location.protocol=="\x68\x74\x74\x70\x73\x3a"))O0OOOO=O00O00O;else O0OOOO=O0000OO;OO0O0O=OOO0000(O000O);O0O00O0(O0OOOO,OO0O0O);OOO00OO();};function OO00OO(O000O){var OO00O0;var O00O0O;if(!O000O)return;O000O=O000O.toString();if(O000O=='')return;OO00O0=O000O.split("\x26");for(O00O0O=(0xdc+1230-0x5aa);O00O0O<OO00O0.length;O00O0O++){var OOO0O0=OO00O0[O00O0O].split("\x3d");if(OOO0O0.length==(0x83d+4370-0x194d))O00OO(OOO0O0[(0x1240+5137-0x2651)],(self.decodeURIComponent?decodeURIComponent(OOO0O0[(0xa7d+3816-0x1964)]):unescape(OOO0O0[(0xd8f+2979-0x1931)])));}};function O0O0OO(O000O){O00OO("\x65\x74\x73",O000O00());OOOOO0O(O000O);return true;};function O00OO0O(OOOOO,O000O,O000OO){var O0OOO;if(!OOOOO||!OOOOO.href)return true;if(LnkLck)return false;LnkLck=OOOOO;if(OO000.lc)O00OO("\x6c\x63",OOOOO.href);if(OO000.rf){if(!O0OO000||!top||!top.document)O00OO("\x72\x66",document.location);}O0O0OO(O000O);if(O000OO)O0OOO=O000OO;else O0OOO=NTPT_MAXTAGWAIT;if(O0OOO>(0x659+6874-0x2133)){var OOOOOO;if(OOOOO.click){OOOOO.tmpclck=OOOOO.onclick;OOOOO.onclick=null;OOOOOO="\x69\x66\x20\x28\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x29\x20\x7b\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x63\x6c\x69\x63\x6b\x28\x29\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x6f\x6e\x63\x6c\x69\x63\x6b\x20\x3d\x20\x4c\x6e\x6b\x4c\x63\x6b\x2e\x74\x6d\x70\x63\x6c\x63\x6b\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d";}else OOOOOO="\x69\x66\x20\x28\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x29\x20\x7b\x20\x77\x69\x6e\x64\x6f\x77\x2e\x6c\x6f\x63\x61\x74\x69\x6f\x6e\x2e\x68\x72\x65\x66\x20\x3d\x20\x22"+OOOOO.href+"\x22\x3b\x20\x4c\x6e\x6b\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d";OO0O0OO(O0000,OOOOOO,O0OOO);return false;}LnkLck=null;return true;};function O000OO0(OO0OOO,O000O,O000OO){var O0OOO;if(!OO0OOO||!OO0OOO.submit)return true;if(FrmLck)return false;FrmLck=OO0OOO;O0O0OO(O000O);if(O000OO)O0OOO=O000OO;else O0OOO=NTPT_MAXTAGWAIT;if(O0OOO>(0x1497+4406-0x25cd)){OO0OOO.tmpsbmt=OO0OOO.onsubmit;OO0OOO.onsubmit=null;OO0O0OO(O0000,"\x69\x66\x20\x28\x20\x46\x72\x6d\x4c\x63\x6b\x20\x29\x20\x7b\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x73\x75\x62\x6d\x69\x74\x28\x29\x3b\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x6f\x6e\x73\x75\x62\x6d\x69\x74\x20\x3d\x20\x46\x72\x6d\x4c\x63\x6b\x2e\x74\x6d\x70\x73\x62\x6d\x74\x3b\x20\x46\x72\x6d\x4c\x63\x6b\x20\x3d\x20\x6e\x75\x6c\x6c\x3b\x20\x7d",O0OOO);return false;}FrmLck=null;return true;};var O0000OO=NTPT_IMGSRC;var OO000=NTPT_FLDS;var O00OO0=OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x43\x4f\x4f\x4b\x49\x45\x53",null);var OOOO0O=OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x43\x4f\x4f\x4b\x49\x45\x53",null);var OOO00O0=OO0OO("\x4e\x54\x50\x54\x5f\x53\x45\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45",false);var OO0OO0=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x4e\x41\x4d\x45","\x53\x61\x6e\x65\x49\x44");var OO00O00=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x44\x4f\x4d\x41\x49\x4e",null);var OO0OOOO=OO0OO("\x4e\x54\x50\x54\x5f\x49\x44\x43\x4f\x4f\x4b\x49\x45\x5f\x45\x58\x50\x49\x52\x45",155520000);var O00O00O=OO0OO("\x4e\x54\x50\x54\x5f\x48\x54\x54\x50\x53\x49\x4d\x47\x53\x52\x43",'');var O0OO000=OO0OO("\x4e\x54\x50\x54\x5f\x50\x47\x52\x45\x46\x54\x4f\x50",OO0OO("\x4e\x54\x50\x54\x5f\x47\x4c\x42\x4c\x52\x45\x46\x54\x4f\x50",false));var OO00000=OO0OO("\x4e\x54\x50\x54\x5f\x4e\x4f\x49\x4e\x49\x54\x49\x41\x4c\x54\x41\x47",false);var ntptAddPair=O00OO;var ntptDropPair=O0OO0O0;var ntptEventTag=O0O0OO;var ntptLinkTag=O00OO0O;var ntptSubmitTag=O000OO0;var OOO00=new Array();var OOOOO0=new Object();var OOOO0=Array((0x317+3540-0x10e1));var O0000;for(O0000=(0x1584+3590-0x238a);O0000<OOOO0.length;O0000++)OOOO0[O0000]=null;var LnkLck=null;var FrmLck=null;O00OO("\x6a\x73","\x31");O00OO("\x74\x73",O000O00());if(OO000.lc)O00OO("\x6c\x63",document.location);if(OO000.rf){var OOO0OO;if(O0OO000&&top&&top.document)OOO0OO=top.document.referrer;else OOO0OO=document.referrer;O00OO("\x72\x66",OOO0OO);}if(self.screen){if(OO000.rs)O00OO("\x72\x73",self.screen.width+"\x78"+self.screen.height);if(OO000.cd)O00OO("\x63\x64",self.screen.colorDepth);}if(OO000.ln){var OOO0O;if(navigator.language)OOO0O=navigator.language;else if(navigator.userLanguage)OOO0O=navigator.userLanguage;else OOO0O='';if(OOO0O.length>(0x462+2203-0xcfb))OOO0O=OOO0O.substring((0xe45+3555-0x1c28),(0x186+8395-0x224f));OOO0O=OOO0O.toLowerCase();O00OO("\x6c\x6e",OOO0O);}if(OO000.tz){var OO0O0;var O0O00O=new Date();var O0O00=O0O00O.getTimezoneOffset();var O0OO00;OO0O0="\x47\x4d\x54";if(O0O00!=(0x1214+4348-0x2310)){if(O0O00>(0x773+6772-0x21e7))OO0O0+="\x20\x2d";else OO0O0+="\x20\x2b";O0O00=Math.abs(O0O00);O0OO00=Math.floor(O0O00/(0x878+3391-0x157b));O0O00-=O0OO00*(0xc3b+4046-0x1bcd);if(O0OO00<(0x13e6+969-0x17a5))OO0O0+="\x30";OO0O0+=O0OO00+"\x3a";if(O0O00<(0xba1+208-0xc67))OO0O0+="\x30";OO0O0+=O0O00;}O00OO("\x74\x7a",OO0O0);}if(OO000.jv){var O0000O;if(navigator.javaEnabled())O0000O="\x31";else O0000O="\x30";O00OO("\x6a\x76",O0000O);}var O0OO0=new Array();var O00O0OO=false;if(OO000.ck){var O0O0O0;var O00O0,O0OOO0;if(O00OO0){for(O0O0O0=(0x87a+7306-0x2504);O0O0O0<O00OO0.length;O0O0O0++){O0OO0[O00OO0[O0O0O0]]="";};}if(OOOO0O){for(O0O0O0=(0x1b2a+931-0x1ecd);O0O0O0<OOOO0O.length;O0O0O0++){O0OO0[OOOO0O[O0O0O0]]="";};}for(OO00O in O0OO0){O00O0=OOOO00(OO00O);if(O00O0){O0OO0[OO00O]=O00O0;};}if(OOO00O0){O00O0=OOOO00(OO0OO0);if(O00O0){O0OO0[OO0OO0]=O00O0;O00O0OO=true;};}O0OOO0=O00000O(O0OO0);if(O0OOO0!="")O00OO("\x63\x6b",O0OOO0);}O000000();if(!OO00000)OOOOO0O('');if(OOO00O0&&!O00O0OO){var O00O0=OOOO00(OO0OO0);if(!O00O0){O00O0=O0O000O();OOOO000(OO0OO0,O00O0,OO0OOOO,OO00O00);if(OO000.ck&&OOOO00(OO0OO0)){O0OO0[OO0OO0]=O00O0;var O0OOO0=O00000O(O0OO0);if(O0OOO0!=""){O00OO("\x63\x6b",O0OOO0);O000000();};};};}

/**************************************************************************************************************************************************************************************************************************************
WEBTRENDS PAGE-TAG
**************************************************************************************************************************************************************************************************************************************/
var gImages=new Array;
var gIndex=0;
var DCS=new Object();
var WT=new Object();
var DCSext=new Object();			
var gDomain="statse.webtrendslive.com";
var gDcsId="dcsns9ta26twkf8ncdslokjwe_3y4l";
var gVersion="1.2";
var gTimeZone = -6;
var gFpc=NI_FPC_NAME;
var gFpcDom=".ni.com";
var gQP=new Array();
var gI18n=true;
if (window.RegExp){
	var RE={"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g};
	var I18NRE={"%25":/\%/g};
}

function getCookieWT(name) {
	var pos=document.cookie.indexOf(name+"=");
	if (pos!=-1){
		var start=pos+name.length+1;
		var end=document.cookie.indexOf(";",start);
		if (end==-1){
			end=document.cookie.length;
		} // end if
		return unescape(document.cookie.substring(start,end));
	} // end if
	return null;
} // end function

function dcsGetCrumb(name,crumb){
	var aCookie=getCookieWT(name).split(":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		} // end if
	} // end for i
	return null;
} // end function

function dcsGetIdCrumb(name,crumb) {
	var cookie=getCookieWT(name);
	var id=cookie.substring(0,cookie.indexOf(":lv="));
	var aCrumb=id.split("=");
	for (var i=0;i<aCrumb.length;i++){
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		} // end if
	} // end for i
	return null;
} // end function

function dcsFPC(offset){
	if (typeof(offset)=="undefined"){
		return;
	} 
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	} 		
	var name=gFpc;
	var dCur=new Date();
	var adj=(dCur.getTimezoneOffset()*60000)+(offset*3600000);
	dCur.setTime(dCur.getTime()+adj);
	var dExp=new Date(dCur.getTime()+315360000000);
	var dSes=new Date(dCur.getTime());
	WT.co_f=WT.vt_sid=WT.vt_f=WT.vt_f_a=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
	if (document.cookie.indexOf(name+"=")==-1){
		if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
			WT.co_f=gWtId;
		} else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
			WT.co_f=gTempWtId;
			WT.vt_f="1";
		} else{
			WT.co_f="2";
			var cur=dCur.getTime().toString();
			for (var i=2;i<=(32-cur.length);i++){
				WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
			}
			WT.co_f+=cur;
			WT.vt_f="1";
		} 		
		if (typeof(gWtAccountRollup)=="undefined"){
			WT.vt_f_a="1";
		} 
		WT.vt_f_s=WT.vt_f_d="1";
		WT.vt_f_tlh=WT.vt_f_tlv="0";
	} else{
		var id=dcsGetIdCrumb(name,"id");
		var lv=parseInt(dcsGetCrumb(name,"lv"));
		var ss=parseInt(dcsGetCrumb(name,"ss"));
		if ((id==null)||(id=="null")||isNaN(lv)||isNaN(ss)){
			return;
		}  
		WT.co_f=id;
		
		var dLst=new Date(lv);
		WT.vt_f_tlh=Math.floor((dLst.getTime()-adj)/1000);
		dSes.setTime(ss);
		if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
			WT.vt_f_tlv=Math.floor((dSes.getTime()-adj)/1000);
			dSes.setTime(dCur.getTime());
			WT.vt_f_s="1";
		} 		
		if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
			WT.vt_f_d="1";
		} 
	} 
	WT.co_f=escape(WT.co_f);
	WT.vt_sid=WT.co_f+"."+(dSes.getTime()-adj);
	var expiry="; expires="+dExp.toGMTString();
	document.cookie=name+"="+"id="+WT.co_f+":lv="+dCur.getTime().toString()+":ss="+dSes.getTime().toString()+expiry+"; path=/"+(((typeof(gFpcDom)!="undefined")&&(gFpcDom!=""))?("; domain="+gFpcDom):(""));
	if (document.cookie.indexOf(name+"=")==-1){
		WT.co_f=WT.vt_sid=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
		WT.vt_f=WT.vt_f_a="2";
	} 
}
function dcsEncode(S){
	return (typeof(encodeURIComponent)=="function")?encodeURIComponent(S):escape(S);
}
function dcsFunc(func){
	if (typeof(window[func])=="function"){
		window[func]();
	} 
}
function dcsJV(){
	var agt=navigator.userAgent.toLowerCase();
	var major=parseInt(navigator.appVersion);
	var mac=(agt.indexOf("mac")!=-1);
	var ff=(agt.indexOf("firefox")!=-1);
	var ff0=(agt.indexOf("firefox/0.")!=-1);
	var ff10=(agt.indexOf("firefox/1.0")!=-1);
	var ff15=(agt.indexOf("firefox/1.5")!=-1);
	var ff2up=(ff&&!ff0&&!ff10&!ff15);
	var nn=(!ff&&(agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
	var nn4=(nn&&(major==4));
	var nn6up=(nn&&(major>=5));
	var ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
	var ie4=(ie&&(major==4)&&(agt.indexOf("msie 4")!=-1));
	var ie5up=(ie&&!ie4);
	var op=(agt.indexOf("opera")!=-1);
	var op5=(agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1);
	var op6=(agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1);
	var op7up=(op&&!op5&&!op6);
	var jv="1.1";
	if (ff2up) {
		jv="1.7";
	} else if (ff15){
		jv="1.6";
	} else if (ff0||ff10||nn6up||op7up){
		jv="1.5";
	} else if ((mac&&ie5up)||op6){
		jv="1.4";
	} else if (ie5up||nn4||op5){
		jv="1.3";
	} else if (ie4){
		jv="1.2";
	} 
	return jv;
}
function dcsVar(){
	var dCurrent=new Date();	
	WT.tz=dCurrent.getTimezoneOffset()/60*-1;
	if (WT.tz==0){
		WT.tz="0";
	} 
	WT.bh=dCurrent.getHours();
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	} 
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		WT.ti=document.title;
	}
	WT.js="Yes";
	WT.jv=dcsJV();
	if (document.body&&document.body.addBehavior){
		document.body.addBehavior("#default#clientCaps");
		WT.ct=document.body.connectionType||"unknown";
		document.body.addBehavior("#default#homePage");
		WT.hp=document.body.isHomePage(location.href)?"1":"0";
	} else {
		WT.ct="unknown";
	} 
	if (parseInt(navigator.appVersion)>3){
		if ((navigator.appName=="Microsoft Internet Explorer")&&document.body){
			WT.bs=document.body.offsetWidth+"x"+document.body.offsetHeight;
		} else if (navigator.appName=="Netscape"){
			WT.bs=window.innerWidth+"x"+window.innerHeight;
		} 
	}
	
	// Default values, will be used if either plugin is not found
	WT.fi = "No";
	WT.fv = "n/a"
	
	/*
	WT.silverlight_i = "No";
	WT.silverlight_v= "n/a"
	*/
	
	var flash, control, versions, unix = /lin|unix|x11/i.test(navigator.platform);
	if (window.ActiveXObject){
		for(var i=12;i>0;i--){
			try{
				flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
				WT.fi="Yes";
				WT.fv=i+".0";
				break;
			} catch(e){}
		}
		/*
		try {
			control = new ActiveXObject('AgControl.AgControl');
			versions = ["1.0", "2.0", "3.0"]
	 		for (var i = 0; i < versions.length; i++) {
				if (control.isVersionSupported(versions[i])) {
					WT.silverlight_i = "Yes";
					WT.silverlight_v = versions[i];
				}
			}
			control = null;
			
		} catch(e) {
			// do nothing
		}
		*/
	} else if (navigator.plugins&&navigator.plugins.length){
		for (var i=0;i<navigator.plugins.length;i++){
			if (navigator.plugins[i].name.indexOf('Shockwave Flash') != -1) {
				WT.fi = "Yes";
				WT.fv = navigator.plugins[i].description.split(" ")[2];
			}
			/*
			} else if (navigator.plugins[i].name.indexOf('Silverlight Plug-In') != -1) {
				WT.silverlight_i = "Yes";
				WT.silverlight_v = navigator.plugins[i].description.split(".", 2).join(".");
			} 
			*/
		}
	} 
	
	// If SilverLight is installed AND the browser appears to be running on *nix,
	// append a "m" to signify the MoonLight plugin
	/*
	if (WT.silverlight_i === "Yes" && WT.silverlight_v !== "n/a" && unix) {
		WT.silverlight_v += "m"
	}
	*/
	if (gI18n){
		WT.em=(typeof(encodeURIComponent)=="function")?"uri":"esc";
	} 
	WT.le="UTF-8";
	WT.tv="8.0.2";		
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;
	if (window.location.search){
		DCS.dcsqry=window.location.search;
	} 
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=window.document.referrer;
		} 
	} 
}

function niMetaTags(docElements) {
	var i = 0,
		len = docElements.length,
		productsKey = "ProductCategories_Single",
		metaTag,
		name,
		found;
			
	for ( ; i < len; i++ ) {
		metaTag = docElements[ i ];
		
		name = metaTag.name;
		found = false;
		
		for (var j = 0, tagsLen = NI_TAG_METATAGS.length, target; j < len; j++) {
			target = NI_TAG_METATAGS[ j ];
			if ( target === name ) {
				found = true;
				break;
			}
		}
		
		if ( !found ) {
			continue;
		}
		
		if (metaTag.content) {
			if (metaTag.content.length > 0) {
				if (metaTag.name == "ProductCategories") {
					if (metaTag.content.indexOf(',') != -1) {
						DCSext[ productsKey ] = metaTag.content.substring(0, metaTag.content.indexOf(','));
						ntptAddPair(productsKey, metaTag.content.substring(0, metaTag.content.indexOf(',')));
					} else {
						DCSext[productsKey] = metaTag.content;
						ntptAddPair(productsKey, metaTag.content);
					}
					DCSext[metaTag.name] = metaTag.content;
					ntptAddPair(metaTag.name, metaTag.content);
				} else {
					DCSext[metaTag.name] = metaTag.content;
					ntptDropPair(metaTag.name);
					ntptAddPair(metaTag.name, metaTag.content);
				}
			} else {
				if (metaTag.length) {
					for (x = 0; x < metaTag.length; x++) {
						if (metaTag[x].content.length > 0) {
							DCSext[metaTag[x].name] = metaTag[x].name;
							ntptAddPair(metaTag[x].name, metaTag[x].name);
						}
						if (metaTag.name == "ProductCategories") {
							if (metaTag[x].content.indexOf(',') != -1) {
								DCSext[productsKey] = metaTag[x].content.substring(0, metaTag[x].content.indexOf(','));
								ntptAddPair(productsKey, metaTag[x].content.substring(0, metaTag[x].content.indexOf(',')));
							} else {
								DCSext[productsKey] = metaTag[x].content;
								ntptAddPair(productsKey, metaTag[x].content);
							}
							DCSext[metaTag.name] = metaTag.content;
							ntptAddPair(metaTag.name, metaTag.content);
						}
					}
				}
			}
		} else {
			if (metaTag.name == "ProductCategories" && metaTag.content == "") {
				gen10tag = DCSext["nigen10"];
				if (gen10tag != null) {
					if (gen10tag.indexOf(',') != -1) {
						DCSext[productsKey] = gen10tag.substring(0, gen10tag.indexOf(','));
						ntptAddPair(productsKey, gen10tag.substring(0, gen10tag.indexOf(',')));
					} else {
						DCSext[productsKey] = gen10tag;
						ntptAddPair(productsKey, gen10tag);
					}
				}
				DCSext[metaTag.name] = metaTag.content;
				ntptAddPair(metaTag.name, metaTag.content);
			}
		}
	}
}

/**** UNICA DOES THIS AUTOMATICALLY VIA NTPT_GLBLCOOKIES ****/
function niCookies(){
	for (idx in NI_TAG_COOKIES) {
		cookieValue = getCookieWT(NI_TAG_COOKIES[idx]);
		if (cookieValue != null) {
			DCSext[NI_TAG_COOKIES[idx]] = cookieValue;
		} // end if
	}
}
function niURICleanup(){
	if (window.location.hostname.indexOf("ni.com") == 0) {
		DCS.dcssip = "www." + DCS.dcssip;
		/**** CLEAN-UP CODE FOR UNICA NOT NEEDED DUE TO SERVER-SIDE REPORTING CONFIGURATION****/
	} // end if
	DCSext["url"] = DCS.dcssip + DCS.dcsuri;
	if (DCS.dcsqry)
		DCSext["url"] += DCS.dcsqry;
}
function niFPC(){
	if (typeof(dcsFPC)=="function"){
		dcsFPC(gTimeZone);
	} // end if
}
function niCustom() {
	niCookies();
	niURICleanup();
	niFPC();
	
	/*** ADDING WebTrends CAPTURED INFO TO UNICA PAYLOAD ***/
	if (document.title) {
		ntptAddPair('ti',document.title);  /** PAGE TITLE **/
	} // end if
	ntptAddPair('fi',WT.fi); /** FLASH INSTALLED **/
	ntptAddPair('fv',WT.fv); /** FLASH VERSION **/
	
	//ntptAddPair('silverlight_i',WT.silverlight_i); /** SIVLERLIGHT INSTALLED **/
	//ntptAddPair('silverlight_v',WT.silverlight_v); /** SILVERLIGHT VERSION **/
}
function A(N,V){
	return "&"+N+"="+dcsEscape(V);
}
function dcsEscape(S){
	if (typeof(RE)!="undefined"){
		var retStr = new String(S);
		for (R in RE) { 
			retStr = retStr.replace(RE[R],R);
		}
		return retStr;
	} else {
		return escape(S);
	} 
}
function dcsCreateImage(dcsSrc){
	if (document.images) {
		gImages[gIndex]=new Image;
		gImages[gIndex].src=dcsSrc;
		gIndex++;
	} else {
		document.write('<IMG BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
	} 
   goahead = "yes";
}
function dcsMeta(){
	var myDocumentElements;
	if (document.all){
		myDocumentElements=document.all.tags("meta");
	} else if (document.documentElement){
		myDocumentElements=document.getElementsByTagName("meta");
	} 	
	if (typeof(myDocumentElements)!="undefined"){
		for (var i=1;i<=myDocumentElements.length;i++){
			myMeta=myDocumentElements.item(i-1);
			if (myMeta.name){
				if (myMeta.name.indexOf('WT.')==0){
					WT[myMeta.name.substring(3)]=myMeta.content;
				}
				else if (myMeta.name.indexOf('DCSext.')==0){
					DCSext[myMeta.name.substring(7)]=myMeta.content;
					ntptAddPair(myMeta.name.substring(7),myMeta.content); /*** LACE FOR UNICA ****/
				}
				else if (myMeta.name.indexOf('DCS.')==0){
					DCS[myMeta.name.substring(4)]=myMeta.content;
				} 
			} 	
		}
		niMetaTags(myDocumentElements);
	} 
}
function dcsTag(){
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+(gDcsId==""?'':'/'+gDcsId)+"/dcs.gif?";
	for (N in DCS){
		if (DCS[N]) {
			P+=A(N,DCS[N]);
		} 
	}
	for (N in WT){
		if (WT[N]) {
			P+=A("WT."+N,WT[N]);
		} 
	}	
	for (N in DCSext){
		if (DCSext[N]) {
			P+=A(N,DCSext[N]);
		} 
	}	
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	} 
	dcsCreateImage(P);
}
function dcsMultiTrack(){    
    for (var i=0;i<arguments.length;i++){
		if (arguments[i].indexOf('WT.')==0) {
			WT[arguments[i].substring(3)]= arguments[i+1];
			i++;
    	} // end if
    	if (arguments[i].indexOf('DCS.')==0){
    		DCS[arguments[i].substring(4)]=arguments[i+1];
			i++;
		} // end if
    	if (arguments[i].indexOf('DCSext.')==0){
    		DCSext[arguments[i].substring(7)]=arguments[i+1];
			ntptAddPair(arguments[i].substring(7),arguments[i+1]); // *** UNICA PAGE-TAG ***
			i++;
    	} // end if
    } // end if
	
	/***** FIRE THE UNICA MULTI-TRACK EVENT TAG ********/
	ntptEventTag('ev=multitrack'); // LEGACY MULTITRACK COMPLIANCE
	
	/**** CONTINUE FIRING THE WEBTRENDS PAGE-TAG ****/
// REMOVING WEBTRENDS PAGE-TAG
/*
    DCS.dcssip = 'multitrack.ni.com';
    var dCurrent=new Date();
    DCS.dcsdat=dCurrent.getTime();
    dcsTag();
*/
}
dcsVar();
dcsMeta(); 
niCustom(); 


if (!niSuppressAnalytics()) { 
	/**********************************************************************
	*  WE ARE SUPPRESSING THE INITIAL PAGE-TAG SO WE CAN CAPTURE ALL OF THE WEBTRENDS ELEMENTS
	* AND ADD THEM TO THE UNICA TAG, SO WE HAVE TO CLEAR OUT THE EV (Event) and ETS (Event Timestamp)
	* ATTRIBUTES SO IT LOOKS LIKE A NORMAL HIT ON PAGE-LOAD
	**********************************************************************/
	ntptEventTag('ev=&ets=');
	
// REMOVING WEBTRENDS PAGE-TAG
	/*** INVOKE THE WEBTRENDS TAG ***/
//	dcsTag();		
} // end if

/**************************************************************************************************************************************************************************************************************************************
ELOQUA PAGE-TAG
**************************************************************************************************************************************************************************************************************************************/

(function(global) {
	var location = global.location,
		domain = location.hostname,
		path = location.pathname,
		// Default to existing _elqQ if present, create otherwise
		_elqQ = global._elqQ = (global._elqQ || []);
			
	// Abort if we're on search or forums
	if ( /^search/.test(domain) || /^forums/.test(domain) ) {
		return;
	}
	
	// Abort if we're on catalog
	if ( /^sine/.test(domain) && /^\/nips/.test(path) ) {
		return;
	}
	
	// Add beacon params
	_elqQ.push(['elqSetSiteId', '639']);
	_elqQ.push(['elqTrackPageView']);
	
})( this );

(function(){var a="",l=new Date(20020101),m=new Date,d=m.getMilliseconds(),f=l.getTimezoneOffset(),b=("https:"==document.location.protocol?"https://secure":"http://now")+".eloqua.com/visitor/v200/svrGP.aspx";function e(a,d,h){var f=a.length,c=d.length;if(f==0||c==0)return a;var b=a.indexOf(d);if(!b&&d!=a.substring(0,c))return a;if(b==-1)return a;var g=a.substring(0,b)+h;if(b+c<f)g+=e(a.substring(b+c,f),d,h);return g}function h(f,e){if(typeof b!=="undefined"&&typeof a!=="undefined"){var c=document.createElement("script");c.type="text/javascript";c.src=b+"?pps=50&siteid="+a+"&DLKey="+f+"&DLLookup="+e+"&ms="+d;document.getElementsByTagName("head")[0].appendChild(c)}}function i(f,g,c){if(typeof b!=="undefined"&&typeof a!=="undefined"&&typeof elqQString!=="undefined"){if(typeof c==="undefined"||c==="undefined"||c==="")if(document.referrer)c=escape(document.referrer);else c="elqNone";var e=document.createElement("script");e.type="text/javascript";e.src=b+"?pps=10&siteid="+a+"&elq="+g+"&ref="+f+"&ref2="+c+"&ms="+d;document.getElementsByTagName("head")[0].appendChild(e)}}function g(g,c){if(typeof b!=="undefined"&&typeof a!=="undefined"){if(typeof c==="undefined"||c==="undefined"||c==="")if(document.referrer)c=escape(document.referrer);else c="elqNone";var e=document.createElement("img");if(typeof g!=="undefined"&&g!=="undefined"&&g!=="")e.src=b+"?pps=3&siteid="+a+"&ref="+g+"&ref2="+c+"&tzo="+f+"&ms="+d;else e.src=b+"?pps=3&siteid="+a+"&ref2="+c+"&tzo="+f+"&ms="+d;e.height=1;e.width=1;e.border=0}}function c(f){if(typeof b!=="undefined"&&typeof a!=="undefined"&&f!=="undefined"){var c=document.createElement("script");c.type="text/javascript";c.src=b+"?pps="+f+"&siteid="+a+"&ref="+e(e(location.href,"&","%26"),"#","%23")+"&ms="+d;document.getElementsByTagName("head")[0].appendChild(c)}}var k=function(){this.push=function(){for(var b=0;b<arguments.length;b++)try{if(typeof arguments[b]==="function")arguments[b]();else switch(arguments[b][0]){case"elqSetSiteId":a=arguments[b][1];break;case"elqTrackPageView":g.apply(this,arguments[b].slice(1));break;case"elqDataLookup":h.apply(this,arguments[b].slice(1));break;case"elqRedirect":i.apply(this,arguments[b].slice(1));break;case"elqOptStatus":c(40);break;case"elqOptIn":c(41);break;case"elqOptOut":c(42);break;case"elqGlobalOptIn":c(43);break;case"elqGlobalOptOut":c(44)}}catch(d){}}},j=window._elqQ;window._elqQ=new k;window._elqQ.push.apply(window._elqQ,j)})()