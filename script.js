const timeLeftElement = document.getElementById("timeLeft");
const container = document.getElementById("container");
const footer = document.getElementById("foot");
const od = moment("2023-07-02T14:00");
const odEnd = moment("2023-07-08T10:00");

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
  let now = moment();
  if (now.isBefore(od)) {
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
  } else if (now.isBetween(od, odEnd)) {
    timeLeftElement.innerHTML =
      "Veel plezier!<br>" +
      now.format("DD MMMM YYYY") +
      " " +
      now.format("HH:mm");
    if (window.innerWidth > 600) {
      container.style.height = "15%";
      container.style.width = "25%";
    } else {
      container.style.height = "25%";
      container.style.width = "60%";
    }
  } else if (now.isAfter(odEnd)) {
    timeLeftElement.innerHTML = "Tot volgend jaar!";
  }
}

const urls = JSON.parse(loadFile("./urls2022.json"));
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

function toggleVis() {
  if (document.getElementById("eye").innerHTML === "visibility_off") {
    container.style = "visibility: hidden;";
    foot.style = "visibility: hidden;";
    document.getElementById("eye").innerHTML = "visibility";
  } else {
    container.style = "visibility: visible;";
    foot.style = "visibility: visible;";
    document.getElementById("eye").innerHTML = "visibility_off";
  }
}
