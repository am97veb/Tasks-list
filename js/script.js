{
    let tasks = [
        
    ];

    let hideDoneTask = false;

    let buttons = [
        {}
    ];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();

    };

    const addNewButtons = (newButtons) => {
        buttons.push({
            content: newButtons,
        });

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
        // tasks = [
        //     ...tasks.slice(0, taskIndex),
        //     {...tasks[taskIndex], done: true},
        //     ...tasks.slice(taskIndex + 1),
        // ];

        tasks = tasks.map(tasks[taskIndex].done => !tasks[taskIndex].done;);
        
        // tasks[taskIndex].done = !tasks[taskIndex].done;

        render();
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

    // const toggleAllTaskDone = () => {
    
    // };



    const renderButtons = (htmlString) => {

        if (htmlString !== "") {
            newButtons = `
                <li>
                    <button class="js-showDoneTasks">ukończone</button>
                    <button class="js-doneTaskAll">ukończ wszystkie</button>
                </li>
            `;
        };

        
        document.querySelector(".js-newButtons").innerHTML = newButtons;
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item">
                    <button class="listButton js-done">${task.done ? "✔" : ""}</button>
                    <p class="listText${task.done ? " list__item--done" : ""}">${task.content}<p>
                    <button class="listButton--remove js-remove">🗑</button>
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };


    // const bindButtonsEvents = () => {
    
    // };


    const render = () => {
        renderTasks();
        renderButtons();
        // toggleAllTaskDone();

        bindEvents();
        // bindButtonsEvents();
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