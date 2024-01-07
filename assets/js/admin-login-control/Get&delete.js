const respJson = ["profile-img.jpg", "apple-touch-icon.png"];

respJson.forEach((currPhoto) => {
  console.log(currPhoto);

  console.log("HAHHAHHAHAHHAHHAHAHAHH I AM RUNNNING !!!!!");
  const photoInfoContDiv = document.getElementById(
    "photo_info_container_div"
  );

  const outerContainerDiv = document.createElement("div");
  outerContainerDiv.className = "col-lg-6";

  const innerContainerDiv = document.createElement("div");
  innerContainerDiv.className =
    "photo-item d-flex justify-content-between";

  const imgElem = document.createElement("img");
  imgElem.src = `./assets/img/${currPhoto}`;
  imgElem.alt = "Photo";
  imgElem.className = "photo-thumbnail";
  imgElem.width = "65";
  imgElem.height = "65";

  const actionContainerDiv = document.createElement("div");
  actionContainerDiv.className = "photo-actions";

  const updateButton = document.createElement("button");
  updateButton.className = "btn-update";
  updateButton.onclick = () => {
    console.log("Update Clicked!");
  };
  updateButton.innerText = "Update";

  const delButton = document.createElement("button");
  delButton.className = "btn-delete";
  delButton.onclick = () => confirmDeletePhoto(currPhoto);
  delButton.innerText = "Delete";

  actionContainerDiv.appendChild(updateButton);
  actionContainerDiv.appendChild(delButton);

  innerContainerDiv.appendChild(imgElem);
  innerContainerDiv.appendChild(actionContainerDiv);

  outerContainerDiv.appendChild(innerContainerDiv);
  photoInfoContDiv.append(outerContainerDiv);
  console.log("HAHHAHHAHAHHAHHAHAHAHH I AM EXITING !!!!!");
});

// Function to confirm deletion before making the API call
function confirmDeletePhoto(photoName) {
  const isConfirmed = window.confirm(
    `Are you sure you want to delete ${photoName}?`
  );

  if (isConfirmed) {
    deletePhoto(photoName);
  }
}

// Function to delete a photo
async function deletePhoto(photoName) {
  try {
    // Make an API call to delete the photo
    const response = await fetch(`/api/photos/${photoName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // You may need to include additional headers or authentication tokens
      },
    });

    if (response.ok) {
      console.log(`Photo ${photoName} deleted successfully`);
      // Optionally, you can remove the deleted photo from the UI
      // e.g., outerContainerDiv.remove();
    } else {
      console.error(`Failed to delete photo ${photoName}`);
    }
  } catch (error) {
    console.error("Error deleting photo:", error);
  }
}