// Function για τον υπολογισμό των lat-long pairs που θα επεξεργαστούν
// ώστε να βρεθεί η θ΄εση των πρατηρίων
function get_point_between_points(lat1,lat2,lng1,lng2,d,D){
  var x = lat1 - (d*(lat1-lat2)/D);
  //var north_lat = lat1 + x / (15000 * 60) - 0.0010 + 0.00050;
  //north_lat = Math.min(north_lat, 90);
  var y = lng1 - (d*(lng1-lng2)/D);
  //return [north_lat,y];
  return [x,y];
}

Number.prototype.toRad = function () {
  return this * Math.PI / 180;
}

Number.prototype.toDeg = function () {
  return this * 180 / Math.PI;
}

function moveAlongPath(point, distance, index) {
  index = index || 0;  // Set index to 0 by default.

  var routePoints = [];

  for(var i = 0; i < point.length; i++) {
    routePoints.push(point[i]);
  }

  if (index < routePoints.length) {
    // There is still at least one point further from this point.

    // Construct a GPolyline to use the getLength() method.
    var polyline = new google.maps.Polyline({
      path: [routePoints[index], routePoints[index + 1]],
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });

    // Get the distance from this point to the next point in the polyline.
    var distanceToNextPoint = polyline.Distance();

    if (distance <= distanceToNextPoint) {
      // distanceToNextPoint is within this point and the next.
      // Return the destination point with moveTowards().
      return moveTowards(routePoints, distance,index);
    }
    else {
      // The destination is further from the next point. Subtract
      // distanceToNextPoint from distance and continue recursively.
      return moveAlongPath(routePoints,distance - distanceToNextPoint,index + 1);
    }
  }
  else {
    // There are no further points. The distance exceeds the length
    // of the full path. Return null.
    return null;
  }
}

function moveTowards(point, distance,index) {

  var lat1 = point[index].lat().toRad();
  var lon1 = point[index].lng().toRad();
  var lat2 = point[index+1].lat().toRad();
  var lon2 = point[index+1].lng().toRad();
  var dLon = (point[index + 1].lng() - point[index].lng()).toRad();

  // Find the bearing from this point to the next.
  var brng = Math.atan2(Math.sin(dLon) * Math.cos(lat2),
                        Math.cos(lat1) * Math.sin(lat2) -
                        Math.sin(lat1) * Math.cos(lat2) *
                        Math.cos(dLon));

  var angDist = distance / 6371000;  // Earth's radius.

  // Calculate the destination point, given the source and bearing.
  lat2 = Math.asin(Math.sin(lat1) * Math.cos(angDist) +
                    Math.cos(lat1) * Math.sin(angDist) *
                    Math.cos(brng));

  lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(angDist) *
                            Math.cos(lat1),
                            Math.cos(angDist) - Math.sin(lat1) *
                            Math.sin(lat2));

  if (isNaN(lat2) || isNaN(lon2)) return null;



  return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
}
