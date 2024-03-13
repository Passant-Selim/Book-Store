const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes/bookRoutes");

require("dotenv").config();
require("./database/db");

const port = process.env.port;

app.use(express.json());
app.use(cors());

app.use("/book", router);


app.use((err, req, res, next) => {

  const statusCode = err.statusCode || 500;
  res.status(statusCode).send ({
    status: statusCode,
    message: err ?.message || "Internal Server",
    error: err?.message || []
  });

  });
  


app.listen(port, () => {
    console.log(`Server listens on port ${port}`)
});

