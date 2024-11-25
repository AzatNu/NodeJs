const yargs = require("yargs");
const { addNote, getNote, removeNoteById } = require("./notes.controller");
const chalk = require("chalk");
yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});
yargs.command({
  command: "remove",
  describe: "remove note by id",
  handler({ id }) {
    removeNoteById(id);
  },

});

yargs.command({
  command: "list",
  describe: "print all notes",
  handler: async () => {
    const notes = await getNote();
    notes.forEach(note => {
      console.log(chalk.green(`Title: ${note.title}, ID: ${note.id}`));
    });
  },
});

yargs.parse();
