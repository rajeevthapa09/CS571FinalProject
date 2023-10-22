const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;

const { ObjectId, MongoClient } = require("mongodb");

app.use(express.json());
app.use(cors());

let collection = null;
let COLLECTION_NAME = "restaurants";

async function connectDB() {
  try {
    const uri = "mongodb+srv://rteklu:test@cluster0.s8juunh.mongodb.net/RestaurantManagement"; // Replace with your MongoDB connection string
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("RestaurantManagement");
    collection = db.collection(COLLECTION_NAME);
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectDB();

// Rest of your routes...



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


  app.listen(PORT, () => console.log("Server running on port " + PORT));
