/**
 * Get all tasks from server
 * @returns {Promise<object>} Tasks object
 */
const getAllTasks = async () => {
    const response = await fetch('/get', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    });
    return response.json();
};

/**
 * Update task status on the server
 * @param {object} task 
 */
const updateTaskStatus = async (task) => {
    const response = await fetch('/update', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(task)
    });
    console.log('Task updated successfully!');
};

/**
 * 
 */
const DisplayTaskTable = async () => {
    let promise = await your_tasks;
    createTaskTable(promise, 'daily_tasks');
    createTaskTable(promise, 'today_tasks');
}

/**
 * Create a table displaying tasks and checkboxes. Task is displayed as text and each textbox has its own unique id + has event listener to execute updating tasks when checkbox is manipulated (using the 'onchange' event)
 * @param {object} tasks JSON containing all tasks data
 * @param {string} task_type Parent ID which is set as the task type "daily_tasks" or "today_tasks"
 */
const createTaskTable = (tasks, task_type) => {
    for (const task of Object.keys(tasks[task_type])){
        // Get the parent node based on its ID
        const add_task = document.getElementById(task_type)

        // Table row configuration
        const tr = document.createElement('tr');
        add_task.append(tr);

        // Checkbox configuration
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = task;
        if (tasks[task_type][task]) checkbox.checked = true;
        checkbox.addEventListener('change', () => {
            updateTaskStatus({
                task_type: checkbox.parentElement.parentElement.id,
                task_name: checkbox.id,
                value: checkbox.checked
            });
        });

        // Table data configuration (task)
        const td1 = document.createElement('td');
        td1.innerHTML = task;
        add_task.append(td1);
        
        // Table data configuration (checkbox)
        const td2 = document.createElement('td');
        td2.append(checkbox);
        add_task.append(td2);
    }
}

const createNewTask = (new_task) => {
    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(new_task)
    });
    console.log('Task created successfully!')
}

const deleteTask = (delete_task) => {
    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(delete_task)
    });
    window.location.reload()
}

const submit = async () => {
    const task_name = document.getElementById('task_name').value;
    const task_type = document.getElementById('task_type').value;
    createNewTask({
        task_type: task_type,
        task_name: task_name
    });
    window.location.reload()
}

const DisplayTaskEditorTable = async () => {
    let promise = await your_tasks;
    createTaskEditorTable(promise, 'daily_tasks');
    createTaskEditorTable(promise, 'today_tasks');
}

const createTaskEditorTable = (tasks, task_type) => {
    for (const task of Object.keys(tasks[task_type])){
        // Get the parent node based on its ID
        const add_task = document.getElementById(task_type)

        // Table row configuration
        const tr = document.createElement('tr');
        add_task.append(tr);

        // Checkbox configuration
        const delete_button = document.createElement('button');
        delete_button.id = task;
        delete_button.innerHTML = "Delete";
        delete_button.addEventListener('click', () => {
            deleteTask({
                task_type: delete_button.parentElement.parentElement.id,
                task_name: delete_button.id
            });
        });

        // Table data configuration (task)
        const td1 = document.createElement('td');
        td1.innerHTML = task;
        add_task.append(td1);
        
        // Table data configuration (checkbox)
        const td2 = document.createElement('td');
        td2.append(delete_button);
        add_task.append(td2);
    }
}

const your_tasks = getAllTasks();
