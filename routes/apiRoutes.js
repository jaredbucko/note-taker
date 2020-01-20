const journal = require("../journal");
const fs = require("fs");

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.json(journal);
  });

  app.post("/api/notes", function(req, res) {
    let newArray = [];
    const notes = fs.readFileSync('journal.json');
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
    fs.writeFileSync('journal.json', string);
    res.json(journal);
  });
};