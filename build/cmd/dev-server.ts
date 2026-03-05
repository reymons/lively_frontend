import webpack from "webpack";
import DevServer from "webpack-dev-server";
import cfg from "../config";

const compiler = webpack(cfg);
const srv = new DevServer(cfg.devServer, compiler!);
srv.start();
