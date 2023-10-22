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
          { ownerID: currentOwner._id, email: currentOwner?.email },
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
  //   if (!req.headers.authorization) {
  //     res.send({ success: false, error: "Please provide Authorization" });
  //   }
  const token = req.headers["authorization"]?.split(" ")[1];
  const key = PRIVATE_KEY;

  if (!token)
    return res
      .status(401)
      .send({ success: false, error: "Please provide token." });

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, error: err.message });
    }
    req.currentuser = decoded;
    next();
  });
}
app.use(auth);

app.get("/users/me", async (req, res) => {
  const { ownerID } = req.currentuser;

  try {
    const user = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(ownerID) });

    if (user) {
      return res.status(200).send({
        success: true,
        data: {
          name: user?.name,
          phone: user?.phone,
          email: user?.email,
          address: user?.address,
        },
      });
    } else {
      return res.status(404).send({ success: false, error: error.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "try again" });
  }
});

app.post("/test", async (req, res) => {
  const { ownerID } = req.currentuser;
  console.log("onwer", ownerID);
  try {
    const updatedData = req.body;
    console.log(req);
    if (updatedData.password) {
      updatedData.password = await bycrpt.hash(updatedData.password, 10);
    }

    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(ownerID) }, { $set: updatedData });
    console.log(req.body);
    if (result.modifiedCount === 1) {
      //   const updatedUserData = await db
      //     .collection(COLLECTION_NAME)
      //     .findOne({ _id: new ObjectId(ownerID) });
      return res.status(200).send({
        success: true,
        data: "test",
      });
    } else {
      return res.status(404).send({
        success: false,
        error: "User not found or no changes made.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      error: "An error occurred while updating user information.",
    });
  }
});

app.listen(5001, () => console.log("connected"));
