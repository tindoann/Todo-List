// Declare global variables

let addButton = document.getElementById('addButton');
let addInput = document.getElementById('itemInput');
let todoList = document.getElementById('todoList');
let listArray = [];

function listItemObj(content, status) {
    content = 0;
    status = 'incomplete';
}
function changeToComp() {
    let parent = this.parentElement;
    console.log('Changed to complete');
    parent.className = 'uncompleted well';
    this.innerText = 'Incomplete';
    this.removeEventListener('click',changeToComp);
    this.addEventListener('click',changeToInComp);
    changeListArray(parent.firstChild.innerText,'complete');

}

  function changeToInComp() {
    let parent = this.parentElement;
    console.log('Changed to incomplete');
    parent.className = 'completed well';
    this.innerText = 'Complete';
    this.removeEventListener('click',changeToInComp);
    this.addEventListener('click',changeToComp);

    changeListArray(parent.firstChild.innerText,'incomplete');

}

  function removeItem() {
    let parent = this.parentElement.parentElement;
    parent.removeChild(this.parentElement);

    let data = this.parentElement.firstChild.innerText;
    for(let i=0; i < listArray.length; i++){

        if(listArray[i].content == data){
            listArray.splice(i,1);
            refreshLocal();
            break;
        }
    }


}

//function to change the todo list array
function changeListArray(data,status) {

    for(let i=0; i < listArray.length; i++){

        if(listArray[i].content == data){
            listArray[i].status = status;
            refreshLocal();
            break;
        }
    }
}

//function to chage the dom of the list of todo list
    function createItemDom(text,status) {

    let listItem = document.createElement('li');

    let itemLabel = document.createElement('label');

    let itemCompBtn = document.createElement('button');

    let itemIncompBtn = document.createElement('button');

    listItem.className = (status == 'incomplete')?'completed well':'uncompleted well';

    itemLabel.innerText = text;
    itemCompBtn.className = 'btn btn-success';
    itemCompBtn.innerText = (status == 'incomplete')?'Complete':'Incomplete';
    if(status == 'incomplete'){
        itemCompBtn.addEventListener('click',changeToComp);
    }else{
        itemCompBtn.addEventListener('click',changeToInComp);
    }


    itemIncompBtn.className = 'btn btn-danger';
    itemIncompBtn.innerText = 'Delete';
    itemIncompBtn.addEventListener('click',removeItem);

    listItem.appendChild(itemLabel);
    listItem.appendChild(itemCompBtn);
    listItem.appendChild(itemIncompBtn);

    return listItem;
}

  function refreshLocal() {
    let todos = listArray;
    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(todos));
}

  function addToList() {
    let newItem = new listItemObj();
    newItem.content = addInput.value;
    listArray.push(newItem);
    //add to the local storage
    refreshLocal();
    //change the dom
    let item = createItemDom(addInput.value,'incomplete');
    todoList.appendChild(item);
    addInput.value = '';
}

//function to clear todo list array
  function clearList() {
    listArray = [];
    localStorage.removeItem('todoList');
    todoList.innerHTML = '';

}

  window.onload = function(){
    let list = localStorage.getItem('todoList');

    if (list != null) {
        todos = JSON.parse(list);
        listArray = todos;

        for(let i=0; i<listArray.length;i++){
            let data = listArray[i].content;

            let item = createItemDom(data,listArray[i].status);
            todoList.appendChild(item);
        }

    }

};
//add an event binder to the button
addButton.addEventListener('click',addToList);
clearButton.addEventListener('click',clearList);