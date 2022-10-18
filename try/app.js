//select items
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery")
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** event listeners **********
//submit form
form.addEventListener("submit", addItem);
//clear list
clearBtn.addEventListener("click", clearItems);
//display items onload
// window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********
//add item
function addItem(e) {
	e.preventDefault();//The preventDefault() method cancels the event if it is cancelable
	const value = grocery.value;
	const id = new Date().getTime().toString();// Date() -> return a string representing the current time.getTime() method returns the numeric value corresponding to the time for the specified date. toString() method returns a string as a string.

	if(value && !editFlag) {
		const element = document.createElement('article');
		//add id
		const attr = document.createAttribute("data-id");
		//add class
		element.classList.add("grocery-item");
		attr.value = id;
		element.setAttributeNode(attr);
		element.innerHTML = `<p class="title">${value}</p>
		<div class="btn-container">
			<button type="button" class="edit-btn">
				<i class="fas fa-edit"></i>
			</button>
			<button type="button" class="delete-btn">
				<i class="fas fa-trash"></i>
			</button>
		</div>`;
		const deleteBtn = element.querySelector(".delete-btn");
		const editBtn = element.querySelector(".edit-btn");
		deleteBtn.addEventListener("click", deleteItem);//we add event direkt in the function because we locate this buttons dynamically, directly in our function and not in html
		editBtn.addEventListener("click", editItem);
		//append child
		list.appendChild(element);
		//display alert
		displayAlert("item was added", "success");
		//show container
		container.classList.add("show-contatiner");
		// add to local storage
		addToLocalStorage(id, value);
		//set to default
		setToDefault();
	}
	else if(value && editFlag)
	{
		editElement.innerHTML = value;
		displayAlert('value changed', 'success');
		//edit local storage
		editLocalStorage(editID, value);
		setToDefault();

	}
	else{
		displayAlert('please enter value', "danger");

	}
}

//display alert
function displayAlert(text, action){
	alert.textContent = text;
	alert.classList.add(`alert-${action}`);
	//remove alert
	setTimeout(function(){
		alert.textContent = "";
		alert.classList.remove(`alert-${action}`);
	}, 1000);
}

//clear Items
function clearItems(){
	const items = document.querySelectorAll('.grocery-item');
	if(items.length > 0) {
		items.forEach(function(item){
			list.removeChild(item);
		});
	}
	container.classList.remove("show-container");
	displayAlert("empty list", "danger");
	setToDefault();
}

//delete function
function deleteItem(e){
	const element = e.currentTarget.parentElement.parentElement;//current target is our delete button
	const id = element.dataset.id;
	list.removeChild(element);
	if (list.children.length === 0){
		container.classList.remove("show-container");
	}
	displayAlert('item removed', 'danger');
	setToDefault();
	removeFromLocalStorage(id);
}

//edit function
function editItem(){
	const element = e.currentTarget.parentElement.parentElement;
	//set edit item
	editElement = e.currentTarget.parentElement.previousElementSibling;
	//set from value
	grocery.value = editElement.innerHTML;
	editFlag = true;
	editID = element.dataset.id;
	submitBtn.textContent = "edit";
}

//set back to default
function setToDefault(){
	grocery.value = "";
	editFlag = false;
	editID = "";
	submitBtn.textContent = "submit";
}


// *********LOCAL STORAGE*******
function addToLocalStorage(id, value){
	const grocery = {id:id, value:value};
	let items = localStorage.getItem("list");
	console.log(items);
}

function removeFromLocalStorage(id){}
function editLocalStorage(id, value){}


