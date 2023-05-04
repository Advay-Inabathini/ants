<?php
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

// Update the value of the attendancetaken attribute to "yes"
$sql = "UPDATE attendance SET yesno='yes' WHERE id=1";

if ($conn->query($sql) === TRUE) {
  echo "Attendance taken!";
} else {
  echo "Error updating attendance: " . $conn->error;
}

$conn->close();
?>
