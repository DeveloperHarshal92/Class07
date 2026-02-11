const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"))

// Post : /api/notes => Create new note and save data in mongodb
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

// Get : /api/notes => fetch all the notes data from mongoDb and send them in the response
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

// Delete : /api/notes/:id => delete note using id of req.params
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

// Patch : /api/notes => Update the description of the note by id
app.patch("/api/notes/:id", async (req, res) => {
  const { title, description } = req.body;
  const updateNote = await noteModel.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true },
  );

  res.status(200).json({
    message: "Notes modified successfully",
    updateNote,
  });
});

// Wild Card handling
app.use("*name",(req,res)=>{
  res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app;
