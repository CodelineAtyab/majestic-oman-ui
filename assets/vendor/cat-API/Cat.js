const url = "https://api.thecatapi.com/v1/images/search";
const section = document.querySelector(".container");
const button = document.querySelector(".btn");

section.classList.add("cats");

button.addEventListener("click", getRandomCats);

randomCatPhoto = (json) => {
  let photo = json[0].url;

  let image = document.createElement("img");
  image.style.display="flex";
  image.src = photo;
  image.classList.add("random_cats");
  image.alt = photo;

  image.style.border="3px solid black";
  image.style.borderRadius="200px 100px 200px 100px";
  section.appendChild(image);
};

async function getRandomCats() {
  section.innerHTML = "";
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log("JSON:", json);
    return randomCatPhoto(json);
  } catch (e) {
    console.log("This is an error");
    console.log(e);
  }
}