let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: taskText,
        timestamp: new Date().toLocaleString(),
    };

    pendingTasks.push(task);
    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    const pendingTaskList = document.getElementById("pending-tasks");
    const completedTaskList = document.getElementById("completed-tasks");

    pendingTaskList.innerHTML = "";
    completedTaskList.innerHTML = "";

    pendingTasks.forEach((task, index) => {
        const taskElement = document.createElement("li");
        taskElement.innerHTML = `
            <span style="color: black">${task.text}</span>
            <span class="task-timestamp">Added: ${task.timestamp}</span>
            <div class="task-actions">
                <button class="edit" onclick="editTask(${index}, 'pending')">Edit</button>
                <button class="complete" onclick="completeTask(${index})">Complete</button>
                <button class="delete" onclick="deleteTask(${index}, 'pending')">Delete</button>
            </div>
        `;
        pendingTaskList.appendChild(taskElement);
    });

    completedTasks.forEach((task, index) => {
        const taskElement = document.createElement("li");
        taskElement.innerHTML = `
            <span style="color:black">${task.text}</span>
            <span class="task-timestamp">Completed: ${task.completedTimestamp}</span>
            <div class="task-actions">
                <button class="undo" onclick="undoTask(${index})">Undo</button>
                <button class="delete" onclick="deleteTask(${index}, 'completed')">Delete</button>
            </div>
        `;
        completedTaskList.appendChild(taskElement);
    });
}

function completeTask(index) {
    const completedTask = pendingTasks.splice(index, 1)[0];
    completedTask.completedTimestamp = new Date().toLocaleString();
    completedTasks.push(completedTask);
    renderTasks();
}

function undoTask(index) {
    const undoneTask = completedTasks.splice(index, 1)[0];
    delete undoneTask.completedTimestamp;
    pendingTasks.push(undoneTask);
    renderTasks();
}

function deleteTask(index, listType) {
    if (listType === "pending") {
        pendingTasks.splice(index, 1);
    } else {
        completedTasks.splice(index, 1);
    }
    renderTasks();
}

function editTask(index, listType) {
    let taskText;
    if (listType === "pending") {
        taskText = pendingTasks[index].text;
    } else {
        taskText = completedTasks[index].text;
    }

    const newTaskText = prompt("Edit Task", taskText);
    if (newTaskText === null || newTaskText.trim() === "") {
        return;
    }

    if (listType === "pending") {
        pendingTasks[index].text = newTaskText;
    } else {
        completedTasks[index].text = newTaskText;
    }

    renderTasks();
}

renderTasks();
