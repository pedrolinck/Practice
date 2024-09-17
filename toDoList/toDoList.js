;(function(){
  "use strict"

  //store variables
  const input = document.getElementById('input-item').value
  const formList = document.getElementById('form')
  const ul = document.getElementById('list')

  formList.addEventListener('submit', function(e) {
    e.preventDefault()
    ul.innerHTML += `
      <li class="list-item">
        <p id="teste">${input}</p>
      </li>
    `
  })

})()