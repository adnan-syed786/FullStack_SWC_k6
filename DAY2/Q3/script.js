const board = document.querySelector(".board");
let draggedCard;

board.addEventListener("dragstart", (event) => {
  if (!event.target.classList.contains("card")) return;
  draggedCard = event.target;
  draggedCard.classList.add("dragging");
});

board.addEventListener("dragover", (event) => {
  const list = event.target.closest(".task-list");
  if (!list) return;
  event.preventDefault();
  document.querySelectorAll(".task-list").forEach(item => item.classList.remove("over"));
  list.classList.add("over");
});

board.addEventListener("drop", (event) => {
  const list = event.target.closest(".task-list");
  if (list && draggedCard) list.appendChild(draggedCard);
});

board.addEventListener("dragend", () => {
  draggedCard.classList.remove("dragging");
  document.querySelectorAll(".task-list").forEach(item => item.classList.remove("over"));
  draggedCard = null;
});
