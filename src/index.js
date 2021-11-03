const app = require("./app");
var http = require("http");
const config = require("./config/defaultConfig");

app.set("port", process.env.PORT);
const server = http.createServer(app);
// Start a TCP server listening for connections on the given port and host
server.listen(process.env.PORT||5000, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
