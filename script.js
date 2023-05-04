// define variables
let students = [];
let currentStudent = 0;
let presentCount = 0;
let absentCount = 0;
let table = document.getElementById("table-body");
let name = document.getElementById("name");
let presentBtn = document.getElementById("present-btn");
let absentBtn = document.getElementById("absent-btn");
let redoBtn = document.getElementById("redo-btn");
let showTableBtn = document.getElementById("show-table-btn");
let card = document.querySelector(".card");
let tableDiv = document.querySelector(".table");
let statusofattendance = "unkown";

// get students from the database
getStudents();

// function to get students from the database
function getStudents() {
  // make a GET request to the server to get the students
  fetch("get_students.php")
    .then(response => response.json())
    .then(data => {
      students = data;
      // display the first student on the card
      displayStudent();
    });
}

// function to display the current student on the card
function displayStudent() {
  name.textContent = students[currentStudent].name;
}

// function to update the attendance count
function updateAttendanceCount(status) {
  if (status === "present") {
    presentCount++;
  } else {
    absentCount++;
  }
}


function markAttendance(status) {
  // Get the selected student's ID and attendance status
  console.log("i'm alive")
  const studentId = document.getElementById('name').id;
  const attendanceStatus = status;
  
  // Send an AJAX request to update the attendance status in the database
  fetch('update_attendance.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `student_id=${studentId}&attendance_status=${attendanceStatus}`
  })
  .then(response => response.json())
  .then(data => {
    // Display a success or error message to the user
    const message = document.getElementById('message');
    message.textContent = data.message;
    message.className = data.status === 'success' ? 'success' : 'error';
    
    // Move on to the next student
    nextStudent();
  })
  .catch(error => {
    // Display an error message to the user
    const message = document.getElementById('message');
    message.textContent = 'An error occurred while updating the attendance status. Please try again later.';
    message.className = 'error';
  });
}

// function to reset the attendance counts and table
function resetAttendance() {
  presentCount = 0;
  absentCount = 0;
  table.innerHTML = "";
}

// add event listeners to the present and absent buttons
presentBtn.addEventListener("click", function() {
  updateAttendanceCount("present");
  statusofattendance = "present";
  updateAttendanceTable();
  currentStudent++;
  if (currentStudent < students.length) {
    displayStudent();
  } else {
    // if all students have been displayed, show the options
    card.style.display = "none";
    tableDiv.style.display = "block";
  }
});

absentBtn.addEventListener("click", function() {
  updateAttendanceCount("absent");
  statusofattendance = "absent";
  updateAttendanceTable();
  currentStudent++;
  if (currentStudent < students.length) {
    displayStudent();
  } else {
    // if all students have been displayed, show the options
    card.style.display = "none";
    tableDiv.style.display = "block";
  }
});

// function to update the attendance table
function updateAttendanceTable() {
  let newRow = table.insertRow();
  let nameCell = newRow.insertCell(0);
  let statusCell = newRow.insertCell(1);
  nameCell.textContent = students[currentStudent].name;
  statusCell.textContent = statusofattendance;
}

// add event listeners to the redo and show table buttons
redoBtn.addEventListener("click", function() {
  // reset the attendance counts and table
  resetAttendance();
  // display the first student on the card
  currentStudent = 0;
  displayStudent();
  // hide the table and show the card
  tableDiv.style.display = "none";
  card.style.display = "block";
});

showTableBtn.addEventListener("click", function() {
  // show the attendance table
  tableDiv.style.display = "block";
});

function exportAttendanceTable() {
  console.log("i'm alive")
  // Get the attendance table rows and cells
  const tableRows = document.querySelectorAll('#attendance-table tbody tr');
  const tableCells = document.querySelectorAll('#attendance-table tbody td:nth-child(2)');

  console.log(tableRows);
  console.log(tableCells);

  // Create a temporary textarea to hold the attendance column values
  const textarea = document.createElement('textarea');

  // Add the attendance column values to the textarea
  let attendanceValues = '';
  for (let i = 0; i < tableRows.length; i++) {
    const attendanceStatus = tableCells[i].textContent;
    attendanceValues += attendanceStatus + '\n';
  }
  textarea.value = attendanceValues;

  
  console.log(textarea.value);

  // Add the textarea to the document and select its contents
  document.body.appendChild(textarea);
  textarea.select();

  // Copy the contents of the textarea to the clipboard and remove the textarea
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

console.log("i'm alive")