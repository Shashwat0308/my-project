require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const userRouter = require("./routes/UserRouter");
const noteRouter = require("./routes/NotesRouter");

app.use("/users", userRouter);
app.use("/notes", noteRouter);

mongoose.connect("mongodb://127.0.0.1:27017/notesApp")
.then(() => {
    console.log("DB Connected");

    app.listen(5000, () => {
        console.log("Server running on 5000");
    });
})
.catch(err => console.log(err));