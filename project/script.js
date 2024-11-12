const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const fatherNameInput = document.getElementById('father-name');
const coursesInput = document.getElementById('courses');
const contactInput = document.getElementById('contact');
const genderInput = document.getElementById('gender');
const addressInput = document.getElementById('address');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// Initialize records from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];

// Function to check for duplicate emails
function isDuplicateEmail(email) {
    return records.some(record => record.email.toLowerCase() === email.toLowerCase());
}

// Display records
function displayRecords() {
    recordList.innerHTML = '';
    if (records.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="10" style="text-align:center;color:red">No Record Found</td>`;
        recordList.appendChild(row);
    } else {
        records.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.age}</td>
                <td>${record.email}</td>
                <td>${record.fatherName}</td>
                <td>${record.courses}</td>
                <td>${record.contact}</td>
                <td>${record.gender}</td>
                <td>${record.address}</td>
                <td><button onclick="editRecord(${index})">Edit</button></td>
                <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
            `;
            recordList.appendChild(row);
        });
    }
}

// Add or Update a record
recordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = nameInput.value;
    const age = ageInput.value;
    const email = emailInput.value;
    const fatherName = fatherNameInput.value;
    const courses = coursesInput.value;
    const contact = contactInput.value;
    const gender = genderInput.value;
    const address = addressInput.value;
    const editIndex = parseInt(editIndexInput.value);

    if (name && age && email && fatherName && courses && contact && gender && address) {
        if (isDuplicateEmail(email) && editIndex === -1) {
            alert('Student already exists.');
            return;
        }

        const record = { name, age, email, fatherName, courses, contact, gender, address };

        if (editIndex === -1) {
            // Add a new record
            records.push(record);
        } else {
            // Update an existing record
            records[editIndex] = record;
            editIndexInput.value = -1;
        }

        localStorage.setItem('records', JSON.stringify(records));
        recordForm.reset();
        displayRecords();
    }
});

// Edit a record
function editRecord(index) {
    const recordToEdit = records[index];
    nameInput.value = recordToEdit.name;
    ageInput.value = recordToEdit.age;
    emailInput.value = recordToEdit.email;
    fatherNameInput.value = recordToEdit.fatherName;
    coursesInput.value = recordToEdit.courses;
    contactInput.value = recordToEdit.contact;
    genderInput.value = recordToEdit.gender;
    addressInput.value = recordToEdit.address;
    editIndexInput.value = index;
}

// Delete a record
function deleteRecord(index) {
    const confirmDelete = confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
        records.splice(index, 1);
        localStorage.setItem('records', JSON.stringify(records));
        displayRecords();
    }
}

// Initial display
displayRecords();