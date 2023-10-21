const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "team1";
const app = express();
app.use(express.json());
app.use(cors());

let db = null;
const COLLECTION_NAME = "restaurants";
async function connectDB() {
  try {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("RestaurantManagment");
    console.log("DB connected");
  } catch (error) {
    console.log("DB error");
  }
}
connectDB();

app.post("/signup", async (req, res) => {
  try {
    const { name, phone, email, password, address } = req.body;

    const encrted = await bycrpt.hash(password, 10);
    const user = { name, phone, email, password: encrted, address };

    const result = await db.collection(COLLECTION_NAME).insertOne(user);

    res.send({ success: true, data: result });
  } catch (error) {
    res.send({ success: false, error: "error" });
  }
});

app.post("/SignIn", async (req, res) => {});
app.put("/profile", async (req, res) => {});
app.listen(5001, () => console.log("connected"));
