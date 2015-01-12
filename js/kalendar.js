/**
	* unsere "Datenbank":
		25.9. - 10.10.					Pichmännelfest		veranst_0001	x
		16.10. - 29.01.2015, jeweils Do: Populärkultur		veranst_0002
		27.11. - 24.12.					Striezelmarkt		veranst_0003	x
		5.12.: 							Nussknacker			veranst_0004	x
		07.12.2014 / 21.12.2014:		Sonntag				veranst_0005	x
		31.12.							Silvester			veranst_0006	x
		14.1.2014						Workshop			veranst_0007	x
	*/
var veranstKalender = TAFFY([	{day:5, month:12, year: 2014, veranstaltung:4},
								{day:14, month:1, year: 2015, veranstaltung:7},
								{day:31, month:12, year: 2014, veranstaltung:6},
								{day:7, month:12, year: 2014, veranstaltung:5},
								{day:21, month:12, year: 2014, veranstaltung:5}
							]);
//DB-Befuellung
//	fillRecords(startDay, endDay, month, year, veranstNr, regel)
//September 2014
	fillRecords(25, 30, 9, 2014, 1, 1);
//Oktober
	fillRecords(1, 10, 10, 2014, 1, 1);
	fillRecords(16, 30, 10, 2014, 2, 7);
//November
	fillRecords(6, 30, 11, 2014, 2, 7);
	fillRecords(27, 30, 11, 2014, 3, 1);
//Dezember
	fillRecords(4, 18, 12, 2014, 2, 7);
	fillRecords(1, 24, 12, 2014, 3, 1);
//Januar 2015
	fillRecords(8, 30, 1, 2015, 2, 7);
//----------------------------------------------------
//GET: veranstKalender({day:5,month:12,year:2014}).get()
//emptyCheck: veranstKalender({day:14,month:1,year:2015}).get().length === 0
//siehe auch: taffydb.com/writingqueries


//Kalender
var d = new Date();
var dm = d.getMonth() + 1;
var dj = d.getYear();
if (dj < 999)
  dj += 1900;
Kalender(dm, dj);
var kalender;
var textFeldDatum;

function fillRecords(startDay, endDay, month, year, veranstNr, regel){
	for(var n=startDay; n<=endDay; n=n+regel){
		veranstKalender.insert({day:n, month:month, year: year, veranstaltung:veranstNr});			
	}
		
}

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
        SchreibeZelle("", Monat, Jahr);	//für Tage vor 1. wenn dieser nicht Montag ist
      } else {
        if (Tageszahl > Stop) {
          SchreibeZelle("", Monat, Jahr);
        } else {
          if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tageszahl == DieserTag)) {
            SchreibeZelle(Tageszahl + "a", Monat, Jahr); //a -> to get Selected Day-Class
          } else {
            SchreibeZelle(Tageszahl, Monat, Jahr);
          }
          Tageszahl++;
        }
      }
    }
    if (Tageszahl > Stop) {
      SchreibeZelle("",  Monat, Jahr);	//stets Sonntag?
	  if (Tageszahl > Stop){ break; }		//myLittleHack (seems to work)
    } else {
      if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tageszahl == DieserTag)) {
        SchreibeZelle(Tageszahl + "a", Monat, Jahr); //a -> to get Selected Day-Class
      } else {
        SchreibeZelle(Tageszahl, Monat, Jahr);
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
	
	//initial state bei Seitenaufruf
	$(".veranstaltung").hide();
	displayEvents(DieserTag, DieserMonat, DiesesJahr);
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

function SchreibeZelle (Inhalt, Monat, Jahr) {
	
  if(Inhalt==="")
	kalender += ('<td>');
  else{
  	
  	var anzahlVeranstaltungen = veranstKalender({day:Inhalt,month:Monat,year:Jahr}).get().length;
  	// var anzahlVeranstaltungen = 1;
  	var tooltip;
  	if(anzahlVeranstaltungen === 0)
  		tooltip = '<span>Es finden keine Veranstaltungen statt.<\/span>';
  	else if (anzahlVeranstaltungen === 1){
  		tooltip = '<span>Es findet ' + anzahlVeranstaltungen +' Veranstaltung statt.<\/span>';
  	}
  	else 
  		tooltip = '<span>Es finden ' + anzahlVeranstaltungen +' Veranstaltungen statt.<\/span>';
  	
  	if( !isNaN(Inhalt) ){	// == if Inhalt is a Number
  		kalender += ('<td class="styleZelle tooltips" id="tag_'+ Inhalt +'">' + tooltip);
  	}
  	else{	//selected Day
  		Inhalt = Inhalt.slice(0, Inhalt.length-1);
  		kalender += ('<td class="styleZelle tooltips selectedDay" id="tag_'+ Inhalt +'">' + tooltip);
  	}
  }
  
  kalender += (Inhalt);
  kalender += ("<\/td>");
}

function initiateEventsDisplay(){
	$( ".styleZelle" ).on( "click", function() {
		//get Date -> stattfindende Veranstaltungen finden und anzeigen
		
		//initial state onClick
		$(".veranstaltung").hide();
		
		//strip out the tooltip
		var helperString = $( this ).text();
		var inhaltAt = helperString.indexOf(".");
		
		// ausgewaehlter Tag
		var day =  parseInt( helperString.substring(inhaltAt+1, helperString.length) ); 			
		var month = getMonth();
		var year = getYear();
		
		displayEvents(day, month, year);
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

function displayEvents(day, month, year){
		var keineVeranstaltung = true;
					
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
}

// VALIDIERUNG DATUM
function gueltigesDatum (datumTest){

	//Fehlerbehandlung
	 if (!datumTest) {	
		showRemove();
		return false;
	 }
	 datumTest=datumTest.toString();
	 datumTest=datumTest.split(".");	//Datum zu Array
	 
	 if (datumTest.length!=3){
		showRemove();
		return false;
	 } 
	 datumTest[0]=parseInt(datumTest[0],10);	//Entfernung der Nullen
	 datumTest[1]=parseInt(datumTest[1],10);
	 var kontrolldatum=new Date(datumTest[2],datumTest[1]-1,datumTest[0]);

	 
	 //Behandlung Jahr: wenn eins, zwei- oder dreistellig
	 if (datumTest[2].length>=1 && datumTest[2].length<=3 ){
		showRemove();
		return false;
	 } 
	 
	 //Behandlung von Jahresangaben mit zwei Zahlen >< aber z.Z. nicht vereinbar mit datapicker.js
	 /*
	 else if (datumTest[2].length==2) 
		datumTest[2]="20"+datumTest[2];
	 else if (datumTest[2].length==3) {
		showRemove();
		return false;
	 } */
	 //TEST: 
	 //console.log(kontrolldatum + " " + datumTest);
	 
	 //Vergleich JS-Datum mit eingegebenen Datum / letzter Validierungsschritt
	 if (kontrolldatum.getDate()==datumTest[0] && (kontrolldatum.getMonth() + 1)==datumTest[1] && kontrolldatum.getFullYear()==datumTest[2]){
		showOk();
	}
	 else{
		showRemove();
		return false;
	 }
	
}

function showRemove(){
	$(".glyphicon-ok").hide();
	$(".glyphicon-remove").show();
}
function showOk(){
	$(".glyphicon-remove").hide();
	$(".glyphicon-ok").show();
}
