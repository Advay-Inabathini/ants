const students = [
    'Alice',
    'Bob',
    'Charlie',
    'Dave',
    'Eve',
  ];
  
  let currentStudentIndex = 0;
  let attendance = [];
  
  const cardContainer = document.getElementById('card-container');
  const presentButton = document.getElementById('present-button');
  const absentButton = document.getElementById('absent-button');
  const table = document.getElementById('attendance-table');
  
  function updateCard() {
    const name = students[currentStudentIndex];
    cardContainer.innerText = name;
  }
  
  function addAttendance(present) {
    const name = students[currentStudentIndex];
    attendance.push({ name, present });
  }
  
  function updateTable() {
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        ${attendance.map(({ name, present }) => `
          <tr>
            <td>${name}</td>
            <td>${present ? 'Yes' : 'No'}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  presentButton.addEventListener('click', () => {
    addAttendance(true);
    currentStudentIndex++;
    if (currentStudentIndex >= students.length) {
      updateTable();
      return;
    }
    updateCard();
  });
  
  absentButton.addEventListener('click', () => {
    addAttendance(false);
    currentStudentIndex++;
    if (currentStudentIndex >= students.length) {
      updateTable();
      return;
    }
    updateCard();
  });
  
  updateCard();
  