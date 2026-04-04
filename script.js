
// 1. Firebase Configuration (आपके स्क्रीनशॉट 10:28 AM से)
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

// Firebase शुरू करें
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// 2. वीडियो लोड करने का फंक्शन
function loadVideo(id) {
  const player = document.getElementById("videoPlayer");
  if (player) {
    // YouTube Embed लिंक (बिना इसके वीडियो नहीं चलेगा)
    player.src = "https://www.youtube.com/embed/" + id + "?rel=0&autoplay=1";
  }
}

// 3. ऐप खुलते ही Firebase से डेटा लेना
db.ref("liveVideo").once("value", (snap) => {
  if (snap.exists() && snap.val() !== "") {
    loadVideo(snap.val()); // यह आपके डेटाबेस की ID (dQw4w9WgXcQ) को लोड करेगा
  } else {
    loadVideo('r9n5Y9xH4mE'); // बैकअप के लिए Physics वीडियो
  }
});

// 4. AI Teacher (बेसिक सवाल)
function askAI() {
  let q = document.getElementById("question").value.toLowerCase();
  let ans = document.getElementById("answer");

  if(q.includes("force")) ans.innerText = "F = m × a";
  else if(q.includes("ohm")) ans.innerText = "V = I × R";
  else if(q.includes("acid")) ans.innerText = "Acids have pH < 7";
  else ans.innerText = "कृपया Physics/Chemistry का सवाल पूछें।";
}

// 5. प्रोग्रेस ट्रैकर
function updateProgress() {
  let h = Number(document.getElementById("studyInput").value);
  let p = Math.min((h / 12) * 100, 100); 

  document.getElementById("bar").style.width = p + "%";
  document.getElementById("percent").innerText = Math.round(p) + "% पूरा हुआ";
  localStorage.setItem("progress", p);
}

