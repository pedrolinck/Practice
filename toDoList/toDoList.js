;(function(){
  "use strict"

  //store variables
  const inputList = document.getElementById('input-item');
  const formList = document.getElementById('form');
  const ul = document.getElementById('list');
  const lis = document.getElementsByTagName("li")

  function addTask(task){
    const li = document.createElement('li')
    li.className = 'list-item'
    const p = document.createElement('p')
    p.className = 'teste'
    p.textContent = task
    li.appendChild(p)
    ul.appendChild(li)
  }

  formList.addEventListener('submit', function(e) {
    e.preventDefault()
    // ul.innerHTML += `
    //   <li class="list-item">
    //     <p id="teste">${inputList.value}</p>
    //   </li>
    // `
    
    inputList.value = " ";
    inputList.focus();
  });

  [...lis].forEach(element => {
    element.addEventListener('click', function (e){
      console.log(this)
    })
  });

})()