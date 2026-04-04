// 1. Firebase Configuration
const firebaseConfig = {
    // अपनी API Key यहाँ डालें (Firebase Settings में मिलेगी)
    apiKey: "AIzaSy...", 
    databaseURL: "https://liveclassroom-2009-default-rtdb.firebaseio.com"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// 2. Function to Load Video
function loadVideo(id) {
    const player = document.getElementById("videoPlayer");
    // YouTube Embed URL के साथ ID जोड़ना
    player.src = "https://www.youtube.com/embed/" + id + "?rel=0&showinfo=0&autoplay=1";
}

// 3. Firebase से Live Video उठाना (सिर्फ ऐप खुलने पर एक बार)
db.ref("liveVideo").once("value", (snap) => {
    if (snap.exists() && snap.val() !== "") {
        loadVideo(snap.val());
    }
});

// 4. AI Teacher Logic
function askAI() {
    let q = document.getElementById("question").value.toLowerCase();
    let ans = document.getElementById("answer");

    if (q.includes("force")) ans.innerText = "Force (F) = m × a";
    else if (q.includes("ohm")) ans.innerText = "Ohm's Law: V = I × R";
    else if (q.includes("gravity")) ans.innerText = "Earth's Gravity (g) ≈ 9.8 m/s²";
    else if (q.includes("acid")) ans.innerText = "Acids: pH < 7, turns blue litmus red.";
    else ans.innerText = "कृपया Physics/Chemistry का सवाल पूछें।";
}

// 5. Progress Tracker
function updateProgress() {
    let h = Number(document.getElementById("studyInput").value);
    if (h > 12) h = 12; // 12 घंटे का लक्ष्य
    let p = Math.round((h / 12) * 100);

    document.getElementById("bar").style.width = p + "%";
    document.getElementById("percent").innerText = p + "% पूरा हुआ";

    localStorage.setItem("my_study_progress", p);
}

// पुराने प्रोग्रेस को लोड करना
window.onload = function() {
    let savedP = localStorage.getItem("my_study_progress");
    if (savedP) {
        document.getElementById("bar").style.width = savedP + "%";
        document.getElementById("percent").innerText = savedP + "% पूरा हुआ";
    }
};
