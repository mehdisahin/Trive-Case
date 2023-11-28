localStorage.setItem(
	"formData",
	JSON.stringify([
		{
			name: "Mehdi",
			surname: "Şahin",
			email: "sahinmehdi23@gmail.com",
			phone: "0531 429 80 55",
		},
	])
);

// Function to handle form submission
function handleFormSubmit(event) {
	event.preventDefault();

	// Get form values
	const name =
		document.getElementsByClassName("name")[0]
			.value;
	const surname =
		document.getElementsByClassName("surname")[0]
			.value;
	const email =
		document.getElementsByClassName("email")[0]
			.value;
	const phone =
		document.getElementsByClassName("phone")[0]
			.value;

	// Clear form
	document.getElementById("account-form").reset();

	// Save data to local storage
	saveToLocalStorage(name, surname, email, phone);

	// Refresh table
	displayDataFromLocalStorage();
}

// Function to save data to local storage
function saveToLocalStorage(
	name,
	surname,
	email,
	phone
) {
	// Get existing data from local storage or initialize an empty array
	const existingData =
		JSON.parse(
			localStorage.getItem("formData")
		) || [];

	// Add new data
	existingData.push({
		name,
		surname,
		email,
		phone,
	});

	// Save to local storage
	localStorage.setItem(
		"formData",
		JSON.stringify(existingData)
	);
}

// Function to display data from local storage in the table
function displayDataFromLocalStorage() {
	const dataTable =
		document.querySelector(".table");
	const tbody = dataTable.querySelector("tbody");

	// Clear existing table data
	tbody.innerHTML = "";

	// Get data from local storage
	const dataFromLocalStorage =
		JSON.parse(
			localStorage.getItem("formData")
		) || [];

	// Populate table with data
	dataFromLocalStorage.forEach((entry, index) => {
		const row = document.createElement("tr");
		const rowNum = document.createElement("td");
		const nameCell = document.createElement("td");
		const surnameCell =
			document.createElement("td");
		const emailCell =
			document.createElement("td");
		const phoneCell =
			document.createElement("td");
		const deleteBtn =
			document.createElement("td");

		deleteBtn.innerHTML = `	<button id="delete-button-${index}" class="delete-btn delete-btn-${index}">
    Sil
  </button>`;
		rowNum.textContent = index + 1;
		nameCell.textContent = entry.name;
		surnameCell.textContent = entry.surname;
		emailCell.textContent = entry.email;
		phoneCell.textContent = entry.phone;

		row.appendChild(rowNum);
		row.appendChild(nameCell);
		row.appendChild(surnameCell);
		row.appendChild(emailCell);
		row.appendChild(phoneCell);
		row.appendChild(deleteBtn);
		tbody.appendChild(row);
	});
}

// Display initial data when the page loads
displayDataFromLocalStorage();

function handleDelete(event) {
	event.stopPropagation();
	event.preventDefault();

	console.log(event);

	const buttonId = event.srcElement.id;
	console.log(buttonId);
	const index = parseInt(buttonId.split("-")[2]);

	const formData = JSON.parse(
		localStorage.getItem("formData") || []
	);
	formData.splice(index, 1);
	localStorage.setItem(
		"formData",
		JSON.stringify(formData)
	);

	displayDataFromLocalStorage();
}

// Attach event listener to the form
document
	.getElementById("account-form")
	.addEventListener("submit", handleFormSubmit);

const tableBody = document.querySelector(
	".table tbody"
);
tableBody.addEventListener("click", handleDelete);
