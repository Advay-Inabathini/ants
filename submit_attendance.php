<?php
//connect to the database
require_once('db_connection.php');

//get the current date
$date = date("Y-m-d");

//loop through each student in the attendance form
foreach($_POST['attendance'] as $student_id => $status) {
    //insert the attendance record into the database
    $sql = "INSERT INTO attendance_records (date, student_id, status) VALUES ('$date', $student_id, '$status')";
    mysqli_query($conn, $sql);
}

//close the database connection
mysqli_close($conn);

//redirect the user to the attendance table page
header("Location: attendance_table.php");
exit;
?>
