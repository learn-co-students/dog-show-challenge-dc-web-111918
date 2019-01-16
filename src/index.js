document.addEventListener('DOMContentLoaded', function (){
	console.log('connected')
	getRegisteredDogs();
})

function getRegisteredDogs(){
	fetch('http://localhost:3000/dogs')
	.then(res => res.json())
	.then(dogs => {
		dogs.forEach(dog =>{
			renderDog(dog)
		})
	})
}

function renderDog(dog){
	const showDogs = document.querySelector('#table-body')

	const dogRow = document.createElement('tr')
	dogRow.id = `dog-${dog.id}`
	showDogs.appendChild(dogRow)

	const dogName = document.createElement('td')
	dogName.innerText = dog.name
	dogRow.appendChild(dogName)

	const dogBreed = document.createElement('td')
	dogBreed.innerText = dog.breed
	dogRow.appendChild(dogBreed)

	const dogSex = document.createElement('td')
	dogSex.innerText = dog.sex
	dogRow.appendChild(dogSex)

	const dogEdit = document.createElement('button')
	dogEdit.classList.add('edit-btn')
	dogEdit.innerText = 'Edit Dog'
	dogRow.appendChild(dogEdit)
	dogEdit.addEventListener('click', function(){
		loadDog(dog)
	})
}

function loadDog(dog) {
	document.querySelector('input[name="name"').value = dog.name
	document.querySelector('input[name="breed"').value = dog.breed
	document.querySelector('input[name="sex"').value = dog.sex

	const form = document.querySelector('form');
	form.addEventListener('submit', function(){
		// send one object (dog) to patchDog function
		patchDog({
			id: dog.id,
			name: document.querySelector('input[name="name"').value,
			breed: document.querySelector('input[name="breed"').value,
			sex: document.querySelector('input[name="sex"').value
		});
	});
}

function patchDog(dog){
	fetch(`http://localhost:3000/dogs/${dog.id}`, {
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json",
  			"Accept": "application/json"
		},
		body: JSON.stringify({
			name: dog.name,
			breed: dog.breed,
			sex: dog.sex
		})
	})
	.then(res => res.json())
	.then(dogs =>{
		console.log(dogs)
		ß();
	})

}









