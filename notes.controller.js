const fs = require('fs/promises');
const path = require("path");
const notePath = path.join(__dirname, "db.json");
const chalk = require("chalk");

const addNote = async (title) => {
  const notes = await getNote();
  const newNote = { title, id: Date.now() };
  notes.push(newNote);
  await fs.writeFile(notePath, JSON.stringify(notes));
  console.log(chalk.green("Note added successfully"));
};

const getNote = async () => {
  const notes = await fs.readFile(notePath, "utf-8");
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];  
   

};

const removeNoteById = async (id) => {
  const notes = await getNote();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    console.log(chalk.red("Note not found"));
  } else {
    notes.splice(index, 1);
    await fs.writeFile(notePath, JSON.stringify(notes));
    console.log(chalk.green("Note removed successfully"));
  }

};

module.exports = {
  addNote,
  getNote,
  removeNoteById,
};

