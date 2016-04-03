document.addEventListener("deviceready", setupCompass, false);

function setupCompass() {
	console.log("SETUP");

	//var loc1 = { latitude: 51.6888639, longitude: 5.2855437 };
	//var loc2 = { latitude: 51.6889038, longitude: 5.2865522 };
	//var loc3 = { latitude: 51.6890235, longitude: 5.2835052 };
//
	//var bearing1 = calculateBearing(loc1.latitude, loc1.longitude, loc2.latitude, loc2.longitude);
	//var bearing2 = calculateBearing(loc1.latitude, loc1.longitude, loc3.latitude, loc3.longitude);

	//console.log(bearing1);
	//console.log(bearing2);

	//$("#compass").rotate(45);


	//geolocation
	navigator.geolocation.getCurrentPosition(updateLocation);
	var watchId = navigator.geolocation.watchPosition(updateLocation);

	//compass
	navigator.compass.getCurrentHeading(updateCompass);
	navigator.compass.watchHeading(updateCompass);

	$("#button_update").on("click", function() {
		console.log("update");
		navigator.geolocation.getCurrentPosition(updateLocation);
	});

}

function updateLocation(position) {
	console.log("Update location");

	var currentLatitude = position.coords.latitude;
	var currentLongitude = position.coords.longitude;

	var targetLocation = { latitude: 51.8048944, longitude: 5.4339814 };

	var currentLocation = { latitude: currentLatitude, longitude: currentLongitude };

	var bearing = calculateBearing(currentLatitude, currentLongitude, targetLocation.latitude, targetLocation.longitude);

	console.log(bearing);

	//update display
	$("#current_latitude").html("Latitude: " + currentLatitude);
	$("#current_longitude").html("Longitude: " + currentLongitude);
	$("#bearing").html("Bearing: " + bearing);
}

function updateCompass(heading) {
	var magneticHeading = heading.magneticHeading;
	console.log(heading);
	console.log(magneticHeading);
	$("#compass_bearing").html("Bearing: " + bearing);
}

function compassError(error) {
	console.log("compass error");
	console.log(error.code);
}

function calculateBearing(lat1,lng1,lat2,lng2) {
        var dLon = (lng2-lng1);
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
        var brng = toDegree(Math.atan2(y, x));
        return 360 - ((brng + 360) % 360);
}

function toDegree(rad) {
    return rad * 180 / Math.PI;
}


/* Notes


									51.6896620,5.2852862

51.6890235,5.2835052				51.6888639,5.2855437				51.6889038,5.2865522

									51.6883052,5.2851360


var testlocation = {longitude:5.4359651, latitude:51.8060321};

*/