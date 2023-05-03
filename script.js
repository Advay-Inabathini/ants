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

// function to update the attendance table
function updateAttendanceTable() {
  let newRow = table.insertRow();
  let nameCell = newRow.insertCell(0);
  let statusCell = newRow.insertCell(1);
  nameCell.textContent = students[currentStudent].name;
  statusCell.textContent = (presentBtn.disabled) ? "Absent" : "Present";
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
