import path from "node:path";
import type { Compiler } from "webpack";
import HtmlPlugin from "html-webpack-plugin";

type Options = {
    preloadedAssetsDir: string;
};

// Injects link tags with rel="preload" into the head
export class PreloadAssetsPlugin {
    private readonly preloadedAssetsDir: string;

    constructor(opts: Options) {
        if (!path.isAbsolute(opts.preloadedAssetsDir)) {
            throw new Error(
                `preloadedAssetsDir should be an absolute path. Got: ${opts.preloadedAssetsDir}`
            );
        }
        this.preloadedAssetsDir = opts.preloadedAssetsDir;
    }

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap("PreloadAssetsPlugin", cmp => {
            HtmlPlugin.getHooks(cmp).beforeEmit.tapAsync("PreloadAssetsPlugin", (data, cb) => {
                const links: {
                    href: string;
                    as: string;
                    priority: number;
                    type: string;
                }[] = [];

                for (const asset of cmp.getAssets()) {
                    const { sourceFilename } = asset.info;

                    if (sourceFilename) {
                        const fullFilename = path.resolve(process.cwd(), sourceFilename);
                        if (fullFilename.startsWith(this.preloadedAssetsDir)) {
                            const ext = path.extname(fullFilename);
                            // TODO: This is just a quick solution. Later, add better checks
                            if (ext === ".woff2") {
                                links.push({
                                    href: asset.name,
                                    as: "font",
                                    priority: 999,
                                    type: "font/woff2",
                                });
                            } else if (ext === ".svg") {
                                links.push({
                                    href: asset.name,
                                    as: "image",
                                    priority: 998,
                                    type: "image/svg+xml",
                                });
                            }
                        }
                    }
                }

                links.sort((a, b) => b.priority - a.priority);
                const html = links
                    .map(
                        l =>
                            `<link rel="preload" href="/_static/${l.href}" as="${l.as}" type="${l.type}" crossorigin="anonymous">`
                    )
                    .join("");
                data.html = data.html.replace("{{ preloaded-assets }}", html);
                cb(null, data);
            });
        });
    }
}
