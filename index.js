const app = require("./app");
const connectwithDB = require("./config/db");
require("dotenv").config();

connectwithDB();

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
