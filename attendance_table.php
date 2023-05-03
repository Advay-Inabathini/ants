<?php
// Start the session
session_start();

// Check if the user is logged in
if(!isset($_SESSION['username'])){
    header('Location: login.php');
    exit();
}

// Include the database connection file
require_once 'db_connection.php';

// Get the class id from the URL parameter
$class_id = $_GET['class_id'];

// Get the class details from the database
$query = "SELECT * FROM classes WHERE id = '$class_id'";
$result = mysqli_query($conn, $query);
$class = mysqli_fetch_assoc($result);

// Get the list of students for the class
$query = "SELECT * FROM students WHERE class_id = '$class_id'";
$result = mysqli_query($conn, $query);
$students = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Get the attendance data for the class
$query = "SELECT * FROM attendance WHERE class_id = '$class_id'";
$result = mysqli_query($conn, $query);
$attendance = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Create a new array to store the attendance data by date and student
$data = array();

// Loop through each attendance record and store it in the $data array
foreach ($attendance as $row) {
    $date = $row['date'];
    $student_id = $row['student_id'];
    $status = $row['status'];
    $data[$date][$student_id] = $status;
}

// Get a list of unique dates for which attendance has been taken
$dates = array_keys($data);

// Sort the dates in descending order
rsort($dates);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $class['name'] ?> Attendance</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        .container {
            margin-top: 50px;
        }
    </style>
</head>
<body>

    <div class="container">

        <h1><?php echo $class['name'] ?> Attendance</h1>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Student Name</th>
                    <?php foreach ($dates as $date): ?>
                        <th><?php echo $date ?></th>
                    <?php endforeach; ?>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($students as $student): ?>
                    <tr>
                        <td><?php echo $student['name'] ?></td>
                        <?php foreach ($dates as $date): ?>
                            <td><?php echo isset($data[$date][$student['id']]) ? $data[$date][$student['id']] : '-' ?></td>
                        <?php endforeach; ?>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <a href="index.php" class="btn btn-primary">Back</a>

    </div>

</body>
</html>
