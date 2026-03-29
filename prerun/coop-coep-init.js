navigator.serviceWorker
    .register("/coop-coep.js")
    .then(reg => {
        console.log("COOP/COEP servier worker has been registered with scope ", reg.scope);

        if (!navigator.serviceWorker.controller) {
            location.reload();
        }
    })
    .catch(err => {
        console.error("Failed to register COOP/COEP servier worker: ", err);
    });
