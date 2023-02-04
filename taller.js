const express = require("express");
const mongoose = require("mongoose");
const { reset } = require("nodemon");
const app = express();
const port = 3001;
let db;

app.use(express.json());

app.get("/api/a", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ email_address: { $regex: /@twitter\.com/ } })
      .limit(5)
      .toArray();
    res.send(result);
  } catch (error) {}
});

app.get("/api/b", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ founded_year: { $gte: 2005, $lte: 2008 } })
      .limit(20)
      .toArray();
    res.send(result);
  } catch (error) {}
});

app.get("/api/c", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ name: "Technorati" })
      .limit(20)
      .toArray();
    res.send(result);
  } catch (error) {}
});

app.get("/api/d", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $and: [{ category_code: "advertising" }, { founded_year: 2002 }],
      })
      .limit(20)
      .toArray();
    res.send(result);
  } catch (error) {}
});

app.get("/api/e", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $or: [
          { category_code: { $regex: "messaging" } },
          { category_code: { $regex: "game_video" } },
        ],
      })
      .sort({ founded_year: 1 })
      .limit(10)
      .toArray();
    res.send(result);
  } catch (error) {}
});

app.get("/api/f", async (req, res) => {
  try {
    const ano = req.query.ano;
    const result = await db
      .collection("companies")
      .find({
        founded_year: Number(ano),
      })

      .limit(10)
      .toArray();
    res.send(result);
  } catch (error) {}
});

app.post("/api/g", async (req, res) => {
  try {
    const ano = req.body.ano;
    const result = await db
      .collection("companies")
      .find({
        founded_year: ano,
      })
      .limit(10)
      .toArray();
    res.send(result);
  } catch (error) {}
});

mongoose
  .connect(
    "mongodb+srv://lorenLopez:Lorena_1988@cluster0.gu8pxqz.mongodb.net/sample_training?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongo DB Connected!");
    db = mongoose.connection.db;
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
