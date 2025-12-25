const sendBtn = document.getElementById("send");
const restartBtn = document.getElementById("restart");
const copyBtn = document.getElementById("copy");

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

  document.querySelector('.card-container').style.display = 'none';
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
  document.querySelector('.card-container').style.display = 'block';
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
    document.querySelector('.card-container').style.display = 'none';
    result.hidden = false;
  }
};

const cardFlip = document.querySelector('.card-flip');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');

cardFlip.addEventListener('click', () => {
  cardFlip.style.transform = 'rotateY(180deg)';

  // After the flip duration, hide the front
  setTimeout(() => {
    cardFront.style.display = 'none';
    cardBack.style.position = 'relative'; // make it interactive
  }, 500); // matches half of the flip duration for smooth transition
});
