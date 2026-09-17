const titleInput = document.getElementById("titleInput");
const descriptionInput = document.getElementById("descriptionInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");


// =====================================
// GET TODOS FROM LOCAL STORAGE
// =====================================

let todos = JSON.parse(localStorage.getItem("todos")) || [];


// =====================================
// EDIT TODO ID
// =====================================

let editId = null;


// =====================================
// SAVE TODOS
// =====================================

function saveTodos() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}


// =====================================
// DISPLAY TODOS
// =====================================

function displayTodos() {

    // Clear old list
    todoList.innerHTML = "";


    todos.forEach(function(todo) {

        // Create LI
        const li = document.createElement("li");

        li.classList.add("todo");


        // Completed class
        if (todo.completed === true) {

            li.classList.add("completed");
        }


        // =================================
        // CHECKBOX
        // =================================

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("todo-checkbox");

        checkbox.checked = todo.completed;


        checkbox.addEventListener("change", function() {

            todo.completed = checkbox.checked;

            saveTodos();

            displayTodos();

        });


        // =================================
        // CONTENT
        // =================================

        const content = document.createElement("div");

        content.classList.add("todo-content");


        // TITLE
        const title = document.createElement("div");

        title.classList.add("todo-title");

        title.innerText = todo.title;


        // DESCRIPTION
        const description = document.createElement("div");

        description.classList.add("todo-description");

        description.innerText = todo.description;


        // Add title and description
        content.appendChild(title);

        content.appendChild(description);


        // =================================
        // EDIT BUTTON
        // =================================

        const editButton = document.createElement("button");

        editButton.innerText = "Edit";

        editButton.classList.add("edit-btn");


        editButton.addEventListener("click", function() {

            // Put old data into input
            titleInput.value = todo.title;

            descriptionInput.value = todo.description;


            // Change button
            addBtn.innerText = "Update Todo";


            // Store ID
            editId = todo.id;

        });


        // =================================
        // REMOVE BUTTON
        // =================================

        const deleteButton = document.createElement("button");

        deleteButton.innerText = "Remove";

        deleteButton.classList.add("delete-btn");


        deleteButton.addEventListener("click", function() {

            // Remove todo
            todos = todos.filter(function(item) {

                return item.id !== todo.id;

            });


            // Save
            saveTodos();


            // Display
            displayTodos();

        });


        // =================================
        // ADD EVERYTHING TO LI
        // =================================

        li.appendChild(checkbox);

        li.appendChild(content);

        li.appendChild(editButton);

        li.appendChild(deleteButton);


        // Add LI to UL
        todoList.appendChild(li);

    });
}


// =====================================
// ADD / UPDATE TODO
// =====================================

addBtn.addEventListener("click", function() {

    // Get user input
    const title = titleInput.value.trim();

    const description = descriptionInput.value.trim();


    // =================================
    // CHECK TITLE
    // =================================

    if (title === "") {

        alert("Please enter a title.");

        titleInput.focus();

        return;
    }


    // =================================
    // CHECK DESCRIPTION
    // =================================

    if (description === "") {

        alert("Please enter a description.");

        descriptionInput.focus();

        return;
    }


    // =================================
    // UPDATE TODO
    // =================================

    if (editId !== null) {

        todos = todos.map(function(todo) {

            if (todo.id === editId) {

                todo.title = title;

                todo.description = description;

            }

            return todo;

        });


        // Reset edit
        editId = null;

        addBtn.innerText = "Add Todo";

    }


    // =================================
    // ADD NEW TODO
    // =================================

    else {

        const newTodo = {

            id: Date.now(),

            title: title,

            description: description,

            completed: false

        };


        todos.push(newTodo);

    }


    // Save
    saveTodos();


    // Display
    displayTodos();


    // Clear inputs
    titleInput.value = "";

    descriptionInput.value = "";

});


// =====================================
// DISPLAY WHEN PAGE OPENS
// =====================================

displayTodos();