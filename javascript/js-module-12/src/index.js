import "./normalize.css";
import "./styles.css";
import cardsHbs from "./templates/bookmarks.hbs";
import { apiBookmarks } from "./services/api";
import { LOCALSTORAGE } from "./services/storage";

const form = document.querySelector(".form");
const input = form.querySelector(".input");
const container = document.querySelector("#cards");
const spinners = document.querySelector(".spinners");

let arrUrl = LOCALSTORAGE.get("arr-url");
if (arrUrl === null) arrUrl = [];

let arrBookmarks = LOCALSTORAGE.get("arr-bookmarks");
arrBookmarks === null ? (arrBookmarks = []) : createListBookmarks();

container.addEventListener("click", handleCards);

function handleCards(evt) {
  if (evt.target.nodeName !== "BUTTON") return;
  arrUrl.splice(evt.target.id, 1);
  setLocalstorage("arr-url", arrUrl);
  arrBookmarks.splice(evt.target.id, 1);
  setLocalstorage("arr-bookmarks", arrBookmarks);
  resetBookmarks();
  createListBookmarks();
}

form.addEventListener("submit", handleForm);

function handleForm(evt) {
  evt.preventDefault();
  spinner();
  let { value } = input;

  value = value.substr(0).toLowerCase();
  resetBookmarks();
  handleRequest(value);
  form.reset();
}

function handleRequest(value) {
  apiBookmarks(value).then(data => {
    if (data === undefined) {
      spinner();
      createListBookmarks();
      return;
    }

    if (arrUrl.includes(data.url)) {
      spinner();
      alert("Закладка вже є!");
      createListBookmarks();
      return;
    }

    if (data.image === "") {
      data.image = "https://placehold.it/350x125/8FBC8F/ffffff/";
    }

    spinner();
    arrBookmarks.push(data);
    arrUrl.push(data.url);
    setLocalstorage("arr-bookmarks", arrBookmarks);
    setLocalstorage("arr-url", arrUrl);
    createListBookmarks();
  });
}

function createListBookmarks() {
  const markup = arrBookmarks.reduce(function(acc, url, idx) {
    url.idx = idx;
    return cardsHbs({ url }) + acc;
  }, "");
  updateBookmarks(markup);
}

function updateBookmarks(markup) {
  container.insertAdjacentHTML("beforeend", markup);
}

function setLocalstorage(key, value) {
  LOCALSTORAGE.set(key, value);
}

function resetBookmarks() {
  container.innerHTML = "";
}

function spinner() {
  spinners.classList.toggle("visible");
}
