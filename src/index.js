document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()

})

function fetchDogs() {
  return fetch('http://localhost:3000/dogs')
  .then(resp => resp.json())
  .then(dogs => getAllDogs(dogs))
}

function updateDog(dogId, dog) {
  return fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type' : 'application/json',
      Accept : 'application/json'
    },
    body: JSON.stringify(dog)
  })
  .then(res => res.json())
}

function renderDog(dogObj) {
  let tableBody = document.querySelector('#table-body')
  let trElement = document.createElement('tr')
  trElement.id = dogObj.id

  let tdName = document.createElement('td')
  tdName.innerText = dogObj.name
  tdName.id = `${dogObj.id}-dog-name`

  let tdBreed = document.createElement('td')
  tdBreed.innerText = dogObj.breed
  tdBreed.id = `${dogObj.id}-dog-breed`

  let tdSex = document.createElement('td')
  tdSex.innerText = dogObj.sex
  tdSex.id = `${dogObj.id}-dog-sex`

  let tdButton = document.createElement('td')
  tdButton.innerHTML = `<button>Edit Dog</button>`
  tdButton.addEventListener('click', (e) => handleEditButton(dogObj))

  tableBody.appendChild(trElement)
  trElement.appendChild(tdName)
  trElement.appendChild(tdBreed)
  trElement.appendChild(tdSex)
  trElement.appendChild(tdButton)
}

function reRenderRow(updatedDogObj) {
  let id = updatedDogObj.id

  getDogNameCell(id).innerText = updatedDogObj.name
  getDogBreedCell(id).innerText = updatedDogObj.breed
  getDogSexCell(id).innerText = updatedDogObj.sex
}

function getAllDogs(dogs) {
  dogs.forEach(dog => renderDog(dog))
}

function handleSubmitButton(e, dogObj) {
  e.preventDefault()

  let dogInfo = {name: getDogNameInput().value, breed: getDogBreedInput().value, sex: getDogSexInput().value}
  updateDog(dogObj.id, dogInfo)
  .then(updatedDogObj => reRenderRow(updatedDogObj))
  getDogForm().reset()
}

function handleEditButton(dogObj) {
  getDogNameInput().value = dogObj.name
  getDogBreedInput().value = dogObj.breed
  getDogSexInput().value = dogObj.sex

  getSubmitButton().addEventListener('click', (e) => handleSubmitButton(e, dogObj))
}

function getDogForm() {
  return document.querySelector('#dog-form')
}

function getSubmitButton() {
  return document.querySelector('#dog-form')[3]
}

function getDogNameInput() {
  return document.querySelector('#dog-form')[0]
}

function getDogBreedInput() {
  return document.querySelector('#dog-form')[1]
}

function getDogSexInput() {
  return document.querySelector('#dog-form')[2]
}

function getDogNameCell(id) {
  return document.getElementById(`${id}-dog-name`)
}

function getDogBreedCell(id) {
  return document.getElementById(`${id}-dog-breed`)
}

function getDogSexCell(id) {
  return document.getElementById(`${id}-dog-sex`)
}
