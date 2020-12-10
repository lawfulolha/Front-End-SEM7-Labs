
let idTask = 0;
let tasks = [];
window.onload = () => {
    document.getElementById('task-title-input').oninput = handleChange;
    document.getElementById('task-date-input').oninput = handleChange;
    document.getElementById('add-task-button').onclick =    handleSubmit ;
}

function isValid(taskTitle, dueDate) {
    return  taskTitle.length > 0 &&
        Date.parse(dueDate) >= Date.now()
}

function handleChange() {
    const taskTitle = document.getElementById('task-title-input').value;
    const dueDate = document.getElementById('task-date-input').value;
    const addTaskButton = document.getElementById('add-task-button');
    addTaskButton.disabled = !isValid(taskTitle, dueDate);
}

function handleDelete(id)
{  const space = document.getElementById('task-' + id);

    let element = document.getElementById('task-' + id);
    space.parentNode.removeChild(element);

    tasks = tasks.filter(x => x.id !== id);
    handleChange();
}

function createTaskComponent(task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.id = 'task-' + task.id;

    const taskTitle = document.createElement('span');
    taskTitle.className = 'task-title';
    taskTitle.innerHTML = task.taskTitle;

    const taskDueDate = document.createElement('span');
    taskDueDate.className = 'task-date';
    taskDueDate.innerHTML = (task.dueDate).toString();

    const taskDaysLeft = document.createElement('span');
    taskDaysLeft.className = 'task-days-left';
    taskDaysLeft.innerHTML = (task.daysLeft).toString();

    const deleteTask = document.createElement('button');
    deleteTask.type = 'button';
    deleteTask.className = 'delete-task-button';
    deleteTask.value = 'X';
    deleteTask.onclick = () => handleDelete(task.id);

    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDueDate);
    taskCard.appendChild(taskDaysLeft);
    taskCard.appendChild(deleteTask);

    document.getElementById("tasks-list").appendChild(taskCard);
}

async function handleSubmit(){
    tasks.push({
        id: idTask++,
        taskTitle: document.getElementById('task-title-input').value,
            dueDate: document.getElementById('task-date-input').value,
            daysLeft: Math.ceil((Date.parse(document.getElementById('task-date-input').value)-(new Date()).getTime())/(1000*60*60*24)),
    });console.log(tasks[tasks.length-1]);
    createTaskComponent(tasks[tasks.length-1]);
    const response = await fetch('https://server.com/api/post', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            id: idTask++,
            taskTitle: document.getElementById('task-title-input').value,
            dueDate: document.getElementById('task-date-input').value,
            daysLeft: Math.ceil((Date.parse(document.getElementById('task-date-input').value)-(new Date()).getTime())/(1000*60*60*24)),
        })
    });

    if(response.ok) {
        alert('Added to server');
        console.log(await response.json());
    }
    else {
        alert(response.status);
    }
}

const app = document.querySelector('.app');
const title = document.createElement('div');


