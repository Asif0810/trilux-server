const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
// middleware
require("dotenv").config();
app.use(cors());
app.use(express.json());

async function run() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h9wahhk.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // triluxUser
    const TriluxUser = client.db("trilux_user").collection("user");

    app.post("/all-user", async (req, res) => {
      const user = req.body;
      const result = await TriluxUser.insertOne(user);
      res.send(result);
    });
    app.get("/myinfo", async (req, res) => {
      const email = req.query.email;
      const query = { Email: email };
      const result = await TriluxUser.findOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.error());

app.get("/", (req, res) => {
  res.send("Trilux server is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
