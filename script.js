let serialsSet = new Set();

// 1. Charger la liste au démarrage
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    serialsSet = new Set(data); // Stockage ultra-rapide en mémoire
    console.log("Base de données chargée : " + serialsSet.size + " numéros.");
  });

// 2. Fonction appelée lors du scan
function onScanSuccess(decodedText) {
  const resultDiv = document.getElementById('result');
  
  // Recherche instantanée dans le Set
  if (serialsSet.has(decodedText.trim())) {
    resultDiv.innerHTML = `<div class="status defect">🛑 DÉFECTUEUX<br>${decodedText}</div>`;
    if(navigator.vibrate) navigator.vibrate([200, 100, 200]); // Alerte vibration
  } else {
    resultDiv.innerHTML = `<div class="status ok">✅ CONFORME<br>${decodedText}</div>`;
  }
}
