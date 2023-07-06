// const cards = document.querySelectorAll(".card");

// function shuffleCards() {
//   cards.forEach(card => {
//     const randomPos = Math.trunc(Math.random() * 12);
//     card.style.order = randomPos;
//   });
// }
// shuffleCards();

// cards.forEach(card => card.addEventListener("click", flipACard));

// let lockedCards = false;
// let cardsPicked = [];
// function flipACard(e) {
//   if (lockedCards) return;

//   saveCard(e.target.children[0], e.target.getAttribute("data-attr"));

//   if (cardsPicked.length === 2) result();
// }

// function saveCard(el, value) {
//   if (el === cardsPicked[0]?.el) return;

//   el.classList.add("active");
//   cardsPicked.push({ el, value });
//   console.log(cardsPicked);
// }

// function result() {
//   saveNumberOftries();

//   if (cardsPicked[0].value === cardsPicked[1].value) {
//     cardsPicked[0].el.parentElement.removeEventListener("click", flipACard);
//     cardsPicked[1].el.parentElement.removeEventListener("click", flipACard);
//     cardsPicked = [];
//     return;
//   }

//   lockedCards = true;
//   setTimeout(() => {
//     cardsPicked[0].el.classList.remove("active");
//     cardsPicked[1].el.classList.remove("active");
//     cardsPicked = [];
//     lockedCards = false;
//   }, 1000);
// }

// const innerCards = [...document.querySelectorAll(".double-face")];
// const advice = document.querySelector(".advice");
// const score = document.querySelector(".score");

// let numberOfTries = 0;
// function saveNumberOftries() {
//   numberOfTries++;
//   const checkForEnd = innerCards.filter(card => !card.classList.contains("active"));
//   if (!checkForEnd.length) {
//     advice.textContent = `Bravo ! Appuyez sur "espace" pour relancer une partie.`;
//     score.textContent = `Votre score final : ${numberOfTries}`;

//     // Afficher la div d'inscription
//     const inscriptionContainer = document.getElementById("inscription-container");
//     inscriptionContainer.style.display = "block";

//     return;
//   }
//   score.textContent = `Nombre de coups ${numberOfTries}`;
// }

// const inscriptionForm = document.getElementById("inscription-form");
// inscriptionForm.addEventListener("submit", handleInscription);

// function handleInscription(e) {
//   e.preventDefault();

//   // Récupérer les valeurs du formulaire
//   const username = document.getElementById("username").value;
//   const email = document.getElementById("email").value;

//   // Ajouter les informations au tableau
//   const tableauScoresBody = document.getElementById("tableau-scores-body");
//   const newRow = document.createElement("tr");
//   newRow.innerHTML = `
//     <td>${username}</td>
//     <td>${email}</td>
//     <td>${numberOfTries}</td>
//     <td>${new Date().toLocaleDateString()}</td>
//   `;
//   tableauScoresBody.appendChild(newRow);

//   // Réinitialiser le formulaire
//   inscriptionForm.reset();

//   // Masquer la div d'inscription
//   const inscriptionContainer = document.getElementById("inscription-container");
//   inscriptionContainer.style.display = "none";
// }

// function displayScores() {
//   const tableauScoresBody = document.getElementById("tableau-scores-body");
//   tableauScoresBody.innerHTML = "";

//   let scores = localStorage.getItem("scores");
//   if (scores) {
//     scores = JSON.parse(scores);

//     scores.forEach(score => {
//       const newRow = document.createElement("tr");
//       newRow.innerHTML = `
//         <td>${score.username}</td>
//         <td>${score.email}</</td>
//         <td>${score.numberOfTries}</td>
//         <td>${score.date}</td>
//       `;
//       tableauScoresBody.appendChild(newRow);
//     });
//   }
// }

// // Appelez la fonction displayScores pour afficher les scores lors du chargement de la page
// displayScores();

const cards = document.querySelectorAll(".card");

function shuffleCards() {
  cards.forEach(card => {
    const randomPos = Math.trunc(Math.random() * 12);
    card.style.order = randomPos;
  });
}
shuffleCards();

cards.forEach(card => card.addEventListener("click", flipACard));

let lockedCards = false;
let cardsPicked = [];
function flipACard(e) {
  if (lockedCards) return;

  saveCard(e.target.children[0], e.target.getAttribute("data-attr"));

  if (cardsPicked.length === 2) result();
}

function saveCard(el, value) {
  if (el === cardsPicked[0]?.el) return;

  el.classList.add("active");
  cardsPicked.push({ el, value });
  console.log(cardsPicked);
}

function result() {
  saveNumberOftries();

  if (cardsPicked[0].value === cardsPicked[1].value) {
    cardsPicked[0].el.parentElement.removeEventListener("click", flipACard);
    cardsPicked[1].el.parentElement.removeEventListener("click", flipACard);
    cardsPicked = [];
    return;
  }

  lockedCards = true;
  setTimeout(() => {
    cardsPicked[0].el.classList.remove("active");
    cardsPicked[1].el.classList.remove("active");
    cardsPicked = [];
    lockedCards = false;
  }, 1000);
}

const innerCards = [...document.querySelectorAll(".double-face")];
const advice = document.querySelector(".advice");
const score = document.querySelector(".score");

let numberOfTries = 0;
function saveNumberOftries() {
  numberOfTries++;
  const checkForEnd = innerCards.filter(card => !card.classList.contains("active"));
  if (!checkForEnd.length) {
    advice.textContent = `Bravo ! Appuyez sur "espace" pour relancer une partie.`;
    score.textContent = `Votre score final : ${numberOfTries}`;

    // Afficher la div d'inscription
    const inscriptionContainer = document.getElementById("inscription-container");
    inscriptionContainer.style.display = "block";

    // Enregistrer le score dans le localStorage
    const scores = getScoresFromLocalStorage();
    scores.push({
      username: "",
      email: "",
      numberOfTries: numberOfTries,
      date: new Date().toLocaleDateString()
    });
    saveScoresToLocalStorage(scores);

    return;
  }
  score.textContent = `Nombre de coups ${numberOfTries}`;
}

const inscriptionForm = document.getElementById("inscription-form");
inscriptionForm.addEventListener("submit", handleInscription);

function handleInscription(e) {
  e.preventDefault();

  // Récupérer les valeurs du formulaire
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  // Mettre à jour les informations du dernier score dans le localStorage
  const scores = getScoresFromLocalStorage();
  const lastScore = scores[scores.length - 1];
  lastScore.username = username;
  lastScore.email = email;
  saveScoresToLocalStorage(scores);

  // Mettre à jour le tableau des scores
  displayScores();

  // Réinitialiser le formulaire
  inscriptionForm.reset();

  // Masquer la div d'inscription
  const inscriptionContainer = document.getElementById("inscription-container");
  inscriptionContainer.style.display = "none";
}

function getScoresFromLocalStorage() {
  const scoresString = localStorage.getItem("scores");
  return scoresString ?


  JSON.parse(scoresString) : [];
}

function saveScoresToLocalStorage(scores) {
  localStorage.setItem("scores", JSON.stringify(scores));
}

function displayScores() {
  const tableauScoresBody = document.getElementById("tableau-scores-body");
  tableauScoresBody.innerHTML = "";

  const scores = getScoresFromLocalStorage();

  // trier les scores dans l'ordre croissant
  scores.sort((a, b) => a.numberOfTries - b.numberOfTries);

  // limiter les scores affichés aux quinze premiers
  const limitedScores = scores.slice(0, 15);


  limitedScores.forEach(score => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${score.username}</td>
      <td>${score.email}</td>
      <td>${score.numberOfTries}</td>
      <td>${score.date}</td>
    `;
    tableauScoresBody.appendChild(newRow);
  });
}

// Appelez la fonction displayScores pour afficher les scores lors du chargement de la page
displayScores();
