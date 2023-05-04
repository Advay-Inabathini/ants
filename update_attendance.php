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

// Handle incoming form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $student_id = $_POST["student_id"];
  $attendance_status = $_POST["attendance_status"];
  
  // Update the attendance status for the selected student
  $sql = "UPDATE students SET status='$attendance_status' WHERE id='$student_id'";
  
  if ($conn->query($sql) === TRUE) {
    // Return a success message if the update was successful
    $response = array("status" => "success", "message" => "Attendance status updated successfully.");
  } else {
    // Return an error message if the update failed
    $response = array("status" => "error", "message" => "Error updating attendance status: " . $conn->error);
  }
  
  // Send the response back to the client as JSON
  header('Content-Type: application/json');
  echo json_encode($response);
}

// Close the connection
$conn->close();

?>
