const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];


if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}


form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);


function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask);

    saveToLocalStorage();

    renderTask(newTask);


    taskInput.value = '';
    taskInput.focus();

}


function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li');
    const id = Number(parentNode.id);

    tasks = tasks.filter(task => task.id !== id);

    parentNode.remove();
    saveToLocalStorage();
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('.list-group-item');
    const id = Number(parentNode.id);
    const task = tasks.find(task => task.id === id);

    task.done = !task.done; 

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done', task.done); 

    saveToLocalStorage();
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));  
}

function renderTask(task){
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item" style="border-radius: 30px; margin-top: 10px;">
        <span class="${cssClass}">${task.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action" style="background-color: transparent;">
                <img src="./img/tick.svg" alt="Done" width="18" height="18" style="border-radius: 30px;">
            </button>
            <button type="button" data-action="delete" class="btn-action" style="background-color: transparent;">
                <img src="./img/cross.svg" alt="Delete" width="18" height="18" style="border-radius: 30px;">
            </button>
        </div>
    </li>`;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}