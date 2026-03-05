import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import FastifyCompress from "@fastify/compress";
import path from "node:path";

const fastify = Fastify({ logger: true });

fastify.register(FastifyCompress);

const staticFilesTTL = 60 * 60 * 24 * 365; // 1 year

fastify.register(FastifyStatic, {
    prefix: "/_static",
    root: path.resolve(__dirname, "..", "dist"),
    maxAge: staticFilesTTL,
});

fastify.get("*", (_, reply) => reply.sendFile("index.html"));

fastify.listen({ host: "0.0.0.0", port: 7000 }, (err, addr) => {
    if (err) throw err;
    console.log(`Serving on ${addr}`);
});
