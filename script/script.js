
//declarations section. Declaring all the required objects
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList")
const clearAllbtn = document.querySelector(".footer button");

//This function enables the add button beside the input text field once the user enters any data
inputBox.onkeyup = () => {
    let userData = inputBox.value; //Retrieving value from the input box
    if (userData.trim() != 0) {
        addBtn.classList.add("active"); //enabling active add button 
    } else {

        addBtn.classList.remove("active"); //disabling the add button if there is no data in the text box
    }
}



showTasks(); //Retrieves data from localStorage and shows it in list if there are any.

//function to add data in LocalStorage of the browser.
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = []; //ccreating an empty array if the localStorage is empty
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove("active");//disabling add button once the todo is added so that blank/null todos are not entered.
}


//function to show list of tasks that are present in LocalStorage object
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");

    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }

    const pendingTasks = document.querySelector(".pendingTasks");
    pendingTasks.textContent = listArr.length; //To show the number of pending tasks left 

    if (listArr.length > 0) {
        clearAllbtn.classList.add("active"); //enabling clear button if there are tasks listed
    }
    else {
        clearAllbtn.classList.remove("active"); //disabling clear button if there are no active todo lists
    }


    let newLiTag = '';

    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick = deleteTask(${index}); ><i class="fas fa-trash"></i></span></li>`; //adding tasks to html 
    });

    todoList.innerHTML = newLiTag;

    inputBox.value = '';
}

//adding functionality to delete button when user hovers over the todo item.
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);//removes the item
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //adding updated data to the key
    showTasks();
}

//functionality for the clear all Button. 
clearAllbtn.onclick = () => {
    listArr = []; //emptying the array.
    localStorage.setItem("New Todo", JSON.stringify(listArr));//setting the empty array to the key.
    showTasks();
}