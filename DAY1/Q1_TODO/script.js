let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

    let input = document.getElementById("taskInput");

    let text = input.value.trim();

    if(text === ""){

        alert("Task cannot be empty");
        return;
    }

    let duplicate = tasks.find(task => task.text === text);

    if(duplicate){

        alert("Task already exists");
        return;
    }

    let task = {

        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    input.value = "";

    saveTasks();

    showTasks(currentFilter);
}

function showTasks(filter){

    currentFilter = filter;

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(filter === "active"){

        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(filter === "completed"){

        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        let li = document.createElement("li");

        let checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.onchange = function(){

            task.completed = !task.completed;

            saveTasks();

            showTasks(currentFilter);
        };

        let span = document.createElement("span");

        if(task.completed){

            span.innerHTML = "<strike>" + task.text + "</strike>";
        }
        else{

            span.innerText = task.text;
        }

        let editButton = document.createElement("button");

        editButton.innerText = "Edit";

        editButton.onclick = function(){

            let editInput = document.createElement("input");

            editInput.type = "text";

            editInput.value = task.text;

            li.replaceChild(editInput, span);

            editInput.focus();

            editInput.onblur = function(){

                let updatedText = editInput.value.trim();

                if(updatedText !== ""){

                    task.text = updatedText;

                    saveTasks();

                    showTasks(currentFilter);
                }
                else{

                    showTasks(currentFilter);
                }
            };
        };

        let deleteButton = document.createElement("button");

        deleteButton.innerText = "Delete";

        deleteButton.onclick = function(){

            tasks = tasks.filter(t => t.id !== task.id);

            saveTasks();

            showTasks(currentFilter);
        };

        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(editButton);

        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateCount();
}

function updateCount(){

    let remainingTasks = tasks.filter(task => !task.completed).length;

    document.getElementById("taskCount").innerText = remainingTasks;
}

showTasks("all");