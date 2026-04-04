// 1. Firebase Configuration (आपके स्क्रीनशॉट से ली गई असली डिटेल्स)
const firebaseConfig = {
  apiKey: "AIzaSyC-TQSn8FCqJ91vQVbwkhMMszxw_...", // यहाँ आपकी पूरी की (Key) आएगी
  authDomain: "liveclassroom-2009.firebaseapp.com",
  databaseURL: "https://liveclassroom-2009-default-rtdb.firebaseio.com",
  projectId: "liveclassroom-2009",
  storageBucket: "liveclassroom-2009.appspot.com",
  messagingSenderId: "599177442621",
  appId: "1:599177442621:web:cdf1479c4f3c31d...",
  measurementId: "G-HV6QYLDN0Z"
};

// Firebase शुरू करें
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// 2. वीडियो लोड करने वाला फंक्शन
function loadVideo(id) {
  const player = document.getElementById("videoPlayer");
  // ?rel=0 से फालतू वीडियो नहीं दिखेंगे, autoplay=1 से वीडियो तुरंत चलेगा
  player.src = "https://www.youtube.com/embed/" + id + "?rel=0&autoplay=1";
}

// 3. ऐप खुलते ही Firebase से डिफ़ॉल्ट वीडियो उठाना
db.ref("liveVideo").once("value", (snap) => {
  if (snap.exists() && snap.val() !== "") {
    loadVideo(snap.val());
  }
});

// 4. AI Teacher लॉजिक
function askAI() {
  let q = document.getElementById("question").value.toLowerCase();
  let ans = document.getElementById("answer");

  if(q.includes("force")) ans.innerText = "Force (F) = mass (m) × acceleration (a)";
  else if(q.includes("ohm")) ans.innerText = "Ohm's Law: V = I × R";
  else if(q.includes("gravity")) ans.innerText = "Gravity (g) = 9.8 m/s²";
  else if(q.includes("acid")) ans.innerText = "Acids have pH < 7 and turn blue litmus red.";
  else ans.innerText = "कृपया Physics या Chemistry का कोई सवाल पूछें।";
}

// 5. प्रोग्रेस ट्रैकर (12वीं बोर्ड के लिए)
function updateProgress() {
  let h = Number(document.getElementById("studyInput").value);
  let p = Math.min((h / 12) * 100, 100); // 12 घंटे का डेली लक्ष्य

  document.getElementById("bar").style.width = p + "%";
  document.getElementById("percent").innerText = Math.round(p) + "% काम पूरा हुआ";
  localStorage.setItem("rbse_progress", p);
}

// पुराना प्रोग्रेस वापस लोड करना
window.onload = function() {
  let saved = localStorage.getItem("rbse_progress");
  if(saved) {
    document.getElementById("bar").style.width = saved + "%";
    document.getElementById("percent").innerText = Math.round(saved) + "% काम पूरा हुआ";
  }
};

