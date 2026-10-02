// ================= DAY 3 – DYNAMIC LIST WITH EVENT DELEGATION =================
const taskInput = document.getElementById("taskInput");
const addBtn    = document.getElementById("addBtn");
const taskList  = document.getElementById("taskList");
const counter   = document.getElementById("counter");

// Counter is always derived from the real number of <li> items
function updateCounter() {
  counter.textContent = taskList.children.length;     // number, not string concatenation
}

// Task 1: add task (empty input ignored)
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  // Task 2: Delete button on each task
  const del = document.createElement("button");
  del.textContent = "Delete";
  del.className = "delete-btn";

  li.append(span, del);
  taskList.appendChild(li);
  taskInput.value = "";
  updateCounter();
}
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => { if (e.key === "Enter") addTask(); });

// Task 2: ONE listener on the parent list (event delegation)
taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    updateCounter();                                   // update after every delete
  }
});

// Task 3: corrected program
// BUGGY version:
//   let count = "0";  count = count + 1;               // string concatenation -> "01", "011"
//   li.remove();                                       // counter never updated after delete
//   document.querySelectorAll(".delete-btn").forEach(b => b.addEventListener(...));
//   // ^ runs BEFORE the <li> items exist, so no button gets a listener
// FIXED: use a number (or taskList.children.length) for the count, call updateCounter() after add AND delete,
// and attach ONE listener to the parent list (above) so it works for items created later.
