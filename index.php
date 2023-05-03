<?php
include_once('db_connection.php');

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the date of attendance
    $attendance_date = $_POST['attendance_date'];

    // Get the number of students
    $num_students = $_POST['num_students'];

    // Insert attendance data into the database
    for ($i = 1; $i <= $num_students; $i++) {
        // Get the attendance status of the student
        $student_id = $_POST['student_id_' . $i];
        $attendance_status = $_POST['attendance_status_' . $i];

        // Insert the attendance data into the database
        $sql = "INSERT INTO attendance (student_id, attendance_date, attendance_status) 
                VALUES ('$student_id', '$attendance_date', '$attendance_status')";
        $result = mysqli_query($conn, $sql);
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Attendance System</title>
</head>
<body>
    <h1>Attendance System</h1>
    <form method="POST" action="">
        <label for="attendance_date">Date:</label>
        <input type="date" id="attendance_date" name="attendance_date"><br><br>

        <label for="num_students">Number of Students:</label>
        <input type="number" id="num_students" name="num_students" min="1" max="100"><br><br>

        <table>
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Attendance Status</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Retrieve student data from the database
                $sql = "SELECT * FROM students";
                $result = mysqli_query($conn, $sql);

                // Loop through each row of the result set and display the data in the table
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['name'] . "</td>";
                    echo "<td>";
                    echo "<input type='hidden' name='student_id_" . $row['id'] . "' value='" . $row['id'] . "'>";
                    echo "<select name='attendance_status_" . $row['id'] . "'>";
                    echo "<option value='present'>Present</option>";
                    echo "<option value='absent'>Absent</option>";
                    echo "</select>";
                    echo "</td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table><br>

        <input type="submit" value="Submit">
    </form>
</body>
</html>
