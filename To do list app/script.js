const taskinput = document.getElementById("taskinput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTask();

addBtn.addEventListener("click", () => {
    taskText = taskinput.value.trim();
    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTask();
        renderTask();
        taskinput.value = "";
    }
});

taskList.addEventListener("change", (e) => {
    if (e.target.type === 'checkbox') {
        const taskId = parseInt(e.target.parentElement.dataset.id);
        const task = tasks.find(task => task.id === taskId);
        task.completed = e.target.checked
        saveTask();
        renderTask();
    }
});

taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains('delete')) {
        const taskId = parseInt(e.target.parentElement.dataset.id);
        tasks.splice(tasks.findIndex(task => task.id === taskId), 1);
        saveTask();
        renderTask();
    }
})

function renderTask() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "taskItem";
        taskDiv.dataset.id = task.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const taskText = document.createElement("div");
        taskText.className = `taskText ${task.completed ? 'checked' : ''}`;
        taskText.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "Delete";

        taskDiv.append(checkbox, taskText, deleteBtn);
        taskList.append(taskDiv);
    });
}

function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
