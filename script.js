// 1. आपका असली Firebase Configuration (लेटेस्ट स्क्रीनशॉट से)
const firebaseConfig = {
  apiKey: "AIzaSyC-TQSnx8FCqJ91vQVbwkhMMszxw_VvI0k", //
  authDomain: "liveclassroom-2009.firebaseapp.com", //
  databaseURL: "https://liveclassroom-2009-default-rtdb.firebaseio.com", //
  projectId: "liveclassroom-2009", //
  storageBucket: "liveclassroom-2009.firebasestorage.app", //
  messagingSenderId: "599177442621", //
  appId: "1:599177442621:web:cdf1479c4f3c31d445c154", //
  measurementId: "G-HV6QYLDN0Z" //
};

// Firebase शुरू करें
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// 2. वीडियो लोड करने का फंक्शन (YouTube Embed)
function loadVideo(id) {
    const player = document.getElementById("videoPlayer");
    if (player) {
        // 'https://www.youtube.com/embed/' का उपयोग करना अनिवार्य है
        player.src = "https://www.youtube.com/embed/" + id + "?rel=0&autoplay=1";
    }
}

// 3. ऐप खुलते ही Firebase से लाइव वीडियो ID लेना (सिर्फ एक बार)
db.ref("liveVideo").once("value", (snap) => {
    if (snap.exists() && snap.val() !== "") {
        loadVideo(snap.val()); // यह 'dQw4w9WgXcQ' लोड करेगा
    } else {
        // अगर डेटाबेस खाली है, तो डिफ़ॉल्ट Physics क्लास चलाएं
        loadVideo('r9n5Y9xH4mE');
    }
});

// 4. AI Teacher लॉजिक
function askAI() {
    let q = document.getElementById("question").value.toLowerCase();
    let ans = document.getElementById("answer");

    if (q.includes("force")) ans.innerText = "Force (F) = mass (m) × acceleration (a)";
    else if (q.includes("ohm")) ans.innerText = "Ohm's Law: V = I × R";
    else if (q.includes("gravity")) ans.innerText = "Earth's Gravity (g) ≈ 9.8 m/s²";
    else ans.innerText = "कृपया Physics या Chemistry का सवाल पूछें।";
}

// 5. प्रोग्रेस ट्रैकर
function updateProgress() {
    let h = Number(document.getElementById("studyInput").value);
    let p = Math.min((h / 12) * 100, 100); // 12 घंटे का डेली लक्ष्य

    document.getElementById("bar").style.width = p + "%";
    document.getElementById("percent").innerText = Math.round(p) + "% काम पूरा हुआ";
    localStorage.setItem("study_progress", p);
}


