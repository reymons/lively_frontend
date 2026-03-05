import webpack from "webpack";
import cfg from "../config";

webpack(cfg, (err, stats) => {
    if (err) throw err;

    if (stats!.hasErrors()) {
        stats!.compilation.errors.forEach(err => console.error(err));
        process.exit(1);
    }

    const statsStr = stats!.toString({
        colors: true,
        all: false,
        assets: true,
        timings: true,
        modules: false,
        entrypoints: true,
    });
    console.log(`\nBuild finished successfully:\n\n${statsStr}\n`);
});
