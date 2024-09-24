;(function(){
  "use strict"

  //store variables
  const inputList = document.getElementById('input-item');
  const formList = document.getElementById('form');
  const ul = document.getElementById('list');
  const lis = document.getElementsByTagName("li")

  let arrTask = [
    {
      name: 'task',
      createAt: Date.now(),
      completed: false
    }
  ]

  // function addEventLi(li){
  //   li.addEventListener('click', function(){
  //     console.log(this)
  //   })
  // }


  function generateTask(obj){
    const li = document.createElement('li')
    const p = document.createElement('p')
    const checkButton = document.createElement('button')
    const editButton = document.createElement('i')
    const deleteButton = document.createElement('i')
    const editContainer = document.createElement('editContainer')
    const editInput = document.createElement('editInput')
    const buttonEdit = document.createElement('buttonEdit')
    const buttonCancel = document.createElement('cancelButton')

    
    li.id = 'list-item'

    checkButton.className = 'button-check'
    checkButton.innerHTML = '<i class = "fas fa-check displayNone"></i>'
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

     
    editContainer.className = "editContainer"
    editContainer.setAttribute('data-action', 'editContainer')


    editInput.setAttribute('type', 'text')
    editInput.className = "editInput"

    editContainer.appendChild(editInput)

    buttonEdit.className = "buttonEdit"
    buttonEdit.textContent = "Edit"
    buttonEdit.setAttribute('data-action', 'buttonEdit')
    editContainer.appendChild(buttonEdit)

    buttonCancel.className = "buttonCancel"
    buttonCancel.textContent = "Cancel"
    buttonCancel.setAttribute('data-action', 'buttonCancel')
    editContainer.appendChild(buttonCancel)

    li.appendChild(editContainer)

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
  }

  function clickUl(e){
    console.log(e.target)
    console.log(e.target.getAttribute('data-action'))
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