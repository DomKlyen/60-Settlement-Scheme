function ngInclude() {
    var z, i, elmnt, file, include, xhttp;
    z = document.getElementsByTagName( '*' );
    for ( i = 0; i < z.length; i++ ) {
        elmnt = z[i];
        file = elmnt.getAttribute('ng-include');

        if ( file ) {
            include = elmnt.getAttribute('data-ng-include');
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if ( this.readyState == 4 ) {
                    if ( this.status == 200 ) { 
                        if ( include === 'replace' ) { 
                            elmnt.outerHTML = this.responseText;
                        } else {
                            elmnt.innerHTML = this.responseText;
                        }
                    }
                    if ( this.status == 404 ) { elmnt.innerHTML = 'Source not found.'; }
                    elmnt.removeAttribute( 'ng-include' );
                    if ( include ) { elmnt.removeAttribute( 'data-ng-include' ); }
                    ngInclude();
                }
            }      
            xhttp.open( 'GET', file, true );
            xhttp.send();
            return;
        }
    }
}

window.onload = function(){ 
    ngInclude();
}
