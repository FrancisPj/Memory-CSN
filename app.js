const cards = document.querySelectorAll(".card");

function shuffleCards() {
  cards.forEach(card => {
    const randomPos = Math.trunc(Math.random() * 12);
    card.style.order = randomPos;
  });
}
shuffleCards();
function flipACard(e) {
  if (lockedCards) return;

  saveCard(e.target.children[0], e.target.getAttribute("data-attr"));

  if (cardsPicked.length >= 2) {
    result();
  }
}
cards.forEach(card => card.addEventListener("click", flipACard));

let lockedCards = false;
let cardsPicked = [];
function flipACard(e) {
  if (lockedCards) return;

  saveCard(e.target.children[0], e.target.getAttribute("data-attr"));

  if (cardsPicked.length === 2) result();
}
//pour ne pas avoir de répétition au double clic sur la même carte
function saveCard(el, value) {
  if (el === cardsPicked[0]?.el) return;

  el.classList.add("active");
  cardsPicked.push({ el, value });
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
    advice.textContent = "Bravo ! vous avez gagné 😁";
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

    resetGame(); // Réinitialiser le jeu

    return;
  }
  score.textContent = `Nombre de coups ${numberOfTries}`;
}
// formulaire d'inscription - validations

const inputsValidity = {
  username: false,
  email: false,
}

const validationTexts = document.querySelectorAll(".error-msg");

const usernameInput = document.getElementById("username");

usernameInput.addEventListener("blur", uservalidation)
usernameInput.addEventListener("input", uservalidation)

function uservalidation() {
  if(usernameInput.value.length >=3){
    validationTexts[0].style.display = "none";
    inputsValidity.username = true;
  }else{
    validationTexts[0].style.display = "block";
    inputsValidity.username = false; // Mettre à jour l'état de validité
  }
}

const emailInput = document.getElementById("email");

emailInput.addEventListener("blur", mailvalidation)
emailInput.addEventListener("input", mailvalidation)

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function mailvalidation() {
  if(regexEmail.test(emailInput.value)){
    validationTexts[1].style.display = "none";
    inputsValidity.email = true;
  }else{
    validationTexts[1].style.display = "block";
    inputsValidity.email = false; // Mettre à jour l'état de validité
  }
}

function resetGame() {
  numberOfTries = 0;
  lockedCards = false;
  cardsPicked = [];
  advice.textContent = "Bravo ! vous avez gagné 😁";
  score.textContent = score.textContent;
  shuffleCards();

  cards.forEach(card => {
    card.classList.remove("active");
    card.addEventListener("click", flipACard);
  });

  setTimeout(() => {
    score.textContent = "Nombre de coups : 0";
    advice.textContent = "Tentez de gagner avec le moins d'essais possible.";
  }, 3500);
}


const inscriptionForm = document.getElementById("inscription-form");
inscriptionForm.addEventListener("submit", handleInscription);

function handleInscription(e) {
  e.preventDefault();

  //validation du formulaire
  const keys = Object.keys(inputsValidity)
  const failedInputs = keys.filter(key => !inputsValidity[key])

  if(failedInputs.length){
    failedInputs.forEach(input => {
      const index = keys.indexOf(input)
      showValidation({index: index, validation: false})
    })
  }else{
    alert("données envoyées avec succés")
  }

  // Récupérer les valeurs du formulaire
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  // Stocker les valeurs dans le localStorage
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);


  // Mettre à jour les informations du dernier score dans le localStorage
  const scores = getScoresFromLocalStorage();
  const lastScore = scores[scores.length - 1];
  lastScore.username = username;
  lastScore.email = email;
  saveScoresToLocalStorage(scores);

  // Réinitialiser l'état des cartes
  innerCards.forEach(card => {
  card.classList.remove("active");
  // Masquer la div d'inscription
  const inscriptionContainer = document.getElementById("inscription-container");
  inscriptionContainer.style.display = "none";
  // Réinitialiser le formulaire
  inscriptionForm.reset();
});
  // Mettre à jour le tableau des scores
  displayScores();
}

function getScoresFromLocalStorage() {
  const scoresString = localStorage.getItem("scores");
  return scoresString ? JSON.parse(scoresString) : [];
}

function saveScoresToLocalStorage(scores) {
  localStorage.setItem("scores", JSON.stringify(scores));
}

// // Appelez la fonction displayScores pour afficher les scores lors du chargement de la page
// displayScores();

function resetScores() {
  // Réinitialiser les scores selon vos besoins
}

const resetForm = document.getElementById("reset-form");
resetForm.addEventListener("submit", handleReset);


function handleReset(e) {
  e.preventDefault();

  // Récupérer la valeur saisie dans le champ de mot de passe
  const passwordInput = document.getElementById("password").value;

  // Récupérer le mot de passe administrateur à partir d'une variable d'environnement
  const adminPassword ="csNuiton";

  // Utiliser le mot de passe administrateur dans votre code
  if (passwordInput === adminPassword) {
    // Rediriger vers la page admin.html
    window.location.href = "admin.html";

   // Réinitialiser le formulaire
    resetForm.reset();
  } else {
    // Mot de passe incorrect, afficher un message d'erreur
    displayErrorMessage();
    // Afficher un message d'erreur ou effectuer d'autres actions si le mot de passe est incorrect
    console.log("Mot de passe administrateur incorrect !");
  }
}