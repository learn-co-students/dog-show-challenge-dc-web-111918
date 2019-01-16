document.addEventListener('DOMContentLoaded', () => {
  getAllDogs()
})

function getAllDogs(){
  fetch('http://localhost:3000/dogs')
  .then(response=>response.json())
  .then(dogs=>{
    dogs.forEach(dog=>{
      displayDog(dog)
    })
  })
}


function displayDog(dog){
  let tbody= document.querySelector('tbody')
  let trOne = document.createElement('tr')
  tbody.appendChild(trOne)

  let tdName = document.createElement('td')
  tdName.innerText = dog.name
  tdName.id = `name-${dog.id}`
  trOne.appendChild(tdName)

  let tdBreed = document.createElement('td')
  tdBreed.innerText = dog.breed
  tdBreed.id = `breed-${dog.id}`
  trOne.appendChild(tdBreed)

  let tdSex= document.createElement('td')
  tdSex.id = `sex-${dog.id}`
  tdSex.innerText = dog.sex
  trOne.appendChild(tdSex)

  let editButton= document.createElement('button')
  let center = document.createElement('center')
  editButton.id= `${dog.name}-${dog.id}-${dog.breed}-${dog.sex}`


  editButton.addEventListener('click',populateForm)
  editButton.innerText = "Edit"
  trOne.appendChild(center)
  center.appendChild(editButton)
}


function populateForm(e){
  let dogInfo = e.currentTarget.id
  let dogName = dogInfo.split("-")[0]
  let dogId =dogInfo.split("-")[1]
  let dogBreed = dogInfo.split("-")[2]
  let dogSex = dogInfo.split("-")[3]

  document.querySelector('input[name=name]').value = dogName
  document.querySelector('input[name=breed]').value = dogBreed
  document.querySelector('input[name=sex]').value = dogSex
  document.querySelector('input[value="Submit"]').id = dogId
  document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
      onSubmit(e)
    e.target.reset()
  })
}


function onSubmit(e){
  dogId = e.currentTarget.querySelector('input[value="Submit"]').id
  dogName =e.currentTarget.querySelector('input[name = name]').value
  dogBreed =e.currentTarget.querySelector('input[name = breed]').value
  dogSex =e.currentTarget.querySelector('input[name = sex]').value
  document.querySelector(`#name-${dogId}`).innerText = dogName
  document.querySelector(`#breed-${dogId}`).innerText = dogBreed
  document.querySelector(`#sex-${dogId}`).innerText = dogSex
  editDog(dogId,dogName,dogBreed,dogSex)
}

function editDog(dogId,dogName,dogBreed,dogSex){
   fetch(`http://localhost:3000/dogs/${dogId}`,{
     method: "PATCH",
     headers: {
       "Content-Type" : "application/json",
       "Accept" : "application/json",
     },
     body: JSON.stringify({
       name: dogName,
       breed: dogBreed,
       sex: dogSex
     })
   })
   .then(response=>response.json())
   .then(editedDog=>{
     displayDog(editedDog)
   })
}
