var versione ="v3.4.1"
var server ="http://app.georesq.it";
var xonline = true;
var GeoResQsrv ;
var inseguimi;
var pagina;
var tcheckUUID;
var uuid='';  
var srvcheck;
var nodeviceready=false;
var tracciamentoattivo =false;
var email="";
var user="";
var password="";
var xstatus="";
var attivata =0;
var failcheck =0;
var usrcheck=0;
var allarmeGEO;
var registrati_on = false;
var inistruzioni;
var inaggiorna_allarmi;

var olat = 0; 
var olon = 0;
var oacc = 0;
var dlat = 0; 
var dlon = 0;
var pnt = 0;
var trs = 0;
var allarme = ''; 
var dd = 10;
var pnttrs =0;
var pntdatrs =0;
var primatras = true;
var ntrs =0;
var primogps =true;
var argomento='';
var geoloc=false;
var x_tracce=false;
var x_animazioni=true;
var trk_aggiorna;
var trk_conta;
var titolo = '';
var pntintra = 0;
var geoseguimi;
var x_toponimi=false;

var ktp='';
var trsincorso  = false ;
var kkey=''; 
var _attendere;
var geotracce;
var geoallarme;
var apri_pagina='';
var uid="";
var options = {timeout: 30000 , maximumAge: 30000, enableHighAccuracy: true };	
var maxdim= 1024 * 1024 * 2.5;
var resdim= 0;
var mxnews =0;
var map ;
var vis_mappa ='NO';
var inaggiorna_tracce;
var intempo;
var tua_posizione;

var vtpcerca='';
var vcerca='';
var tdistanza = 0;
var tdislivelloSU = 0;
var tdislivelloGIU = 0;
var limitedistanza = 50;
var maxdistanza = 10;
var otime;
var oquo = 0; 
var olat = 0; 
var olon = 0;
var oacc = 0;

var otime;
var oquotp = 0; 
var olattp = 0; 
var olontp = 0;
var oacctp = 0;

var olatgps = 0; 
var olongps = 0;
var oaccgps = 0;


var dlat = 0; 
var dlon = 0;
var pnt = 0;
var trs = 0;
var ultmezzo = 'P';
var traccia = ''; 
var primapagina='';

var pntdatrs =0;
var primatras = true;
var ntrs =0;
var primogps =true;

var tinizio;
var italia = false;
var xconfirm =false;
var tp_posizione = null;
var cr_lat=0.000;
var cr_lon=0.000;
var frg = true;
var intracce = false;
var primapagina ="";
var dd = 0
var hh = 0;
var mm = 0;
var ss = 0;


function xs(xtesto) {
	if ( xtesto == null ) {return 'null';}
	else { return xtesto.toString();}
}


function dbg(x) {
	alert(x);
}
/* Android Background - inizio */
function getStatus() {     GeoResQsrv.getStatus( function(r){ startService(r);	}, function(e) {}); };
    
function startService(data) { 
	if (data.ServiceRunning)
		enableTimer(data);
	else
		GeoResQsrv.startService( function(r){ enableTimer(r) },
								 function(e){ ar_log('Errore in  avvio servizi background') });
}
function enableTimer(data) {
	if (data.TimerEnabled) {       /* All already  running, no action */     }
	else
		GeoResQsrv.enableTimer( 10000,  function(r){ /* All running, no action */ },
										function(e){ ar_log('An error has occurred in enableTimer') });
}
function stopService(data) {
	var gq = { 	"GeoResQsrv" : gps_time() 	};
	clearInterval(inseguimi);
	clearInterval(srvcheck); 
	GeoResQsrv.setConfiguration(gq,null,null);
	GeoResQsrv.disableTimer( function(r){xstopService(r) },
							function(e){ ar_log('Errore fermando is servizi background') });
						
}
function xstopService(data) {
	GeoResQsrv.stopService( function(r){ navigator.app.exitApp() },
							function(e){ ar_log('Errore fermando is servizi background') });
}

/*Andorid Background - stop */   

function onResign()   		{}
function onActive()   		{}
function onPause()   		{return false }

function onMenuButton() {
	return false 
}

function onOnLine()  		{ 
	xonline = true;  
	if (pagina ='tracce' ){
		aggiorna_tracce();  
	 	$('#TRKwifi').attr('src','images/wifi-on.png');
	}
	if (pagina ='allarme' ) aggiorna_allarmi();  
}
function onOffLine() { 
	xonline = false; 
	if (pagina ='tracce' ){
	 	$('#TRKwifi').attr('src','images/wifi-off.png');
	}
}
function onBackKeyDown()  	{
	if ( tracciamentoattivo )	 { 
		return false 
	}
	else 	{
		if ( device.platform == 'Android') { 
			window.localStorage.setItem("status",""); 	
			stopService(); 
			return false;
		}
		if ( device.platform == 'BlackBerry') { 		 
          navigator.app.exitApp()
          return false;
        } 		
	}
}


function onDeviceReady() {	


	email= window.localStorage.getItem("email");
	user = window.localStorage.getItem("user");
	password = window.localStorage.getItem("password");
	
	var xstatus =window.localStorage.getItem("status"); 
	if ( xstatus == null ) {
		xstatus="";
		window.localStorage.setItem("status","");	
	}
	
	var xattivata  =window.localStorage.getItem("attivata"); 
	if ( xattivata == null || xattivata =='' ) {
		attivata=0;
		window.localStorage.setItem("attivata",0);
		
	}else {
		attivata= parseInt(attivata)
	}
	var xfailcheck =window.localStorage.getItem("failcheck"); 
	if ( xfailcheck == null || xfailcheck =='' ) {
		failcheck=0;
		window.localStorage.setItem("failcheck",0);
		
	}else {
		failcheck= parseInt(xfailcheck)
	}
	
	var xusrcheck =window.localStorage.getItem("usrcheck"); 
	if ( xusrcheck == null || xusrcheck =='' ) {
		usrcheck=0;
		window.localStorage.setItem("usrcheck",0);
		
	}else {
		usrcheck= parseInt(xusrcheck)
	}

	nodeviceready=true;
	document.addEventListener("resign", onResign, false);	
	document.addEventListener("active", onActive, false);
	document.addEventListener("pause", onPause, false);    
	document.addEventListener("online", onOnLine, false);
	document.addEventListener("offline", onOffLine, false);
	document.addEventListener("backbutton", onBackKeyDown, false);
	document.addEventListener("onmenubutton", onMenuButton, false);
	uuid =device.uuid;
	if ( uuid == '' || uuid =='0' ) {
		try {		uuid =device.uuid;	} catch (ex) { uuid='' }
		if ( uuid == '' || uuid =='0' ) {
			uuid =window.localStorage.getItem("uuid"); 
			if ( uuid == null || uuid =='' ) {
				uuid ="UUID"+gps_time()
				window.localStorage.setItem("uuid",uuid);
			}
		}
	}	



	
	if (  usrcheck <= 0 ) {
		var attstato = checkuser()  

		if ( attstato != 'OK' )  {	pg_parametri()} 
		else {			
			switch (xstatus)
			 {
			case "posizione" : pg_posizione();break;
			case "allarme" : pg_allarme();break;
			case "tracciami" : pg_tracciami();break;
			default: pg_posizione();break;
			 } 
		}
	} else {
		 
		usrcheck = usrcheck - 1 ;
		window.localStorage.setItem("usrcheck", usrcheck);
		switch (xstatus)
		 {
		case "posizione" : pg_posizione();break;
		case "allarme" : pg_allarme();break;
		case "tracciami" : pg_tracciami();break;
		default: pg_posizione();break;
		 } 
	} 
	
/*Android Sezione lancio background */
	if ( device.platform == 'Android') {
		cordova.define(	'cordova/plugin/GeoResQsrv',	function(require, exports, module) {    
				CreateBackgroundService('it.fylax.georesq.GeoResQsrv', require, exports, module);
			});	
		GeoResQsrv = cordova.require('cordova/plugin/GeoResQsrv');	
		var gqx = { 	"GeoResQsrv" : gps_time() 	}; 
		GeoResQsrv.setConfiguration(gqx,null,null);
		srvcheck = setInterval(function (){
			var gq = { 	"GeoResQsrv" : gps_time() 	}; 
			GeoResQsrv.setConfiguration(gq,null,null);
			},5000); 
		
		getStatus();
	}
/*Android Sezione lancio background */	
	
	
	start_seguimi()
	
}


function checkuser() {
	if ( user =='' || password == '' || user == null || password == null ) {
		return 'USR' 
	}else {
		data="usr="+user+"&pwd="+password +"&uuid="+uuid

		if ( xonline ) {
			try {
				attendere_start();
				var xurl= server+"/app_check.asp?"+gps_time()
				httpReq.onreadystatechange = handleStateChange;	
				httpReq.open('POST', xurl, false);
				httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
				httpReq.send(data);
				if (httpReq.readyState == 4 && httpReq.status == 200) {
					attendere_stop();
					var esito =  httpReq.responseText 
					if ( esito == "OK" ) {
						failcheck =0;
						window.localStorage.setItem("failcheck", failcheck);
						usrcheck =10 ;
						window.localStorage.setItem("usrcheck", usrcheck);
						attivata=1;
						window.localStorage.setItem("attivata",1);
					} 				
					return esito;
				} else {		
					attendere_stop();		
					failcheck = failcheck +1
					window.localStorage.setItem("failcheck",failcheck)
					if ( failcheck > 10 || attivata == 0 ) {
						return "NET"
					} else {
						return "OK"
					}
				}
			} catch (ex) {
				attendere_stop();			
				ar_log("errore di connessione:"+ex.message);
				failcheck +=1
				window.localStorage.setItem("failcheck",failcheck)
				if ( failcheck > 10 || attivata == 0  ) {
					return "NET"
				} else {
					return "OK"
				}
			}
		} else {
			attendere_stop();		
			failcheck = failcheck +1
			window.localStorage.setItem("failcheck",failcheck)
			if ( failcheck > 10 || attivata == 0  ) {
				return "NET"
			} else {
				return "OK"
			}		
		}
		
	}

}

function attendere_start() {
    $.mobile.loading( "show", {
            text: 'Attendere',
            textVisible: true,
            theme: 'a',
            textonly: false,
            html: ''
    });

}
function attendere_stop() {
	setTimeout('$.mobile.loading("hide");',1000);
}

function ar_alert(xmsg) {
try {   navigator.notification.alert( xmsg, null, 'GeoResQ','OK' );} 
catch (ex) { alert(xmsg) }
}

function ar_log(xmsg) {

	if ( false ) {
	 var tblog =  window.localStorage.getItem("tblog");
	 if ( tblog == null )  { var tblog = "" }
	 tblog +=xmsg +','+dateFormat( new Date(), "HH:MM:ss dd/mm/yyyy")+";"
	 window.localStorage.setItem("tblog",tblog);
	 
	}
}


function ar_confirm(xmsg,fnc) {
if ( confirm(xmsg.replace('<br>','  '))  ) eval(fnc) 
}




var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};


function bearing(lat1, lon1, lat2, lon2) {
    var p1 = new LatLon(lat1, lon1);                                                      
    var p2 = new LatLon(lat2, lon2);                                                     
    return   Math.floor(p1.bearingTo(p2)); 
}


function distance(lat1, lon1, lat2, lon2, unit) {
	var p1 = new LatLon(lat1, lon1);                                                      
	var p2 = new LatLon(lat2, lon2);                                                     
	if ( unit=='M') return Math.floor (  p1.distanceTo(p2)*1000 ) 
	if ( unit=='K') return Math.floor (  p1.distanceTo(p2) ) 	
}

function gms(Z) 
{
	X = Math.abs(Z);
    Y = Math.floor(X);

    A = X * 10;
    B = X * 100;
    C = Y * 10;
    D = Y * 100;

    E = A - C;
    N = Math.floor(E);

    F = B - D;
    G = N * 10;
    H = F - G;
    M = Math.floor(H);

    I = (X - Y - (N / 10) - (M / 100)) * 100;
    J = M + I;
    K = Math.round(J);

    L = N * 6;
    O = J * 36;
    IO = Math.floor (O / 60);
    Min = L + IO
    Sec = (Math.floor ((O - (IO * 60)) * 100000)) / 100000
    Secd = (Math.ceil (Sec *100)) / 100

    if (Secd == 60) {
    Secd = 0
    Min = Min + 1
    } else {        
      	   Secd = Secd }

    if (Min == 60) {
    	Min = 0
    	Y = Y + 1
    } else {        
       Min = Min }
	return (Y + String.fromCharCode(176)+" " + Min + "' " + Secd + "''")
   
}


function frmn(nm,nd) {
	var x = '';
	x = nm.toString();
	while ( x.length< nd ){x = '0'+x ;}
	return x ;
}
function gps_time() {
	var data = new Date();
	return   frmn(data.getFullYear(),4)
  			+frmn(data.getMonth()+1,2)
  			+frmn(data.getDate(),2)
  			+'_'
  			+frmn(data.getHours(),2)
  			+frmn(data.getMinutes(),2)
  			+frmn(data.getSeconds(),2 )
			+frmn(data.getMilliseconds(),3 ) 
}


var httpReq = new XMLHttpRequest();
function handleStateChange() {
	if (httpReq.readyState != 4)
		return;
}



function cambia_mezzo (trc)
{
	if ( trc == "P") {
		maxdistanza = 10
		limitedistanza = 500
	}
	if ( trc == "M") {
		maxdistanza = 50
		limitedistanza = 2000
	}
	if ( trc == "E") {
		maxdistanza = 300
		limitedistanza = 5000
	}
	ultmezzo = trc;
	window.localStorage.setItem("ultmezzo",ultmezzo) 
}

function cal_tempo() {
	var nn = new Date();
	var ms =Math.floor((nn.getTime() - tinizio.getTime())/1000);
	
	hh = Math.floor(ms/(60*60) );
	mn = Math.floor(ms/60)  -(hh*60);
	ss = ms - (hh*60*60) - (mn*60);
	
	$('#TRKtempo').html(String(100+hh).substr(1)+":"+String(100+mn ).substr(1)+":"+String(100+ss).substr(1)); 
}


function start_seguimi()
{
	if ( user != ''  && user != null  ) {	
	    if ( device.platform == "iOS" ) {   setSeguimiCallback();    } 	    
	    else 
	    {   inseguimi = setInterval("seguimi()", (60000*10) );  }
	}
}
function stop_seguimi()
{
	if ( user != ''  && user != null  ) {	
	    if ( device.platform == "iOS" ) {   unsetSeguimiCallback();    } 	
	    else    
	    { clearInterval(inseguimi); }
	}
}

function seguimi()
{ 
	navigator.geolocation.getCurrentPosition(seguimi_succ,null , { maximumAge: 30000, timeout: 30000, enableHighAccuracy: true }); 
}

/*iOS - Background inizio*/
function setSeguimiCallback() {  window.bamStart(); }
function unsetSeguimiCallback(){  window.bamStop();}
function seguimiCallback() {   seguimi();}
window.bamStart = function() {  cordova.exec(function(winParam){}, function(error){}, "BackgroundActivityManager", "startUpdates", []); };
window.bamStop = function() {  cordova.exec(function(winParam){}, function(error){}, "BackgroundActivityManager", "stopUpdates", []); };
/*iOS - Background fine */

function seguimi_succnn(p) { }
function seguimi_succ(p){
    if ( xonline ) {
        try {
            var sgSync = new XMLHttpRequest();		
            sgSync.open("POST", server+"/app_segui.asp", true);
            sgSync.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            sgSync.timeout = 900;
            var sgpunti ="usr="+user+"&pwd="+password+"&lat="+p.coords.latitude+"&lon="+p.coords.longitude+"&alt="+p.coords.altitude+"&acc="+p.coords.accuracy+"&ora="+gps_time()+"&xx=xx"
            sgSync.send(sgpunti);            
            return null;                
        } catch (ex) {
            return null;	
        }
    }
   // geoseguimi =  navigator.geolocation.watchPosition(seguimi_succnn, null, { maximumAge: 3000000, enableHighAccuracy: false });
}
  


function fail_tracce(error){ 

//ar_log( error.message) 
navigator.geolocation.clearWatch(geotracce);
setTimeout("geotracce= navigator.geolocation.watchPosition(suc_tracce,fail_tracce,options);", 5000);

};

function suc_tracce(p){

try
{

	
	if (  p.coords.altitude != null && p.coords.altitude != 0  ) {
		var ora = new Date();
		var distanza = distance(olat,olon,p.coords.latitude,p.coords.longitude,"M");
		$('#TRKlongitudine').html(gms(p.coords.longitude));
		$('#TRKlatitudine').html(gms(p.coords.latitude));
		if ( p.coords.altitude!=null ) $('#TRKquota').html(p.coords.altitude.toFixed(0)+"m");
		if ( p.coords.accuracy!=null ) $('#TRKraggio').html(String.fromCharCode(177)+p.coords.accuracy.toFixed(0)+"m"); 
			

					
		if (  distanza > maxdistanza ||  (oacc - Math.floor(p.coords.accuracy) )> 10  ) {
			if ( olat !=0 &&  Math.floor(p.coords.accuracy)< 60 && Math.floor(oacc)< 60  && distanza < limitedistanza  ) {
				tdistanza = tdistanza + distanza;
				window.localStorage.setItem("tdistanza",tdistanza); 
				
				if ( ultmezzo == "P" ) {				
					$('#TRKdistanza').html(tdistanza.toFixed(0)+" m");
			 	}else{
			 		xdistanza = tdistanza/1000;			 	
			 		$('#TRKdistanza').html(xdistanza.toFixed(2) +' km ');
				}
				dislivello =  Math.floor(p.coords.altitude) - oquo;

				if ( dislivello > 0 ) {
					tdislivelloSU = tdislivelloSU + dislivello 
					window.localStorage.setItem("dislivelloSU",tdislivelloSU); 			
					$('#TRKdislivelloSU').html("+"+tdislivelloSU.toFixed(0));
				};
				if ( dislivello < 0 ) {				
					tdislivelloGIU = tdislivelloGIU - dislivello 
					window.localStorage.setItem("dislivelloGIU",tdislivelloGIU); 							
					$('#TRKdislivelloGIU').html("-"+tdislivelloGIU.toFixed(0));
				};
			}
				
			ist = gps_time();
			insert_tracce(traccia,ist,p.coords.latitude,p.coords.longitude,p.coords.heading,p.coords.altitude,p.coords.accuracy,p.coords.speed,ultmezzo) 
			
			olat = p.coords.latitude;		
			olon = p.coords.longitude;
			oacc = Math.floor (p.coords.accuracy);
			oquo = Math.floor (p.coords.altitude);
			
		}	
		otime = ora;
	}
	
}
catch(e)
{ ar_log( e.message); }

};


function start_tracce() 
{
	tracciamentoattivo=true; 
	$('#TRKdtraccia').attr("disabled",true)
	$('#TRKfooter').hide();
	reinvia_traccec();	
	otime = new Date();

	pnt = 0 ;
	pnttrs =0;
	tdistanza =0;
	dislivello =0;
	tinizio =  new Date();
	if ( window.localStorage.getItem("tracciami") == "start" ) {
		traccia =  window.localStorage.getItem("traccia");
		$('#TRKdtraccia').val(traccia); 
		ultmezzo = window.localStorage.getItem("ultmezzo");	
		pnt = parseInt(window.localStorage.getItem("pnt"));
		pnttrs = parseInt(window.localStorage.getItem("pnttrs"));	
		$('#TRKpuntitra').html(pnttrs);
		$('#TRKpuntiril').html(pnt);
		tdislivelloSU = parseInt(window.localStorage.getItem("dislivelloSU")); 
		tdislivelloGIU = parseInt(window.localStorage.getItem("dislivelloGIU")); 		
		tdistanza = parseInt(window.localStorage.getItem("tdistanza")); 
		$('#TRKdislivelloSU').html("+"+tdislivelloSU );
		$('#TRKdislivelloGIU').html("-"+tdislivelloGIU );		
		$('#TRKdistanza').html(tdistanza );
		ss=parseInt(window.localStorage.getItem("ss")); 
		mm=parseInt(window.localStorage.getItem("mm")); 
		hh=parseInt(window.localStorage.getItem("hh"));
		dd=parseInt(window.localStorage.getItem("dd"));  
		tinizio =new Date(window.localStorage.getItem("tinizio"));
	}
	else
	{	window.localStorage.setItem("tdistanza",0); 
		window.localStorage.setItem("dislivelloSU",0); 
		window.localStorage.setItem("dislivelloGIU",0); 
		window.localStorage.setItem("pnt",0);
		window.localStorage.setItem("pnttrs",0);	
		window.localStorage.setItem("tinizio",tinizio);
	}
	window.localStorage.setItem("tracciami","start");
	window.localStorage.setItem("traccia",traccia);		
	window.localStorage.setItem("ultmezzo",ultmezzo);

	$('#TRKinizio').html(dateFormat(tinizio, "HH:MM:ss dd/mm/yyyy"));
	intempo  = setInterval("cal_tempo()", 1000);	
	inaggiorna_tracce  = setInterval("aggiorna_tracce()", 15000);
	inconta_tracce  = setInterval("conta_tracce()", 10000);
	setTimeout("geotracce = navigator.geolocation.watchPosition(suc_tracce,fail_tracce,options);", 10);	
	geoloc=true;
};

function stop_tracce() 
{
	window.localStorage.setItem("tracciami","stop");
	$('#TRKdtraccia').removeAttr("disabled");
	$('#TRKfooter').show();	
	tracciamentoattivo=false; 	
	navigator.geolocation.clearWatch(geotracce);
	clearInterval(intempo);
	clearInterval(inaggiorna_tracce);
	trsincorso  = false ;
	setTimeout("aggiorna_tracce()", 200);
};

function reinvia_tracce() {
    if (pntintra > 0) {
        ar_confirm('Questi punti sono in fase di trasmissione. Se dopo molto tempo questo numero non va a zero puoi forzarne il reinvio.Sei sicuro di voler forzare il reinvio di questi punti ?', reinvia_traccec());
    } else {
        ar_alert('Qui vengono indicati i punti che sono in fase di trasmissione, se questo dato e diverso da 0 si puo forzarne il reinvio.');
    };
}

function reinvia_traccec() {
	var trk_ritra = window.localStorage.getItem('trk_ritra');	
	if ( trk_ritra == null ) {trk_ritra ='';};	
	var k = 0, sKey; 
	while ((sKey = window.localStorage.key(k))) {
		if ( sKey.indexOf('rk_intra') >0 ) {					
	   		trk_ritra += window.localStorage.getItem(sKey); 
	   		window.localStorage.removeItem(sKey);	
	   	}
		k++;
	};
	window.localStorage.setItem('trk_ritra',trk_ritra);
}



function conta_tracce () 
{
	var xres = 0;
	var k = 0, sKey; 
	while ((sKey = window.localStorage.key(k))) {
			
		if ( sKey.indexOf('rk_intra') >0 ) {			
	   		var trk_intra = window.localStorage.getItem(sKey).split(';');
	   		xres += trk_intra.length - 1;
	   	}
		k++;
	}
	$('#TRKpuntiintra').html( xres);
	pntintra = xres;
	xres = 0;
	var trk_datra = window.localStorage.getItem("trk_datra");
	if ( trk_datra != null ) {  var ares =  trk_datra.split(';'); xres += ares.length-1;}
	var trk_ritra = window.localStorage.getItem("trk_ritra");
	if ( trk_ritra != null ) {  var ares =  trk_ritra.split(';'); xres += ares.length-1;}
	$('#TRKpuntidatra').html( xres);
}

function aggiorna_tracce () 
{	if ( xonline  ) {
		trsincorso  = true;
		var otraccia = 0;
		var trk_ritra = window.localStorage.getItem('trk_ritra');	
		if ( trk_ritra == null ) {trk_ritra =''};
		window.localStorage.setItem('trk_ritra','');
		var trk_datra = window.localStorage.getItem('trk_datra');
		if ( trk_datra == null ) {trk_datra =''};
		window.localStorage.setItem('trk_datra','');
		var ltracce= trk_datra + trk_ritra;

		if  ( ltracce != '' ) {
			trs = trs + 1;
			window.localStorage.setItem('trk_intra'+trs,ltracce);	
		    var alat = "&lat=";
		    var alon = "&lon=";
		    var aora = "&ora=";
		    var aquota = "&alt=";
		    var aaccuracy = "&acc=";
		    var aspeed = "&speed=";
		    var averso = "&verso=";
		    var amezzo = "&mezzo=";
			var punti = '';
			var otraccia = '';
			atracce = ltracce.split(';');
			var pntdatrs=0;
			for ( var x=0;x<atracce.length;x++){	
				if ( atracce[x] != '' ) {
					var xpoint = atracce[x].split(",");
					if ( otraccia != xpoint[8] && otraccia != '' && punti != '' ) {
						punti = 'usr=' + user + '&pwd=' + password + '&trs=' + trs + alat + alon + aora + aaccuracy + aquota + aspeed + averso + amezzo+ '&traccia=' + otraccia;
						invia_tracce(punti, trs, pntdatrs);
					    alat = "&lat=";
					    alon = "&lon=";
					    aora = "&ora=";
					    aquota = "&quota=";
					    aaccuracy = "&accuracy=";
					    aspeed = "&speed=";
					    averso = "&verso=";
					    amezzo = "&mezzo=";
						punti = '';
						trs = trs + 1;
						pntdatrs=0;
					}
					
			        alat += "," + xpoint[0];
			        alon += "," + xpoint[1];
			        aora += "," + xpoint[2];
			        averso += "," + xpoint[3];
			        aquota += "," + xpoint[4];
			        aaccuracy += "," + xpoint[5];
			        aspeed += "," + xpoint[6];			        			       
			        amezzo += "," + xpoint[7];
					otraccia = xpoint[8];
					pntdatrs= pntdatrs+1;
				}
			}	
			if ( pntdatrs >0 ) {

				punti = 'usr=' + user + '&pwd=' + password + '&trs=' + trs + '&traccia=' + escape(otraccia) + alat + alon + aora + aaccuracy + aquota + aspeed + averso + amezzo
				invia_tracce(punti, trs, pntdatrs);
			}
		}	
	}
}


function invia_tracce(xpunti,xtrs,xpntdatrs) {
	if ( xonline ) {
		try {
			var reqSync = new XMLHttpRequest();		
			reqSync.onreadystatechange=function()
			{	
				if (reqSync.readyState == 4 && reqSync.status == 200) {	
					suc_inviotracce(reqSync.responseText,xtrs,xpntdatrs); 							
				}
			}
			reqSync.open("POST", server+"/app_tracciami.asp", true);
			reqSync.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			reqSync.timeout = 10000;
			reqSync.onabort = function () { ar_log('abort');fail_inviotracce(xtrs) };
			reqSync.onerror = function () { ar_log('error');fail_inviotracce(xtrs) };
			reqSync.ontimeout = function () {ar_log('timeout');fail_inviotracce(xtrs) };
			
			reqSync.send(xpunti+"&xx=xx");		
			return null;					
		} catch (ex) {
			ar_log('ex1'+ex);
			fail_inviotracce(xtrs) 		
			return null;	
		}
	} else {
		ar_log('ex2');
		fail_inviotracce(xtrs) 		
		return null;		
	}
}

function suc_inviotracce(rdata,rtrs,rpnttrs) {	
	if ( parseInt(rdata) == parseInt(rtrs) ) {	
		window.localStorage.removeItem("trk_intra"+rtrs);	
		pnttrs += rpnttrs; 
		$('#TRKpuntitra').html(pnttrs);
		window.localStorage.setItem("pnttrs",pnttrs);		
		trsincorso  = false ;	
		setTimeout("conta_tracce();",300);
	} else {
		fail_inviotracce(rtrs);
	}
}

function fail_inviotracce(rtrs) {
	var trk_intra = window.localStorage.getItem('trk_intra'+rtrs);	
	if ( trk_intra == null ) {trk_intra =''};
	var trk_ritra = window.localStorage.getItem('trk_ritra');	
	if ( trk_ritra == null ) {trk_ritra =''};
	trk_ritra = trk_ritra+trk_intra;
	window.localStorage.setItem('trk_ritra',trk_ritra);	
	window.localStorage.removeItem("trk_intra"+rtrs);	
	trsincorso  = false ;
}


function insert_tracce(xtraccia, xdata,xlat,xlon,xverso,xquota,xaccuracy,xspeed,xmezzo ) 
{
	pnt = pnt + 1;
	window.localStorage.setItem("pnt",pnt); 
	$('#TRKpuntiril').html(pnt);	
	var trk_datra = window.localStorage.getItem("trk_datra");	
	if ( trk_datra == null ) {trk_datra =''};
	trk_datra += xs(xlat)+','+xs(xlon)+','+xs(xdata)+','+xs(xverso)+','+xs(xquota)+','+xs(xaccuracy)+','+xs(xspeed)+','+xs(xmezzo)+','+encodeURIComponent(xtraccia)+';'	
	window.localStorage.setItem("trk_datra",trk_datra);	
}

function onoff_tracce()
{
	if ( tracciamentoattivo ) 
	{
		stop_tracce();
	} else {
		start_tracce();
	}
}



function cambia_traccia() {

    traccia = $('#TRKdtraccia').val();
    window.localStorage.setItem("traccia",traccia);		

    olat = 0;
    olon = 0;
	tdistanza=0;
	tdislivelloSU=0;
	tdislivelloGIU=0;
	pnttrs=0;
	pnt=0;
	ss=0;
	tdistanza=0;

	window.localStorage.setItem("tdistanza",0); 
	window.localStorage.setItem("dislivelloSU",0); 
	window.localStorage.setItem("dislivelloGIU",0); 	
	window.localStorage.setItem("pnt",0);
	window.localStorage.setItem("pnttrs",0);		
	$('#TRKtempo').html("");		
	$('#TRKinizio').html("");					
	$('#TRKdistanza').html("0");
	$('#TRKdislivelloSU').html("");	
	$('#TRKdislivelloGIU').html("");		
	$('#TRKlatitudine').html("");	
	$('#TRKlongitudine').html("");
	$('#TRKquota').html("0");
	$('#TRKraggio').html("0");
	$('#TRKpuntiril').html("0");
	$('#TRKpuntitra').html("0");

}
	  
function failpar(error){
  $('#PARmessaggi').html ("Non riesco ad accedere al GPS<br>verifica che sia presente<br> ed acceso <br>diversamente<br> non e possibile continuare");
  setTimeout('navigator.geolocation.getCurrentPosition( sucpar,failpar,options);',5000); 

};
function sucpar(p){
	$('#PARmessaggi').html("GPS acceso e funzionante");
	var attstato = checkuser();
	if ( attstato == "NET" ) {
 		$("#PARattivaUSR").hide();
 		$("#PARattivaTEL").hide();
 		$("#PARattivaABB").hide();
		$('#PARmessaggi').html("Problemi di comunicazione di rete. superato il massimo numero di tentativi");
	
	}
	if ( attstato == "OK" ) {
 		$("#PARattivaUSR").hide();
 		$("#PARattivaTEL").hide();
 		$("#PARattivaABB").hide();
		$('#PARmessaggi').html("APP attivata e funzionante");
		pg_posizione()
	}		
	if ( attstato == "USR" ) {
 		$("#PARattivaUSR").show();
 		$("#PARattivaTEL").hide();
 		$("#PARattivaABB").hide();
	}	
		
	if ( attstato == "UUID" ) {
 		$("#PARattivaUSR").hide();
 		$("#PARattivaTEL").show();
 		$("#PARattivaABB").hide();
	}	
	if ( attstato == "EUR" ) {
 		$("#PARattivaUSR").hide();
 		$("#PARattivaTEL").hide();
 		$("#PARattivaABB").show();
	}		
};

function cancella_tutto() {
		localStorage.clear();
		user="";
		password="";
		telefono="";
		email="";
      $("#PARfooter").hide();
      $("#PARattivaUSR").hide();
      $("#PARattivaTEL").hide();
      $("#PARattivaABB").hide();
      $("#PARregistrati").hide();

      $("#PARemail").val( window.localStorage.getItem("email"));
      $("#PARpassword").val( window.localStorage.getItem("password"));
      $("#PARtelefono").val( window.localStorage.getItem("telefono"));

      $("#PARmessaggi").html("Stiamo testando il GPS...");
      navigator.geolocation.getCurrentPosition( sucpar,failpar,options);
}
function regora() {
	$("#PARattivaUSR").hide();
	$("#PARregistrati").show();
	$('#REGemail').val($('PARemail').val());
	$('#REGpassword').val($('PARpassword').val());

}
function attora() {
	$("#PARattivaUSR").show();
	$("#PARregistrati").hide();
	$('#PARemail').val($('REGemail').val());
	$('#PARpassword').val($('REGpassword').val());

}

function recupera_pwd() {
	var rgemail = $('#PARemail').val();
	if ( rgemail !=''  ) {
		var data ="email="+rgemail+"&ckx="+gps_time()
		try {
			attendere_start();
			var xurl= server+"/app_recupera.asp?ope="+gps_time()				
			httpReq.onreadystatechange = handleStateChange;	
			httpReq.open('POST', xurl, false);
			httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
			httpReq.send(data);
			if (httpReq.readyState == 4 && httpReq.status == 200) {
				attendere_stop();
				var esito =  httpReq.responseText
			
				if ( esito == 'OK' ) {					
			 		ar_alert('Ti e stata inviato la password per email, controlla la tua posta');					 			
				} else  {
					ar_alert('Questa email non sembra essere registrata, forse non ti sei ancora registrato?') 
				}
			
			} else {	
				attendere_stop();		
				ar_log("errore di connessione");
				ar_alert("errore di connessione");
			}
		} catch (ex) {
			attendere_stop();
			ar_log("errore di connessione:"+ex.message);
			ar_alert("errore di connessione:"+ex.message);
		}
		
	}else {	
		ar_alert('Non posso recuperare la password se non mi dai almeno email');
	}
}
function registrati() {
	if ( registrati_on != true ) {
		registrati_on = true ;
		var okrg=true ;
		var rgnome = $('#REGnome').val();
		var rgcognome = $('#REGcognome').val();
		var rgemail = $('#REGemail').val();
		var rgpassword = $('#REGpassword').val();
		var rgtelefono = $('#REGtelefono').val();
		msg ="";
		if ( rgnome == '' ) { okrg = false ;  $('#REGnome').attr('data-theme','e').trigger('refresh'); msg+="Nome obbligatorio <br>" };
		if ( rgcognome == '' ) { okrg = false ;  $('#REGcognome').attr('data-theme','e').trigger('refresh'); msg+="Cognome obbligatorio <br>" };
		if ( rgemail.length <8 ) { okrg = false ;  $('#REGemail').attr('data-theme','e').trigger('refresh'); msg+="Email obbligatoria <br>" };
		if ( rgpassword.length <8 ) { okrg = false ;  $('#REGpassword').attr('data-theme','e').trigger('refresh');msg+="Password almeno 8 caratteri <br>" };
		if ( rgtelefono.length <8 ) { okrg = false ;  $('#REGtelefono').attr('data-theme','e').trigger('refresh');msg+="Telefono almeno 8 numeri <br>" };
		if ( okrg ) {				
			try {
				attendere_start();
				var ckx="XX"+gps_time();
				var xurl= server+"/app_registra.asp?cfx="+ckx	
				var data ="email="+rgemail+"&pwd="+rgpassword+"&uuid="+uuid+"&telefono="+rgtelefono+"&nome="+rgnome+"&cognome="+rgcognome+"&ckx="+ckx+"&ck=XX"
				httpReq.onreadystatechange = handleStateChange;	
				httpReq.open('POST', xurl, false);
				httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
				httpReq.send(data);
				if (httpReq.readyState == 4 && httpReq.status == 200) {
					attendere_stop();
					var rdata = httpReq.responseText;
					var xdata =  rdata.split(";");
				
					if ( xdata[0] == 'OK' ) {
					 	window.localStorage.setItem("user", xdata[1] );
					 	window.localStorage.setItem("email", rgemail);
					 	window.localStorage.setItem("password", rgpassword);
					 	window.localStorage.setItem("telefono", rgtelefono );
					 	email = rgemail;
					 	password = rgpassword;
					 	telefono = rgtelefono;
					 	user = xdata[1];

				 		ar_alert('Ok e stato inviato un messaggio SMS al numero di telefono che hai indicato , contiene un link con il  quale completare la registrazione ed attivare la APP.!');	
				 		$("#PARattivaUSR").hide()
				 		$("#PARregistrati").hide() 
				 		$("#PARattivaTEL").show() 
				 		$("#PARtelefono").val(rgtelefono);
			 			tcheckUUID = setInterval("checkUUID(false)",30000)
					} else  {
						 ar_alert("Messaggio dal server:"+rdata ) ;
					}
				} else {	
					attendere_stop();		
					ar_log("errore di connessione");
					ar_alert("errore di connessione");
				}
			} catch (ex) {
				ar_log("errore di connessione:"+ex.message);
				ar_alert("errore di connessione:"+ex.message);
			}
		} else {
			ar_alert(msg);
		}
		registrati_on = false;
	}
}

function salvaUSR() {		
	var data ="ope=USR&email="+$("#PARemail").val()+"&pwd="+$("#PARpassword").val()+"&uuid="+uuid;
	try {
		attendere_start();
		var xurl= server+"/app_attiva.asp?"+gps_time()
		httpReq.onreadystatechange = handleStateChange;	
		httpReq.open('POST', xurl, false);
		httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
		httpReq.send(data);
		if (httpReq.readyState == 4 && httpReq.status == 200) {
				attendere_stop();
				var xdata =  httpReq.responseText.split(",")					
			 	window.localStorage.setItem("user", xdata[0] );
			 	window.localStorage.setItem("email", $("#PARemail").val());
			 	window.localStorage.setItem("password", $('#PARpassword').val());
			 	window.localStorage.setItem("telefono", xdata[1] );
			 	$('#PARtelefono').val(xdata[1]) ;
			 	user = xdata[0];
			 	password = $('#PARpassword').val();
		
				var xstato = checkuser() 
				if ( xstato == 'OK'  ) 
				{
			 		ar_alert('Operazione completata correttamente!');
			 		$("#PARattivaUSR").hide()
			 		$("#PARattivaTEL").hide() 
			 		$("#PARattivaABB").hide()
			 		pg_posizione()
			 	}
			 	if ( xstato == "UUID" ) {
			 		ar_alert('Utente e password corretti, ora verifica il telefono!');	
			 		$("#PARattivaUSR").hide()
			 		$("#PARattivaTEL").show() 
			 	}
			 	if ( xstato == "EUR" ) {
			 		ar_alert('Tutto corretto!! pero l abbonamento non e attivo, completa la registrazione sul sito grazie ');	
			 		$("#PARattivaTEL").hide()
			 		$("#PARattivaABB").show()
				}	
		} else {	
			attendere_stop();		
			ar_alert('Controlla email e password , poi riprova.');
		}
	} catch (ex) {
		attendere_stop();
		ar_log("errore di connessione:"+ex.message);
		ar_alert("errore di connessione:"+ex.message);
	}

}


function salvaUUID() {		
	var data ="ope=UUID&usr="+user+"&telefono="+$("#PARtelefono").val()+"&uuid="+uuid;
	try {
		attendere_start();
		var xurl= server+"/app_attiva.asp?"+gps_time()
		httpReq.onreadystatechange = handleStateChange;	
		httpReq.open('POST', xurl, false);
		httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
		httpReq.send(data);
		if (httpReq.readyState == 4 && httpReq.status == 200) {
				attendere_stop();
				var xdata = httpReq.responseText 
				if ( xdata == 'OK' ) {
				 	window.localStorage.setItem("telefono", xdata[1] );
				 	ar_alert('Ti verra inviato un messaggio SMS con un link da seguire, quindi chiudi la App e rientra. ');
				 	$('#PARmessaggi').html('Ti verra inviato un messaggio SMS <br> con un link da seguire <br> quindi chiudi la App e rientra. ')
				 	clearInterval(tcheckUUID );
				 	tcheckUUID = setInterval("checkUUID(false)",20000)
				}
				if ( xdata == 'SMS' ) {
					ar_alert('Ricontrolla il numero di telefono, non riusciamo a spedirti il messaggio SMS per attivazione del dispositivo ');
					$('#PARmessaggi').html('Ricontrolla il numero di telefono, <br>non riusciamo a spedirti il messaggio SMS per attivazione ')
				}
				if ( xdata == 'KO' ) {
					ar_alert('Abbiamo gia spedito un sms a questo numero. se non lo hai ricevuto forse il numero di telefono e sbagliato. ricontrollalo ');
					$('#PARmessaggi').html('Abbiamo gia spedito un sms a questo numero. se non hai ricevuto l SMS forse il numero di telefono e sbagliato. ricontrollalo   ' )
				}	
					
		} else {	
			attendere_stop();			
			ar_alert('Controlla telefono e, poi riprova. ');
		}
	} catch (ex) {
		attendere_stop();
		ar_log("errore di connessione:"+ex.message);
		ar_alert("errore di connessione:"+ex.message);
	}

}

function checkUUID(display) {

	var xstato = checkuser() 
	if ( xstato == 'OK'  ) 
	{
 		ar_alert('Operazione completata correttamente!');
 		$("#PARattivaUSR").hide()
 		$("#PARattivaTEL").hide() 
 		$("#PARattivaABB").hide()
 		clearInterval(tcheckUUID)
 		pg_posizione()
 	}
 	if ( xstato == "EUR" ) {
 		clearInterval(tcheckUUID)
 		ar_alert('Tutto corretto!! pero l abbonamento non e attivo, completa la registrazione sul sito grazie ');	
 		$("#PARattivaTEL").hide()
 		$("#PARattivaABB").show()
	}	
	if  ( xstato != 'OK' && xstato != 'EUR' && display ) { ar_alert('Ci dispiace. Il telefono non è ancora attivo') } 

};

function fail_allarme(error){
	if ( pnt == 0 ) {
	    $('#ALLmessaggi').html("<p>Non riusciamo  rilevare la posizione dal GPS. Errore = "+error.message);
    }
    navigator.geolocation.clearWatch(geoallarme);
	setTimeout("geoallarme = navigator.geolocation.watchPosition(suc_allarme,fail_allarme,options);", 5000);

};


function suc_allarme(p){
 
 
	distanza =  distance(olat,olon,p.coords.latitude,p.coords.longitude,"M")
	
	ist = gps_time() 
						
	if ( distanza < (-10) || distanza > 10  ||  (oacc - p.coords.accuracy )> 10  ) {
		pnt = pnt + 1;
		insert_allarme(allarme,ist,p.coords.latitude,p.coords.longitude,p.coords.heading,p.coords.altitude,p.coords.accuracy,p.coords.speed) 		
		if ( olat == 0 ) aggiorna_allarmi() ;
		olat =  p.coords.latitude;		
		olon =  p.coords.longitude;
		oacc = p.coords.accuracy;				
	}

	$('#ALLlongitudine').html(gms( p.coords.longitude));
	$('#ALLlatitudine').html(gms( p.coords.latitude));
	
	if ( p.coords.altitude!=null ) $('#ALLquota').html(p.coords.altitude.toFixed(0)+"m");
	if ( p.coords.accuracy!=null ) $('#ALLraggio').html(p.coords.accuracy.toFixed(0)+"m"); 
	if ( p.coords.speed!=null  )  {

		var velocita  = (p.coords.speed/1000)*3600;
		$('#ALLvelocita').html(''+velocita.toFixed(0)+' km/h ');
	}		
	if ( p.coords.heading!=null ) 
	{	 $('#ALLverso').html(''+ Math.floor(p.coords.heading)+ String.fromCharCode(176));	}

	
	$('#ALLpuntiril').html(pnt)


};

function start_allarme() 
{	
	window.localStorage.setItem("allarme","start");
	pagina ='allarme';
	pnt=0;
	pnttrs =0;
	allarme = gps_time() 
	olat = 0;
	olon = 0;
	tracciamentoattivo=true;
	primatras =true ;
	
	trs = 0;

	inaggiorna_allarmi = window.setInterval("aggiorna_allarmi()", 10000);
	inistruzioni  = setInterval("ricevi_istruzioni()", 11000);
	$('#ALLmessaggi').html("STO INVIANDO L'ALLARME! <br>CONTINUERO' A PROVARE FINCHE NON CI SARO RIUSCITO!<br>NON CHIUDERE LA APP E ASPETTA")
	$('#ALLballarme').hide();	
	$('#ALLfooter').hide();	
	$('#ALLgpsdati').show();
	geoallarme = navigator.geolocation.watchPosition(suc_allarme,fail_allarme,options);

};

function ricevi_istruzioni() { 

	if  ( xonline ) {		
		try {
			var sdata = "usr="+user+"&pwd="+password
			var xurl= server+"/app_istruzioni.asp?"+gps_time()
			httpReq.onreadystatechange = handleStateChange;	
			httpReq.open('POST', xurl, false);
			httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
			httpReq.send(sdata);
			if (httpReq.readyState == 4 && httpReq.status == 200) {
				var data =  httpReq.responseText 
				if ( data != '' ) {
					mdata = data.split('|');
					if ( mdata[0] == 'MSG' ) {
						$('#ALLmessaggi').html(mdata[1]) ;
						navigator.notification.beep(2);
						navigator.notification.vibrate(1000)
					}
					if ( mdata[0] == 'CLOSE' ) {
						stop_allarme();
						$('#ALLballarme').show();	
						$('#ALLfooter').show();	
						$('#ALLgpsdati').hide();
					}
				}
			}
		} catch (ex) {
			
		}
	}
};



function stop_allarme() {
	window.localStorage.setItem("allarme","stop");
	tracciamentoattivo=false;
	navigator.geolocation.clearWatch(allarmeGEO );
	clearInterval(inaggiorna_allarmi);
	clearInterval(inistruzioni)	
}


function aggiorna_allarmi () {	
	if ( xonline ) {
		trsincorso  = true;
		var all_ritra = window.localStorage.getItem('all_ritra');	
		if ( all_ritra == null ) {all_ritra =''};
		window.localStorage.setItem('all_ritra','');
		var all_datra = window.localStorage.getItem('all_datra');
		if ( all_datra == null ) {all_datra =''};
		window.localStorage.setItem('all_datra','');
		var lallarmi= all_datra + all_ritra;
		if  ( lallarmi != '' ) {
			trs = trs + 1;
			window.localStorage.setItem('all_intra'+trs,lallarmi);	
		    var alat = '&lat=';
		    var alon = '&lon=';
		    var aora = '&ora=';
		    var aquota = '&alt=';
		    var aaccuracy = '&acc=';
		    var aspeed = '&speed=';
		    var averso = '&verso=';
	
			var punti = '';		
			aallarmi = lallarmi.split(';');
			var pntdatrs=0;
			for ( var x=0;x<aallarmi.length;x++){	
				if ( aallarmi[x] != '' ) {
					var xpoint = aallarmi[x].split(",");					
			        alat += ','+encodeURIComponent(xpoint[0]);
			        alon += ','+encodeURIComponent(xpoint[1]);
			        aora += ','+encodeURIComponent(xpoint[2]);
			        averso += ','+encodeURIComponent(xpoint[3]);
			        aquota += ','+encodeURIComponent(xpoint[4]);
			        aaccuracy += ','+encodeURIComponent(xpoint[5]);
			        aspeed += ','+encodeURIComponent(xpoint[6]);
					pntdatrs= pntdatrs+1;
				}
			}	
			if ( pntdatrs >0 ) {			
				punti = 'usr=' + user + '&pwd=' + password + '&trs=' + trs + alat + alon + aora + aaccuracy + aspeed + averso+ aquota+'&dm='+encodeURIComponent(gps_time())+"123456890ABCDEFGHI";
				invia_allarme(punti, trs, pntdatrs);
			}
		}
	}	else {
		if ( primatras ) {
			$('#ALLmessaggi').html('Al momento non ho copertura dati. Io continuo a provare. Ma tu se puoi spostati cercando campo' ) 
		}
	}		
}


function invia_allarme(xpunti,xtrs,xpntdatrs) {	
	if ( xonline ) {
		try {
			var reqSync = new XMLHttpRequest();		
			reqSync.onreadystatechange=function()
			{	
				if (reqSync.readyState == 4 && reqSync.status == 200) {			
					suc_invioallarme(reqSync.responseText,xtrs,xpntdatrs); 							
				}
			}
			reqSync.open("POST", server+"/app_allarme.asp", true);
			reqSync.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			reqSync.timeout = 10000;
			reqSync.onabort = function () { fail_invioallarme(xtrs) };
			reqSync.onerror = function () { fail_invioallarme(xtrs) };
			reqSync.ontimeout = function () { fail_invioallarme(xtrs) };
			ar_log(xpunti);
			reqSync.send(xpunti);		
			return null;					
		} catch (ex) {
			fail_invioallarme(xtrs) 		
			return null;	
		}
	} else {
		fail_invioallarme(xtrs) 	
	}
}



function suc_invioallarme(rdata,rtrs,rpnttrs) {	
if ( parseInt(rdata) == parseInt(rtrs) ) {	
	window.localStorage.removeItem("all_intra"+rtrs);	
	trsincorso  = false ;	
	pnttrs += rpnttrs; 
	$('#ALLpuntitra').html(pnttrs);
	if ( primatras ) {
		$('#ALLmessaggi').html('ALLARME RICEVUTO <br> ATTENDERE IL CONTATTO DALLA CENTRALE <br> NON CHIUDERE IL PROGRAMMA ');
		try { navigator.notification.beep(2) } 
		catch (ex) {};
	}
	primatras = false;
} else { 
	fail_invioallarme(xtrs) 
}	
}

function fail_invioallarme(rtrs) { 
ar_log('errore invio allarme');
	var all_intra = window.localStorage.getItem('all_intra'+rtrs);	
	if ( all_intra == null ) {all_intra =''};
	var all_ritra = window.localStorage.getItem('all_ritra');	
	if ( all_ritra == null ) {all_ritra =''};
	all_ritra = all_ritra+all_intra;
	window.localStorage.setItem('all_ritra',all_ritra);	
	window.localStorage.removeItem("all_intra"+rtrs);	
	if ( primatras ) {
			$('#ALLmessaggi').html('Al momento non ho copertura dati. Io continuo a provare ma tu se puoi prova a spostarti' );
	}

	trsincorso  = false ;
} 

function insert_allarme(xallarme, xdata,xlat,xlon,xverso,xquota,xaccuracy,xspeed ) 
{	

	var all_datra = window.localStorage.getItem("all_datra");	
	if ( all_datra == null ) {all_datra =''};
	all_datra += xs(xlat)+','+xs(xlon)+','+xs(xdata)+','+xs(xverso)+','+xs(xquota)+','+xs(xaccuracy)+','+xs(xspeed)+';'	
	window.localStorage.setItem("all_datra",all_datra);	

}			
		
function fail_posizione(error){
    var msg = "Non riesco a rilevare la posizione ";
    $('#POSposizione').html(msg);
    attendere_stop();
};

function suc_posizione(p){
	
	ist = gps_time();
	$('#POSlongitudine').html(gms(p.coords.longitude))
	$('#POSlatitudine').html(gms(p.coords.latitude))
	if ( p.coords.altitude != null) $('#POSquota').html(p.coords.altitude.toFixed(0)+"m");
	if ( p.coords.accuracy != null) $('#POSraggio').html(String.fromCharCode(177)+p.coords.accuracy.toFixed(0)+"m");
	if ( p.coords.altitudeAccuracy!= null) $('#POSaccquota').html(String.fromCharCode(177)+p.coords.altitudeAccuracy.toFixed(0)+"m");			
	if  ( xonline ) {		
		try {			
			var sdata = "usr="+user+"&pwd="+password +"&lon="+p.coords.longitude+"&lat="+p.coords.latitude;
			var xurl= server+"/app_posizione.asp?"+gps_time()
			httpReq.onreadystatechange = handleStateChange;	
			httpReq.open('POST', xurl, false);
			httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
			httpReq.send(sdata);
			if (httpReq.readyState == 4 && httpReq.status == 200 ) {
				attendere_stop();
				var data = httpReq.responseText ;
				$('#POSposizione').html(data);	
			}
		} catch (ex) {
			attendere_stop();
			$('#POSposizione').html('Non riusciamo ad attivare la connessione dati, controlla di avere copertura telefonica e di essere abilitato alla navigazione. ');
		}
	}else {
		attendere_stop();
		$('#POSposizione').html('manca copertura dati ');
	}
};

function getposizione() {
	attendere_start();
	navigator.geolocation.getCurrentPosition( suc_posizione,fail_posizione,{timeout: 30000 , maximumAge: 0, enableHighAccuracy: true });
}

function open_link(xlink) {
	var ref = window.open(xlink, '_blank', 'location=yes'); 
}

function pg_posizione() 
{	

	pagina='posizione';
	window.localStorage.setItem("status",pagina);
	$.mobile.changePage("#pgposizione", { transition: "none"});
    var olat = 0;
    var olon = 0;
    var pnt =0;
    var oacc = 9999999;
    var dlat = 0;
    var dlon = 0;
    var primogps =true;
    $('#versione').html(versione+" ("+usrcheck+"/"+failcheck+") " );
    getposizione();

}		

function pg_parametri() 
{		

	pagina='parametri';
	window.localStorage.setItem("status",pagina);
	$.mobile.changePage("#pgparametri",{ transition: "none"});    
	$("#PARfooter").hide() ;
	$("#PARattivaUSR").hide();
	$("#PARattivaTEL").hide();
	$("#PARattivaABB").hide();
	$("#PARregistrati").hide();
	$("#PARemail").val( window.localStorage.getItem("email"));
	$("#PARpassword").val( window.localStorage.getItem("password"));
	$("#PARtelefono").val( window.localStorage.getItem("telefono"));
	$("#PARmessaggi").html("Stiamo testando il GPS...");
	navigator.geolocation.getCurrentPosition( sucpar,failpar,options);
}	

function pg_allarme()
{

	pagina='allarme';
	window.localStorage.setItem("status",pagina);
	$.mobile.changePage("#pgallarme");
    $('#ALLgpsdati').hide();
    if ( window.localStorage.getItem("allarme") == "start" ) start_allarme();
}

function pg_tracciami()
{

	pagina='tracciami';
	window.localStorage.setItem("status",pagina);
	$.mobile.changePage( "#pgtracciami",{ transition: "none"});
	var today = new Date()
	traccia = "Traccia "+today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
	$('#TRKdtraccia').val(traccia);
	pnttrs=0;
	pnt=0;
	ss=0;
	tdistanza=0;
	tdislivelloSU=0;
	tdislivelloGIU=0;
	olat = 0;
	olon = 0;		
	cambia_mezzo(ultmezzo)
	if (xonline)  $('#TRKwifi').attr('src','images/wifi-on.png')
	else $('#wifi').attr('src','images/TRKwifi-off.png')
	if ( window.localStorage.getItem("tracciami") == "start" ) {
		$('#start_trk').attr('checked',true).checkboxradio("refresh"); 
		$('#stop_trk').attr('checked',false).checkboxradio("refresh"); 
		start_tracce() 
	}
}

function pg_nogps()
{
	pagina='nogps';
	window.localStorage.setItem("status",pagina);
	$.mobile.changePage( "#pgnogps");
	navigator.geolocation.getCurrentPosition( sucpar,failpar,options);
}



	

