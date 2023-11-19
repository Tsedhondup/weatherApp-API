const express = require("express");
const app = express(); // instantiate express
const cors = require("cors");
require("dotenv").config();
const { PORT, CORS_ORIGIN } = process.env;
// ROUTES
const cityRoutes = require("./routes/cities");

// MIDDLEWARES
app.use(cors({ origin: CORS_ORIGIN }));
express.static("public");
app.use(express.json());
// app.use(express.urlencoded());

// ROUTES
app.get("/cities", cityRoutes);
app.post("/cities", cityRoutes);
// app.delete("/citiest/:id", cityRoutes); // id == id of video, commentId == id of a comment

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
