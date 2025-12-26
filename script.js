/* sounds */
const paperSound = new Audio("assets/paper-shuffle.mp3");
paperSound.volume = 0.6;

/* buttons */
const sendBtn = document.getElementById("send");
const restartBtn = document.getElementById("restart");
const copyBtn = document.getElementById("copy");

/* sections */
const result = document.getElementById("result");

/* inputs */
const toInput = document.getElementById("to");
const fromInput = document.getElementById("from");
const msgInput = document.getElementById("message");
const count = document.getElementById("count");

/* card output */
const card = document.getElementById("card");
const cardTo = document.querySelector(".card-to");
const cardFrom = document.querySelector(".card-from");
const cardMsg = document.querySelector(".card-message");
const cardDate = document.querySelector(".card-year");

/* flip elements */
const cardFlip = document.querySelector(".card-flip");
const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");

let hasFlipped = false;
let typingInterval;

/* character count */
msgInput.addEventListener("input", () => {
  count.textContent = `${msgInput.value.length} / 280`;
});

/* handwriting effect */
function typeMessage(text) {
  clearInterval(typingInterval);
  cardMsg.textContent = "";
  let i = 0;

  typingInterval = setInterval(() => {
    cardMsg.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typingInterval);
  }, 30); // handwriting speed
}

/* send */
sendBtn.onclick = () => {
  const data = {
    to: toInput.value || "Future Me",
    from: fromInput.value || "Past Me",
    msg: msgInput.value
  };

  renderCard(data);
  updateURL(data);

  document.querySelector(".card-container").style.display = "none";
  result.hidden = false;
};

/* render card */
function renderCard({ to, from, msg }) {
  const written = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  cardTo.textContent = `To: ${to}`;
  cardFrom.textContent = `From: ${from}`;
  cardDate.textContent = `written ${written}`;

  typeMessage(msg);
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
  copyBtn.textContent = "Link Copied";
};

/* restart */
restartBtn.onclick = () => {
  window.history.pushState({}, "", window.location.pathname);

  document.querySelector(".card-container").style.display = "block";
  result.hidden = true;

  toInput.value = "";
  fromInput.value = "";
  msgInput.value = "";
  count.textContent = "0 / 280";
  copyBtn.textContent = "Copy link";

  hasFlipped = false;
  cardFlip.style.transform = "rotateY(0deg)";
  cardFront.style.display = "block";
  cardBack.style.position = "absolute";
};

/* auto-load from URL */
window.onload = () => {
  const params = new URLSearchParams(window.location.search);

  if (params.has("msg")) {
    const data = {
      to: params.get("to"),
      from: params.get("from"),
      msg: params.get("msg")
    };

    renderCard(data);
    document.querySelector(".card-container").style.display = "none";
    result.hidden = false;
  }
};

/* card flip */
cardFlip.addEventListener("click", () => {
  if (hasFlipped) return;
  hasFlipped = true;

  cardFlip.style.transform = "rotateY(180deg)";

  paperSound.currentTime = 0;
  paperSound.play();

  setTimeout(() => {
    cardFront.style.display = "none";
    cardBack.style.position = "relative";
  }, 500);
});
