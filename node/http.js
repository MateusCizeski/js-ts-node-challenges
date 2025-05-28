const http = require("http");

const middlewares = [];

function use(mw) {
    middlewares.push(mw);
}

function runMiddlewares(req, res, middlewares, done) {
    let index = 0;

    function next() {
        if(index >= middlewares.length) return done();

        const mw = middlewares[index++];

        mw(req, res, next);
    }

    next();
}

const routes = {
    GET: {},
    POST: {}
};

function get(path, handler) {
    routes.GET[path] = handler;
}

function post(path, handler) {
    routes.POST[path] = handler;
}

use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home page");
});

get("/users", (req, res) => {
    const users = [{ id: 1, name: 'Mateus' }, { id: 2, name: "Mateus 2" }];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
});

get("/about", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About page");
});

const server = http.createServer((req, res) => {
    runMiddlewares(req, res, middlewares, () => {
        const method = req.method;
        const url = req.url;

        const handler = routes[method] && routes[method][url];

        if(handler) {
            handler(req, res);
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});