const express = require("express");
const cors = require("cors");
const app = express();
const { appConfig } = require("./config/config.json");
const { dbConfig } = require("./config/config.json");
const routes = require("./routes/routes");
var corOptions = {
  origin: "https://localhost:8081",
};
app.use(cors(corOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.get("/health", (req, res) => {
  res.send({ message: "Health stats" });
});
// set port, listen for requests
const PORT = process.env.PORT || appConfig.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
