<?php

// Database configuration
$servername = "localhost";
$username = "root";
$password = "lenovo";
$dbname = "mydb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// SQL query to select all students
$sql = "SELECT * FROM student";
$result = $conn->query($sql);

// Initialize an empty array to hold the results
$students = array();

// Loop through the query results and add each student to the array
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $students[] = $row;
  }
}

// Return the results as JSON
header('Content-Type: application/json');
echo json_encode($students);

// Close the connection
$conn->close();

?>
