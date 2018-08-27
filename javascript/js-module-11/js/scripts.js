"use strict";

const laptops = [
  {
    size: 13,
    color: "white",
    price: 28000,
    release_date: 2015,
    name: "Macbook Air White 13",
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "gray",
    price: 32000,
    release_date: 2016,
    name: "Macbook Air Gray 13",
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "black",
    price: 35000,
    release_date: 2017,
    name: "Macbook Air Black 13",
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "white",
    price: 45000,
    release_date: 2015,
    name: "Macbook Air White 15",
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "gray",
    price: 55000,
    release_date: 2016,
    name: "Macbook Pro Gray 15",
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "black",
    price: 45000,
    release_date: 2017,
    name: "Macbook Pro Black 15",
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "white",
    price: 65000,
    release_date: 2015,
    name: "Macbook Air White 17",
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "gray",
    price: 75000,
    release_date: 2016,
    name: "Macbook Pro Gray 17",
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "black",
    price: 80000,
    release_date: 2017,
    name: "Macbook Pro Black 17",
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  }
];

const container = document.querySelector(".laptops");
const form = document.querySelector(".js-form");
const source = document.querySelector("#cards").innerHTML.trim();
const template = Handlebars.compile(source);
const filterr = { size: [], color: [], release_date: [] };
let resultFilter = [];

const mark = laptops.reduce((acc, item) => acc + template({ item }), "");
container.insertAdjacentHTML("afterbegin", mark);

form.addEventListener("click", handleForm);

function handleForm(evt) {
  if (evt.target.nodeName !== "INPUT" && evt.target.nodeName !== "BUTTON")
    return;
  if (evt.target.type === "reset") {
    if (
      filterr.size.length < 1 &&
      filterr.color.length < 1 &&
      filterr.release_date.length < 1
    )
      return;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    const mark = laptops.reduce((acc, item) => acc + template({ item }), "");
    container.insertAdjacentHTML("afterbegin", mark);
    filterr.size = [];
    filterr.color = [];
    filterr.release_date = [];
    return;
  }

  if (filterr[evt.target.name].includes(evt.target.value)) {
    const index = filterr[evt.target.name].indexOf(evt.target.value);
    filterr[evt.target.name].splice(index, 1);
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    if (
      filterr.size.length === 0 &&
      filterr.color.length === 0 &&
      filterr.release_date.length === 0
    ) {
      const mark = laptops.reduce((acc, item) => acc + template({ item }), "");
      container.insertAdjacentHTML("afterbegin", mark);
      return;
    }
  } else {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    filterr[evt.target.name].push(evt.target.value);
  }

  if (
    filterr.size.length > 0 &&
    filterr.color.length > 0 &&
    filterr.release_date.length > 0
  ) {
    if (
      (filterr.size.length > 2 &&
        filterr.color.length > 2 &&
        filterr.release_date.length > 2) ||
      (filterr[evt.target.name] !== "release_date" &&
        filterr.release_date.length === 3)
    ) {
      resultFilter = laptops
        .filter(
          obj =>
            obj.size == filterr.size[0] ||
            obj.size == filterr.size[1] ||
            obj.size == filterr.size[2]
        )
        .filter(
          obj =>
            obj.release_date == filterr.release_date[0] ||
            obj.release_date == filterr.release_date[1] ||
            (obj.release_date == filterr.release_date[2] &&
              obj.size == filterr.size[0]) ||
            obj.size == filterr.size[1] ||
            obj.size == filterr.size[2]
        )
        .filter(
          obj =>
            obj.color == filterr.color[0] ||
            obj.color == filterr.color[1] ||
            obj.color == filterr.color[2]
        );
    } else {
      resultFilter = laptops
        .filter(
          obj =>
            obj.size == filterr.size[0] ||
            obj.size == filterr.size[1] ||
            obj.size == filterr.size[2]
        )
        .filter(
          obj =>
            obj.release_date == filterr.release_date[0] ||
            obj.release_date == filterr.release_date[1] ||
            (obj.release_date == filterr.release_date[2] &&
              obj.size == filterr.size[0])
        )
        .filter(
          obj =>
            obj.color == filterr.color[0] ||
            obj.color == filterr.color[1] ||
            obj.color == filterr.color[2]
        );
    }
  } else if (filterr.size.length > 0 && filterr.color.length > 0) {
    resultFilter = laptops
      .filter(
        obj =>
          obj.size == filterr.size[0] ||
          obj.size == filterr.size[1] ||
          obj.size == filterr.size[2]
      )
      .filter(
        obj =>
          obj.color == filterr.color[0] ||
          obj.color == filterr.color[1] ||
          obj.color == filterr.color[2]
      );
  } else if (filterr.size.length > 0 && filterr.release_date.length > 0) {
    resultFilter = laptops
      .filter(
        obj =>
          obj.size == filterr.size[0] ||
          obj.size == filterr.size[1] ||
          obj.size == filterr.size[2]
      )
      .filter(
        obj =>
          obj.release_date == filterr.release_date[0] ||
          obj.release_date == filterr.release_date[1] ||
          obj.release_date == filterr.release_date[2]
      );
  } else if (filterr.color.length > 0 && filterr.release_date.length > 0) {
    resultFilter = laptops
      .filter(
        obj =>
          obj.color == filterr.color[0] ||
          obj.color == filterr.color[1] ||
          obj.color == filterr.color[2]
      )
      .filter(
        obj =>
          obj.release_date == filterr.release_date[0] ||
          obj.release_date == filterr.release_date[1] ||
          obj.release_date == filterr.release_date[2]
      );
  } else {
    resultFilter = laptops.filter(
      obj =>
        obj.size == filterr.size[0] ||
        obj.size == filterr.size[1] ||
        obj.size == filterr.size[2] ||
        obj.color == filterr.color[0] ||
        obj.color == filterr.color[1] ||
        obj.color == filterr.color[2] ||
        obj.release_date == filterr.release_date[0] ||
        obj.release_date == filterr.release_date[1] ||
        obj.release_date == filterr.release_date[2]
    );
  }
  if (resultFilter.length === 0) {
    container.textContent = "Товара по выбранным критериям нет!";
  } else {
    const markup = resultFilter.reduce(
      (acc, item) => acc + template({ item }),
      ""
    );
    container.insertAdjacentHTML("afterbegin", markup);
  }
}
