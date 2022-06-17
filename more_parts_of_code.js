
  // Σχεδίαση line που ενώνει τα Markers του χάρτη
  var line = new google.maps.Polyline({
    path: points_first,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  line.setMap(map);
  //line.setMap(null);

  // Διαγραφή όλων των Marker απο τον χάρτη
  google.maps.Map.prototype.clearOverlays = function(){
    for(i=0;i<markersArray.length;i++){
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }
  map.clearOverlays();

  // ΄ Ενωση δύο arrays --> merged = points_first & distance
  var merged = [];
  for(i=0;i<points_first.length;i++){
    merged[i] = [points_first[i].lat(),points_first[i].lng(),distance[i]];
  }

  // Μετά την ένωση πάρε τα lat-long pairs για τον υπολογισμό των νέων συντεταγμένων
  var lat1,lng1,lat2,lng2;
  var current_lat = [];
  var current_lng = [];
  var coords1 = [];
  var D;

  for(i=0;i<merged.length;i++){
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(merged[i][0],merged[i][1]),
      map: map,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
      title: 'First Points' + i
    });
    markersArray.push(marker);

    google.maps.event.addListener(marker, 'click', (function(marker, i){
      return function() {
        infowindow.setContent('<div style="color:black; font-weight: normal;"><h3>Marker Location</h3>' + '<p><strong>Lat:</strong> ' +
                               marker.getPosition().lat().toFixed(6) + '<br/><strong>Long:</strong> ' + marker.getPosition().lng().toFixed(6) +
                              '</p><p><strong>Distance from Previous:</strong> ' + marktomark[i].toFixed(2) + ' km</p>' +
                              '<p><strong>Distance from Start:</strong> ' + merged[i][2].toFixed(2) + ' km</p></div>');

        infowindow.open(map, marker);
      }
    })(marker, i));

    coords1[i] = [merged[i][0],merged[i][1]];
    if(merged[i][2] >= 0.40){
      D = merged[i][2];

      coords1[i] = [merged[i][0],merged[i][1]];

      break;
    }
  }

  var i=2;
  do{
    coords1[i] = [merged[i][0],merged[i][1]];
    i++;
  }
  while(merged[i][2]<=0.40);

  // Υπολογιμοί της απόστασης για τα σημεία που θα μπούνε τα νέα Markers
  var d1 = [];
  for(i=0;i<11;i++){
    if(i==0){
      d1[i] = D - 0.20;
    }
    else{
      d1[i] = d1[i-1] - 0.20;
    }
  }
  console.log(d1);
  // Εμφάνιση των Marker στα σημεία που υπολογίστηκαν παραπάνω
  // και υπολόγισε την απόσταση απο το Primary Marker
  // με τη Haversine Formula
  var distance=[];
  var newd1 = [];
  var new_coords1 = [];
  for(i=0;i<=d1.length;i++){
    if(i==0){
      newd1[i] = 0.0 + marktomark[i+1];
      new_coords1[i] = get_point_between_points(coords1[i][0],coords1[i+1][0],coords1[i][1],coords1[i+1][1],newd1[i],D);
      distance[i] = getDistance(coords1[i][0],coords1[i+1][0],coords1[i][1],coords1[i+1][1]);
    }
    else {
      newd1[i] = marktomark[i] + marktomark[i+1];
      new_coords1[i] = get_point_between_points(coords1[i][0],coords1[i+1][0],coords1[i][1],coords1[i+1][1],newd1[i],D);
      distance[i] = getDistance(coords1[i][0],coords1[i+1][0],coords1[i][1],coords1[i+1][1]);
    }
  }
  console.log(newd1);
  console.log(marktomark);

  for(i=0;i<new_coords1.length;i++){

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(new_coords1[i][0],new_coords1[i][1]),
      map: map,
      title: 'Fuel Marker' + i
    });
    markersArray.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i){
      return function(){
        infowindow.setContent('<div style="color:black; font-weight: normal;"><h3>Calculated Marker Location</h3>' + '<p><strong>Lat:</strong> ' +
                              new_coords1[i][0].toFixed(6) + '<br/><strong>Long:</strong> ' + new_coords1[i][1].toFixed(6) +
                              '</p><p><strong>Calculation From These Coords: ' + coords1[i][0].toFixed(6) + ', ' + coords1[i][1].toFixed(6) +
                              '</p><p><strong>Distance From Marker: ' + newd1[i].toFixed(2) + 'km</p></div>');
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

  document.getElementById('msg').innerHTML = "Distance between points: " + sum.toFixed(2) + " km.";
}

  //for(i=4;i<8;i++){
    //const D = 0.12;
    //if(i==4){
      //d[i] = D + 0.025;
    //}
    //else{
      //d[i] = d[i-1] + 0.025;
    //}
  //}


// Για το 2ο Enc Polyline


  //Input --> Encoded Polyline
  var points_second = new google.maps.geometry.encoding.decodePath('m__iF}|vcCbCtWuAbe@qIn`@eF~OpBuElIsZdFgf@oEufAoCg`@yAoCyJvJcFeEbBwBwI`S}Ov]sTpgAyRniCaDnmA{A`ZlCpR~B|MrKj}@lBhr@{AzYsInY{[n}@uXpf@yk@f_AgRza@{Fhg@uCxh@}Pj^ye@~YaPz\\oHvc@eSpoAyQtY{VrPsJf\\Hvb@kAnb@vIbc@~Kpe@dTv[~^~e@~i@foAlZlaAj@`c@aGng@}QpiAqYr{@yg@feAwKzd@dAbk@hGt_AIbg@cMne@qA|d@zBjk@yWjfA}J~c@kNf^kl@nv@}Ud[aVjRq~@bBiXpNq[zZ_q@zl@oYbH_YtQau@hd@{q@xh@gr@rb@wkBp}@gQb\\uLjd@o[zcAkLj^sT`Qsi@~c@qo@b]ei@pm@yl@pe@mSnQiLx[oKtXeV|OyYzMiRrXwZtqAyK|YoSfQi{@tGs[fGiW~Pms@~b@oz@nGg{@nEu~@bAmv@aTku@q^qu@gZ_[iAuY~D{XzM}TjUki@tx@cl@|q@{u@v[yw@xBqcAaB__A{A}m@rKe_Anb@_cAbX{p@vHmdApFa]nIaYpQs]l@g]sI}aAfI}bApJch@hFu_AbPkoB|~@qu@ld@y\\hMgZnCoScSwDmc@uA}g@oGk`@sSmTkYqAkp@zQa`@vLgZvSyZtTm]~Fq~BMybCsIo_@aCaYsKgYeIkWjNoLnYeQ~W}\\xT_]t@c^sBs[bJo}@fS}t@ba@_XlJgTfVsr@jj@gt@zl@w\\fR}[rCkZ{GuYjHaQj[oJ`c@me@x{@}o@zr@{Y~Fa]ZsUnVuIdb@}PbZuXvVuQpY{D`XyA~WqMp_@oh@v`AgS|[gXtQ}y@|Pyz@zSis@td@_s@fq@yn@fo@uRrx@wl@bj@wg@js@ma@p`Ag^rfAdEheA|G`cAaUlaAc]~eAs_AtlC_k@bw@mUfYoYzIyZ{Eu[_Okm@yXe{Awr@ik@wWio@oQui@yKoR}AeSxIcMz]kKda@yLdd@oT`X{UtXgVfRgz@fCw\\wFe[uSo[cPm^aEudAwC_YmJmPk[{RcKmU{D{N}SqLu\\sVuIgVhLsU|Nq]eDum@dGa[DgWpOqW|UyXfMo}@pPuy@`Uk|@rLi{BeKsaAWk^ZeVvJqS`V}WtOyZN__@wF_w@tRgx@hLew@`XsYjBo\\wJew@~HcY|GeQtU}U`O}[fKeWrOyUfTiPoUwBaNwp@vQqhBxy@k}B|Vm{@|D}z@a@y^|D_[g@qw@mA_}@tNgt@r\\}s@r_@qWzMqR}Hu[uMiZ}EcNcI');

  // Initializing InfoWindow
  infowindow2 = new google.maps.InfoWindow();

  // Σχεδίαση των Markers στον χάρτη
  var marker2, i;
  for (i=0; i < points_second.length; i++){
    marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(points_second[i].lat(), points_second[i].lng()),
      animation: google.maps.Animation.DROP,
      map: map,
      title: 'point '+i
    });
    markersArray.push(marker2);

    google.maps.event.addListener(marker2, 'click', (function(marker2, i){
      return function() {
        infowindow2.setContent('<div style="color:black; font-weight: normal;"><h3>Marker Location</h3>' + '<p><strong>Lat:</strong> ' +
                               marker2.getPosition().lat().toFixed(6) + '<br/><strong>Long:</strong> ' + marker2.getPosition().lng().toFixed(6) +
                              '</p><p><strong>Distance from Previous:</strong> ' + marktomark2[i].toFixed(2) + ' km</p>' +
                              '<p><strong>Distance from Start:</strong> ' + distance2[i].toFixed(2) + ' km</p></div>');
        infowindow2.open(map, marker2);
      }
    })(marker2, i));
  }

  //Zoom στο tile που περιέχει τα markers
  zoomExtends();

  // Εμφάανιση του zoom level στο infowindow
  map.addListener('zoom_changed', function() {
    infowindow2.setContent('Zoom: ' + map.getZoom());
  });

  // Σχεδίαση line που ενώνει τα Markers του χάρτη
  var line2 = new google.maps.Polyline({
    path: points_second,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  line2.setMap(map);

  // Υπολογισμός του Total Distance απο το Αρχικό Marker μέχρι το Τελικό Marker
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

  var distance2 = [];
  for(i=0; i<marktomark2.length; i++){

    if(i == 0){
      distance2[i] = marktomark2[i];
    }

    if(i == 1){
      distance2[1] = marktomark2[1];
    }
    else{
      distance2[i] = distance2[i-1] + marktomark2[i];
    }

  }
  document.getElementById('msg').innerHTML = "Distance between points: " + sum2.toFixed(2) + " km.";


  // Διαγραφή όλων των Marker απο τον χάρτη
  google.maps.Map.prototype.clearOverlays = function(){
    for(i=0;i<markersArray.length;i++){
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }
  map.clearOverlays();

  // ΄ Ενωση δύο arrays --> merged = points & distance
  var merged = [];
  for(i=0;i<points.length;i++){
    merged[i] = [points[i].lat(),points[i].lng(),distance[i]];
  }

  // Μετά την ένωση πάρε τα lat-long pairs για τον υπολογισμό των νέων συντεταγμένων
  var lat1_after,lng1_after,lat2_after,lng2_after;
  var lat1,lng1,lat2,lng2;
  var lat1_before,lng1_before,lat2_before,lng2_before;
  var coords_after = [];
  var coords = [];
  var coords_before = [];

  var D,DA,DB;

  for(i=0;i<merged.length;i++){
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(merged[i][0],merged[i][1]),
      map: map,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
      title: 'point' + i
    });
    markersArray.push(marker);

    google.maps.event.addListener(marker, 'click', (function(marker, i){
      return function() {
        infowindow.setContent('<div style="color:black; font-weight: normal;"><h3>Marker Location</h3>' + '<p><strong>Lat:</strong> ' +
                               marker.getPosition().lat().toFixed(6) + '<br/><strong>Long:</strong> ' + marker.getPosition().lng().toFixed(6) +
                              '</p><p><strong>Distance from Previous:</strong> ' + marktomark[i].toFixed(2) + ' km</p>' +
                              '<p><strong>Distance from Start:</strong> ' + merged[i][2].toFixed(2) + ' km</p></div>');

        infowindow.open(map, marker);
      }
    })(marker, i));

    if(isNaN(merged[i][2])){
      merged[i][2] = 0.0;
      continue;
    }

    if(merged[i][2] >= 2.20){
      D = merged[i-1][2];
      console.log(D);
      DA = merged[i][2];
      console.log(DA);
      DB = merged[i-2][2];
      console.log(DB);

      lat1_after =merged[i][0];
      lng1_after =merged[i][1];
      lat2_after =merged[i-1][0];
      lng2_after =merged[i-1][1];

      lat1_before =merged[i-1][0];
      lng1_before =merged[i-1][1];
      lat2_before =merged[i-2][0];
      lng2_before =merged[i-2][1];

      lat1 = merged[i-2][0];
      lng1 = merged[i-2][1];
      lat2 = merged[i-1][0];
      lng2 = merged[i-1][1];

      coords_after[0] = [merged[i][0],merged[i][1]];
      coords[0] = [merged[i-1][0],merged[i-1][1]];
      coords_before[0] = [merged[i-2][0],merged[i-2][1]];
      break;
    }
  }

  // Υπολογιμοί της απόστασης για τα σημεία που θα μπούνε τα νέα Markers
  var d = [];
  for(i=0;i<9;i++){
    if(i==0){
      d[i] = D - 0.20;
    }
    else{
      d[i] = d[i-1] - 0.20;
    }
  }

  for(i=4;i<8;i++){
    const D = 0.12;
    if(i==4){
      d[i] = D + 0.025;
    }
    else{
      d[i] = d[i-1] + 0.025;
    }
  }


  var da = [];
  for(i=0;i<6;i++){
    if(i==0){
      da[i] = DA - 2.8;
    }
    else {
      da[i] = da[i-1] - 2.8;
    }
  }


  var db = [];
  for(i=0;i<6;i++){
    if(i==0){
      db[i] = DB + 2.8;
    }
    else {
      db[i] = db[i-1] + 2.8;
    }
  }

  // Εμφάνιση των Marker στα σημεία που υπολογίστηκαν παραπάνω
  // και υπολόγισε την απόσταση απο το Primary Marker
  // με τη Haversine Formula
  var distance=[];
  for(i=0;i<d.length;i++){
    coords[i+1] = get_point_between_points(lat1,lat2,lng1,lng2,d[i],D);
    distance[i] = getDistance(lat1,coords[i][0],lng1,coords[i][1]);
  }
  for(i=0;i<coords.length;i++){

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(coords[i][0],coords[i][1]),
      map: map,
      title: 'Fuel Marker' + i
    });
    markersArray.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i){
      return function(){
        infowindow.setContent('<div style="color:black; font-weight: normal;"><h3>Calculated Marker Location</h3>' + '<p><strong>Lat:</strong> ' +
                              coords[i][0].toFixed(6) + '<br/><strong>Long:</strong> ' + coords[i][1].toFixed(6) +
                              '</p><p><strong>Calculation From These Coords: ' + lat2.toFixed(6) + ', ' + lng2.toFixed(6) +
                              '</p><p><strong>Distance From Marker: ' + distance[i].toFixed(4) + 'km</p></div>');
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

  var after_distance = [];
  for(i=0;i<da.length;i++){
    coords_after[i+1] = get_point_between_points(lat1_after,lat2_after,lng1_after,lng2_after,da[i],DA);
    after_distance[i] = getDistance(lat1_after,coords_after[i][0],lng1_after,coords_after[i][1]);
  }
  for(i=0;i<coords_after.length;i++){

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(coords_after[i][0],coords_after[i][1]),
      map: map,
      title: 'After Fuel' + i
    });
    markersArray.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i){
      return function(){
        infowindow.setContent('<div style="color:black; font-weight: normal;"><h3>Calculated Marker Location</h3>' + '<p><strong>Lat:</strong> ' +
                              coords_after[i][0].toFixed(6) + '<br/><strong>Long:</strong> ' + coords_after[i][1].toFixed(6) +
                              '</p><p><strong>Calculation From These Coords: ' + lat2_after.toFixed(6) + ', ' + lng2_after.toFixed(6) +
                              '</p><p><strong>Distance From Marker: ' + after_distance[i].toFixed(4) + 'km</p></div>');
        infowindow.open(map, marker);
      }
    })(marker, i));
  }


  var before_distance = [];
  for(i=0;i<db.length;i++){
    coords_before[i+1] = get_point_between_points(lat1_before,lat2_before,lng1_before,lng2_before,db[i],DB);
    before_distance[i] = getDistance(lat1_before,coords_before[i][0],lng1_before,coords_before[i][1]);
  }
  for(i=0;i<coords_before.length;i++){

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(coords_before[i][0],coords_before[i][1]),
      map: map,
      title: 'Before Fuel' + i
    });
    markersArray.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i){
      return function(){
        infowindow.setContent('<div style="color:black; font-weight: normal;"><h3>Calculated Marker Location</h3>' + '<p><strong>Lat:</strong> ' +
                              coords_before[i][0].toFixed(6) + '<br/><strong>Long:</strong> ' + coords_before[i][1].toFixed(6) +
                              '</p><p><strong>Calculation From These Coords: ' + lat2_before.toFixed(6) + ', ' + lng2_before.toFixed(6) +
                              '</p><p><strong>Distance From Marker: ' + before_distance[i].toFixed(2) + 'km</p></div>');
        infowindow.open(map, marker);
      }
    })(marker, i));
  }


  var staticMapUrl_fuel = [];
  var src = document.getElementById("imgMap");
  for(i=0;i<coords.length;i++){
    staticMapUrl_fuel[i] = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coords[i][0] + ',' + coords[i][1] +
                        '&zoom=18&size=500x500&format=png&maptype=satellite&key=........................';
  }
  for(i=0;i<staticMapUrl_fuel.length;i++){
    var img_fuel = new Image(500,500);
    img_fuel.src = staticMapUrl_fuel[i];

    src.appendChild(img_fuel);
  }
  console.log(staticMapUrl_fuel);

  var staticMapUrl_before = [];
  for(i=0;i<coords_before.length;i++){
    staticMapUrl_before[i] = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coords_before[i][0] + ',' + coords_before[i][1] +
                        '&zoom=18&size=300x300&format=png&maptype=satellite&key=............................';
  }
  for(i=0;i<staticMapUrl_before.length;i++){
    var img_before = new Image(300,300);
    img_before.src = staticMapUrl_before[i];

    src.appendChild(img_before);
  }
  console.log(staticMapUrl_before);

  var staticMapUrl_after = [];
  for(i=0;i<coords_after.length;i++){
    staticMapUrl_after[i] = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coords_after[i][0] + ',' + coords_after[i][1] +
                        '&zoom=18&size=300x300&format=png&maptype=satellite&key=........................';
  }
  for(i=0;i<staticMapUrl_after.length;i++){
    var img_after = new Image(300,300);
    img_after.src = staticMapUrl_after[i];

    src.appendChild(img_after);
  }
  console.log(staticMapUrl_after);
  //console.log(staticMapUrl);
  //console.log(imgMap);

}
