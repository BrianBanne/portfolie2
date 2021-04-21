const express = require("express");

const server = express();
const PORT = 8000;

server.get("/", (req, res) => {
  res.send("This is the backend :)");
});

server.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
