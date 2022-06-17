var markersArray=[];
var map;
var infowindow;

//Main Function του Google JavaScript API
function initMap() {
  var mylatlng = {lat: 39.643452, lng: 22.413208};
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 8,
    center: mylatlng,
    options: {
      gestureHandling: 'greedy'
    }
  });

  //Input --> Encoded Polylines
  var points_first = new google.maps.geometry.encoding.decodePath('m__iF}|vcCbCtWuAbe@qIn`@eF~OpBuElIsZdFgf@oEufAiFwd@yJvJcFeEbBwBwI`S}Ov]sTpgAyRniCaDnmA{A`ZlCpR~B|MrKj}@lBhr@{AzYsInY{[n}@uXpf@yk@f_AgRza@{Fhg@uCxh@}Pj^ye@~YaPz\\oHvc@eSpoAyQtY{VrPsJf\\Hvb@kAnb@vIbc@~Kpe@dTv[~^~e@~i@foAlZlaAj@`c@aGng@}QpiAqYr{@yg@feAwKzd@dAbk@hGt_AIbg@cMne@qA|d@zBjk@yWjfA}J~c@kNf^kl@nv@}Ud[aVjRq~@bBiXpNq[zZ_q@zl@os@xZau@hd@{q@xh@gr@rb@wkBp}@gQb\\uLjd@o[zcAkLj^sT`Qsi@~c@qo@b]ei@pm@yl@pe@mSnQiLx[oKtXeV|OyYzMiRrXwZtqAyK|YoSfQi{@tGs[fGiW~Pms@~b@oz@nG}zBrGmv@aTku@q^qu@gZ_[iAuY~D{XzM}TjUki@tx@cl@|q@{u@v[yw@xBqcAaB__A{A}m@rKe_Anb@_cAbXivBhPa]nIaYpQs]l@g]sI}aAfI}bApJch@hFu_AbPkoB|~@qu@ld@y\\hMgZnCoScSwDmc@uA}g@oGk`@sSmTkYqAkp@zQ_`@rLgZpSwZpTq]zFm}BBybCmI}_@cCwX_KcY{IaXxMi^lr@u\\xT}\\lAc^}Bu[vIq}@nSsu@da@cXlJqSrUur@fj@at@dm@c]nRm[dDmZ_HwYrGwQ`[kJvb@ae@b|@yo@ds@uZtGk\\PaV`VsIra@mPpZuXvVoRdZ{DlW{AhX}L~^uh@`aAoSp\\uWnQuy@~Pu{@`Tqr@|c@_s@hq@mo@po@qRdx@il@dj@ih@ts@ma@r`Ai^veArDfeAhH`cA}TlbAw\\deAw~@tkCyj@jw@cVlZuXpJ_[_Ec[sNon@kYizAgr@el@gXgn@mQuj@cLyQmBcSfH}M`ZsJxb@uLpd@uS`Yol@jm@}w@tD_\\aDc\\qQq[_Sw]wF_dAyCg[sFqPuYyR}O}U{CgPmPiJ_\\}TwOwVlEqStRu[CuZaAsU`HeYuAiXnJkp@tg@_|@~Oc|@fWsz@hMy{@}@m~@}GeaA[_`@K{X|Gci@~f@mZxD}^gGq[hB_[pLuw@rLuZfE_\\rNe[xGeZsHy[s@mYnG{[zBiRlRiTzS_\\nKaX|L}VzWaHr@_GiI{GwWki@fMox@f[kp@`^izB|Wq|@dGyx@mAa}@dEcx@iDq{@zMwu@fZat@r_@eYhOqH`C}G{CaYuPoZaFaXqK');
  var points_second = new google.maps.geometry.encoding.decodePath('ok}hFgyycCiB|@mBbAo@RMJo@~@Y^Ox@e@nCUtAKj@a@OcA]i@Q_BxBsEvFoA|AmBtB_DtDiAbBeAhB_DvFW`@]TWFKAmBa@IABj@HfANfCRbDRdCLl@`@rIF|ABj@QXGLMn@BT');

  var lasttofirst = [];
  lasttofirst = points_second.reverse();

  // Initializing InfoWindow
  infowindow = new google.maps.InfoWindow();

  // Σχεδίαση των Markers στον χάρτη
  var marker, i;
  for (i=0; i < points_first.length; i++){
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(points_first[i].lat(), points_first[i].lng()),
      animation: google.maps.Animation.DROP,
      map: map,
      title: 'point '+i
    });
    markersArray.push(marker);

    google.maps.event.addListener(marker, 'click', (function(marker, i){
      return function() {
        infowindow.setContent('<div style="color:black; font-weight: normal;"><h3>Marker Location</h3>' + '<p><strong>Lat:</strong> ' +
                               marker.getPosition().lat().toFixed(6) + '<br/><strong>Long:</strong> ' + marker.getPosition().lng().toFixed(6) +
                              '</p><p><strong>Distance from Previous:</strong> ' + marktomark[i].toFixed(2) + ' km</p>' +
                              '<p><strong>Distance from Start:</strong> ' + distance[i].toFixed(2) + ' km</p></div>');
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

  //Zoom στο tile που περιέχει τα markers
  zoomExtends();

  // Εμφάανιση του zoom level στο infowindow
  map.addListener('zoom_changed', function() {
    infowindow.setContent('Zoom: ' + map.getZoom());
  });

  // Υπολογισμός του Total Distance απο το Αρχικό Marker μέχρι το Τελικό Marker
  var dist = [];
  var marktomark = [];
  var sum = 0;
  for(let i=0; i<points_first.length-1; i++){
    const lat1 = points_first[i].lat();
    const lng1 = points_first[i].lng();
    const lat2 = points_first[i+1].lat();
    const lng2 = points_first[i+1].lng();
    dist[i] = getDistance(lat1,lat2,lng1,lng2);

    if(i == 0){
      marktomark[i] = 0.0;
      sum += dist[i];
    }
    else{
      marktomark[i] = dist[i];
      sum += dist[i];
    }
  }

  var distance = [];
  for(i=0; i<marktomark.length; i++){

    if(i == 0){
      distance[i] = marktomark[i];
    }

    if(i == 1){
      distance[1] = marktomark[1];
    }
    else{
      distance[i] = distance[i-1] + marktomark[i];
    }

    if(isNaN(distance[0])){
      distance[0] = 0.0;
    }

  }

  var dist2 = [];
  var marktomark2 = [];
  var sum2 = 0;
  for(let i=0; i<points_second.length-1; i++){
    const lat1 = points_second[i].lat();
    const lng1 = points_second[i].lng();
    const lat2 = points_second[i+1].lat();
    const lng2 = points_second[i+1].lng();
    dist2[i] = getDistance(lat1,lat2,lng1,lng2);

    if(i == 0){
      marktomark2[i] = 0.0;
    }
    marktomark2[i+1] = dist2[i];
    sum2 += dist2[i];
  }

  document.getElementById('msg').innerHTML = "Distance Fuel to Town Pol1: " + sum.toFixed(2) + " km." + "</br>Distance Town to Fuel Pol2: " + sum2.toFixed(2) + " km.";

  // Διαγραφή όλων των Marker απο τον χάρτη
  google.maps.Map.prototype.clearOverlays = function(){
    for(i=0;i<markersArray.length;i++){
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }
  map.clearOverlays();

  google.maps.Polyline.prototype.Distance = function(){
      var dist = 0;
      for (var i = 1; i < this.getPath().getLength(); i++) {
          dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
      }
      return dist;
  }

  google.maps.LatLng.prototype.distanceFrom = function(newLatLng){
      //var R = 6371; // km (change this constant to get miles)
      var R = 6378100; // meters
      var lat1 = this.lat();
      var lon1 = this.lng();
      var lat2 = newLatLng.lat();
      var lon2 = newLatLng.lng();
      var dLat = (lat2 - lat1) * Math.PI / 180;
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
  }

  var nextMarkerAt = 0;
  var nextPoint = null;
  var markerfrommarker = [];
  var i = 0;
  var D = 100;
  var route1 = [];

  var src = document.getElementById("imgMap");

  while(true){
    var routePoints = points_first;

    nextPoint = moveAlongPath(routePoints, nextMarkerAt);
    route1[i] = nextPoint;

    if(nextPoint){
      var marker = new google.maps.Marker({
        position: nextPoint,
        map: map,
        title: 'Marker ' + i +': ' + D + 'meters'
      });

      const latitude = marker.getPosition().lat();
      const longitude = marker.getPosition().lng();

      google.maps.event.addListener(marker, 'click', (function(marker, i){
        return function() {
          infowindow.setContent('<div style="color:black; font-weight: normal;"><h3>Marker Location</h3>' + '<p><strong>Lat:</strong> ' +
                                 latitude.toFixed(6) + '<br/><strong>Long:</strong> ' + longitude.toFixed(6) +
                                '</p><p><strong>Distance from Previous:</strong> ' + D + ' m</p>' +
                                '<p><strong>Distance from Start:</strong> ' + markerfrommarker[i] + ' m</p></div>');

          infowindow.open(map, marker);
        }
      })(marker, i));

      nextMarkerAt += D;

      var staticMapUrl,staticMapUrl_fuel,img,img_fuel;
      if(i==0){
        markerfrommarker[i] = 0;

        //staticMapUrl_fuel = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude +
          //                  '&zoom=18&size=640x640&format=jpg&maptype=satellite&key=..............';
        //img_fuel = new Image(640,640);
        //img_fuel.src = staticMapUrl_fuel;
        //src.appendChild(img_fuel);
      }
      else{
        if(i==1){
          markerfrommarker[i] = markerfrommarker[i-1] + D;
          //staticMapUrl_fuel = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude +
            //                  '&zoom=18&size=300x320&format=jpg&maptype=satellite&key=...............';
          //img_fuel = new Image(300,320);
          //img_fuel.src = staticMapUrl_fuel;
          //src.appendChild(img_fuel);
        }
        else{
          markerfrommarker[i] = markerfrommarker[i-1] + D;
          //staticMapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude +
            //                '&zoom=18&size=300x320&format=jpg&maptype=satellite&key=..................';
          //img = new Image(300,320);
          //img.src = staticMapUrl;
          //src.appendChild(img);
        }
      }
    }
    i++;
    if(i==11){
      break;
    }
  }
  console.log(route1);

  var nextMarkerAt2 = 0;
  var nextPoint2 = null;
  var markerfrommarker2 = [];
  var i = 0;
  var D = 100;
  var route2 = [];

  while(true){
    var routePoints2 = lasttofirst;

    nextPoint2 = moveAlongPath(routePoints2, nextMarkerAt2);
    route2[i] = nextPoint2;

    if(nextPoint2){
      var marker2 = new google.maps.Marker({
        position: nextPoint2,
        map: map,
        title: 'Marker ' + i +': ' + D + 'meters'
      });

      const latitude2 = marker2.getPosition().lat();
      const longitude2 = marker2.getPosition().lng();

      google.maps.event.addListener(marker2, 'click', (function(marker2, i){
        return function() {
          infowindow.setContent('<div style="color:black; font-weight: normal;"><h3>Marker Location</h3>' + '<p><strong>Lat:</strong> ' +
                                 latitude2.toFixed(6) + '<br/><strong>Long:</strong> ' + longitude2.toFixed(6) +
                                '</p><p><strong>Distance from Previous:</strong> ' + D + ' m</p>' +
                                '<p><strong>Distance from Start:</strong> ' + markerfrommarker2[i] + ' m</p></div>');

          infowindow.open(map, marker2);
        }
      })(marker2, i));

      nextMarkerAt2 += D;

      var src = document.getElementById("imgMap");
      var staticMapUrl2,staticMapUrl_fuel2,img2,img_fuel2;
      if(i==0){
        markerfrommarker2[i] = 0;
      }
      else{
        if(i==1){
          markerfrommarker2[i] = markerfrommarker2[i-1] + D;

          //staticMapUrl_fuel2 = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude2 + ',' + longitude2 +
            //                  '&zoom=18&size=300x320&format=jpg&maptype=satellite&key=.......................';
          //img_fuel2 = new Image(300,320);
          //img_fuel2.src = staticMapUrl_fuel2;
          //src.appendChild(img_fuel2);
        }
        else{
          markerfrommarker2[i] = markerfrommarker2[i-1] + D;

          //staticMapUrl2 = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude2 + ',' + longitude2 +
            //                  '&zoom=18&size=300x320&format=jpg&maptype=satellite&key=.......................';
          //img2 = new Image(300,320);
          //img2.src = staticMapUrl2;
          //src.appendChild(img2);
        }
      }
    }
    i++;
    if(i==11){
      break;
    }
  }
  console.log(route2);

  var polyline = new google.maps.Polyline({
    path: routePoints,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  polyline.setMap(map);

  var polyline2 = new google.maps.Polyline({
    path: routePoints2,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  polyline2.setMap(map);

  var all_routes = route1.concat(route2);
  var total_routes = [];
  for(i=0;i<all_routes.length;i++){
    total_routes[i] = [all_routes[i].lat(),all_routes[i].lng()];
  }
  console.log(total_routes);
}
