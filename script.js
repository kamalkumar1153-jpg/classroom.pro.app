// Load Video
function loadVideo(id) {
  document.getElementById("videoPlayer").src =
    "https://www.youtube.com/embed/" + id;
}

// Firebase Live Class (IMPORTANT)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  databaseURL: "YOUR_DB_URL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

db.ref("liveVideo").once("value", (snap) => {
  document.getElementById("videoPlayer").src =
    "https://www.youtube.com/embed/" + snap.val();
});

// AI Teacher
function askAI() {
  let q = question.value.toLowerCase();

  if(q.includes("force")) answer.innerText = "F = m × a";
  else if(q.includes("ohm")) answer.innerText = "V = I × R";
  else answer.innerText = "Ask Physics / Chemistry question";
}

// Progress
function updateProgress() {
  let h = Number(studyInput.value);
  let p = (h / 10) * 100;

  bar.style.width = p + "%";
  percent.innerText = p + "% Done";

  localStorage.setItem("progress", p);
}

// Load saved
window.onload = function() {
  let p = localStorage.getItem("progress");
  if(p){
    bar.style.width = p + "%";
    percent.innerText = p + "% Done";
  }
}

// Notification
function notifyUser() {
  if (Notification.permission === "granted") {
    new Notification("New Class Live 📚");
  } else {
    Notification.requestPermission();
  }
}
