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
    const body = req.body;

    const newUser = await db
      .collection(COLLECTION_NAME)
      .find({ email: body?.email })
      .toArray();
    if (newUser.length > 0) {
      return res
        .status(409)
        .send({ success: false, error: "please use another email" });
    }

    const encrted = await bycrpt.hash(body?.password, 10);

    const result = await db
      .collection(COLLECTION_NAME)
      .insertOne({ ...body, password: encrted });

    res.send({ success: true, data: result });
  } catch (error) {
    res.send({ success: false, error: "error" });
  }
});

app.post("/SignIn", async (req, res) => {
  try {
    const body = req.body;

    const currentOwner = await db
      .collection(COLLECTION_NAME)
      .findOne({ email: body?.email });
    if (currentOwner) {
      const correctPassword = await bycrpt.compare(
        body?.password,
        currentOwner?.password
      );
      if (correctPassword) {
        const token = jwt.sign(
          { ownerID: currentOwner?._id, email: currentOwner?.email },
          PRIVATE_KEY
        );

        return res.send({ success: true, data: token });
      } else {
        return res.send({ success: false, error: "wrong password" });
      }
    } else {
      return res.send({ success: false, error: "wrong password" });
    }
  } catch (error) {
    res.send({ success: false, error: "500 error" });
  }
});

function auth(req, res, next) {
  if (!req.headers.authorization) {
    res.send({ success: false, error: "Please provide Authorization" });
  }
  const arr = req.headers.authorization.split(" ");
  if (arr.length !== 2) {
    res.send({ success: false, error: "Please use Bearer scheme" });
  }
  try {
    const decode = jwt.verify(arr[1], PRIVATE_KEY);
    if (decode) {
      next();
    } else {
      res.send({ success: false, error: "Wrong token" });
    }
  } catch (error) {
    res.send({ success: false, error: "Wrong token" });
  }
}
app.use(auth);
app.put("/profile", async (req, res) => {});
app.listen(5001, () => console.log("connected"));
