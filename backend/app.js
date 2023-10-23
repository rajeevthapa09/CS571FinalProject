const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const app = express();
const cors = require('cors');
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "team1";
let db = null;
let COLLECTION_NAME = "restaurants";


async function connectDB() {
  try {
   const client = new MongoClient("mongodb+srv://rteklu:test@cluster0.s8juunh.mongodb.net/");
   await client.connect();
    db = client.db("RestaurantManagement");
    console.log('DB connected');
  } catch (err) {
    console.log(err);
  }
}

//middleware
app.use(express.json());
app.use(cors());

connectDB();



//----------------------------------------------
// Start of Rajeev Api for Notes
//---------------------------------------------

// Add Notes
app.put('/notes/:userEmail', async (req, res) => {
  try {
    req.body._id = new ObjectId();
    const ret = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.userEmail }, { $push: { notes: req.body } });
    const getData = await db.collection(COLLECTION_NAME).findOne({ email: req.params.userEmail });
    res.status(200).send({ success: true, data: getData.notes });
  } catch (err) {
    res.status(500).send({ success: false, err: "DB error" })
  }
})

// Get Notes
app.get('/notes/:userEmail', async (req, res) => {
  try {
    const ret = await db.collection(COLLECTION_NAME).findOne({ email: req.params.userEmail });
    res.status(200).send({ success: true, data: ret.notes });
  } catch (err) {
    res.status(500).send({ success: false, err: "DB error" })
  }
})

// Edit Notes
app.patch('/notes/:userEmail/note/:noteID', async (req, res) => {
  try {
    console.log("req.body.title", req.body);
    const ret = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.userEmail, "notes._id": new ObjectId(req.params.noteID) }, { $set: { "notes.$.title": req.body.title, "notes.$.comment": req.body.comment } });
    const getData = await db.collection(COLLECTION_NAME).findOne({ email: req.params.userEmail });
    res.status(200).send({ success: true, data: getData.notes });
  } catch (err) {
    res.status(500).send({ success: false, err: "DB error" })
  }
})
//---------------------------------
// End of Rajeev api for Notes
//------------------------------------

//----------------------------------------------------------------------------
// Rahel api for Foods
//-------------------------------------------------------------------------------


//create food for a restaturant

app.put('/users/:userEmail/foods', async (req, res) => {
  try {
    const food = req.body;
    const ret = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.userEmail },
      {
        $push: { foods: food }
      });
    res.status(200).send({ success: true, data: ret });
  } catch (err) {
    res.status(500).send({ success: false, err: "DB error" })
  }
})

//get all foods of a specific restaurant

app.get("/users/:userEmail/foods", async (req, res) => {
  try {
    const ret = await db
      .collection(COLLECTION_NAME)
      .findOne({ email: req.params.userEmail });

    res.status(200).send({ success: true, data: ret.foods });
  } catch (err) {
    res.status(500).send({ success: false, err: "DB error" });
  }
});

//delete food for a restaurant
app.delete('/users/:userEmail/foods/:foodID', async (req, res) => {
  try {

    const result = await db.collection(COLLECTION_NAME).updateOne(

      {

        email: req.params.userEmail,

      },

      {
        $pull: {
          food: {
            _id: new ObjectId(req.params.foodID)
          }
        }
      }

    );

    res.send({ success: true, data: result });

  } catch (error) {

    res.send({ success: false, error: "error" });

  }

}

);


//update part of a food item

app.patch(

  "/users/:userEmail/foods/:foodID",

  async (req, res) => {

    try {

      const food = req.body;

      const result = await db.collection(COLLECTION_NAME).updateOne(

        {

          email: req.params.userEmail,

          "foods._id": new ObjectId(req.params.foodID)

        },

        {

          $set: { "foods.$": food },

        }

      );

      res.send({ sucesss: true, data: result });

    } catch (error) {

      res.send({ success: false, error: "error" });

    }

  }

);
//----------------------------------------------------------------------------
// end of Rahel api for Foods
//-------------------------------------------------------------------------------


//----------------------------------------------------------------------------
// start of Wengel api for Login/Signup/Auth
//-------------------------------------------------------------------------------


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

//--------------------------
// End of Wengel Api
//---------------------------

const PORT = 5001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))