const Koa = require("koa");
const userAgent = require("koa-useragent");
const log = require("./log");

const app = new Koa();

const config = { format: text => `======= ${text} ======` };
app.use(userAgent);
app.use(log(config));

app.listen(3000);
