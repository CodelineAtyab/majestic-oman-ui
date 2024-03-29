const serverAddress = `${window.location.hostname}`;
const serverPort = "8080";
const loginURL =`http://${serverAddress}:${serverPort}/api/v1/login`;

function hashPassword(password) {
    // Hash the password using SHA-256
    var hashedPassword = CryptoJS.SHA256(password).toString(
      CryptoJS.enc.Hex
    );

    return hashedPassword;
  }

const adminLoginModal = document.getElementById("admin-login-modal");

function openAdminLoginModal() {
  adminLoginModal.style.display = "block";
}

function closeAdminLoginModal() {
    document.getElementById("admin-login-modal").style.display = "none";
  }

function submitAdminCredentials() {
  var username = "admin";
  const enteredPassword = document.getElementById("admin-password").value;
  const hashedPassword = hashPassword(enteredPassword);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: username,
    password: hashedPassword,
  });

  var requestOptions = {
    //mode: 'no-cors',
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(loginURL, requestOptions)
    .then((response) => {
      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("LogInUsername", username);
        localStorage.setItem("LogInPassword", hashedPassword);
        closeAdminLoginModal();
        location.reload();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log("error", error);
      alert("Unable to Login!");
    });
}


// Function to handle logout
function logout() {
  localStorage.clear();
  // Redirect to the login page or perform any other desired actions
  window.location.href = "admin_control_panel.html"; // Replace with your login page URL
}
