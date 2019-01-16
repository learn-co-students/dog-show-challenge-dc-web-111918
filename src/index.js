document.addEventListener('DOMContentLoaded', () => {
  //render list of dogs

  //submit listener for form
  //update database
  //reload dogs

  //edit dog populates id "table-body"
  populateDogList();
  submitEventListener();
})

const submitEventListener = () => {
    getDogForm().addEventListener('submit', (event) => {

      let dogData = {
        name: getDogFormName().value,
        sex: getDogFormSex().value,
        breed: getDogFormBreed().value,
        id: getDogFormSubmit().classList.value
      };
      updateDog(dogData)
      .then(res => res.json())
      .then(dogData => {debugger;});
    });
};

// const updateDogList = (dogData) => {
//   debugger;
// };

const updateDog = (dogData) => {
  return fetch(`http://localhost:3000/dogs/${dogData.id}`,
    {
      method: "PATCH",
      headers:
        {
          "Content-Type":"application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(dogData)
    })
};


const populateDogList = () => {
  let dogsData = fetchDogsData();
  dogsData.then(function(dogsData){
    dogsData.forEach(function(dogData){
      renderDog(dogData);
    });
  });
};

const renderDog = (dogData) => {
  let tableBody = getTableBody();

  const tr = document.createElement("tr");
  tableBody.appendChild(tr)
  tr.id = `dog-data-${dogData.id}`

  const tdDogName = document.createElement("td");
  tr.appendChild(tdDogName);
  tdDogName.innerText = dogData.name;

  const tdDogBreed = document.createElement("td");
  tr.appendChild(tdDogBreed);
  tdDogBreed.innerText = dogData.breed;

  const tdDogSex = document.createElement("td");
  tr.appendChild(tdDogSex);
  tdDogSex.innerText = dogData.sex;

  const tdButton = document.createElement("td");
  tr.appendChild(tdButton);
  tdButton.innerText = "Edit";
  tdButton.addEventListener('click', (event) => {
    getDogFormName().value = dogData.name;
    getDogFormBreed().value = dogData.breed;
    getDogFormSex().value = dogData.sex;
    getDogFormSubmit().classList = `${dogData.id}`;
  });
};

const fetchDogsData = () => {
  return fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(json => json);
};

const fetchDogData = (dogId) => {
  return fetch(`http://localhost:3000/dogs/${dogId}`)
  .then(res => res.json())
  .then(json => json);
};

function getTableBody(){
  return document.getElementById("table-body");
};

function getDogForm(){
  return document.getElementById("dog-form");
};

function getDogForm(){
  return document.getElementById("dog-form");
};

function getDogFormName(){
  return document.getElementById("dog-form-name");
};

function getDogFormBreed(){
  return document.getElementById("dog-form-breed");
};

function getDogFormSex(){
  return document.getElementById("dog-form-sex");
};

function getDogFormSubmit(){
  return document.getElementById("dog-form-submit");
};
