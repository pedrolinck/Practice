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

  function addEventLi(li){
    li.addEventListener('click', function(){
      console.log(this)
    })
  }


  function generateTask(obj){
    const li = document.createElement('li')
    li.id = 'list-item'
    const p = document.createElement('p')
    p.id = 'teste'
    p.textContent = obj.name
    li.appendChild(p)
    addEventLi(li)

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

  renderTask()
})()