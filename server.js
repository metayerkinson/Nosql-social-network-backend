const express = require("express");
const db = require("./config/connection");
const routes = require("./routes/api");
const cors = require("cors");

const PORT = 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", routes);
app.use(cors());

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
