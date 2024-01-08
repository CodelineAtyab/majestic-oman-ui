const hostName = window.location.hostname;
const hostPort = 8080;
const getAllPhotosJsonBaseUrl = "http://omanmajesticapi.servepics.com:8080/api/v1/PicturesContent/data";
const getSpecificPhotoBaseUrl = `http://omanmajesticapi.servepics.com:8080/api/v1/PicturesContent`

/*
Render existing Photo's list view.
*/
const getAndRenderAllPhotoList = () => {
  fetch(`${getAllPhotosJsonBaseUrl}`)
  .then((response) => {
    return response.json();
  })
  .then((jsonResponse) => {
    jsonResponse.forEach((currPicObj) => {
      console.log(currPicObj.picID);
      addPicRecordRowInDiv(`${getSpecificPhotoBaseUrl}/${currPicObj.picID}`);
    })
  }).catch(error => {
    console.error('Error:', error);
    alert("Unable to get all of the photos.")
  })
};
getAndRenderAllPhotoList();

/*
Handle the Photo uploads through upload form.
*/
document.getElementById("upload-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const photoFile = document.getElementById("photoInput").files[0];
  uploadSelectedPhoto(photoFile);
});

const uploadSelectedPhoto = (fileToUpload) => {
  if (fileToUpload) {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      fetch(getSpecificPhotoBaseUrl, {
          method: 'POST',
          body: formData,
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        // TODO: Update the API and use the ID in response
        // addPicRecordRowInDiv(`${getSpecificPhotoBaseUrl}/${currPicObj.picID}`);
        alert("Photo Uploaded without a title and description.");
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Unable to upload the photo.")
      });
  }
};

/*
Utility functions.
*/
const addPicRecordRowInDiv = (imageUrl) => {
  const photoInfoContDiv = document.getElementById("photo_info_container_div");
  const outerContainerDiv = document.createElement("div");
  outerContainerDiv.className = "col-lg-6";

  const innerContainerDiv = document.createElement("div");
  innerContainerDiv.className =
    "photo-item d-flex justify-content-between";

  const imgElem = document.createElement("img");
  imgElem.src = imageUrl;
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
}

// const respJson = ["profile-img.jpg", "apple-touch-icon.png"];

// respJson.forEach((currPhoto) => {
//   console.log(currPhoto);

//   console.log("HAHHAHHAHAHHAHHAHAHAHH I AM RUNNNING !!!!!");
//   const photoInfoContDiv = document.getElementById(
//     "photo_info_container_div"
//   );

//   const outerContainerDiv = document.createElement("div");
//   outerContainerDiv.className = "col-lg-6";

//   const innerContainerDiv = document.createElement("div");
//   innerContainerDiv.className =
//     "photo-item d-flex justify-content-between";

//   const imgElem = document.createElement("img");
//   imgElem.src = `./assets/img/${currPhoto}`;
//   imgElem.alt = "Photo";
//   imgElem.className = "photo-thumbnail";
//   imgElem.width = "65";
//   imgElem.height = "65";

//   const actionContainerDiv = document.createElement("div");
//   actionContainerDiv.className = "photo-actions";

//   const updateButton = document.createElement("button");
//   updateButton.className = "btn-update";
//   updateButton.onclick = () => {
//     console.log("Update Clicked!");
//   };
//   updateButton.innerText = "Update";

//   const delButton = document.createElement("button");
//   delButton.className = "btn-delete";
//   delButton.onclick = () => confirmDeletePhoto(currPhoto);
//   delButton.innerText = "Delete";

//   actionContainerDiv.appendChild(updateButton);
//   actionContainerDiv.appendChild(delButton);

//   innerContainerDiv.appendChild(imgElem);
//   innerContainerDiv.appendChild(actionContainerDiv);

//   outerContainerDiv.appendChild(innerContainerDiv);
//   photoInfoContDiv.append(outerContainerDiv);
//   console.log("HAHHAHHAHAHHAHHAHAHAHH I AM EXITING !!!!!");
// });

// Function to confirm deletion before making the API call
// function confirmDeletePhoto(photoName) {
//   const isConfirmed = window.confirm(
//     `Are you sure you want to delete ${photoName}?`
//   );

//   if (isConfirmed) {
//     deletePhoto(photoName);
//   }
// }

// // Function to delete a photo
// async function deletePhoto(photoName) {
//   try {
//     // Make an API call to delete the photo
//     const response = await fetch(`/api/photos/${photoName}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         // You may need to include additional headers or authentication tokens
//       },
//     });

//     if (response.ok) {
//       console.log(`Photo ${photoName} deleted successfully`);
//       // Optionally, you can remove the deleted photo from the UI
//       // e.g., outerContainerDiv.remove();
//     } else {
//       console.error(`Failed to delete photo ${photoName}`);
//     }
//   } catch (error) {
//     console.error("Error deleting photo:", error);
//   }
// }