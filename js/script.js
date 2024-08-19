{
    let tasks = [
        {content: "umyć samochód"},
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
        if (someTaskDone(tasks)) {
        hideDoneTask = !hideDoneTask;
        };
        render();
    };

    const isAllTaskDone = (tasks) => tasks.every(({ done }) => done);

    const someTaskDone = (tasks) => tasks.some(({done}) => done);

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
        const newTaskButtons = document.querySelector(".js-newTaskButtons");

            if (tasks.length !== 0) {
                newTaskButtons.innerHTML = `
                <div class="newTaskButtons">
                    <button class="doneTaskButton js-showDoneTasks ">${hideDoneTask && someTaskDone(tasks) ? "Pokaż" : "Ukryj"} ukończone </button>
                    <button class="doneTaskButton js-doneAllTasks" ${isAllTaskDone(tasks) ? "disabled" : ""}>Ukończ wszystkie</button>
                </div>
            `;
            } else (newTaskButtons.innerHTML = "");
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item ${hideDoneTask && task.done ? "list__item--hidden" : ""}">
                    <button class="listButton js-done">${task.done ? "✔" : ""}</button>
                    <p class="listText${task.done ? " list__item--done" : ""}">${task.content}<p>
                    <button class="listButton--remove js-remove">🗑</button>
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const bindButtonsEvents = (taskIndex) => {
        const showDoneTasks = document.querySelector(".js-showDoneTasks");

        if (showDoneTasks !== null) {
            showDoneTasks.addEventListener("click", () => {
                toggleHideDoneTask();
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