const getSpecificPhotoBaseUrl = `http://${serverAddress}:${serverPort}/api/v1/picturesContent`;
const getAllPhotosJsonBaseUrl = `${getSpecificPhotoBaseUrl}/data`;

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
        addPicRecordRowInDiv(`${getSpecificPhotoBaseUrl}/${currPicObj.picID}`, currPicObj.picID);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Unable to get all of the photos.");
    });
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
    formData.append("file", fileToUpload);

    var reqHeaders = new Headers();
    reqHeaders.append(
      "Authorization",
      `Basic ${btoa(
        `${localStorage.getItem("LogInUsername")}:${localStorage.getItem(
          "LogInPassword"
        )}`
      )}`
    );

    fetch(getSpecificPhotoBaseUrl, {
      method: "POST",
      headers: reqHeaders,
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);

        addPicRecordRowInDiv(`${getSpecificPhotoBaseUrl}/${data}`, data);
        alert("Photo Uploaded without a title and description.");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Unable to upload the photo.");
      });
  }
};

/*
Utility functions.
*/
//added picid to pic the id of photo to delete it
const addPicRecordRowInDiv = (imageUrl, picID) => {
  // const imageUrl = `${getSpecificPhotoBaseUrl}/${currPicObj.picID}`
  const photoInfoContDiv = document.getElementById("photo_info_container_div");
  const outerContainerDiv = document.createElement("div");
  outerContainerDiv.className = "col-lg-6";
  outerContainerDiv.id = picID;

  const innerContainerDiv = document.createElement("div");
  innerContainerDiv.className = "photo-item d-flex justify-content-between";

  const imgElem = document.createElement("img");
  imgElem.src = imageUrl;
  imgElem.alt = "Photo";
  imgElem.className = "photo-thumbnail";
  imgElem.width = "65";
  imgElem.height = "65";

  const actionContainerDiv = document.createElement("div");
  actionContainerDiv.className = "photo-actions";

  // const updateButton = document.createElement("button");
  // updateButton.className = "btn-update";
  // updateButton.onclick = () => {
  //   console.log("Update Clicked!");
  // };
  // updateButton.innerText = "Update";

  const delButton = document.createElement("button");
  delButton.className = "btn-delete";

  console.log(`Delete button has image id: ${picID}`);
  delButton.onclick = () => confirmDeletePhoto(picID);
  
  delButton.innerText = "Delete";

  // actionContainerDiv.appendChild(updateButton);
  actionContainerDiv.appendChild(delButton);

  innerContainerDiv.appendChild(imgElem);
  innerContainerDiv.appendChild(actionContainerDiv);

  outerContainerDiv.appendChild(innerContainerDiv);
  photoInfoContDiv.append(outerContainerDiv);
};

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

//Function to confirm deletion before making the API call
function confirmDeletePhoto(picId) {
  const isConfirmed = window.confirm(
    `Are you sure you want to delete ${picId}?`
  );

  if (isConfirmed) {
    deletePhoto(picId);
  }
}

//Function to delete a photo
const deletePhoto = (picId) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${btoa(
      `${localStorage.getItem("LogInUsername")}:${localStorage.getItem(
        "LogInPassword"
      )}`
    )}`
  );
  // myHeaders.append("Cookie", "JSESSIONID=227D78B131038368298C107221758AAC");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders
  };

  fetch(`${getSpecificPhotoBaseUrl}/${picId}`, requestOptions)
  .then(response => {
    if (response.ok) {
      console.log("Photo deleted successfully");
      alert("Deleted Successfully!");
      const photoInfoContDiv = document.getElementById("photo_info_container_div");
      photoInfoContDiv.childNodes.forEach(currNode => {if(currNode.id == picId) photoInfoContDiv.removeChild(currNode);})
    } else {
      console.error("Error deleting photo");
      alert("Unable to Delete the photo!");
    }
  })
    .catch((error) => console.log("error", error));
};
