const cards = document.querySelectorAll(".card")

function shuffleCards(){
  cards.forEach(card => {
    const randomPos = Math.trunc(Math.random() * 12)
    card.style.order = randomPos;
  })
}
shuffleCards()

cards.forEach(card => card.addEventListener("click", flipACard))

let lockedCards = false;
let cardsPicked = []
function flipACard(e){

  if(lockedCards) return;
 
  saveCard(e.target.children[0], e.target.getAttribute("data-attr"))

  if(cardsPicked.length === 2) result()
}

function saveCard(el, value) {
  if(el === cardsPicked[0]?.el) return;

  el.classList.add("active");
  cardsPicked.push({el,value})
  console.log(cardsPicked);
}

function result(){
  saveNumberOftries()

  if(cardsPicked[0].value === cardsPicked[1].value){
    cardsPicked[0].el.parentElement.removeEventListener("click", flipACard)
    cardsPicked[1].el.parentElement.removeEventListener("click", flipACard)
    cardsPicked = [];
    return;
  }

  lockedCards = true;
  setTimeout(() => {
    cardsPicked[0].el.classList.remove("active");
    cardsPicked[1].el.classList.remove("active");
    cardsPicked = [];
    lockedCards = false;
  }, 1000)
}

const innerCards = [...document.querySelectorAll(".double-face")];
const advice = document.querySelector(".advice");
const score = document.querySelector(".score")

let numberOfTries = 0;
function saveNumberOftries(){
  numberOfTries++;
  const checkForEnd = innerCards.filter(card => !card.classList.contains("active"))
  if(!checkForEnd.length) {
    advice.textContent = `Bravo ! Appuyez sur "espace" pour relancer une partie.`
    score.textContent = `Votre score final : ${numberOfTries}`
    return;
  }
  score.textContent = `Nombre de coups ${numberOfTries}`
}

window.addEventListener("keydown", handleRestart)

let shuffleLock = false;
function handleRestart(e) {
  e.preventDefault()
  if(e.keyCode === 32) {
    innerCards.forEach(card => card.classList.remove("active"))
    advice.textContent = `Tentez de gagner avec le moins d'essais possible.`
    score.textContent = `Nombre de coups : 0`
    numberOfTries = 0;
    cards.forEach(card => card.addEventListener("click", flipACard))

    if(shuffleLock) return;
    shuffleLock = true;
    setTimeout(() => {
      shuffleCards()
      shuffleLock = false;
    }, 600)
  }
}

window.addEventListener("DOMContentLoaded", function() {
  // Ajoutez une variable pour stocker les données des joueurs
  let tableauScores = [];

  // Récupérez la référence vers le formulaire d'inscription
  let inscriptionForm = document.getElementById("inscription-form");

  // Ajoutez un écouteur d'événement pour la soumission du formulaire
  inscriptionForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre

    // Récupérez les valeurs des champs nom et email
    let nom = document.getElementById("nom").value;
    let email = document.getElementById("email").value;

    // Récupérez le nombre de coups actuel
    let nombreCoups = parseInt(document.querySelector(".score").textContent.match(/\d+/)[0]);

    // Créez un objet pour stocker les données du joueur
    let joueur = {
      nom: nom,
      email: email,
      nombreCoups: nombreCoups,
      date: new Date().toLocaleDateString()
    };

    // Ajoutez le joueur à votre tableau de scores
    tableauScores.push(joueur);

    // Appelez la fonction pour générer les lignes du tableau à chaque ajout de joueur
    genererLignesTableau();

    // Effectuez ici les actions supplémentaires, par exemple, enregistrez les données dans une base de données

    // Affichez les données récupérées dans la console (vous pouvez les enregistrer ou les traiter autrement)
    console.log("Nom:", nom);
    console.log("Email:", email);
    console.log("Nombre de coups:", nombreCoups);
    console.log("Date:", joueur.date);

    // Affichez une alerte de succès ou effectuez d'autres actions souhaitées
    alert("Inscription réussie !");
    document.getElementById("inscription-form").reset(); // Réinitialise le formulaire
  });

  // Récupérez la référence vers le corps du tableau
  let tableauScoresBody = document.getElementById("tableau-scores-body");

  // Fonction pour générer les lignes du tableau
  function genererLignesTableau() {
    // Vide le corps du tableau
    tableauScoresBody.innerHTML = "";

    // Parcourez le tableau des scores et créez une ligne pour chaque joueur
    tableauScores.forEach(function(joueur) {
      let ligne = document.createElement("tr");

      // Colonne Nom
      let colonneNom = document.createElement("td");
      colonneNom.textContent = joueur.nom;
      ligne.appendChild(colonneNom);

      // Colonne Email
      let colonneEmail = document.createElement("td");
      colonneEmail.textContent = joueur.email;
      ligne.appendChild(colonneEmail);

      // Colonne Nombre de coups
      let colonneNombreCoups = document.createElement("td");
      colonneNombreCoups.textContent = joueur.nombreCoups;
      ligne.appendChild(colonneNombreCoups);

      // Colonne Date
      let colonneDate = document.createElement("td");
      colonneDate.textContent = joueur.date;
      ligne.appendChild(colonneDate);

      // Ajoutez la ligne au corps du tableau
      tableauScoresBody.appendChild(ligne);
    });
  }

  // Réinitialise le tableau des scores et le corps du tableau
  function reinitialiserTableau() {
    tableauScores = [];
    genererLignesTableau();
  }

  // Ajoutez un écouteur d'événement au bouton de réinitialisation
  let resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", reinitialiserTableau);
});