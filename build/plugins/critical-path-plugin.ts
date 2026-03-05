import type { Compiler } from "webpack";
import path from "node:path";
import fs from "node:fs";
import HtmlWebpackPlugin from "html-webpack-plugin";

type Options = {
    cssDir: string;
    htmlFilename: string;
};

// Injects ciritcal CSS into HTML
export class CriticalPathPlugin {
    private readonly opts: Options;

    constructor(opts: Options) {
        this.opts = opts;
    }

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap("CriticalPathPlugin", cmp => {
            HtmlWebpackPlugin.getHooks(cmp).beforeAssetTagGeneration.tapAsync(
                "CriticalPathPlugin",
                (data, cb) => {
                    data.assets.css = [];
                    cb(null, data);
                }
            );
        });

        compiler.hooks.afterEmit.tap("CritialPathPlugin", cmp => {
            const css: Buffer[] = [];

            for (const filename in cmp.assets) {
                if (path.dirname(filename).startsWith(this.opts.cssDir)) {
                    const fileBfr = fs.readFileSync(path.join(cmp.outputOptions.path!, filename));
                    css.push(fileBfr);
                }
            }

            const cssStr = Buffer.concat(css).toString();
            const htmlFilename = path.join(cmp.outputOptions.path!, this.opts.htmlFilename);
            let html = fs.readFileSync(htmlFilename).toString();
            html = html.replace("{{ critical-css }}", `<style>${cssStr}</style>`);
            fs.writeFileSync(htmlFilename, html);
        });
    }
}
