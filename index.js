console.log("hello");

let todos=[];
let todoDataList = document.getElementById('todo-list');
let saveButton = document.getElementById('save-todo');
let todoInputBar = document.getElementById('todo-input-bar');

todoInputBar.addEventListener('keyup',()=>{
    let x =todoInputBar.value;
    if(x.length ==0){
        if(saveButton.classList.contains('disabled')){
            return;
        }
        saveButton.classList.add('disabled');
    }
    else if(saveButton.classList.contains('disabled')){
        saveButton.classList.remove('disabled');
    }
});

saveButton.addEventListener('click',function getTextAndAddtodo(){
    let x=todoInputBar.value;
    if(x.length==0){
        return;
    }

    let obj={text: x,status:"In Progress"};
    todos.push(obj);
    addTodo(obj,todos.length);
    todoInputBar.value='';
})

function removeRow(event){
    
    let x =Number(event.target.getAttribute("todo-idx"));
    
    todoDataList.innerHTML='';
    todos.splice(x,1);
    todos.forEach((element,idx)=>{
        addTodo(element,idx+1);
    })
    
}

function finishedHandler(event){
    let x = Number(event.target.getAttribute("todo-idx"));
    
    todoDataList.innerHTML='';

    if(todos[x].status=="Finished"){
        todos[x].status="In progress";
    }
    else{
        todos[x].status="Finished";
    }
    
    todos.sort((a,b)=>{
        if(a.status=="Finished"){
            return 1;
        }
        return -1;
    })
    console.log(todos);
    todos.forEach((element,idx)=>{
        addTodo(element,idx+1);
    })
    
}

function addTodo(obj,count){
    let rowDiv = document.createElement('div');
    let todoItem = document.createElement('div');
    let todoNumber = document.createElement('div');
    let todoDetail = document.createElement('div');
    let todoStatus = document.createElement('div');
    let todoActions = document.createElement('div');
    let deleteButton = document.createElement('button');
    let finishedButton = document.createElement('button');
    let hr = document.createElement('hr');

    finishedButton.setAttribute("todo-idx",count-1);
    finishedButton.onclick=finishedHandler;

    deleteButton.setAttribute("todo-idx",count-1);
    deleteButton.onclick=removeRow;
    todoNumber.textContent=`${count}.`;
    todoDetail.textContent=obj.text; //setting todo text after pressing save
    todoStatus.textContent=`${obj.status}`;
    deleteButton.textContent="Delete";
    finishedButton.textContent="Finished";

    

    //adding class
    todoItem.classList.add("todo-item" ,"d-flex","flex-row" ,"justify-content-between" ,"align-items-center" , "mb-3");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail" ,"text-muted");
    todoStatus.classList.add("todo-status" , "text-primary");
    if(obj.status=="Finished"){
        todoStatus.classList.remove("text-primary");
        todoStatus.classList.add("text-success");
        finishedButton.textContent="undo";
    }
    todoActions.classList.add("todo-actions" ,"d-flex" , "justify-content-start" ,"gap-2");
    deleteButton.classList.add("btn", "btn-danger");
    finishedButton.classList.add("btn" , "btn-success");
    rowDiv.classList.add('row');

    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);
    

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);

    
}

