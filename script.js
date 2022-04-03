document.addEventListener('DOMContentLoaded', function(){
    
    load_task();
    document.querySelector('#create1').addEventListener('click', function () {
        create_inp();
    })
})

function load_task(){
    document.getElementById('Add_to-do').style.display='none';
    document.getElementById('edit_to-do').style.display = 'none';
    document.getElementById('task-detail').style.display = 'none';
    
    var info = localStorage.getItem("todo");
    var parsedobj =[];
    if (info !== null) {
        parsedobj = JSON.parse(info);
    }
   
    console.log(parsedobj.length, parsedobj);
    for(let i=0;i<parsedobj.length;i++){
        console.log(parsedobj[i]);
        if(parsedobj[i]!==null){
            
            const task = document.createElement('div');
            task.className = 'tasks';
            task.innerHTML = `<span class='list_name'>${parsedobj[i].Task}</span>
                            <span class='list_type'>${parsedobj[i].type}</span>
                            <span class='list_time'>${parsedobj[i].CreatedAt}</span>`;
            if (!parsedobj[i].completed) {  
                document.querySelector('.not_comp').appendChild(task);
            }   
            else{ 
                document.querySelector('.comp').appendChild(task);  
            }
            task.addEventListener('click', () => task_details(i));
            console.log(parsedobj[i].type);
        }
    }
}


function create_inp(){
    document.getElementById('Add_to-do').style.display = 'block';
    document.getElementById('task-detail').style.display = 'none';
    document.getElementById('edit_to-do').style.display = 'none';

    let to_do_arr = [];
    let task_dic = {
        "Task": '',
        "CreatedAt": '',
        "Details": "",
        "type": "",
        "completed": false,
        "Deadline": '',
        'Date': "",
        'Day': ""
    };

    const currtime = new Date();
    var time = currtime.toLocaleString('en-US', { hour: 'numeric', minute: "numeric", hour12: false })
    console.log(time);
    var date = new Date();
    let todo = localStorage.getItem("todo");
    if (todo !== null) {
        to_do_arr = JSON.parse(todo);
    }
    console.log(document.querySelector('#submit'))
    console.log(document.querySelectorAll(".add-task"))
    document.querySelector('#submit').addEventListener('click', function () {
        const task = document.querySelectorAll(".add-task");
        const detail = document.querySelector('#add_details');
        console.log('ls',to_do_arr,to_do_arr.length);
        task_dic = {"Task": task[0].value,
                    "CreatedAt": time,
                    "Date": date.toISOString().split('T')[0],
                    "Day": week_day(currtime.getDay()),
                    "completed": false, 
                    "Deadline": task[1].value,
                    "Details": detail.value,
                    "type": task[2].value
                    }
        console.log(task_dic, to_do_arr.length);
        to_do_arr.push(task_dic);
        localStorage.setItem("todo", JSON.stringify(to_do_arr));
        task_details(to_do_arr.length-1)
        location.reload();
        
        
        return false;
    })
    
}



function task_details(i){
    document.getElementById('Add_to-do').style.display = 'none';
    document.getElementById('task-detail').style.display = 'block';
    document.getElementById('edit_to-do').style.display = 'none';

    document.querySelector('.button-set').style.display = 'flex';
    
    var info = localStorage.getItem("todo");
    var parsedobj = [];
    if (info == null) {
        parsedobj = [];
    }
    else {
        parsedobj = JSON.parse(info);
    }
    console.log(parsedobj)
    console.log(i, parsedobj[i].Deadline);
    var deadline = `${parsedobj[i].Deadline.split('T')[0]} ${parsedobj[i].Deadline.split('T')[1]}`;
    console.log(deadline);
    if (parsedobj[i].Deadline==""){
        deadline="None"
    }
    const task = document.querySelector(".task")
    task.innerHTML = `<p class='task_name'><b>${parsedobj[i].Task}</b></p>
                    <p class='task_deadline'><span class="task_dets">Deadline: </span>${deadline}</p>
                    <p class='task_details'>${(parsedobj[i].Details !== undefined) ? parsedobj[i].Details : ""}</p>
                    <p class='task_type'>${parsedobj[i].type}</p>
                    <p class='task_time'>${parsedobj[i].CreatedAt}</p>
                    <p class='task_time'>${parsedobj[i].Date}</p>
                    <p class='task_time'>${parsedobj[i].Day}</p>`;
    document.querySelector('#task-detail').appendChild(task);
    
    const btton = document.querySelector('.Done');
    btton.textContent = !(parsedobj[i].completed) ? "Mark as Done" : "Restore Task";
    
    

    if(parsedobj[i].completed){
        document.querySelector(".bttn_edit").style.display="none";
    }
   
    document.querySelector(".Done").addEventListener('click', () => {
        task_completed(i);
    });
    document.querySelector(".bttn_edit").addEventListener('click', () => {
        edit_task(i);
    });
    document.querySelector(".bttn_delete").addEventListener('click', () => {
        delete_task(i);
    });
}


function week_day(n){
    var day = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return day[n];
}

function edit_task(i){
    document.getElementById('Add_to-do').style.display = 'none';
    document.getElementById('task-detail').style.display = 'none';
    document.getElementById('edit_to-do').style.display = 'block';

    console.log(document.querySelectorAll('.edit_task'));
    var task=JSON.parse(localStorage.todo)
    const edit_task = document.querySelectorAll('.edit_task');
    edit_task[0].value = task[i].Task;
    edit_task[3].value = task[i].type;
    edit_task[1].value = task[i].Details;
    edit_task[2].value = task[i].Deadline;
    document.querySelector("#submit1").addEventListener('click', () => {
        task[i].Task = edit_task[0].value;
        task[i].type = edit_task[3].value;
        task[i].Details = edit_task[1].value;
        task[i].Deadline = edit_task[2].value;
        localStorage.setItem("todo",JSON.stringify(task));
        console.log(task);
        task_details(i);
    });
    
}

function delete_task(i){
    var task = JSON.parse(localStorage.todo)
    //console.log(task, "//", task.length, task[0].Task)
    delete task[i];
    localStorage.setItem("todo", JSON.stringify(task));
    location.reload();
    load_task();
}

function task_completed(i) {
    var info = localStorage.getItem("todo");
    const clsname = document.querySelector(".Done");
    var parsedobj = [];
    if (info !== null) {
        parsedobj = JSON.parse(info);
    }
    if(!parsedobj[i].completed){
        parsedobj[i].completed = true;
        clsname.textContent =  "Restore Task"
        document.querySelector(".bttn_edit").style.display="none";
    }
    else{
        parsedobj[i].completed = false;
        clsname.textContent = "Mark as Done" ;
        document.querySelector(".bttn_edit").style.display = "block";
    }
    console.log(parsedobj[i]);
    localStorage.setItem('todo', JSON.stringify(parsedobj));
    location.reload();
    load_task();
}