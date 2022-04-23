
var copyBtn = new ZeroClipboard( $('button#copy-btn') );

ZeroClipboard.config( { swfPath: "http://localhost/signature//ZeroClipboard.swf" } );
copyBtn.on( 'ready', function(event) {
	alert('test');
});
copyBtn.on( 'copy', function(event){
	alert('test');
		var clipboard = event.clipboardData;
	clipboard.setData( "text/plain", "Copy me!" );
	clipboard.setData( "text/html", "<b>Copy me!</b>" );
	clipboard.setData( "application/rtf", "{\\rtf1\\ansi\n{\\b Copy me!}}" );
});