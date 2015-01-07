var d = new Date();
var dm = d.getMonth() + 1;
var dj = d.getYear();
if (dj < 999)
  dj += 1900;
Kalender(dm, dj);
var kalender;
var textFeldDatum;

$('#dp1').change(function(){
	var temp = $(this).val();
	if(temp !== "" && temp !== textFeldDatum){
		textFeldDatum = $(this).val();	
	}
});

//wenn "Suche" gedrueckt wird bzw Enter im Suchfeld
$( "#dp1" ).keyup(function( e ) {
 	if (  e.which === 13 ) {
 		e.preventDefault();
		var year = parseInt(textFeldDatum.substr(textFeldDatum.length - 4));
		var month = parseInt(textFeldDatum.substr(3, 5));
		console.log(textFeldDatum.substr(textFeldDatum.length - 4)+ " "+month);
		Kalender(month, year);
		makeEmBold();
		$(".veranstaltung").hide();
	}
});
$( "#search-calendar" ).click(function() {
	$( "#dp1" ).keypress();
});

//Jahr und Monat aus dem Kalender auslesen
function getYear(){
	var year = $(".theOnlyNumberThatMatters")[0];
	year = $(year).text();
	return parseInt(year.substr(year.length - 4));
}
function getMonth(){
	var month = $(".theOnlyNumberThatMatters")[0];
	return parseInt( $(month).attr("id") );			
}

/*
	optimiertes/modifziertes Skript zur Erstellung des Veranstaltungskalenders,
	im Skelett großzügig angelehnt an den SELFHTML-Monatskalender
*/
function Kalender (Monat, Jahr) {
  kalender = "";
  Monatsname = new Array("Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli",
                          "August", "September", "Oktober", "November", "Dezember");
  Tag = new Array("Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag");

  var jetzt = new Date();
  var DieserMonat = jetzt.getMonth() + 1;
  var DiesesJahr = jetzt.getYear();
  if (DiesesJahr < 999)
    DiesesJahr += 1900;
  var DieserTag = jetzt.getDate();
  var Zeit = new Date(Jahr, Monat - 1, 1);
  var Start = Zeit.getDay();
  if (Start > 0) {
    Start--;
  } else {
    Start = 6;
  }
  var Stop = 31;
  if (Monat == 4 || Monat == 6 || Monat == 9 || Monat == 11)
    --Stop;
  if (Monat == 2) {
    Stop = Stop - 3;
    if (Jahr % 4 == 0)
      Stop++;
    if (Jahr % 100 == 0)
      Stop--;
    if (Jahr % 400 == 0)
      Stop++;
  }
  kalender += ('<table id="veranst_kalender" class="styleTabelle table">');
  var Monatskopf = Monatsname[Monat - 1] + " " + Jahr;
  SchreibeKopf(Monatskopf, Monat);
  var Tageszahl = 1;
  for (var i = 0; i <= 5; i++) {
	kalender += ("<tr>");
	//Montag-Samstag
    for (var j = 0; j <= 5; j++) {
      if ((i == 0) && (j < Start)) {
        SchreibeZelle("");	//für Tage vor 1. wenn dieser nicht Montag ist
      } else {
        if (Tageszahl > Stop) {
          SchreibeZelle("");
        } else {
          if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tageszahl == DieserTag)) {
            SchreibeZelle(Tageszahl);
          } else {
            SchreibeZelle(Tageszahl);
          }
          Tageszahl++;
        }
      }
    }
    if (Tageszahl > Stop) {
      SchreibeZelle("");	//stets Sonntag?
	  if (Tageszahl > Stop){ break }		//myLittleHack (seems to work)
    } else {
      if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tageszahl == DieserTag)) {
        SchreibeZelle(Tageszahl);
      } else {
        SchreibeZelle(Tageszahl);
    }
	if(Tageszahl<=Stop && i==4)	//myLittleHack #2 (seems to work too) > wenn man keine 5. Zeile braucht
		break;
    Tageszahl++;
	  
    }
    kalender += ("<\/tr>");
  }
  kalender += ("<\/table>");
  $("#kalender").html(kalender);
  
  //FUNCTIONS
  	makeEmBold();
	initiateEventsDisplay();
	initiatePrevNextFunction();
}

function SchreibeKopf (Monatstitel, Monat) {
  kalender += ("<tr>");
  kalender += ("<th id='kalender-prev'>«<\/th>");
  kalender += ('<th colspan="5" id="'+ Monat + '" class="styleKopf theOnlyNumberThatMatters">');
  kalender += (Monatstitel);
  kalender += ("<\/th>");
  kalender += ("<th id='kalender-next'>»<\/th><\/tr>");
  kalender += ("<tr>");
  for (var i = 0; i <= 6; i++)
    kalender += ('<th class="styleKopf-subheading">' + Tag[i] +" <\/th>");
  kalender += ("<\/tr>");
}

function SchreibeZelle (Inhalt) {
  if(Inhalt==="")
	kalender += ('<td>');
  else
	kalender += ('<td class="styleZelle" id="tag_'+ Inhalt +'">');
  kalender += (Inhalt);
  kalender += ("<\/td>");
}

function initiateEventsDisplay(){
	$( ".styleZelle" ).on( "click", function() {
		//get Date -> stattfindende Veranstaltungen finden und anzeigen
		
		//initial state
		$(".veranstaltung").hide();
		keineVeranstaltung = true;
		
		// ausgewaehlter Tag
		var day =  parseInt( $( this ).text() ); 			
		var month = getMonth();
		var year = getYear();
		
		console.log(day+" "+month+" "+year);	//Beispiel: "31 12 2014"
		
		//check if day is empty string!
		if(year==2014 && !isNaN(day) ){
			switch(month) {
				case 9:
					if(day>=25 && day<=30){
						$("#veranst_0001").show();
						keineVeranstaltung = false;
					}
					break;
				case 10:
					if(day>=1 && day<=10){
						$("#veranst_0001").show();
						keineVeranstaltung = false;
					}
					if(day==16 || day==23 || day==30){
						$("#veranst_0002").show();
						keineVeranstaltung = false;
					}
					break;
				case 11:
					if(day==6 || day==13 || day==20 || day==27){
						$("#veranst_0002").show();
						keineVeranstaltung = false;
					}
					if(day>=27 && day <=30){
						$("#veranst_0003").show();
						keineVeranstaltung = false;
					}
					break;
				case 12:
					if(day==4 || day==11 || day==18){
						$("#veranst_0002").show();
						keineVeranstaltung = false;
					}
					if(day>=1 && day <=24){
						$("#veranst_0003").show();
						keineVeranstaltung = false;
					}	
					if(day==5){
						$("#veranst_0004").show();
						keineVeranstaltung = false;
					}
					if(day==7 || day==21){
						$("#veranst_0005").show();
						keineVeranstaltung = false;
					}	
					if(day==31){
						$("#veranst_0006").show();
						keineVeranstaltung = false;
					}
					break;
				default:
			}
		}
		if(year==2015 && !isNaN(day) ){	//2015
			if(month==1){
				if(day==8 || day==15 || day==22 || day==29){
					$("#veranst_0002").show();
					keineVeranstaltung = false;
				}
				if(day==14){
					$("#veranst_0007").show();
					keineVeranstaltung = false;
				}
			}
		}
		//check ob keine Veranstaltungen angzeigt werden -> dann: Info
		if(keineVeranstaltung === true)
			$("#keine_veranst").show();
	});
}

function initiatePrevNextFunction(){
	$( "#kalender-prev" ).on( "click", function() {
		var year = getYear();
		var month = getMonth();
		//Jahr ändert sich (nach unten)
		if( month - 1 < 1){
			year = year - 1;
			month = 12;
		}
		else
			month=month-1;
		Kalender(month, year);
		makeEmBold();
		$(".veranstaltung").hide();
	});
	$( "#kalender-next" ).on( "click", function() {
		var year = getYear();
		var month = getMonth();
		//Jahr ändert sich (nach oben)
		if( month + 1 > 12){
			year = year + 1;
			month = 1;
		}
		else
			month=month+1;
		Kalender(month, year);
		makeEmBold();
		$(".veranstaltung").hide();
	});
}

function makeEmBold(){
	var month = getMonth();
	var year = getYear();
	
	if(year==2014){
			switch(month) {
				case 9:
					for(var n=25; n<=30; n++){
						$("#tag_"+n).addClass( "bold" );
					}
					break;
				case 10:
					for(var n=1; n<=10; n++){
						$("#tag_"+n).addClass( "bold" );
					}
					for(var n=16; n<=30; n=n+7){
						$("#tag_"+n).addClass( "bold" );
					}
					break;
				case 11:
					for(var n=6; n<=30; n=n+7){
						$("#tag_"+n).addClass( "bold" );
					}
					for(var n=27; n<=30; n++){
						$("#tag_"+n).addClass( "bold" );
					}					
					break;
				case 12:
					for(var n=1; n<=24; n++){
						$("#tag_"+n).addClass( "bold" );
					}
					//inkludiert 5,7,21,4,11,18
					$("#tag_"+31).addClass( "bold" );
					//whoaaa the hard-coding...
					break;
				default:
			}
		}
		if(year==2015){	//2015
			if(month==1){
				for(var n=8; n<=31; n=n+7){
						$("#tag_"+n).addClass( "bold" );
				}
				$("#tag_"+14).addClass( "bold" );
			}
		}
	
	
}
