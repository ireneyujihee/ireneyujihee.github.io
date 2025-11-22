const historyEl = document.getElementById("history");
const userTextEl = document.getElementById("userText");
const suggestionEl = document.getElementById("suggestion");

let userText = "";
let sessionStep = 0;
let locked = false;

const systemIntro = [
    "SYSTEM: You are now anonymous.",
    "SYSTEM: Begin typing and press Enter when you are ready."
];

const systemResponse = [
    "SYSTEM: Pattern detected -- loneliness/invisibility.",
    "SYSTEM: Noted. You sound familiar to us.",
    "SYSTEM: Classification updated -- trapped attention loops.",
    "SYSTEM: Your words match millions of others.",
    "SYSTEM: Identity generated. You are now part of the network."
];

systemIntro.forEach(line => appendSystem(line));

function appendSystem(text) {
    historyEl.innerHTML += `<span class="system">${text}</span>\n`;
    scrollToBottom();
}


function appendYou(text) {
    historyEl.innerHTML += `<span class="you">YOU: ${escapeHtml(text)}</span>\n`;
    scrollToBottom();
}

function scrollToBottom() {
    const terminal = document.getElementById("terminal");
    terminal.scrollTop = terminal.scrollHeight;
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function getSuggestion(text) {
    const t = text.toLowerCase();
    
    if (t.startsWith("i sometimes feel")) {
        return " like no one really sees me.";
    }
    if (t.startsWith("i feel")) {
        return " like the feed knows me better than my friends.";
    }
    if (t.startsWith("sometimes")) {
        return " I'm being pulled in directions I didn't choose.";
    }
    if (t.startsWith("i am")) {
        return " not sure if these are my thoughts or the network's.";
    }
    if (text.length > 20) {
        return " ...are you sure these are your own words?";
    }

    return "";
}

function handleEnter() {
    if (!userText.trim()) return;
    
    appendYou(userText);

    if (sessionStep < systemResponses.length - 1) {
        appendSystem(systemResponses[sessionStep]);
    } else {
        appendSystem(systemResponses[systemResponses.length - 1]);
        appendSystem("SYSTEM: Input disabled. Log out, if you remember how.");
        locked = true;
    }

    sessionStep++;
    userText = "";
    userTextEl.textContent = "";
    suggestionEl.textContent = "";
}

document.addEventListener("keydown", (e) => {
    if (locked) return;

    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === "Backspace") {
        e.preventDefault();
        userText = userText.slice(0, -1);
    } else if (e.key === "Enter") {
        e.preventDefault();
        handleEnter();
    } else if (e.key.length === 1) {
        e.preventDefault();
        userText += e.key;
    } else {
        return;
    }

    userTextEl.textContent = userText;
    suggestionEl.textContent = getSuggestion(userText);
});