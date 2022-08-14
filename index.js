const tasks = [];
//cuenta regresiva 
let time = 0;
//ejecutar un codigo cada determinado tiempo
let timer = null;
//5 min de descanso
let timerBreak = null; 
//tarea actual ejecutada
let current = null; 

//referencias de elementos html
const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName");

renderTime();
renderTasks();

//evento en click agregar tarea
form.addEventListener("submit", e => {
//anula el envio 
    e.preventDefault();
    if(itTask.value != " "){
    createTask(itTask.value);
    itTask.value = " ";
    renderTasks();
    }
})

//math.random genera valor numerico entre 0 y 1
//slice quita caracteres iniciales

function createTask(value){
    const newTask = {
        id: (Math.random()* 100).toString(36).slice(3),//id dinamico
        title: value,
        completed: false,
    };

    tasks.unshift(newTask);

}

//tomar cada tarea y generar la etiqueta html
function renderTasks(){
//iterar sobre cada uno de los elementos del arreglo
//y para cada iteracion una operacion especial
const html = tasks.map(task => {
    return `
<div class="task">
<div class="completed">${task.completed
 ? `<span class="done"> Done </span>`
 : `<button class="start-button" data-id="${task.id}"> Start </button>`}</div>
<div class="title">${task.title}</div>
</div>
`;
});

const tasksContainer = document.querySelector("#tasks");
tasksContainer.innerHTML = html.join("");

const startButtons = document.querySelectorAll(".task, .start-button");

startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if(!timer){
            const id = button.getAttribute("data-id");
            startButtonHandler(id);
            button.textContent = "In progress..";

        }
    });
});
}

function startButtonHandler(id) {
    time = 25;
    current = id;
    const taskIndex = tasks.findIndex((task) => task.id == id);
    
    taskName.textContent = tasks[ taskIndex].title;
    renderTime();
    timer = setInterval(() => {
        timerHandler(id);
    }, 1000);

}

function timerHandler(id) {
    time--;
    renderTime()

    if(time == 0){
        clearInterval(timer);
       markCompleted(id);
       timer = null;
        renderTasks();
        startBreak();
    }
}

function startBreak(){
    time = 5;
    taskName.textContent = "break";
    renderTime();
    timerBreak = setInterval(() => {
        timerBreakHandler();
    }, 1000);
}

function timerBreakHandler(){
    time--;
    renderTime();

    if(time == 0){
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = "";
        renderTasks();
    
    }

}

function renderTime(){
const timeDiv = document.querySelector("#time #value");
const minutes = parseInt(time / 60);
const seconds = parseInt(time % 60);

timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
}

function markCompleted(id){
    const taskIndex = tasks.findIndex((task) => task.id == id);
    tasks[taskIndex].completed = true;
}



