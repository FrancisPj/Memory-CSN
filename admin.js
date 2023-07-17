function displayScores() {
  const tableauScoresBody = document.getElementById("tableau-scores-body");
  tableauScoresBody.innerHTML = "";
console.log(displayScores)
  const scores = getScoresFromLocalStorage();

  scores.forEach(score => {
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
function getScoresFromLocalStorage() {
  const scoresString = localStorage.getItem("scores");
  return scoresString ? JSON.parse(scoresString) : [];
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
  
    // Réinitialiser le tableau des scores
    resetScores();
    // Réinitialiser le tableau des scores dans le localStorage
    localStorage.removeItem("scores");

    // Réinitialiser le jeu
    resetGame();

    // Rafraîchir l'affichage des scores pour vider le tableau
    displayScores();

    // Réinitialiser le formulaire
    resetForm.reset();
  } else {
    // Mot de passe incorrect, afficher un message d'erreur
    displayErrorMessage();
    // Afficher un message d'erreur ou effectuer d'autres actions si le mot de passe est incorrect
    console.log("Mot de passe administrateur incorrect !");
  }
  }