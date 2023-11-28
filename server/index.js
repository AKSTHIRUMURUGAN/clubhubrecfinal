const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const EventModel = require('./Models/Event');
const LoginModel = require('./Models/Login');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect("mongodb://127.0.0.1:27017/eventDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads/event'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
    EventModel.find()
        .then(events => res.json(events))
        .catch(err => res.json(err));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await LoginModel.findOne({ email });

        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("The password is incorrect");
            }
        } else {
            res.json("User not found");
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({ error: errors.join(', ') });
        } else {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

app.post('/create', upload.single("image"), (req, res) => {
    try {
        let image;
        if (req.file) {
            const imageUrl = `http://127.0.0.1:3002/uploads/event/${req.file.originalname}`;
            image=imageUrl
        }
        EventModel.create({ ...req.body, image })
            .then(event => res.json(event))
            .catch(err => res.json(err));
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Error uploading file" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
