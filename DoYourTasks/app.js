const app = require('http'); // HTTP module
const fs = require('fs'); // File-system module

/**
 * @type {string} Relative path to database
 */
const database = 'database/your_tasks.json';
/**
 * @type {string} Relative path to pages folder
 */
const pages_folder = 'pages/';

// Application
// → Create a server with the parameter request and response
// → Server will receive request from client and do some action as a response
// → Server defines the functions of the system, what it can do and no more than what it can do
// → Server will handle request and response accordingly based on the request
const server = app.createServer((req, res) => {

    updateApplication();

    // Manipulate task data
    if (req.method == 'POST'){

        const tasks = getAllTasks();

        let POST = '';

        // Store sent data (sent by POST) into variable post
        req.on('data', chunk => {
            POST += chunk;
        });

        // Run function when data is received
        req.on('end', () => {

            // Update task
            if (req.url == '/update'){
                updateTaskStatus(tasks, POST);
            }
            // Create task
            else if (req.url == '/create'){
                createNewTasks(tasks, POST);
            }
            // Delete task
            else if (req.url == '/delete'){
                deleteTask(tasks, POST);
            }

            // After manupulation by creating new task or updating a task,
            // tasks are stored back in database
            storeTasks(tasks);
        });
    }

    // Get tasks data
    else if (req.url == '/get'){
        const tasks = JSON.stringify(getAllTasks());
        return res.end(tasks);
    }

    // Get page
    else if (req.url == '/manage_tasks'){
        const content = fs.readFileSync(pages_folder + 'tasks_editor.html');
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(content)
    }
    
    else if (req.url == '/api.js'){
        const content = fs.readFileSync('api.js');
        res.writeHead(200, {'Content-Type':'text/javacript'});
        res.write(content);
    }

    // (Default) Get main page
    else {
        const content = fs.readFileSync(pages_folder + 'index.html');
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(content);
    }

    return res.end();
});
// → Server will listen to http://localhost:8080
server.listen(8080);



// Tasks Methods
// → Methods created for the system
// → Methods documentations is done using /** */ format
/**
 * Get all tasks from database (JSON) and return as a Tasks object
 * @return {YourTasks} Tasks
 */
const getAllTasks = () => {
    // Read file synchronously to avoid error when req are high
    const json_string = fs.readFileSync(database);
    const parse = JSON.parse(json_string);
    return new YourTasks (parse.daily_tasks, parse.today_tasks, parse.last_updated);
};

/**
 * Store Tasks object as JSON in database
 * @param {YourTasks} tasks 
 */
 const storeTasks = (tasks) => {
    fs.writeFileSync(database, JSON.stringify(tasks), {flag: "w"})
}

/**
 * Create new task in Tasks object
 * @param {YourTasks} tasks Tasks object
 * @param {string} new_task Raw POST data
 */
const createNewTasks = (tasks, new_task) => {
    const parsed = JSON.parse(new_task);
    const {task_type, task_name} = parsed;
    Object.assign(tasks[task_type], new Task(task_name))
};

/**
 * Delete specified task in Tasks object
 * @param {YourTasks} tasks Tasks object
 * @param {string} delete_task Raw POST data
 */
const deleteTask = (tasks, delete_task) => {
    const delete_t = JSON.parse(delete_task);
    const {task_type, task_name} = delete_t;
    delete tasks[task_type][task_name];
}

/**
 * Update status of specified task in Tasks object
 * @param {YourTasks} tasks Tasks object
 * @param {string} updated_task Raw POST data
 */
const updateTaskStatus = (tasks, updated_task) => {
    // Parse POST data
    const update = JSON.parse(updated_task);
    const {task_type, task_name, value} = update;
    // Invert the current status of the task
    tasks[task_type][task_name] = value;
}

/**
 * Check for updates before running the application
 */
const updateApplication = () => {
    const tasks = getAllTasks();
    // Check if date has changed (when a new day, certain process will occur, such as resetting daily tasks to 'not done')
    dailyUpdate(tasks);
}

/**
 * Update the app when last updated date is not same as the current date
 * @param {YourTasks} tasks 
 */
const dailyUpdate = (tasks) => {
    const {last_updated} = tasks;
    // Run some functions if it is a new day
    if (!dateIsSync(last_updated)){
        const {daily_tasks, today_tasks} = tasks;
        resetDailyTasks(daily_tasks);
        resetTodayTasks(today_tasks);
        updateLastUpdate(tasks);
        storeTasks(tasks);
    }
}

/**
 * Delete all today tasks in Tasks object
 * @param {YourTasks.today_tasks} today_tasks Today tasks in Tasks object
 */
const resetTodayTasks = (today_tasks) => {
    for (const task_name of Object.keys(today_tasks)){
        delete today_tasks[task_name];
    }
}

/**
 * Set all daily tasks status in Tasks object to false 
 * @param {YourTasks.daily_tasks} daily_tasks Daily tasks in Tasks object
 */
const resetDailyTasks = (daily_tasks) => {
    for (const task_name of Object.keys(daily_tasks)){
        daily_tasks[task_name] = false;
    }
}

/**
 * Check if date in Tasks object is synchronized with the current date
 * @param {YourTasks.last_updated|number} last_updated Date in Tasks object
 * @returns {boolean}
 */
const dateIsSync = (last_updated) => {
    return last_updated == new Date().getDate();
}

/**
 * Set the date in Tasks object to the current date
 * @param {YourTasks} tasks Tasks object
 */
 const updateLastUpdate = (tasks) => {
    tasks.last_updated = new Date().getDate();
 }


class YourTasks {
    /**
     * 
     * @param {Task} daily_tasks Task collection
     * @param {Task} today_tasks Task collection
     * @param {number} last_updated Last updated date (DD)
     */
    constructor (daily_tasks, today_tasks, last_updated){
        this.daily_tasks = daily_tasks;
        this.today_tasks = today_tasks;
        this.last_updated = last_updated;
    };
};

class Task {
    /**
     * 
     * @param {string} task_name Name of the task
     */
    constructor (task_name){
        this[`${task_name}`] = false;
    };
}