document.addEventListener('DOMContentLoaded', () => {
  // get all dogs
  getAllDogs()
  ignitSubmitEditDogForm()
})

function getAllDogs(){
  fetch('http://localhost:3000/dogs')
  .then(r => r.json())
  .then(dogs => {
    dogs.forEach(dog => renderDog(dog))
  })
}

function renderDog(dog){
  let dogRow = document.createElement('tr')
  dogRow.id = dog.id
  let dogName = document.createElement('td')
  dogName.innerText = dog.name
  let dogBreed = document.createElement('td')
  dogBreed.innerText = dog.breed
  let dogSex = document.createElement('td')
  dogSex.innerText = dog.sex
  let dogEditButton = document.createElement('button')
  dogEditButton.innerText = 'Edit Dog'
  dogEditButton.addEventListener('click', (e) => handleEditButton(dog))
  dogRow.appendChild(dogName)
  dogRow.appendChild(dogBreed)
  dogRow.appendChild(dogSex)
  dogRow.appendChild(dogEditButton)
  dogsTable().appendChild(dogRow)
}

function dogsTable(){
  return document.querySelector('#table-body')
}

function editDogForm(){
  return document.querySelector('#dog-form')
}

function nameField(){
  return document.querySelector('#name-field')
}

function breedField(){
  return document.querySelector('#breed-field')
}

function sexField(){
  return document.querySelector('#sex-field')
}

function submitButton(){
  return document.querySelector('.submit-button')
}

function handleEditButton(dog){
  nameField().value = dog.name
  breedField().value = dog.breed
  sexField().value = dog.sex
  submitButton().id = dog.id
}

function ignitSubmitEditDogForm(){
  editDogForm().addEventListener('submit', handleSubmitEditDogForm)
}

function clearDogsTable(){
  let node = dogsTable()
  while (node.firstChild){
    node.removeChild(node.firstChild)
  }
}

function handleSubmitEditDogForm(e){
  e.preventDefault()
  let id = submitButton().id
  newData = {
    "name": nameField().value,
    "breed": breedField().value,
    "sex": sexField().value
  }
  fetch(`http://localhost:3000/dogs/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newData)
  })
  .then(()=>{
    clearDogsTable();
    getAllDogs()
    }
  )
}
