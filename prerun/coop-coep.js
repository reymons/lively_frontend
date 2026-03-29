self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", e => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", e => {
    if (e.request.cache === "only-if-cached" && e.request.mode !== "same-origin") {
        return;
    }
    const promise = fetch(e.request).then(modifyResponse);
    e.respondWith(promise);
});

function modifyResponse(res) {
    const headers = new Headers(res.headers);
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("Cross-Origin-Opener-Policy", "same-origin");

    return new Response(res.body, {
        status: res.status,
        statusText: res.statusText,
        headers,
    });
}
