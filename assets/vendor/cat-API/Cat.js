const url = "http://omanmajesticapi.servepics.com:8080/api/v1/picturesContent/random";
const section = document.querySelector(".container");
const button = document.querySelector(".btn");

section.classList.add("cats");

button.addEventListener("click", () => {
  let image = document.createElement("img");
  image.style.display="flex";
  image.src = url;
  image.classList.add("random_cats");
  image.alt = url;

  image.style.border="3px solid black";
  image.style.borderRadius="20px 20px 20px 20px";
  image.style.boxShadow="20px 20px 5px #343a3f";
  section.appendChild(image);
});

