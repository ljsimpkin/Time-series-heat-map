var map, heatmap;

function countHives(myArray){
    var count = 0
    for (i in myArray){
      if (typeof myArray[i].weight !== 'undefined')
        count += myArray[i].weight;
      else
        return("unknown")
    }
  return(Math.floor(count))
}

function gpsWghtStr(myArray){
  var ret = null
  if (typeof myArray.coordinates !== 'undefined')
  {
    var lat = myArray.coordinates[0];
    var long = myArray.coordinates[1];
    var posWeight = myArray.total
    if (posWeight == 0)
      posWeight = 0.0001
    ret = {location: new google.maps.LatLng(lat, long), weight: posWeight}
  }
  else
  {
    console.log("[0] error = ", myArray)
    return(1)
  }
  return(ret)
}

function formatGPS(myArray){
  var formatArray = [];
  var i2 = 0
  var missing = 0
  for (i in myArray) {
    if (typeof myArray[i].coordinates !== 'undefined'){
      formatArray[i2] = gpsWghtStr(myArray[i]);
      i2 += 1
    }else{
      i2 += 1
      missing += 1 }
  }
  if (missing > 0){
    console.log(missing + " missing coordinates")
  }
  return(formatArray);
}

function unique_id(arr, ix){
  ret = true

  for (i = 0; i < ix; i++){
    if (arr[i].addressid == arr[ix].addressid)
      ret = false
  }
  return (ret)
  }

//as you go along, create an array of address IDs. Each time a more recent addition, replace existing ID

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3.0,
    streetViewControl: false,
    center: {lat: 4.8939411, lng: 82.0458989},
    mapTypeId: 'satellite'
  });

  var datalst = formatGPS(places_traveled_gps);


  heatmap = new google.maps.visualization.HeatmapLayer({
    data: datalst,
    map: map
  });

  document.getElementById("nbGPS").innerHTML = datalst.length;

  }

function printseason(nb) {
  var season = ["autumn", "winter", "spring", "summer"];
  document.getElementById("season").innerHTML = season[nb];
}

var firstData = true;

function datascroll(option)
{
  var notnzlat = 165;
  var dataImport = window[option.value]
  var datalst = formatGPS(dataImport)
  var ix = 0

  if (option.value == "getPointsOverseas")
  {
    for (i in siteGps)
    {
      if (siteGps[i].coordinates[1] < notnzlat)
      {
          datalst[ix] = gpsWghtStr(siteGps[i]);
          ix += 1
      }
    }
  }
  heatmap.setData(datalst);
  document.getElementById("nbGPS").innerHTML = datalst.length;
  document.getElementById("nbHives").innerHTML = countHives(datalst);
}

function ft_timeslider() {
  var times = ["2016-06", "2016-07",  "2016-08",  "2016-09",  "2016-10",  "2016-11",  "2016-12",  "2017-01",  "2017-02",  "2017-03",  "2017-04",  "2017-05",  "2017-06",  "2017-07",  "2017-08",  "2017-09",  "2017-10",  "2017-11",  "2017-12",  "2018-01",  "2018-02",  "2018-03",  "2018-04",  "2018-05",  "2018-06",  "2018-07",  "2018-08",  "2018-09",  "2018-10",  "2018-11",  "2018-12",  "2019-01",  "2019-02",  "2019-03",  "2019-04",  "2019-05",  "2019-06",  "2019-07",  "2019-08",  "2019-09",  "2019-10",  "2019-11",  "2019-12",  "2020-01",  "2020-02",  "2020-03"]
  var iy = 0
  var gpslist = []
  var scro_vl = document.getElementById("select_id").value;
  var timevar = document.getElementById("time").value
  arr_var = "undefined"
  arr_var = window[scro_vl] //converts string to variable

  if ((typeof arr_var !== "undefined") && (typeof arr_var[0]["date"] == "string")){
    if (document.getElementById("myCheck").checked == true){
      for (ix = 0; ix < arr_var.length; ix++) {
        if (arr_var[ix]["date"] !== "" && arr_var[ix]["date"] < times[Number(timevar)] && unique_id(arr_var, ix)){ //check for better way than !== ""
          gpslist[iy] = gpsWghtStr(arr_var[ix]);
          iy += 1
          }
      }
    }
    else
    {
      for (ix = 0; ix < arr_var.length; ix++) {
        if (times[timevar] < arr_var[ix]["date"] && arr_var[ix]["date"] < times[Number(timevar) + 2] && unique_id(arr_var, ix)){
          gpslist[iy] = gpsWghtStr(arr_var[ix]);
          iy += 1
          }
        }
    }
  }
  else
  {
    console.log("No time series for", scro_vl)
    alert("No time series for " + scro_vl)
  }
    heatmap.setData(gpslist);
    // printseason(Math.ceil(timevar/4) % 4);
    document.getElementById("date").innerHTML = times[timevar];
    document.getElementById("nbGPS").innerHTML = gpslist.length;
    document.getElementById("nbHives").innerHTML = countHives(gpslist);

}

var slideryear = document.getElementById("time");

slideryear.oninput = function () {
  ft_timeslider();
}

function ft_checkbox() {
  ft_timeslider();
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

var slider = document.getElementById("myRange");
slider.oninput = function() {
  heatmap.set('radius', this.value);
}

window.onload = function() {
  heatmap.set('radius', 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 1);
}

// __________________________________Gradient Options________________________________
// colour selecing = https://colordesigner.io/

// Yellow -> red -> purple -> blue
function changeGradient() { // alternative colour gradient (blue and red)
  var gradient = [
  'rgba(0, 0, 0, 0)',
  'rgba(55, 149, 255, 1)',
  'rgba(55, 149, 255, 1)',
  'rgba(72, 114, 232, 1)',
  'rgba(92, 75, 202, 1)',
  'rgba(107, 20, 166, 1)',
  'rgba(164, 0, 137, 1)',
  'rgba(197, 0, 100, 1)',
  'rgba(255, 45, 0, 1)',
  'rgba(255, 110, 0, 1)',
  'rgba(255, 156, 0, 1)',
  'rgba(255, 197, 0, 1)',
  'rgba(255, 235, 59, 1)'  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

// red -> yellow -> green -> blue
 
// function changeGradient() { // alternative colour gradient (blue and red)
//   var gradient = [
//   'rgba(149, 255, 117, 0)',
//   'rgba(44, 245, 176, 1)',
//   'rgba(0, 229, 217, 1)',
//   'rgba(29, 208, 233, 1)',
//   'rgba(239, 255, 49, 1)',
//   'rgba(250, 207, 0, 1)',
//   'rgba(252, 159, 0, 1)',
//   'rgba(243, 109, 6, 1)',
//   'rgba(224, 53, 36, 1)'
// ]
//   heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
// }

// yellow -> red -> blue
// function changeGradient() { // alternative colour gradient (blue and red)
//   var gradient = [
//   'rgba(196, 249, 103, 0)',
//   'rgba(136, 255, 155, 1)',
//   'rgba(72, 255, 206, 1)',
//   'rgba(5, 255, 248, 1)',
//   'rgba(255, 45, 0, 1)',
//   'rgba(255, 110, 0, 1)',
//   'rgba(255, 156, 0, 1)',
//   'rgba(255, 197, 0, 1)',
//   'rgba(255, 235, 59, 1)'
//   ]
//   heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
// }

// red -> purple -> blue
// function changeGradient() { // alternative colour gradient (blue and red)
//   var gradient = [
//     'rgba(0, 255, 255, 0)',
//     'rgba(0, 255, 255, 1)',
//     'rgba(0, 191, 255, 1)',
//     'rgba(0, 127, 255, 1)',
//     'rgba(0, 63, 255, 1)',
//     'rgba(0, 0, 255, 1)',
//     'rgba(0, 0, 223, 1)',
//     'rgba(0, 0, 191, 1)',
//     'rgba(0, 0, 159, 1)',
//     'rgba(0, 0, 127, 1)',
//     'rgba(63, 0, 91, 1)',
//     'rgba(127, 0, 63, 1)',
//     'rgba(191, 0, 31, 1)',
//     'rgba(255, 0, 0, 1)'
//   ]
//   heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
// }

// Inverse
// function changeGradient() {
//   var gradient = [
    // 'rgba(0, 255, 255, 0)',
    // 'rgba(255, 0, 0, 1)',
    // 'rgba(191, 0, 31, 1)',
    // 'rgba(127, 0, 63, 1)',
    // 'rgba(63, 0, 91, 1)',
    // 'rgba(0, 0, 127, 1)',
    // 'rgba(0, 0, 159, 1)',
    // 'rgba(0, 0, 191, 1)',
    // 'rgba(0, 0, 223, 1)',
    // 'rgba(0, 0, 255, 1)',
    // 'rgba(0, 63, 255, 1)',
    // 'rgba(0, 127, 255, 1)',
    // 'rgba(0, 191, 255, 1)',
    // 'rgba(0, 255, 255, 1)'
//   ]
//   heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
// }

// orange -> white -> greenyblue -> blue
// function changeGradient() { // alternative colour gradient (blue and red)
//   var gradient = [
//   'rgba(0, 0, 0, 0)',
//   'rgba(22, 149, 163, 1)',
//   'rgba(172, 240, 242, 1)',
//   'rgba(243, 255, 226, 1)',
//   'rgba(235, 127, 0, 1)'
//  ]
//   heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
// }


