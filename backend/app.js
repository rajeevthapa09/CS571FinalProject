const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const app = express();
const cors = require('cors');
let db = null;
let COLLECTION_NAME = "restaurants";


async function connectDB() {
  try {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
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


//----------------------------------------------------------------------------
// Rahel api
//-------------------------------------------------------------------------------

app.post("/restaurants", async (req, res) => {
  try {
    const user = req.body;
    const result = await collection.insertOne(user);
    res.status(200).send({ success: true, data: result });
  } catch (error) {
    console.error("Error creating a new restaurant:", error);
    res
      .status(500)
      .send({ success: false, error: "Can not create a new restaurant" });
  }
});

app.put("/restaurants/:restaurantId/foods", async (req, res) => {
  try {
    const food = req.body;
    food._id = new ObjectId();
    const restaurantId = req.params.restaurantId; // Corrected the parameter name

    const result = await collection.updateOne(
      { _id: new ObjectId(restaurantId) }, // Corrected the filter
      { $push: { foods: food } }
    );

    if (result.matchedCount > 0) {
      // Check if any documents were matched and modified
      res.status(200).send({ success: true, data: result });
    } else {
      res.status(404).send({ success: false, error: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: "Server error" });
  }
});

app.patch("/restaurants/:restaurantId/foods/:foodId", async (req, res) => {
  try {
    const { name, origin, price, date, quantity } = req.body;
    const restaurantId = req.params.restaurantId;
    const foodId = req.params.foodId;
    const result = await collection.updateOne(
      {
        _id: new ObjectId(restaurantId),
        "foods._id": new ObjectId(foodId),
      },
      {
        $set: {
          "foods.$.name": name,
          "foods.$.origin": origin,
          "foods.$.price": price,
          "foods.$.quantity": quantity,
          "foods.$.date": date,
        }
      }
    );
    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.delete("/restaurants/:restaurantId/foods/:foodId", async (req, res) => {
  try {
    const result = await collection.updateOne(
      {
        _id: new ObjectId(req.params.restaurantId)
      },
      { $pull: { foods: { _id: new ObjectId(req.params.foodId) } } }
    );

    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.get("/restaurants/:restaurantId/foods", async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const user = await collection.findOne({ _id: new ObjectId(restaurantId) });

    if (!user) {
      return res.status(404).json({ success: false, error: "restaurant not found" });
    }

    const foods = user.foods || [];

    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});


const PORT = 5001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))