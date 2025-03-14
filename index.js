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

function editHandler(event){
     
    let idx = Number(event.target.getAttribute("todo-idx"));

    let detailDiv = document.querySelector(`div[todo-idx="${idx}"]`);
    let inputDiv = document.querySelector(`input[todo-idx="${idx}"]`);
    detailDiv.style.display="none";
    inputDiv.type="text";
    inputDiv.value=detailDiv.textContent;

}

function saveEditedTodo(event){

    let idx = Number(event.target.getAttribute("todo-idx"));

    let detailDiv = document.querySelector(`div[todo-idx="${idx}"]`);
    let inputDiv = document.querySelector(`input[todo-idx="${idx}"]`);

    if(event.keyCode == 13){
        detailDiv.textContent=inputDiv.value;
        inputDiv.value='';
        inputDiv.type="hidden";
        detailDiv.style.display="block";
        todos[idx].text=detailDiv.textContent;
    }
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
    let editButton = document.createElement('button');
    let hiddenInput = document.createElement('input');
    let hr = document.createElement('hr');

    finishedButton.setAttribute("todo-idx",count-1);
    finishedButton.onclick=finishedHandler;

    deleteButton.setAttribute("todo-idx",count-1);
    deleteButton.onclick=removeRow;

    editButton.setAttribute("todo-idx",count-1);
    editButton.onclick=editHandler;

    todoDetail.setAttribute("todo-idx",count-1);
    hiddenInput.setAttribute("todo-idx",count-1);
    hiddenInput.addEventListener("keypress", saveEditedTodo);

    todoNumber.textContent=`${count}.`;
    todoDetail.textContent=obj.text; //setting todo text after pressing save
    todoStatus.textContent=`${obj.status}`;
    deleteButton.textContent="Delete";
    finishedButton.textContent="Finished";
    editButton.textContent="Edit";

    

    //adding class
    todoItem.classList.add("todo-item" ,"d-flex","flex-row" ,"justify-content-between" ,"align-items-center" , "mb-3");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail" ,"text-muted");
    hiddenInput.type="hidden";
    hiddenInput.classList.add("form-control","todo-detail" ,"text-muted");
    todoStatus.classList.add("todo-status" , "text-primary");
    if(obj.status=="Finished"){
        todoStatus.classList.remove("text-primary");
        todoStatus.classList.add("text-success");
        finishedButton.textContent="undo";
    }
    todoActions.classList.add("todo-actions" ,"d-flex" , "justify-content-start" ,"gap-2");
    deleteButton.classList.add("btn", "btn-danger");
    finishedButton.classList.add("btn" , "btn-success");
    editButton.classList.add("btn","btn-warning");
    rowDiv.classList.add('row');

    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);
    todoActions.appendChild(editButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);
    

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);

    
}

