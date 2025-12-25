const sendBtn = document.getElementById("send");
const restartBtn = document.getElementById("restart");
const copyBtn = document.getElementById("copy");

const compose = document.getElementById("compose");
const result = document.getElementById("result");

const toInput = document.getElementById("to");
const msgInput = document.getElementById("message");
const yearInput = document.getElementById("year");
const count = document.getElementById("count");

const card = document.getElementById("card");
const cardTo = document.querySelector(".card-to");
const cardMsg = document.querySelector(".card-message");
const cardYear = document.querySelector(".card-year");

let selectedVibe = "gentle";

/* character count */
msgInput.addEventListener("input", () => {
  count.textContent = `${msgInput.value.length} / 280`;
});

/* vibe selection */
document.querySelectorAll(".vibe-buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedVibe = btn.dataset.vibe;
    card.className = `card ${selectedVibe}`;
  });
});

/* send */
sendBtn.onclick = () => {
  const data = {
    to: toInput.value || "Future Me",
    msg: msgInput.value,
    year: yearInput.value,
    vibe: selectedVibe
  };

  renderCard(data);
  updateURL(data);

  compose.hidden = true;
  result.hidden = false;
};

/* render card */
function renderCard({ to, msg, year, vibe }) {
  const written = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  cardTo.textContent = `To: ${to}`;
  cardMsg.textContent = msg;
  cardYear.textContent = `— ${year} · written ${written}`;
  card.className = `card ${vibe}`;
}

/* update URL */
function updateURL(data) {
  const params = new URLSearchParams(data).toString();
  const newURL = `${window.location.pathname}?${params}`;
  window.history.pushState({}, "", newURL);
}

/* copy link */
copyBtn.onclick = () => {
  navigator.clipboard.writeText(window.location.href);
  copyBtn.textContent = "Link copied ✨";
};

/* restart */
restartBtn.onclick = () => {
  window.history.pushState({}, "", window.location.pathname);
  compose.hidden = false;
  result.hidden = true;
  copyBtn.textContent = "Copy link";
};

/* auto-load from URL */
window.onload = () => {
  const params = new URLSearchParams(window.location.search);

  if (params.has("msg")) {
    const data = {
      to: params.get("to"),
      msg: params.get("msg"),
      year: params.get("year"),
      vibe: params.get("vibe") || "gentle"
    };

    renderCard(data);
    compose.hidden = true;
    result.hidden = false;
  }
};
