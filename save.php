<?php
// Folder para sa uploads
$uploadDir = "uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// File para sa database (text file)
$file = "registrations.txt";

// Data mula sa form
$name = $_POST['name'] ?? '';
$age = $_POST['age'] ?? '';
$address = $_POST['address'] ?? '';
$phone = $_POST['phone'] ?? '';
$children = $_POST['children'] ?? '';
$job = $_POST['job'] ?? '';
$idtype = $_POST['idtype'] ?? '';

// Handle file uploads
$idPath = "";
$facePath = "";

if (isset($_FILES['idupload']) && $_FILES['idupload']['error'] === UPLOAD_ERR_OK) {
    $idPath = $uploadDir . time() . "_id_" . basename($_FILES['idupload']['name']);
    move_uploaded_file($_FILES['idupload']['tmp_name'], $idPath);
}

if (isset($_FILES['face']) && $_FILES['face']['error'] === UPLOAD_ERR_OK) {
    $facePath = $uploadDir . time() . "_face_" . basename($_FILES['face']['name']);
    move_uploaded_file($_FILES['face']['tmp_name'], $facePath);
}

// Format ng data na mase-save
$data = "Name: $name | Age: $age | Address: $address | Phone: $phone | Children: $children | Job: $job | ID: $idtype | ID File: $idPath | Face File: $facePath\n";

// Save sa registrations.txt
file_put_contents($file, $data, FILE_APPEND | LOCK_EX);

// Output (silent para hindi magulo ang receipt)
echo "saved";
?>