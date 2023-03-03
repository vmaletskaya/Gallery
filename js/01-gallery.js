import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

const galleryImagesMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}", data-source="${original}", alt="${description}"/></a></div>`
  )
  .join(" ");

galleryContainer.insertAdjacentHTML("beforeend", galleryImagesMarkup);

galleryContainer.addEventListener("click", handleMouseClick);

function handleMouseClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();
  const originImageSrc = event.target.dataset.source;
  const instance = basicLightbox.create(
    `
    <img src="${originImageSrc}">
`,
    {
      onShow: (instance) => {
        galleryContainer.addEventListener("keydown", handleEscClose);
      },

      onClose: (instance) => {
        galleryContainer.removeEventListener("keydown", handleEscClose);
      },
    }
  );
  instance.show();
  function handleEscClose(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
}
