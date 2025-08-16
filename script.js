document.getElementById("submitBtn").addEventListener("click", function () {
  let form = document.getElementById("registerForm");
  let errorMsg = document.getElementById("errorMsg");

  // basic validation
  if (!form.checkValidity()) {
    errorMsg.textContent = "❌ Please complete all required fields.";
    return;
  }

  let idFile = document.getElementById("idupload").files[0];
  let faceFile = document.getElementById("face").files[0];
  let formName = form.name.value.trim().toLowerCase();
  let idName = form.idName.value.trim().toLowerCase();

  if (!idFile || !faceFile) {
    errorMsg.textContent = "❌ Please upload both ID and Face.";
    return;
  }

  errorMsg.textContent = "⏳ Validating face and ID details...";

  // simulate fast check
  setTimeout(() => {
    // check #1: face vs id (demo by filename)
    if (idFile.name.split(".")[0] !== faceFile.name.split(".")[0]) {
      errorMsg.textContent = "❌ Face does not match with ID. Registration failed.";
      return;
    }

    // check #2: name vs id name
    if (formName !== idName) {
      errorMsg.textContent = "❌ The name you entered does not match the name on the ID.";
      return;
    }

    // If both pass → show receipt
    errorMsg.textContent = "";

    document.getElementById("rName").textContent = form.name.value;
    document.getElementById("rAge").textContent = form.age.value;
    document.getElementById("rAddress").textContent = form.address.value;
    document.getElementById("rPhone").textContent = form.phone.value;
    document.getElementById("rChildren").textContent = form.children.value;
    document.getElementById("rJob").textContent = form.job.value;
    document.getElementById("rIdType").textContent = form.idtype.value;

    let idReader = new FileReader();
    idReader.onload = e => document.getElementById("rIdUpload").src = e.target.result;
    idReader.readAsDataURL(idFile);

    let faceReader = new FileReader();
    faceReader.onload = e => document.getElementById("rFace").src = e.target.result;
    faceReader.readAsDataURL(faceFile);

    form.style.display = "none";
    document.getElementById("receipt").style.display = "block";
  }, 1200);
});