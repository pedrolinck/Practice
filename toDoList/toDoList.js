;(function(){
  "use strict"

  function Task(name, completed, createdAt, updatedAt){
		// crie uma funcao construtora chamada Task. 
        // essa funcao recebe por parametro obrigatório o nome da tarefa
        // também recebe tres parametros opcionais (completed, createdAt, updatedAt)
        // o objeto retornado por essa funcao deve ter quatro propriedades:
        //  - name - string - obrigatório, 
        //  - completed - boolean - opcional, false é o default, 
        //  - createdAt - timestamp - opcional, timestamp atual é o valor default) 
        //  - updatedAt - timestamp - opcional, null é o valor default
        // o objeto retornado por essa funcao deve ter um método chamado toggleDone, que deve inverter o boolean completed
	}

	let arrTasks = [
		{
			name: "task 1",
			completed: true,
			createdAt: 1592667375012,
			updatedAt: null
		},
		{
			name: "task 2",
			createdAt: 1581667345723,
			updatedAt: 1592667325018
		},
		{
			name: "task 3",
			completed: true,
			createdAt: 1592667355018,
			updatedAt: 1593677457010
		}
	]


    // a partir de um array de objetos literais, crie um array contendo instancias de Tasks. 
    // Essa array deve chamar arrInstancesTasks
	// const arrInstancesTasks = DESCOMENTE ESSA LINHA E RESOLVA O ENUNCIADO



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
    arrInstancesTasks.forEach(task => {
      ul.appendChild(generateTask(task))
    });
  }

  function addTask(task){
    // add new task instance
    renderTask()

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
        arrInstancesTasks.splice(currentLiIndex, 1)
        renderTask()
        setNewData()

      },

      editContainerButton: function(){
        const value = currentLi.querySelector('.editInput').value
        arrInstancesTasks[currentLiIndex].name = value;
        renderTask()
        setNewData()

      },

      buttonCancel: function(){
        editContainerButton.removeAttribute('style')
        editInput.value = arrInstancesTasks[currentLiIndex].name
      },

      checkButton: function(){
        // need use method toogleDone from right object
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