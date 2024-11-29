const removeById = async (id) => {
  const response = await fetch(`/${id}`, {
    method: "DELETE",
  }).then(() => location.reload());
  if (response.ok) {
    const noteElement = document.querySelector(`[data-id="${id}"]`);
    noteElement.remove();
  } else {
    console.error("Failed to remove note:");
  }
};
document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "removeById") {
    const id = event.target.dataset.id;
    removeById(id);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "editById") {
    const id = event.target.dataset.id;
    const note = prompt("Введите новый текст заметки:");
    if (note) {
      editById(id, note);
    }
  }
});

const editById = async (id, newNote) => {
  const response = await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newNote }),
  }).then(() => location.reload());

  if (response.ok) {
    const noteElement = document.querySelector(`[data-id="${id}"]`);
    noteElement.querySelector("h2").textContent = newNote;
  } else {
    console.error("Не удалось изменить заметку");
  }
};
