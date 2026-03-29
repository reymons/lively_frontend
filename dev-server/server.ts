import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import FastifyCompress from "@fastify/compress";
import path from "node:path";

const fastify = Fastify({ logger: true });

fastify.register(FastifyCompress);

fastify.register(FastifyStatic, {
    prefix: "/_static",
    root: path.resolve(__dirname, "..", "dist"),
    maxAge: 60 * 60 * 24 * 365, // 1 year
});

["coop-coep.js", "coop-coep-init.js"].forEach(jsFile => {
    fastify.get("/" + jsFile, (_, reply) => {
        reply.header("Content-Type", "application/javascript");
        reply.sendFile(jsFile);
    });
});

fastify.get("*", (_, reply) => reply.sendFile("index.html"));

fastify.listen({ host: "0.0.0.0", port: 7000 }, (err, addr) => {
    if (err) throw err;
    console.log(`Serving on ${addr}`);
});
