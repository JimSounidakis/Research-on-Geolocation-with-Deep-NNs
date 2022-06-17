//Convert σε Rad για το function getDistance
Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

Number.prototype.toDeg = function () {
        return this * 180 / Math.PI;
    }

// getDistance = Haversine Formula
function getDistance(lat1,lat2,lng1,lng2){
  var R = 6371; //Kilometers
  var x1 = lat2-lat1;
  var dLat = x1.toRad();
  var x2 = lng2-lng1;
  var dLon = x2.toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
