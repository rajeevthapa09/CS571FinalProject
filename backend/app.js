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
        const ret = await db.collection(COLLECTION_NAME).updateOne({email: req.params.userEmail}, {$push : {notes: req.body}});
        const getData = await db.collection(COLLECTION_NAME).findOne({email: req.params.userEmail});
        res.status(200).send({ success: true, data: getData.notes });
    } catch (err) {
        res.status(500).send({ success: false, err: "DB error" }) 
    }
})

// Get Notes
app.get('/notes/:userEmail', async (req, res) => {
    try {
        const ret = await db.collection(COLLECTION_NAME).findOne({email: req.params.userEmail});
        res.status(200).send({ success: true, data: ret.notes });
    } catch (err) {
        res.status(500).send({ success: false, err: "DB error" })
    }
})

// Edit Notes
app.patch('/notes/:userEmail/note/:noteID', async (req, res) => {
    try {
        console.log("req.body.title", req.body);
        const ret = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.userEmail, "notes._id": new ObjectId(req.params.noteID) }, { $set: { "notes.$.title": req.body.title, "notes.$.comment" : req.body.comment } },
        );
        const getData = await db.collection(COLLECTION_NAME).findOne({email: req.params.userEmail});
        console.log("getData", getData)
        res.status(200).send({ success: true, data: getData.notes });
    } catch (err) {
        res.status(500).send({ success: false, err: "DB error" })
    }
})

// Get all courses
app.get('/departments/:department_code/courses', async (req, res) => {
    try {
        const ret = await db.collection(COLLECTION_NAME).findOne({code: req.params.department_code});
        res.status(200).send({ success: true, data: ret.courses });
    } catch (err) {
        res.status(500).send({ success: false, err: "DB error" })
    }
})

// Add course
app.put('/departments/:department_code/courses', async (req, res) => {
    try {
        req.body._id = new ObjectId();
        req.body.review = [];
        req.body.rating = null;
        const ret = await db.collection(COLLECTION_NAME).updateOne({code: req.params.department_code},{$push:{courses:req.body}});
        const deptCourses = await db.collection(COLLECTION_NAME).findOne({code: req.params.department_code, courses : {$elemMatch : {code : req.body.code }}});
        const coursesFiltered = deptCourses.courses.filter((course) => course.code === req.body.code); // is there a better way to do this?

        res.status(200).send({ success: true, data: coursesFiltered[0] });
    } catch (err) {
        res.status(500).send({ success: false, err: "DB error" })
    }
})

//Update the name of a course
app.patch('/departments/:department_code/courses/:course_code', async (req, res) => {
    try {
        const ret = await db.collection(COLLECTION_NAME).updateOne({ code: req.params.department_code, "courses.code": req.params.course_code }, { $set: { "courses.$.title": req.body.title } },
        );
        const deptCourses = await db.collection(COLLECTION_NAME).findOne({code: req.params.department_code, courses : {$elemMatch : {code : req.body.code }}});
        const coursesFiltered = deptCourses.courses.filter((course) => course.code === req.body.code); // is there a better way to do this?

        res.status(200).send({ success: true, data: coursesFiltered[0] });
    } catch (err) {
        res.status(500).send({ success: false, err: "db error" })
    }
})

// Delete a course
app.delete('/departments/:department_code/courses/:course_code', async (req, res) => {
    try {
        const ret = await db.collection(COLLECTION_NAME).updateOne({code: req.params.department_code}, 
            { $pull: {courses : {code: req.params.course_code} } });
        res.status(200).send({ success: true, data: ret });
    } catch (err) {
        res.status(500).send({ success: false, err: "db error" })
    }
})


const PORT = 5001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))