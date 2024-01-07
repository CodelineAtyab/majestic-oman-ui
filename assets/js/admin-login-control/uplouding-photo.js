//uplouding js
document
.getElementById("upload-form")
.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents the default form submission

  var formData = new FormData(this);

  fetch("your-upload-endpoint", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      showConfirmationMessage("Photo uploaded successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
      showConfirmationMessage(
        "Error uploading photo. Please try again."
      );
    });
});

function showConfirmationMessage(message) {
// You can customize how the confirmation message is displayed, for example, using an alert or a modal
alert(message);
}