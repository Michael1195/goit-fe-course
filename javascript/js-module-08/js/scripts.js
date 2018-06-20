"use strict";

const galleryItems = [
  {
    preview: "img/preview-1.jpeg",
    fullview: "img/fullview-1.jpeg",
    alt: "alt text 1"
  },
  {
    preview: "img/preview-2.jpeg",
    fullview: "img/fullview-2.jpeg",
    alt: "alt text 2"
  },
  {
    preview: "img/preview-3.jpeg",
    fullview: "img/fullview-3.jpeg",
    alt: "alt text 3"
  },
  {
    preview: "img/preview-4.jpeg",
    fullview: "img/fullview-4.jpeg",
    alt: "alt text 4"
  }
];

const galleryIte = [
  {
    preview: "img/image/prev-1.jpeg",
    fullview: "img/image/full-1.jpeg",
    alt: "alt text 1"
  },
  {
    preview: "img/image/prev-2.jpeg",
    fullview: "img/image/full-2.jpeg",
    alt: "alt text 2"
  },
  {
    preview: "img/image/prev-3.jpeg",
    fullview: "img/image/full-3.jpeg",
    alt: "alt text 3"
  },
  {
    preview: "img/image/prev-4.jpeg",
    fullview: "img/image/full-4.jpeg",
    alt: "alt text 4"
  }
];

class Gallery {
  constructor({ items, parentNode }) {
    this.items = items;
    this.parentNode = parentNode;
    this.fullviewDiv();
  }

  fullviewDiv() {
    if (this.items.length !== 0) {
      const fullview = document.createElement("div");
      fullview.classList.add("fullview");
      const imgFullview = document.createElement("img");
      imgFullview.classList.add("img-fullview");
      imgFullview.classList.add("js-img-fullview");

      fullview.appendChild(imgFullview);
      this.parentNode.appendChild(fullview);
      this.previewUl();
    }
  }

  previewUl() {
    const previewUl = document.createElement("ul");
    previewUl.classList.add("preview");
    previewUl.classList.add("js-preview");

    this.items.forEach((item, idx) => {
      const li = document.createElement("li");
      const imgPreview = document.createElement("img");
      imgPreview.classList.add("js-preview-img");
      if (idx === 0) {
        imgPreview.classList.add("preview-active");
      }
      imgPreview.setAttribute("src", item.preview);
      imgPreview.setAttribute("data-fullview", item.fullview);
      imgPreview.setAttribute("alt", item.alt);

      li.appendChild(imgPreview);
      previewUl.appendChild(li);
    });

    this.parentNode.appendChild(previewUl);
    const previewImgArr = document.querySelectorAll(".js-preview-img");
    const fullviewImgEl = document.querySelector(".js-img-fullview");
    fullviewImgEl.classList.remove("js-img-fullview");
    this.fullviewImg(previewImgArr, fullviewImgEl);
  }

  fullviewImg(previewImgArr, fullviewImgEl) {
    previewImgArr.forEach(item => {
      if (!item.classList.contains("preview-active")) return;
      fullviewImgEl.setAttribute("src", item.dataset.fullview);
      fullviewImgEl.setAttribute("alt", item.alt);
    });

    this.previewImg(previewImgArr, fullviewImgEl);
  }

  previewImg(previewImgArr, fullviewImgEl) {
    const preview = document.querySelector(".js-preview");
    preview.classList.remove("js-preview");

    preview.addEventListener("click", handlePreviewClick);

    function handlePreviewClick({ target }) {
      if (target.nodeName !== "IMG") return;
      previewImgArr.forEach(item => {
        if (target !== item) {
          item.classList.remove("preview-active");
        } else {
          item.classList.add("preview-active");
        }
      });

      fullviewImgEl.src = target.dataset.fullview;
      fullviewImgEl.alt = target.alt;
    }
  }
}

const imageGallery = document.querySelector(".js-image-gallery");

const gallery1 = new Gallery({
  items: galleryItems,
  parentNode: imageGallery
});

const gallery2 = new Gallery({
  items: galleryIte,
  parentNode: imageGallery
});
