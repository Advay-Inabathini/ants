// Define an array of student names
const students = ['John Doe', 'Jane Doe', 'Bob Smith','advay inabathini', 'rochak saini','suhani jain'];

// Get references to the HTML elements
const studentNameEl = document.getElementById('student-name');
const presentBtn = document.getElementById('present-btn');
const absentBtn = document.getElementById('absent-btn');
const attendanceTableBody = document.querySelector('#attendance-table tbody');

let currentStudentIndex = 0;
let attendanceData = [];

// Update the student name on the card
function updateStudentName() {
  studentNameEl.innerText = students[currentStudentIndex];
}

// Add the attendance data for the current student to the attendanceData array
function addAttendanceData(present) {
  attendanceData.push({
    name: students[currentStudentIndex],
    present: present
  });
}

// Update the attendance table with the attendance data
function updateAttendanceTable() {
  attendanceTableBody.innerHTML = '';

  for (let i = 0; i < attendanceData.length; i++) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const attendanceCell = document.createElement('td');

    nameCell.innerText = attendanceData[i].name;
    attendanceCell.innerText = attendanceData[i].present ? 'Present' : 'Absent';

    row.appendChild(nameCell);
    row.appendChild(attendanceCell);
    attendanceTableBody.appendChild(row);
  }
}

// Event listener for the present button
presentBtn.addEventListener('click', () => {
  addAttendanceData(true);
  currentStudentIndex++;

  if (currentStudentIndex >= students.length) {
    updateAttendanceTable();
  } else {
    updateStudentName();
  }
});

// Event listener for the absent button
absentBtn.addEventListener('click', () => {
  addAttendanceData(false);
  currentStudentIndex++;

  if (currentStudentIndex >= students.length) {
    updateAttendanceTable();
    } else {
    updateStudentName();
    }
    });