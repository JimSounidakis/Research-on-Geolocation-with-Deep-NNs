function loadFile(){

  // Διάβασε το JSON File
  function receivedText(e) {
    let lines = e.target.result;
    var newArr = JSON.parse(lines);
    var encrypted = newArr.routes[0].overview_polyline.points;
    console.log(typeof(encrypted));
    console.log(encrypted);
  }

  var input, file, fr;
  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser.");
    return;
  }
  input = document.getElementById('fileinput');
  //Errors και Εμφάνιση των αποτελεσμάτων στο console ως logs
  if(!input) {
    alert("Um, couldn't find the fileinput element.");
  }
  else if(!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  }
  else if(!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  }
  else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }
}

function zoomExtends() {
  //ορίζουμε ένα object-ορθογώνιο (για να ζουμάρουμε μετά πάνω του)
  var bounds = new google.maps.LatLngBounds();
  //σαρώνουμε όλα τα markers και αναπροσαρμόζουμε τις συντεταγμένες
  //του παραπάνω ορθογωνίου ώστε τα markers να περιέχονται μέσα του
  for (var i = 0; i < markersArray.length; i++) {
    bounds.extend(markersArray[i].position);
  }
  //zoomάρουμε πάνω στο οριστικοποιημένο ορθογώνιο
  map.fitBounds(bounds,20);
}
