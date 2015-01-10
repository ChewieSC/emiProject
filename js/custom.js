$(function() {

	var textFeldDatum;

	$('.datepicker').datepicker({
		format: 'dd.mm.yyyy',
		language: 'en'
		/* startDate: '-3d' */
	});
	
	/* initial existiert nur der Veranstaltungskalender des aktuallen Monats */
	//$(".veranstaltung").hide();
	// Initial-Info (zur Bedienung des Kalenders)?
	$(".form-control-feedback").hide();
	
	// $('#dp1').change(function(){
		// var temp = $(this).val();
		// console.log(temp);
	// });
	
	$( "input[type='text']" ).change(function() {
		// textFeldDatum = $( this ).val();
	});
	
	//wenn "Suche" gedrueckt wird bzw Enter im Suchfeld
	// $( "#dp1" ).keyup(function( e ) {
	 	// if (  e.which === 13 ) {
	 		// e.preventDefault();
			// var year = parseInt(textFeldDatum.substr(textFeldDatum.length - 4));
			// var month = parseInt(textFeldDatum.substr(3, 5));
			// // console.log(textFeldDatum.substr(textFeldDatum.length - 4)+ " "+month);
			// Kalender(month, year);
			// makeEmBold();
			// $(".veranstaltung").hide();
		// }
	// });
	
	$( "#search-calendar" ).click(function() {
		$( "#dp1" ).keypress(13);
	});
	
});




