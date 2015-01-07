$(function() {

	$('.datepicker').datepicker({
		format: 'dd.mm.yyyy',
		language: 'en'
		/* startDate: '-3d' */
	});
	
	/* initial existiert nur der Veranstaltungskalender des aktuallen Monats */
	//$(".veranstaltung").hide();
	// Initial-Info (zur Bedienung des Kalenders)?
	$(".form-control-feedback").hide();
	
});




