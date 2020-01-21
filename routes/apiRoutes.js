const notes = require("../notes");
const fs = require("fs");

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.json(notes);
  });

  app.post("/api/notes", function(req, res) {
    let newArray = [];
    const notes = fs.readFileSync('notes.json');
    if (notes.length>0) {
      newArray = JSON.parse(notes);
    };
    const newNote = {
      id: newArray.length + 1,
      title: req.body.title,
      text: req.body.text
    };
    newArray.push(newNote);
    const string = JSON.stringify(newArray);
    fs.writeFileSync('notes.json', string);
    res.json(notes);
  });

  app.delete("/api/notes/:id", function(req, res) {
    const updatedArray = [];
    const removeNote = req.params.id - 1;
    let oldNotes = fs.readFileSync('notes.json');
    oldNotes = JSON.parse(oldNotes);
    oldNotes.splice(removeNote, 1);
    for (let i=0; i<oldNotes.length; i++) {
      oldNotes[i].id = i + 1;
      updatedArray.push(oldNotes[i]);
    };
    const newString = JSON.stringify(updatedArray);
    console.log(newString);
    fs.writeFileSync('notes.json', newString);
    res.json(notes);
  });
};