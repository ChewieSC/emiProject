$(function() {

	/**
	* unsere "Datenbank":
		25.9. - 10.10.					Pichmännelfest		veranst_0001
		16.10. - 29.01.2015, jeweils Do: Populärkultur		veranst_0002
		27.11. - 24.12.					Striezelmarkt		veranst_0003
		5.12.: 							Nussknacker			veranst_0004
		07.12.2014 / 21.12.2014:		Sonntag				veranst_0005
		31.12.							Silvester			veranst_0006
	*/

	$('.datepicker').datepicker({
		format: 'dd.mm.yyyy',
		language: 'en'
		/* startDate: '-3d' */
	});
	
	/* initial existiert nur der Veranstaltungskalender des aktuallen Monats */
	$(".veranstaltung").hide();
	// Initial-Info (zur Bedienung des Kalenders)?

});




