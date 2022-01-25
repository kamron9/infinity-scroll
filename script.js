const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// unsplash api
const count = 30;
const apiKey = "YoiBNWPKmitaSwcGgoUovQz5M8mKP7vw--2QaHurJHI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  console.log("img loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("ready", ready);
  }
}

// create elements for link and images, add to DOM
function displayPhoto() {
  totalImages = photoArray.length;
  console.log("total", totalImages);
  photoArray.forEach((photo) => {
    //   create <a> to link to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    // event lister , check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // put img inside link, paste both inside imgContainer element
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

// get photo unsplash api
async function getPhoto() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhoto();
    console.log(phoroArray);
  } catch (error) {}
}

// check to see if scroll near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhoto();
    console.log("loader");
  }
});
getPhoto();
