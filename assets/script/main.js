// inputs
let taskInput = document.querySelector("#taskInput")
let dateInput = document.querySelector("#dateInput")
let timeInput = document.querySelector("#timeInput")

// display
let taskBody = document.querySelector("#taskBody")
let noTasksDisplay = document.querySelector("#noTasksDisplay")

// buttons
let addTaskBtn = document.querySelector("#addTaskBtn")


let tasks = JSON.parse(localStorage.getItem("tasksEntries"))

console.log(tasks)


let noTsksAdd = ""

if ( tasks == null ) {
    noTsksAdd = `<tr><td id="nada" colspan="4">There are no tasks.</td></tr>`
} else {
    tasks.forEach((x) => {
        noTsksAdd += 
            `<tr><td><input type="checkbox"></td><td>${x.taskInptVal}</td><td>${x.dateInptVal}</td><td>${x.timeInptVal}</td><td><input type="button" id="removeTaskBtn" value="Remove Task"></td></tr>`
    })
}

taskBody.innerHTML = noTsksAdd


let addTask = () => {
    if ( tasks == null) {
        tasks = []
    }

    let n = localStorage.getItem("idVal")
    n = ++n

    let task = {
        taskInptVal:  taskInput.value,
        dateInptVal: dateInput.value,
        timeInptVal: timeInput.value,
        id: n
    }

    tasks.push(task)
    console.log(tasks)

    localStorage.setItem("tasksEntries", JSON.stringify(tasks))
    localStorage.setItem("idVal", n)

    if (tasks.length == 1) {
        let nada = document.querySelector("#nada")
        nada.style.display = "none"
    } 

    let newTask = document.createElement("tr")
    newTask.innerHTML = `<td><input type="checkbox"></td>
                        <td>${task.taskInptVal}</td>
                        <td>${task.dateInptVal}</td>
                        <td>${task.timeInptVal}</td>
                        <td><input type="button" id="removeTaskBtn" value="Remove Task"></td>`

    taskBody.appendChild(newTask)
    let removeTaskBtn = document.querySelector("#removeTaskBtn")
    removeTaskBtn.addEventListener("click", removeTask)
}

let removeTask = () => {
    let tr = event.target.parentNode.parentNode
    let rowId = tr.id

    tr.remove()

    tasks = tasks.filter((x) => x.id != rowId)
    console.log(tasks)

    localStorage.setItem("tasks", JSON.stringify(tasks))

    // if ( tasksEntries == 0 ) {

    // }
}

addTaskBtn.addEventListener("click", addTask)