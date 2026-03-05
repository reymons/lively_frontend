import type { Compiler } from "webpack";
import path from "node:path";
import fs from "node:fs/promises";

type Config = {
    htmlFilename: string;
    outDir: string;
    pages: string[];
};

export class GenerateHtmlPagesPlugin {
    constructor(private readonly cfg: Config) {}

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap("GenerateHtmlPagesPlugin", cmp => {
            compiler.hooks.afterDone.tap("GenerateHtmlPagesPlugin", async () => {
                const htmlFilepath = path.join(cmp.outputOptions.path!, this.cfg.htmlFilename);
                const promises = this.cfg.pages.map(page => {
                    page = page[0] == "/" ? page.substring(1) : page;
                    return fs.cp(
                        htmlFilepath,
                        path.join(cmp.outputOptions.path!, this.cfg.outDir, `${page}.html`)
                    );
                });
                await Promise.all(promises);
            });
        });
    }
}
