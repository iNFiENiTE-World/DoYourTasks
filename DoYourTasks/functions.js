/* [----FUNCTIONS INVOKED BY JS FILES-----------------------------------------------] */

/**
 * Get all tasks from the server
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
};

/**
 * Push new task to the server
 * @param {object} new_task New task
 */
const createNewTask = async (new_task) => {
    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(new_task)
    });
};

/**
 * Deletes task on the server
 * @param {object} delete_task 
 */
const deleteTask = async (delete_task) => {
    await fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(delete_task)
    });
    window.location.reload()
};

/**
 * Create a table displaying tasks and checkboxes. Task is displayed as text and each textbox has its own unique id + has event listener to execute updating tasks when checkbox is manipulated (using the 'onchange' event)
 * @param {object} tasks JSON containing all tasks data
 * @param {string} task_type Parent ID which is set as the task type "daily_tasks" or "today_tasks"
 */
const createTaskTable = (tasks, task_type, td_content_config) => {
    for (const task of Object.keys(tasks[task_type])) {
        // Get the parent node based on its ID
        const target_elem = document.getElementById(task_type)
        // Table row configuration
        const tr = tableRowConfig();
        // Checkbox configuration
        const td_content = td_content_config(task, Boolean(tasks[task_type][task]));
        // Table data configuration (task)
        const td1 = tableDataConfig(task)
        // Table data configuration (checkbox)
        const td2 = tableDataConfig();

        // Implement DOM manipulation
        target_elem.append(tr);
        target_elem.append(td1);
        td2.append(td_content);
        target_elem.append(td2);
    };
};

/**
 * Configure the tr element of table
 */
const tableRowConfig = () => {
    return document.createElement('tr');
};

/**
 * Configure the input[checkbox] element of table
 * @param {string} task Task name
 * @param {boolean} is_ticked 
 */
const checkboxConfig = (task, is_ticked) => {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = task;
    if (is_ticked) {
        checkbox.checked = true;
    }
    checkbox.addEventListener('change', () => {
        updateTaskStatus({
            task_type: checkbox.parentElement.parentElement.id,
            task_name: checkbox.id,
            value: checkbox.checked
        });
    });
    return checkbox;
};

/**
 * Configure the button element of table
 * @param {string} task Task name
 */
const buttonConfig = (task) => {
    const button = document.createElement('button');
    button.id = task;
    button.innerHTML = "Delete";
    button.addEventListener('click', () => {
        deleteTask({
            task_type: button.parentElement.parentElement.id,
            task_name: button.id
        });
    });
    return button;
}

/**
 * Configure the td element of table
 * @param {string} task Task name (if any), default: empty string
 */
const tableDataConfig = (task="") => {
    const td = document.createElement('td');
    td.innerHTML = task;
    return td;
};

/* [----FUNCTIONS INVOKED BY HTML FILES-----------------------------------------------] */

/**
 * Submit the task registration form to the server. Page is reloaded to reflect changes to the new task. This function is to be assigned to a button element to response for submit event properly.
 */
const RegisterNewTask = async () => {
    const task_name = document.getElementById('task_name').value;
    const task_type = document.getElementById('task_type').value;
    createNewTask({
        task_type: task_type,
        task_name: task_name
    });
    window.location.reload()
}

/**
 * Display task table in HTML page. This function should be assigned to a 'body' element under 'onload' property, so it can produce expected output when run.
 */
 const DisplayTaskTable = async () => {
    let promise = await your_tasks;
    createTaskTable(promise, 'daily_tasks', checkboxConfig);
    createTaskTable(promise, 'today_tasks', checkboxConfig);
}

/**
 * Display task editor/manager table in HTML page. This function should be assigned to a 'body' element under 'onload' property, so it can produce expected output when run.
 */
const DisplayTaskEditorTable = async () => {
    let promise = await your_tasks;
    createTaskTable(promise, 'daily_tasks', buttonConfig);
    createTaskTable(promise, 'today_tasks', buttonConfig);
}

const your_tasks = getAllTasks();