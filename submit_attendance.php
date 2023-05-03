<?php
// establish database connection
$servername = "localhost";
$username = "root";
$password = "lenovo";
$dbname = "mydb";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// get POST data from form
$class_id = $_POST['class_id'];
$date = $_POST['date'];
$students = $_POST['students'];

// insert attendance data for each student into database
foreach ($students as $student_id => $attendance_status) {
    $sql = "INSERT INTO attendance (class_id, student_id, date, status) VALUES ('$class_id', '$student_id', '$date', '$attendance_status')";

    if (mysqli_query($conn, $sql)) {
        echo "Attendance submitted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

// close database connection
mysqli_close($conn);
?>
