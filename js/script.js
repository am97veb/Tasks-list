{
    let tasks = [

    ];

    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();

    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDoneAll = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: true },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideDoneTask = () => {
        tasks.forEach((tasks, taskIndex) => {
            if (tasks[taskIndex], done = true) {
                hideDoneTask = !hideDoneTask;
            };
            render();
        });
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderButtons = () => {
        const newButtons = document.querySelector(".js-newButtons");

        for (task of tasks) {
            if (tasks.length !== 0) {
                newButtons.innerHTML = `
                <div class="newButtons">
                    <button class="newButton js-showDoneTasks ">${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone </button>
                    <button class="newButton js-doneAllTasks" ${task.done ? "disabled" : ""}>Ukończ wszystkie</button>
                </div>
            `;
                return;
            };
            newButtons.innerHTML = "";
        };
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item ${hideDoneTask ? "hideItem" : ""}">
                    <button class="listButton js-done">${task.done ? "✔" : ""}</button>
                    <p class="listText${task.done ? " list__item--done" : ""}">${task.content}<p>
                    <button class="listButton--remove js-remove">🗑</button>
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const bindButtonsEvents = () => {
        const showDoneTasks = document.querySelector(".js-showDoneTasks");

        if (showDoneTasks !== null) {
            tasks.forEach((tasks, taskIndex) => {
                showDoneTasks.addEventListener("click", () => {
                    toggleHideDoneTask(taskIndex);
                });
            });
        };

        const doneAllTasks = document.querySelector(".js-doneAllTasks");

        if (doneAllTasks !== null) {
            tasks.forEach((tasks, taskIndex) => {
                doneAllTasks.addEventListener("click", () => {
                    toggleTaskDoneAll(taskIndex);
                });
            });
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();


        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};