//require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const jwt = require('jsonwebtoken');
const { MongoClient, ObjectID } = require('mongodb');

const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.json());
server.use(cors());

const url = 'mongodb+srv://rteklu:test123@cluster0.s8juunh.mongodb.net/'; // Use environment variable for MongoDB URI
const dbName = 'RestaurantManagement';


const initDatabase = async () => {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    server.use('/food', foodRoutes(db));
  
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Route for adding a new food item
server.post('/food', verifyToken, async (req, res) => {
  try {
    const { name, origin, price, date, image } = req.body;

    // Create a new food item
    const newFood = new Food({
      name,
      origin,
      price,
      date,
      image,
    });

    // Save the new food item to the database
    await newFood.save();

    res.status(201).json({ message: 'Food item added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add food item' });
  }
});

// Route to get a list of all food items
server.get('/food', verifyToken, async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

// Route to get a specific food item by ID
server.get('/food/:id', verifyToken, async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch food item' });
  }
});

// Route for updating a food item by ID
server.put('/food/:id', verifyToken, async (req, res) => {
  const { name, origin, price, date, image } = req.body;

  try {
    const foodItem = await Food.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    // Update the food item's fields
    foodItem.name = name;
    foodItem.origin = origin;
    foodItem.price = price;
    foodItem.date = date;
    foodItem.image = image;

    // Save the updated food item
    await foodItem.save();

    res.status(200).json({ message: 'Food item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update food item' });
  }
});

// Route for deleting a food item by ID
server.delete('/food/:id', verifyToken, async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    // Delete the food item from the database
    await foodItem.remove();

    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete food item' });
  }
});

initDatabase();
module.exports = server; // Export the Express application using CommonJS
