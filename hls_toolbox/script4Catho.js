// objet player
player.rendererController.activeRenderer$.subscribe(({renderer}) => globalRenderer = renderer.engine)
//config player
globalRenderer.config



//Export de la config catho.JS
player.rendererController.activeRenderer$.subscribe(({renderer}) => globalRenderer = renderer.engine)
const data = JSON.stringify(globalRenderer.config, null, 2);
const blob = new Blob([data], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'hls-config.json';
a.click();
URL.revokeObjectURL(url);

/////////////////////////////////////////////////////////
//Mesure de la latence
player.rendererController.activeRenderer$.subscribe(({renderer}) => globalRenderer = renderer.engine);
if (globalRenderer && globalRenderer.latency !== undefined) {
  setInterval(() => {
    console.log('Latence :', globalRenderer.latency.toFixed(2), 's');
  }, 1000);
} else {
  console.log('Latence non disponible');
}

/////////////////////////////////////////////////////////
// modifie la conf de catho 
// pour regle la latence en terme de chunck 
player.rendererController.activeRenderer$.subscribe(({renderer}) => globalRenderer = renderer.engine);

(function fixHlsConfigToStandardLive(hls) {
    if (!globalRenderer || !globalRenderer.config) {
        console.error('❌ Aucun objet hls.config trouvé.');
        return;
    }
    const cfg = globalRenderer.config;

    // 1️⃣ Suppression des clés en secondes 
    delete cfg.liveSyncDuration;
    delete cfg.liveMaxLatencyDuration;

    // 2️⃣ Ajout / mise à jour des clés en nombre de segments 
    cfg.liveSyncDurationCount = 3;
    cfg.liveMaxLatencyDurationCount = 5;

    // 3️⃣ Forcer le mode low latency à false 
    cfg.lowLatencyMode = false;
    cfg.debug=false;
    console.log('✅ Configuration corrigée :');
    console.table({

        lowLatencyMode: cfg.lowLatencyMode,

        liveSyncDurationCount: cfg.liveSyncDurationCount,

        liveMaxLatencyDurationCount: cfg.liveMaxLatencyDurationCount

    });
    console.log('🧩 Nouvelle configuration complète :', cfg);

})(globalRenderer); 

/////////////////////////////////////////////////////////
// modifie la conf de hls.js 
// pour regler la latence en terme de sec
player.rendererController.activeRenderer$.subscribe(({renderer}) => globalRenderer = renderer.engine);
(function fixHlsConfigToStandardLive(hls) {
    if (!globalRenderer || !globalRenderer.config) {
        console.error('❌ Aucun objet hls.config trouvé.');
        return;
    }
    const cfg = globalRenderer.config;

  // 1️⃣ Supprime les clés "Count"
  delete cfg.liveSyncDurationCount;
  delete cfg.liveMaxLatencyDurationCount;
  delete cfg.liveMaxLatencyDuration;

  // 2️⃣ Ajoute ou met à jour les clés en secondes
  // 👉 Ajuste ces valeurs si tu veux plus ou moins de latence
  cfg.liveSyncDuration = 30;       // lecture à ~20 s du live edge
  //cfg.liveMaxLatencyDuration = 40;  // resynchro forcée si latence > 40 s

  // 3️⃣ Force le mode Low-Latency à false
  cfg.lowLatencyMode = false;

  // 4️⃣ Affiche le résultat
  console.log('✅ Configuration corrigée (mode secondes) :');
  console.table({
    lowLatencyMode: cfg.lowLatencyMode,
    liveSyncDuration: cfg.liveSyncDuration,
    liveMaxLatencyDuration: cfg.liveMaxLatencyDuration
  });

  console.log('🧩 Nouvelle configuration complète :', cfg);
})(globalRenderer);