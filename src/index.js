const app = require("./app");
var http = require("http");
const config = require("./config/defaultConfig");

app.set("port", process.env.PORT);
const server = http.createServer(app);
// Start a TCP server listening for connections on the given port and host
server.listen(config[config.env].port, () => {
  console.log(`Server running at ${config[config.env].port}`);
});
