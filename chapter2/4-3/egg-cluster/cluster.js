const cfork = require("cfork");
var chokidar = require("chokidar");
const { resolve } = require("path");
const reload = require("cluster-reload");

const master = cfork({
    exec: resolve(__dirname, "index.js"),
    count: 2
});

chokidar.watch("./app").on("change", (event, path) => {
    console.log(event, path);
    reload(2);
});
