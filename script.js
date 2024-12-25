const nome = document.getElementById("name")

const people = [
  {nome: 'Brian', surname: 'Occoner'},
  {nome: 'Jeff', surname: 'Henry'},
  {nome: 'Math', surname: 'Pet'}
]

for(let i = 0; i<people.length; i++ ){
  nome.innerHTML += `<li>Nome: ${people[i].nome} ${people[i].surname}</li>`
}