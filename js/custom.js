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
	$("form .form-control-feedback").hide();

	
	// $("#dp1").keyup(function (e) {
		// //when Enter is pressed
	    // if (e.keyCode == 13) {
	    	// e.preventDefault();
	    	// console.log($(this).val());
	    	// CheckInput();

	    // }
	// });
		
});

