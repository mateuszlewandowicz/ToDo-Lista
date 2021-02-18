let $todoInput; // miejsce na wpisanie treści
let $alertInfo; // info o braku zadania / konieczność dodania 
let $addBtn; // przycisk ADD - dodaje nowe elementy
let $ulList; // lista zadań
let $newTask; // nowo dodany Li, nowe zadanie
let $toolsPanel; // panel z narzędziami
let $completBtn; //przycisk niebieski ok
let $editBtn; // przycisk edycji
let $deleteBtn; // przycisk usuwania

let $popup; //pobrany popup
let $popupInfo; // alert w popupie przy dodaniu pustego tekstu
let $editedTodo; // edytowanyt Todo
let $popupInput; // tekst wpisywany w inputa
let $addPopupBtn; //przycisk zatwierdz w pupapie
let $closeTodoBtn; // przycisk od zamykania popupa

let $idNumber = 0;
let $allTask;

const main = () => {
    prepareDOMElemenst();
    prepareDOMEvents();
    
};


//pobranie elementów
const prepareDOMElemenst = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo= document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');

    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTask = $ulList.getElementsByTagName('li');


};

// nadajemy nasłuchiwanie
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
 
};
///////////////////////////////////////////////////////////////////////

const addNewTask = () => {
    if($todoInput.value !== ''){
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id',`todo-${$idNumber}`)
        $ulList.appendChild($newTask);
        

        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();
    } else {
        $alertInfo.innerText ='Wpisz treść zadania!';

    }
};
///////////////////////////////////////////////////////////////////////

const enterCheck = () => {
    if(event.keyCode === 13){
        addNewTask();
    }
};

///////////////////////////////////////////////////////////////////////

const createToolsArea = () => {
    $toolsPanel = document.createElement('div');
    $toolsPanel.classList.add('tools');
    $newTask.appendChild($toolsPanel);

    $completBtn = document.createElement('button');
    $completBtn.classList.add('complete');
    $completBtn.innerHTML ='<i class="fas fa-check"></i>';
    $toolsPanel.appendChild($completBtn);

    $editBtn = document.createElement('button');
    $editBtn.classList.add('edit');
    $editBtn.innerHTML="EDIT";
    $toolsPanel.appendChild($editBtn);

    $deleteBtn = document.createElement('button');
    $deleteBtn.classList.add('delete');
    $deleteBtn.innerHTML='<i class="fas fa-times"></i>';
    $toolsPanel.appendChild($deleteBtn);
};

/////////////////////////////////////////////////////////////////////////

const checkClick = (e) => {

    if(e.target.closest('button').classList.contains('complete')){

      e.target.closest('li').classList.toggle('completed');
      e.target.closest('button').classList.toggle('completed');
    
    } else if(e.target.closest('button').className === 'edit'){
        editTask(e);
        console.log('ok edit');

    } else if(e.target.closest('button').className === 'delete'){
        deleteTask(e);
        console.log('delete');
    }
};

///////////////////////////////////////////////////////////////////////////////////
// edycja zadania 
const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value =$editedTodo.firstChild.textContent;

    console.log('ok edit');
    $popup.style.display = 'flex';
};

// zmiana tekstu
const changeTodo = ()=> {
    if($popupInput.value !==''){
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = 'To się uda!';   
    } else{
        $popupInfo.innerText = "Musisz dodać zadanie!";
    }
};

// zamykanie popupa
const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';     
};

//Usuwanie elementów
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTask.lenght === 0){
        $alertInfo.innerText = 'Brak zadań na liście';
    };
};







document.addEventListener('DOMContentLoaded', main);

