;(function(){
  "use strict"

  //store variables
  const inputList = document.getElementById('input-item');
  const formList = document.getElementById('form');
  const ul = document.getElementById('list');
  const lis = document.getElementsByTagName("li")

  

  // function addEventLi(li){
  //   li.addEventListener('click', function(){
  //     console.log(this)
  //   })
  // }

  let arrTask = saveData

  function saveData(){
    let taskData = localStorage.getItem("tasks");
    taskData = JSON.parse(taskData)

    return taskData && taskData.length ? taskData : [
      {
        name: 'task 1',
        createAt: Date.now(),
        completed: false
      }
    ]
  }

  function setNewData(){
    localStorage.setItem('tasks', JSON.stringify(arrTask))
  }

  setNewData()


  function generateTask(obj){
    const li = document.createElement('li')
    const p = document.createElement('p')
    const checkButton = document.createElement('button')
    const editButton = document.createElement('i')
    const deleteButton = document.createElement('i')


    const editContainerButton = document.createElement('editContainerButton')
    // inside the container
    const editInput = document.createElement('editInput')
    const buttonEdit = document.createElement('buttonEdit')
    const buttonCancel = document.createElement('buttonCancel')

    
    li.id = 'list-item'

    checkButton.className = 'button-check'
    checkButton.innerHTML = '<i class = "fas fa-check displayNone" data-action="checkButton"></i>'
    checkButton.setAttribute('data-action', 'checkButton')

    li.appendChild(checkButton)
    p.id = 'teste'
    p.textContent = obj.name
    li.appendChild(p)

    editButton.className = "fas fa-edit"
    editButton.setAttribute('data-action', 'editButton')
    li.appendChild(editButton)
   
    deleteButton.className = "fas fa-trash-alt"
    deleteButton.setAttribute('data-action', 'deleteButton')
    li.appendChild(deleteButton)

     
    editContainerButton.className = "editContainer"
    editContainerButton.setAttribute('data-action', 'editContainer')


    editInput.setAttribute('type', 'text')
    editInput.className = "editInput"
    editInput.value = obj.name

    editContainerButton.appendChild(editInput)

    buttonEdit.className = "buttonEdit"
    buttonEdit.textContent = "Edit"
    buttonEdit.setAttribute('data-action', 'buttonEdit')
    editContainerButton.appendChild(buttonEdit)

    buttonCancel.className = "buttonCancel"
    buttonCancel.textContent = "Cancel"
    buttonCancel.setAttribute('data-action', 'buttonCancel')
    editContainerButton.appendChild(buttonCancel)

    li.appendChild(editContainerButton)

    // addEventLi(li)

    return li
  }

  function renderTask(){
    ul.innerHTML = ''
    arrTask.forEach(task => {
      ul.appendChild(generateTask(task))
    });
  }

  function addTask(task){
    arrTask.push({
      name: task,
      createAt: Date.now(),
      completed: false
    })

  setNewData()

  }

  function clickUl(e){
    const dataAction = e.target.getAttribute('data-action')

    if(!dataAction) return

    let currentLi = e.target

    while(currentLi.nodeName !== "LI"){
      currentLi = currentLi.parentElement
    }

    const currentLiIndex = [...lis].indexOf(currentLi);

    const actions = {
      editButton: function (){
        const editContainerButton = currentLi.querySelector('.editContainerButton');

        [...ul.querySelectorAll('.editContainerButton')].forEach(container => {
          container.removeAttribute("style")
        })

        editContainerButton.style.display = 'flex';
        editInput.focus();

      },

      deleteButton: function(){
        arrTask.splice(currentLiIndex, 1)
        renderTask()
        setNewData()

      },

      editContainerButton: function(){
        const value = currentLi.querySelector('.editInput').value
        arrTask[currentLiIndex].name = value;
        renderTask()
        setNewData()

      },

      buttonCancel: function(){
        editContainerButton.removeAttribute('style')
        editInput.value = arrTask[currentLiIndex].name
      },

      checkButton: function(){
        arrTask[currentLiIndex].completed = !arrTask[currentLiIndex].completed
        
        // if(arrTask[currentLiIndex].completed){
        //   currentLi.querySelector('.fa-check').classList.remove('displayNone')
        // }else{
        //   currentLi.querySelector('.fa-check').classList.add('displayNone')

        // }
        setNewData()
        renderTask()

      }

    }

    if(actions[dataAction]){
      actions[dataAction]()
    }
  }

  formList.addEventListener('submit', function(e) {
    e.preventDefault()
    // ul.innerHTML += `
    //   <li id="list-item">
    //     <p id="teste">${inputList.value}</p>
    //   </li>
    // `
    addTask(inputList.value)
    renderTask()
    inputList.value = "";
    inputList.focus();
  });

  ul.addEventListener('click', clickUl)

  renderTask()
})()