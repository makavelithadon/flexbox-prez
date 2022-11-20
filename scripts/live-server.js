const liveServer = require("live-server")

const options = {
  watch: ['index.css', 'index.js', 'index.html']
};

liveServer.start(options);
