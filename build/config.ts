import path from "node:path";
import { type Configuration, EnvironmentPlugin } from "webpack";
import HtmlPlugin from "html-webpack-plugin";
import CssExtractPlugin from "mini-css-extract-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { Configuration as DevServerCfg } from "webpack-dev-server";
import { getCssClass } from "./util";
import { PreloadAssetsPlugin } from "./plugins/preload-assets-plugin";
import { RemoveLicensePlugin } from "./plugins/remove-license-plugin";
import { CriticalPathPlugin } from "./plugins/critical-path-plugin";
import { GenerateHtmlPagesPlugin } from "./plugins/generate-html-pages-plugin";
import appCfg from "../app.config";

const isDev = process.env.NODE_ENV === "development";
const withBundleAnalyzer = !!process.env.BUNDLE_ANALYZER;
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "dist");
const htmlFilename = isDev ? "index.dev.html" : "index.html";

const cssBaseLoaders = [
    isDev
        ? undefined
        : {
              loader: "postcss-loader",
              options: {
                  postcssOptions: {
                      plugins: [
                          [
                              "postcss-preset-env",
                              {
                                  features: {
                                      "custom-properties": false, // disable CSS variable polyfill
                                  },
                              },
                          ],
                      ],
                  },
              },
          },
    "sass-loader",
].filter(Boolean);

// TODO: separate dev and prod configs
const cfg: Configuration & { devServer: DevServerCfg } = {
    entry: path.join(rootDir, "src", "app", "index.tsx"),
    output: {
        path: outputDir,
        clean: true,
        publicPath: isDev ? "/" : "/_static/",
        filename: "js/[name].[contenthash].js",
        chunkFilename: "chunks/js/[id].[contenthash].js",
        cssChunkFilename: "chunks/css/[id].[contenthash].css",
        assetModuleFilename: "assets/[name]/[hash][ext]",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                sideEffects: false,
                use: ["thread-loader", "swc-loader"],
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                sideEffects: true,
                use: [
                    isDev ? "style-loader" : CssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { importLoaders: 2 },
                    },
                    ...cssBaseLoaders,
                ],
            },
            {
                test: /\.module\.scss$/,
                use: [
                    isDev ? "style-loader" : CssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            modules: {
                                namedExport: false,
                                auto: true,
                                getLocalIdent(ctx: any, _: any, name: string) {
                                    return getCssClass(name, ctx.resourcePath, isDev);
                                },
                            },
                        },
                    },
                    ...cssBaseLoaders,
                ],
            },
            {
                test: /\.(svg|png|jpe?g|gif|webp|avif|woff2)$/i,
                type: "asset/resource",
                sideEffects: true,
            },
        ],
    },
    plugins: [
        new EnvironmentPlugin(appCfg.env),
        new HtmlPlugin({ template: path.join(rootDir, htmlFilename) }),
    ],
    mode: isDev ? "development" : "production",
    devtool: isDev ? "inline-source-map" : false,
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        modules: ["node_modules"],
        plugins: [new TsconfigPathsPlugin({ baseUrl: rootDir })],
    },
    devServer: {
        host: process.env.HOST ?? "0.0.0.0",
        port: process.env.PORT ?? 7000,
        static: outputDir,
        historyApiFallback: true,
        compress: true,
    },
    experiments: !isDev
        ? undefined
        : {
              lazyCompilation: {
                  entries: false,
              },
          },
};

if (isDev) {
    cfg.plugins!.push(new HtmlPlugin({ template: path.join(rootDir, htmlFilename) }));
}

if (!isDev) {
    cfg.plugins!.push(
        new CssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: "chunks/css/[id].[contenthash].css",
        }),
        new RemoveLicensePlugin(),
        new CriticalPathPlugin({
            cssDir: "css",
            htmlFilename,
        }),
        new PreloadAssetsPlugin({
            preloadedAssetsDir: path.join(rootDir, "src", "assets", "preloaded"),
        }),
        new GenerateHtmlPagesPlugin({
            outDir: "pages",
            pages: appCfg.pages,
            htmlFilename,
        })
    );

    if (withBundleAnalyzer) {
        cfg.plugins!.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
            })
        );
    }

    cfg.optimization = {
        runtimeChunk: "single",
        minimize: true,
        usedExports: true,
        providedExports: true,
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: "react",
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    name: "vendor",
                    priority: -20,
                    minChunks: 2,
                    reuseExistingChunk: true,
                },
            },
        },
        minimizer: [
            new ImageMinimizerPlugin({
                generator: [
                    {
                        preset: "webp",
                        // @ts-expect-error library types issues
                        implementation: ImageMinimizerPlugin.sharpGenerate,
                        options: {
                            encodeOptions: {
                                webp: {
                                    quality: 75,
                                },
                            },
                        },
                    },
                    {
                        preset: "avif",
                        // @ts-expect-error library types issues
                        implementation: ImageMinimizerPlugin.sharpGenerate,
                        options: {
                            encodeOptions: {
                                avif: {
                                    quality: 75,
                                },
                            },
                        },
                    },
                ],
            }),
        ],
    };
}

export default cfg;
