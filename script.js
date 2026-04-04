// ==================== Firebase Configuration ====================
const firebaseConfig = {
  apiKey: "AIzaSyC-TQSn8FCqJ91vQVbwkhMMszxw_VvI0k",
  authDomain: "liveclassroom-2009.firebaseapp.com",
  databaseURL: "https://liveclassroom-2009-default-rtdb.firebaseio.com",
  projectId: "liveclassroom-2009",
  storageBucket: "liveclassroom-2009.firebasestorage.app",
  messagingSenderId: "599177442621",
  appId: "1:599177442621:web:cdf1479c4f3c31d445c154",
  measurementId: "G-HV6QYLDN0Z"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

// ==================== Load Live Video ====================
function loadVideo(videoId) {
  const player = document.getElementById("videoPlayer");
  if (player && videoId) {
    player.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&modestbranding=1&playsinline=1`;
  }
}

// Load initial video + Real-time listener
db.ref("liveVideo").on("value", (snapshot) => {
  const videoId = snapshot.val();
  if (videoId && typeof videoId === "string" && videoId.trim() !== "") {
    loadVideo(videoId.trim());
  } else {
    loadVideo("r9n5Y9xH4mE"); // Backup Physics Video
  }
});

// ==================== AI Teacher ====================
function askAI() {
  const q = document.getElementById("question").value.trim().toLowerCase();
  const ans = document.getElementById("answer");

  if (!q) {
    ans.innerHTML = `<span style="color:red;">कृपया सवाल लिखें!</span>`;
    return;
  }

  if (q.includes("force") || q.includes("न्यूटन")) {
    ans.innerText = "F = m × a (न्यूटन का दूसरा नियम)";
  } 
  else if (q.includes("ohm") || q.includes("resistance") || q.includes("वोल्ट")) {
    ans.innerText = "V = I × R (ओहम का नियम)";
  } 
  else if (q.includes("acid") || q.includes("एसिड") || q.includes("ph")) {
    ans.innerText = "एसिड का pH 7 से कम होता है। वे नीले लिटमस पेपर को लाल कर देते हैं।";
  } 
  else if (q.includes("hello") || q.includes("नमस्ते") || q.includes("hi")) {
    ans.innerText = "नमस्ते! 😊 आज क्या पढ़ रहे हैं?";
  }
  else {
    ans.innerHTML = "अभी यह सवाल समझ नहीं आया।<br>Physics या Chemistry से संबंधित सवाल पूछें।";
  }
}

// ==================== Progress Tracker ====================
function updateProgress() {
  let hours = parseFloat(document.getElementById("studyInput").value);

  if (isNaN(hours) || hours < 0) hours = 0;
  if (hours > 12) hours = 12;

  const percentage = (hours / 12) * 100;

  document.getElementById("bar").style.width = percentage + "%";
  document.getElementById("percent").innerText = Math.round(percentage) + "% पूरा हुआ";

  // Save to localStorage
  localStorage.setItem("studyHours", hours);
  localStorage.setItem("studyProgress", percentage);
}

// Load saved progress on page load
window.onload = function() {
  const savedProgress = localStorage.getItem("studyProgress");
  if (savedProgress) {
    document.getElementById("bar").style.width = savedProgress + "%";
    document.getElementById("percent").innerText = Math.round(savedProgress) + "% पूरा हुआ";
  }
};

