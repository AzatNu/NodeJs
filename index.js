
const path = require("path");
const express = require("express");
const chalk = require("chalk");
const { addNote, getNote, removeNoteById, editById  } = require("./notes.controller");


const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", async (req, res) => {
  res.render("index", {
      title: "Notes App",
      notes: await getNote(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.note);
  res.redirect("/");
    
  });

app.delete("/:id", async (req, res) => {
  await removeNoteById(req.params.id);
  res.redirect("/"); 
});

app.put('/:id', async (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  console.log(id, newTitle);

  try {
    const notes = await getNote(); 
    const noteToEdit = notes.find(note => note.id === Number(id));

    if (!noteToEdit) {
      throw new Error('Заметка не найдена');
    }

    noteToEdit.title = newTitle;
    editById(id, newTitle);
    await fs.writeFile(notePath, JSON.stringify(notes));
    res.send('Заметка успешно изменена');

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Файл не найден');
    } else {
      console.log(error);
    }
    res.status(500).send('Ошибка при изменении заметки');
  }

});


app.listen(port, () => {
  console.log(chalk.green(`server is running on port ${port}...`));
});