const timeLeftElement = document.getElementById("timeLeft");
var now = moment();
var od = moment("2022-07-03T14:00");

function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    result = xmlhttp.responseText;
  }
  return result;
}

function refreshTime() {
  var now = moment();
  var days = od.diff(now, "days");
  var hours = od.diff(now, "hours") - days * 24;
  var minutes = od.diff(now, "minutes") - od.diff(now, "hours") * 60;
  var seconds =
    od.diff(now, "seconds") - 60 * minutes - 3600 * hours - 86400 * days;
  timeLeftElement.innerHTML =
    days +
    "dagen " +
    String(hours).padStart(2, "0") +
    "u " +
    String(minutes).padStart(2, "0") +
    "min " +
    String(seconds).padStart(2, "0") +
    "sec ";
}

const urls = JSON.parse(loadFile("./urls.json"));
const body = document.getElementById("body");

function newBackground() {
  var url = urls[Math.floor(Math.random() * urls.length)];

  fetch(url)
    .then((response) => response.blob())
    .then((imageBlob) => {
      const imageObjectURL = URL.createObjectURL(imageBlob);
      body.style.backgroundImage = "url('" + imageObjectURL + "')";
    });
}
newBackground();
setInterval(newBackground, 5000);
setInterval(refreshTime, 100);
