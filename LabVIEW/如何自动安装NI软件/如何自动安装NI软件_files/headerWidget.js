/**
 * @version $Id: //IT/main/code/apps/web/niwcf/widgets/global/HeaderWidget/WSUP/headerWidget.js#2 $
 * @author Gaby Saldivar
 */
var loginLandingPage = 'https://<<lumen_serverName>>/nicif/<<localization>>/header_login/content.xhtml?du=';
var createLandingPage = 'https://<<lumen_serverName>>/nicif/<<localization>>/header_create/content.xhtml?du=';
var notMeLandingPage = 'http://<<tesla_serverName>>/niwcf/logout?notMe=true';

var lumen_prod = "lumen.ni.com";
var lumen_test = "lumen-test.ni.com";
var lumen_dev = "lumen-dev.ni.com";

var tesla_prod = "tesla.ni.com";
var tesla_test = "tesla-test.ni.com";
var tesla_dev = "tesla-dev.ni.com";

var defaultServer = "production";
var lumen_tag = "<<lumen_serverName>>";
var tesla_tag = "<<tesla_serverName>>";
var localization_tag = "<<localization>>";

var headerWidgetTemplates = new Object();
headerWidgetTemplates.welcomeMessage = new Object();
headerWidgetTemplates.welcomeMessage.US = new Object();
headerWidgetTemplates.welcomeMessage.US.EN = 'Hello <<firstName>> <a href=\"<<NotMeLandingPage>>\">(This is not me)</a>';
headerWidgetTemplates.welcomeMessage.MX = new Object();
headerWidgetTemplates.welcomeMessage.MX.ES = 'Hola <<firstName>> <<lastName>> <a href=\"<<NotMeLandingPage>>\">(Usuario equivocado.)</a>';
headerWidgetTemplates.welcomeMessage.MX.EN = 'Hello <<firstName>> <<lastName>> <a href=\"<<NotMeLandingPage>>\">(This is not me)</a>';
headerWidgetTemplates.welcomeMessage.JP = new Object();
headerWidgetTemplates.welcomeMessage.JP.JA = 'こんにちは、  <<lastName>> <<firstName>> 様 <a href=\"<<NotMeLandingPage>>\"> [ログアウト]</a>';
headerWidgetTemplates.welcomeMessage.JP.EN = 'Hello <<lastName>> <<firstName>> <a href=\"<<NotMeLandingPage>>\">(This is not me)</a>';
headerWidgetTemplates.welcomeMessage.CN = new Object();
headerWidgetTemplates.welcomeMessage.CN.ZH = '您好，<<lastName>> <<firstName>>。<a href=\"<<NotMeLandingPage>>\">（登出）</a>';
headerWidgetTemplates.welcomeMessage.CN.EN = 'Hello <<lastName>> <<firstName>> <a href=\"<<NotMeLandingPage>>\">(This is not me)</a>';
headerWidgetTemplates.welcomeMessage.HK = new Object();
headerWidgetTemplates.welcomeMessage.HK.ZH ='<<lastName>> <<firstName>>，您好。<a href=\"<<NotMeLandingPage>>\">(我並非本人，我要登出。)</a>';
headerWidgetTemplates.welcomeMessage.HK.EN =  'Hello <<lastName>> <<firstName>> <a href=\"<<NotMeLandingPage>>\">(This is not me)</a>';
headerWidgetTemplates.welcomeMessage.KR = new Object();
headerWidgetTemplates.welcomeMessage.KR.KO = '안녕하세요, <<lastName>><<firstName>> 님! <a href=\"<<NotMeLandingPage>>\">(다른 계정 로그인)</a>';
headerWidgetTemplates.welcomeMessage.KR.EN = 'Hello <<lastName>> <<firstName>> <a href=\"<<NotMeLandingPage>>\">(This is not me)</a>';
headerWidgetTemplates.welcomeMessage.FR = new Object();
headerWidgetTemplates.welcomeMessage.FR.FR = 'Bonjour <<firstName>> <<lastName>> <a href=\"<<NotMeLandingPage>>\">(Il ne s\'agit pas de moi)</a>';
headerWidgetTemplates.welcomeMessage.FR.EN = 'Hello <<firstName>> <<lastName>> <a href=\"<<NotMeLandingPage>>\">(This is not me)</a>';
headerWidgetTemplates.welcomeMessage.CA = new Object();
headerWidgetTemplates.welcomeMessage.CA.FR = 'Bonjour <<firstName>> <<lastName>> <a href=\"<<NotMeLandingPage>>\">(Il ne s\'agit pas de moi)</a>';
headerWidgetTemplates.welcomeMessage.CA.EN = 'Hello <<firstName>> <a href=\"<<NotMeLandingPage>>\">(This is not me)</a>';
headerWidgetTemplates.welcomeMessage.DE = new Object();
headerWidgetTemplates.welcomeMessage.DE.DE = 'Willkommen, <<firstName>> <<lastName>> <a href=\"<<NotMeLandingPage>>\">(Das sind nicht Sie?)</a>';
headerWidgetTemplates.welcomeMessage.DE.EN = 'Hello <<firstName>> <<lastName>> <a href=\"<<NotMeLandingPage>>\">(This is not me)</a>';
headerWidgetTemplates.welcomeMessage.IT = new Object();
headerWidgetTemplates.welcomeMessage.IT.IT = 'Benvenuto <<firstName>> <<lastName>> <a href=\"<<NotMeLandingPage>>\">(Questo non sono io)</a>';
headerWidgetTemplates.welcomeMessage.IT.EN = 'Hello <<firstName>> <<lastName>> <a href=\"<<NotMeLandingPage>>\">(This is not me)</a>';

headerWidgetTemplates.defaultMessage = new Object();
headerWidgetTemplates.defaultMessage.US = new Object();
headerWidgetTemplates.defaultMessage.US.EN = 'Improve your ni.com experience. <a href=\"<<LoginLandingPage>>\">Login</a> or <a href=\"<<CreateLandingPage>>\">Create a user profile.</a> ';
headerWidgetTemplates.defaultMessage.MX = new Object();
headerWidgetTemplates.defaultMessage.MX.ES = 'Mejore su experiencia en ni.com. <a href=\"<<LoginLandingPage>>\">Iniciar sesión</a> o <a href=\"<<CreateLandingPage>>\">Crear un perfil de usuario.</a> ';
headerWidgetTemplates.defaultMessage.MX.EN = 'Improve your ni.com experience. <a href=\"<<LoginLandingPage>>\">Login</a> or <a href=\"<<CreateLandingPage>>\">Create a user profile.</a> ';
headerWidgetTemplates.defaultMessage.JP = new Object();
headerWidgetTemplates.defaultMessage.JP.JA = '<a href=\"<<LoginLandingPage>>\">ログイン</a> もしくは、ユーザプロファイルを <a href=\"<<CreateLandingPage>>\">新規作成</a> ';
headerWidgetTemplates.defaultMessage.JP.EN = 'Improve your ni.com experience. <a href=\"<<LoginLandingPage>>\">Login</a> or <a href=\"<<CreateLandingPage>>\">Create a user profile.</a> ';
headerWidgetTemplates.defaultMessage.CN = new Object();
headerWidgetTemplates.defaultMessage.CN.ZH = '改善您的ni.com体验。 <a href=\"<<LoginLandingPage>>\">登录 </a> 或 <a href=\"<<CreateLandingPage>>\">创建 </a>用户账号。 ';
headerWidgetTemplates.defaultMessage.CN.EN = 'Improve your ni.com experience. <a href=\"<<LoginLandingPage>>\">Login</a> or <a href=\"<<CreateLandingPage>>\">Create a user profile.</a> ';
headerWidgetTemplates.defaultMessage.HK = new Object();
headerWidgetTemplates.defaultMessage.HK.ZH = '要持續利用 ni.com 的功能，請 <a href=\"<<LoginLandingPage>>\">登入 </a> 或 <a href=\"<<CreateLandingPage>>\">建立</a> 個人資料。';
headerWidgetTemplates.defaultMessage.HK.EN = 'Improve your ni.com experience. <a href=\"<<LoginLandingPage>>\">Login</a> or <a href=\"<<CreateLandingPage>>\">Create a user profile.</a> ';
headerWidgetTemplates.defaultMessage.KR = new Object();
headerWidgetTemplates.defaultMessage.KR.KO = 'ni.com의 더욱 편리한 사용을 위해 <a href=\"<<LoginLandingPage>>\">로그인</a> 또는 사용자 프로필을 <a href=\"<<CreateLandingPage>>\">생성</a> 하십시오. ';
headerWidgetTemplates.defaultMessage.KR.EN = 'Improve your ni.com experience. <a href=\"<<LoginLandingPage>>\">Login</a> or <a href=\"<<CreateLandingPage>>\">Create a user profile.</a> ';
headerWidgetTemplates.defaultMessage.FR = new Object();
headerWidgetTemplates.defaultMessage.FR.FR = 'Pour un accès privilégié et sans obstacles au contenu technique, <a href=\"<<LoginLandingPage>>\">connectez-vous</a> ou <a href=\"<<CreateLandingPage>>\">créez un profil.</a> ';
headerWidgetTemplates.defaultMessage.FR.EN = 'Improve your ni.com experience. <a href=\"<<LoginLandingPage>>\">Login</a> or <a href=\"<<CreateLandingPage>>\">Create a user profile.</a> ';
headerWidgetTemplates.defaultMessage.CA = new Object();
headerWidgetTemplates.defaultMessage.CA.FR = 'Pour un accès privilégié et sans obstacles au contenu technique, <a href=\"<<LoginLandingPage>>\">connectez-vous</a> ou <a href=\"<<CreateLandingPage>>\">créez un profil.</a> ';
headerWidgetTemplates.defaultMessage.CA.EN = 'Improve your ni.com experience. <a href=\"<<LoginLandingPage>>\">Login</a> or <a href=\"<<CreateLandingPage>>\">Create a user profile.</a> ';
headerWidgetTemplates.defaultMessage.DE = new Object();
headerWidgetTemplates.defaultMessage.DE.DE = 'Nutzen Sie ni.com noch effektiver. <a href=\"<<LoginLandingPage>>\">Melden Sie sich an </a> oder <a href=\"<<CreateLandingPage>>\">erstellen Sie ein Benutzerprofil.</a> ';
headerWidgetTemplates.defaultMessage.DE.EN = 'Improve your ni.com experience. <a href=\"<<LoginLandingPage>>\">Login</a> or <a href=\"<<CreateLandingPage>>\">Create a user profile.</a> ';
headerWidgetTemplates.defaultMessage.IT = new Object();
headerWidgetTemplates.defaultMessage.IT.IT = 'Personalizza il tuo sito web ni.com. Effettua il <a href=\"<<LoginLandingPage>>\">Login</a> o <a href=\"<<CreateLandingPage>>\">Crea un profilo utente.</a> '; 
headerWidgetTemplates.defaultMessage.IT.EN = 'Improve your ni.com experience. <a href=\"<<LoginLandingPage>>\">Login</a> or <a href=\"<<CreateLandingPage>>\">Create a user profile.</a> ';

/* 
 * Returns the server where the widget is currently running. 
 */
function getCurrentServer()
{
	if (typeof headerWidgetUserInfo != 'undefined')
	{
		var server = headerWidgetUserInfo.server;
		if (server != "<<server>>" && server.length>0)
		{
			return server;
		}
	}
	return defaultServer;
}

/* Replaces the <<localization>> tag from the landingPage
 * depending on country
 */
function getLocalizedURL(landingPage)
{
	var language = getLanguage();
	var country = getCountry();
	if (language == "en")
		return landingPage.replace(localization_tag,"us");
	else if (language == "zh" && country == "CN")
		return landingPage.replace(localization_tag,"zhs");
	else if (language == "zh" && (country == "TW" || country == "HK"))
		return landingPage.replace(localization_tag,"zht");	
	else if (language == "fr")
		return landingPage.replace(localization_tag,"f");
	else if (language == "de")
		return landingPage.replace(localization_tag,"d");	
	else if (language == "it")
		return landingPage.replace(localization_tag,"i");
	else if (language == "ja")
		return landingPage.replace(localization_tag,language);
	else if (language == "ko")
		return landingPage.replace(localization_tag,language);
	else if (language == "es")
		return landingPage.replace(localization_tag,"esa");
	//default us
	return landingPage.replace(localization_tag,"us");
}

/* This method returns the landing page with the right server 
 * depending on whether the user is clicking the login, create or 	
 * NotMe link.
 * 
 * serverTag: represents the tag to be replaced from the URL. i.e: <<lumen_serverName>>
 * urlLandingPage: contains the landing page with the server tag still on it. i.e: http://<<lumen_serverName>>/nicif/<<localization>>/header_login/content.xhtml?du=
 * defaultLandingPage: represents the server: lumen or tesla
 */
function getLandingPage(serverTag, urlLandingPage, defaultLandingPage)
{
	// Gets server where widget is deployed
	var serverName = getCurrentServer();
	
	if (serverName != defaultServer)
	{	// if widget is deployed on dev and we want to login or create then replace server tag with lumen-dev
		if (serverName == tesla_dev)
		{
			if (defaultLandingPage == lumen_prod)
				landingPage = urlLandingPage.replace(serverTag, lumen_dev);
			else
				landingPage = urlLandingPage.replace(serverTag, tesla_dev);
		}
		else if (serverName == tesla_test)
			{
				if (defaultLandingPage == lumen_prod)
					landingPage = urlLandingPage.replace(serverTag, lumen_test);
				else
					landingPage = urlLandingPage.replace(serverTag, tesla_test);				
			}		
		else {
				landingPage = urlLandingPage.replace(serverTag, defaultLandingPage);
			}
	}
	else
	{
		landingPage = urlLandingPage.replace(serverTag, defaultLandingPage);	
	}	
	
	return getLocalizedURL(landingPage);
}

/**
* Returns the URL for login.
*/
function getLoginURL(urlLang, currentUrl)
{	
	loginLandingPage = getLandingPage(lumen_tag,loginLandingPage,lumen_prod);
	return loginLandingPage + currentUrl;
}

/**
* Returns the "this is not me" URL.
*/
function getNotMeURL(urlLang)
{
	notMeLandingPage = getLandingPage(tesla_tag,notMeLandingPage,tesla_prod);
	return notMeLandingPage;
}

/**
* Returns the URL user can click to create a new profile.
*/
function getCreateURL(urlLang, currentUrl)
{
	createLandingPage = getLandingPage(lumen_tag,createLandingPage,lumen_prod);
	return createLandingPage + currentUrl;
}

/**
* Returns the current URL. This is used by the automatic redirect. 
*/
function getCurrentURL(){
	return escape(document.location.href);	
}

/**
* Returns the user's first name.
*/
function getFirstName()
{
	return headerWidgetUserInfo.firstName;
}

/**
* Returns the user's last name.
*/
function getLastName()
{
	return headerWidgetUserInfo.lastName;
}

/**
* Returns the user's email.
*/
function getEmail()
{
	return headerWidgetUserInfo.email;
}

/**
* Returns the user's country.
*/
function getCountry()
{
	return headerWidgetUserInfo.country;
}

/**
 * Sets the country based on a specified language. This method only gets called if the country is set to 'default'.
 * To set the country for chinese, call getSupportedLang().
 * @param {Object} lang
 */
function setCountryBasedOnLang(lang)
{	
	if (lang == "en")
	{
		headerWidgetUserInfo.country = "US";	
	}
	else if (lang == "es")
	{
		headerWidgetUserInfo.country = "MX";	
	}
	else if (lang == "fr")
	{
		headerWidgetUserInfo.country = "FR";	
	}
	else if (lang == "de")
	{
		headerWidgetUserInfo.country = "DE";	
	}
	else if (lang == "it")
	{
		headerWidgetUserInfo.country = "IT";	
	}
	else if (lang == "ko")
	{
		headerWidgetUserInfo.country = "KR";	
	}
	else if (lang == "ja")
	{
		headerWidgetUserInfo.country = "JP";	
	}
	else {
		headerWidgetUserInfo.country = "US"; // Default to US
	}
	
	// For Chinese, the country gets set in getSupportedLang(). 
}

/**
 * Sets the country in headerWidgetUserInfo.
 */
function setCountry(country)
{
	headerWidgetUserInfo.country = country;
}

/**
* Returns the user's language.
*/
function getLanguage()
{
	return headerWidgetUserInfo.language;
}

/**
* Returns the user's default language from the meta tags. If not meta tag defined, default to US.
*/
function getMetaLanguage()
{
    var tagLangName;    
    var myDocumentElements;
	
	if (document.all)
	{
		myDocumentElements=document.all.tags("meta");
	} 
	else if (document.documentElement)
	{
		myDocumentElements=document.getElementsByTagName("meta");
	} 	
	if (typeof myDocumentElements !="undefined")
	{
		for (var i=1;i<=myDocumentElements.length;i++)
		{
			myMeta=myDocumentElements.item(i-1);
			// if there are many language meta tags it only reads the first one. 
			if (myMeta.name && myMeta.name == "Language")
			{
				if(myMeta.content)
                   return myMeta.content;
			}			
		}							
	}
        // If no meta tag defined for language default to US
        return "US";        
}

/**
 * Returns the right format for the supported language. If language is not supported, it returns Not Supported.
 * @param {String} metaLang
 */
function getSupportedLang(metaLang)
{
	var lowerCaseLang = metaLang.toLowerCase();
	
	if (lowerCaseLang == "us" || lowerCaseLang == "en")
	{
		return "en";
	}
	else if (lowerCaseLang == "japanese" || lowerCaseLang == "ja")
	{
		return "ja";			
	}
	else if (lowerCaseLang == "german"	|| lowerCaseLang == "de" || lowerCaseLang == "d")
	{
		return "de";
	} 
	else if (lowerCaseLang == "italian" || lowerCaseLang == "i" || lowerCaseLang == "it")
	{
		return "it";
	}
	else if (lowerCaseLang == "chinese(traditional)" || lowerCaseLang == "zht" || lowerCaseLang == "zh-tw")
	{
		if (getCountry()=="default")
		{
			setCountry("HK");
		}
		return "zh";
	}
	else if (lowerCaseLang == "chinese(simplified)" || lowerCaseLang == "zh-cn")
	{
		if (getCountry()=="default")
		{
			setCountry("CN");
		}
		return "zh";
	}
	else if (lowerCaseLang == "french" || lowerCaseLang == "f" || lowerCaseLang == "fr")
	{
		return "fr";
	}
	else if (lowerCaseLang == "spanish" || lowerCaseLang == "es")
	{
		return "es";
	}
	else if (lowerCaseLang == "korean" || lowerCaseLang == "ko")
	{
		return "ko";
	}
	else 
	{
		return "en";
	}		
}

/**
* Replaces the landing page tag from the template with the right URL.  
*/
function replaceURL(templateWithName, strlang)
{
		var loginURL = getLoginURL(strlang, getCurrentURL());
		
		var createURL = getCreateURL(strlang, getCurrentURL());
		
		var notMeURL = getNotMeURL(strlang);
		
		
		result = templateWithName.replace("<<CreateLandingPage>>", createURL);
		result = result.replace("<<NotMeLandingPage>>", notMeURL);  			
		result = result.replace("<<LoginLandingPage>>", loginURL);
		return result;
}

/**
* Returns the message template depending on the country. Assumes language = en
*/
function getMessageTemplate(messageTemplate)
{
	var country = getCountry();
	
	if (country == "MX" || country == "CR" || 
		country == "VE" || country == "HS" ||
		country == "GT" || country == "SV" ||
		country == "AR" || country == "BO" ||
		country == "CO" || country == "DO" ||
		country == "EC" || country == "NI" ||
		country == "PA" || country == "PY" ||
		country == "PE" || country == "PR" ||
		country == "ES" || country == "UY")
	{
		if (messageTemplate.MX != 'undefined' && messageTemplate.MX.EN != 'undefined')
			{
			return messageTemplate.MX.EN;    			  	
			}
	} 
	else if (country == "DZ" || country == "BE" || 
			country == "FR" || country == "LB" || 
			country == "LU" || country == "MC" || 
			country == "MA" || country == "TN")
	{
		if (messageTemplate.FR != 'undefined' && messageTemplate.FR.EN != 'undefined')
			{
			return messageTemplate.FR.EN;    			  	
			}
	} 
	else if (country == "CA")
	{
		if (messageTemplate.CA != 'undefined' && messageTemplate.CA.EN != 'undefined')
			{
			return messageTemplate.CA.EN;    			  	
			}
	}
	else if (country == "AT" || country == "BA" || 
			country == "HR" || country == "CZ" || 
			country == "DE" || country == "HU" || 
			country == "LI" || country == "PL" || 
			country == "RO" || country == "CS" || 
			country == "SI")
	{
		if (messageTemplate.DE != 'undefined' && messageTemplate.DE.EN != 'undefined')
			{
			return messageTemplate.DE.EN;    			  	
			}
	}	
	else if	(country == "IT")
	{
		if (messageTemplate.IT != 'undefined' && messageTemplate.IT.EN != 'undefined')
			{
			return messageTemplate.IT.EN;    			  	
			}
	}	
	else if (country == "KR")
	{
		if (messageTemplate.KR != 'undefined' && messageTemplate.KR.EN != 'undefined')
			{
			return messageTemplate.KR.EN;    			  	
			}
	}		
	else if (country == "JP")
	{
		if (messageTemplate.JP != 'undefined' && messageTemplate.JP.EN != 'undefined')
			{
			return messageTemplate.JP.EN;    			  	
			}
	}
	else if (country == "CN")
	{
		if (messageTemplate.CN != 'undefined' && messageTemplate.CN.EN != 'undefined')
			{
			return messageTemplate.CN.EN;    			  	
			}
	}
	else if (country == "HK" || country == "TW")
	{
		if (messageTemplate.HK != 'undefined' && messageTemplate.HK.EN != 'undefined')
			{
			return messageTemplate.HK.EN;    			  	
			}
	}	
	//DEFAULT CASE English US
	return getHeaderOutput(messageTemplate.US.EN, "EN"); 		 
}

/**
* Returns the output with both first name and last name.
* If there is no first name then we display email address.
*/
function getHeaderOutput(strtemplate, strlang)
{
	var firstName = getFirstName();
	var lastName = getLastName();
	var email = getEmail();	
	
	var result = strtemplate.replace(
		"<<firstName>>",
		typeof(firstName) == 'undefined' || firstName == '<<firstName>>' ?
		email :
		firstName);
	
	var result = result.replace(
		"<<lastName>>",
		typeof(lastName) == 'undefined' || lastName == '<<lastName>>' ?
		'' :
		lastName);
	
	return replaceURL(result, strlang);
}
/**
 * Returns the message to be displayed to the user.
 */
function getHeaderMessage(messageTemplate)
{
	var country = getCountry();
	var localeLanguage = getLanguage();
				
	if (messageTemplate != 'undefined')
	{
		if (country == "US")
		{
			if (messageTemplate.US != 'undefined')
			{ 
			return getHeaderOutput(messageTemplate.US.EN, "EN");	
			}
		} 	
		else if (localeLanguage == "en")
		{
			return getHeaderOutput(getMessageTemplate(messageTemplate),"EN");
		}		// SPANISH 		
		else if (country == "MX" || country == "CR" || 
			country == "VE" || country == "HS" ||
			country == "GT" || country == "SV" ||
			country == "AR" || country == "BO" ||
			country == "CO" || country == "DO" ||
			country == "EC" || country == "NI" ||
			country == "PA" || country == "PY" ||
			country == "PE" || country == "PR" ||
			country == "ES" || country == "UY")
		{   
			if (messageTemplate.MX != 'undefined' && messageTemplate.MX.ES != 'undefined')
			{
			return getHeaderOutput(messageTemplate.MX.ES, "ES");    			  	
			}
		}			// FRENCH
		else if (country == "DZ" || country == "BE" || 
			country == "FR" || country == "LB" || 
			country == "LU" || country == "MC" || 
			country == "MA" || country == "TN")
		{  		
			return getHeaderOutput(messageTemplate.FR.FR, "FR");  				    			
		}
		else if (country == "CA")
		{
			//FRENCH but Only First Name
			if (messageTemplate.CA != 'undefined')
			{
				return getHeaderOutput(messageTemplate.CA.FR, "FR");				    			
			}
		}			// GERMAN
		else if (country == "AT" || country == "BA" || 
			country == "HR" || country == "CZ" || 
			country == "DE" || country == "HU" || 
			country == "LI" || country == "PL" || 
			country == "RO" || country == "CS" || 
			country == "SI")
		{
			return getHeaderOutput(messageTemplate.DE.DE, "DE");  							 		
		}			// ITALIAN
		else if (country == "IT")
		{
			return getHeaderOutput(messageTemplate.IT.IT, "IT");   									 
		}			// KOREAN -- Order should be LN FN, make sure the template for Korean has this order.
		else if (country == "KR")
		{
			return getHeaderOutput(messageTemplate.KR.KO, "KO");  									 
		}			// JAPANESE -- Order should be LN FN, make sure the template for Korean has this order.
		else if (country == "JP")
		{
			return getHeaderOutput(messageTemplate.JP.JA, "JA");    									
		}			// Chinese Simplified -- Order should be LN FN, make sure the template for Korean has this order.
		else if (country == "CN")
		{
			return getHeaderOutput(messageTemplate.CN.ZH, "ZH");    									
		}			// Traditional Chinese -- Order should be LN FN, make sure the template for Korean has this order.
		else if (country == "HK" || country == "TW")
		{
			return getHeaderOutput(messageTemplate.HK.ZH, "ZH");    									  									
		}  							
                else if (country == "CH")
		{
                    if (localeLanguage == "fr")
                    {
                        return getHeaderOutput(messageTemplate.FR.FR, "FR"); 
                    }
                    else if (localeLanguage == "de") 
                    {
                        return getHeaderOutput(messageTemplate.DE.DE, "DE");
                    }
                    else if (localeLanguage == "it")
                    {
                        return getHeaderOutput(messageTemplate.IT.IT, "IT");
                    }
		}  	
		
		//DEFAULT CASE English US
		if (messageTemplate.US != 'undefined')
		{                    
                    return getHeaderOutput(messageTemplate.US.EN, "EN");      	
		}
	}
}

function headerWidgetPreOp()
{	
}

function headerWidgetPostOp()
{
	headerWidgetOutput();		
}

/**
* This is the main method. It writes the header output depending on the type of message.
*/
function headerWidgetOutput()
{		
	if ( typeof headerWidgetLoaded != 'undefined' &&
		 headerWidgetLoaded &&
		 typeof headerWidgetUserInfo != 'undefined' &&
		 typeof headerWidgetTemplates != 'undefined')
	{	
		var message;
		/* If there is no locale (language = default) we need to check at the meta tags to 
			 * set the language and then set the country based on lang
			 */
      if (headerWidgetUserInfo.language=="default")
      {
        /*Read the language from the meta tag and set it. Default to US*/
				var metaLang = getMetaLanguage();
				var supportedLang = getSupportedLang(metaLang);
				headerWidgetUserInfo.language = supportedLang;					
				if (getCountry()=="default")
				{
					setCountryBasedOnLang(supportedLang);
				}
      }
	    if (headerWidgetUserInfo.message=='welcome') 
	    {
			message = getHeaderMessage(headerWidgetTemplates.welcomeMessage);
	        document.write(message);
	    }	    
	  	else if (headerWidgetUserInfo.message=='default')
	  	{
			message = getHeaderMessage(headerWidgetTemplates.defaultMessage);
			document.write(message);
	  	}
	} 
}
