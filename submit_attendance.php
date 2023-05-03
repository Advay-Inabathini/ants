<?php
    // Connect to the database
    $host = "localhost";
    $user = "root";
    $password = "lenovo";
    $database = "mydb";
    $conn = mysqli_connect($host, $user, $password, $database);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Get the date and attendance data from the POST request
    $date = $_POST['date'];
    $attendance_data = $_POST['attendance_data'];

    // Update the attendance table for each student
    foreach ($attendance_data as $student_id => $status) {
        $sql = "INSERT INTO attendance (student_id, date, status) VALUES ('$student_id', '$date', '$status')
                ON DUPLICATE KEY UPDATE status='$status'";
        if (!mysqli_query($conn, $sql)) {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
    }

    // Close the database connection
    mysqli_close($conn);
?>
