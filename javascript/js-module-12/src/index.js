import "./normalize.css";
import "./styles.css";
import cardsHbs from "./templates/bookmarks.hbs";
import { apiBookmarks } from "./services/api";
import { LOCALSTORAGE } from "./services/storage";

const form = document.querySelector(".form");
const input = form.querySelector(".input");
const container = document.querySelector("#cards");
const spinners = document.querySelector(".spinners");
let valid;
let valid1;
let idx;
let substUrl;
const pattern = /^(http(s)?:\/\/)?(www\.)?[a-z0-9-]{2,63}\.[a-z0-9&=~?#_\/\.-]+[^_\W$]/i;
const pattern1 = /^[-]|[-]\.|\.[-]|(\/|\.|\?|&|=|#){2,}|[{}""''^|\[\]`\\*;@$,+%]|[|\.|\?|&|=|#]$/g;

const patternHttps = /^https:\/\//;
const patternHttp = /^http:\/\//;
const patternWww = /^www\./;
const patternHttpsWww = /^https:\/\/www\./;
const patternHttpWww = /^http:\/\/www\./;

let resultHsW;
let resultHW;
let resultHttps;
let resultHttp;
let resultWww;

let arrUrl = LOCALSTORAGE.get("arr-url");
if (arrUrl === null) arrUrl = [];

let arrBookmarks = LOCALSTORAGE.get("arr-bookmarks");
arrBookmarks !== null ? createListBookmarks() : (arrBookmarks = []);

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

form.addEventListener("click", handleForm);

function handleForm(evt) {
  evt.preventDefault();
  if (evt.target.type !== "submit") return;
  spinner();
  substUrl = input.value;
  substUrl = substUrl.substr(0).toLowerCase();

  valid = pattern.test(substUrl);
  if (!valid) {
    spinner();
    alert("Невалидный url!");
    return;
  }

  testUrl(substUrl);
  handleTestUrl(substUrl);

  valid1 = substUrl.match(pattern1);
  if (valid1 !== null) {
    spinner();
    alert("Невалидный url!");
    return;
  }

  substUrl = pattern.exec(substUrl);

  if (substUrl === null) {
    spinner();
    alert("Невалидный url!");
    return;
  }

  substUrl = substUrl[0];

  if (arrUrl.includes(substUrl)) {
    spinner();
    alert("Закладка вже є!");
    return;
  }

  resetBookmarks();
  handleRequest();
  form.reset();
}

function handleRequest() {
  apiBookmarks(input.value).then(data => {
    spinner();
    if (data === undefined) {
      createListBookmarks();
      return;
    }

    substUrl = data.url;
    substUrl = pattern.exec(substUrl);
    substUrl = substUrl[0];
    testUrl(substUrl);
    handleTestUrl(substUrl);
    arrBookmarks.push(data);
    arrUrl.push(substUrl);
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

function testUrl(url) {
  resultHsW = patternHttpsWww.test(url);
  resultHW = patternHttpWww.test(url);
  resultHttps = patternHttps.test(url);
  resultHttp = patternHttp.test(url);
  resultWww = patternWww.test(url);
}

function handleTestUrl(url) {
  if (resultHsW) {
    handleHttpsWww(url);
  } else if (resultHW) {
    handleHttpWww(url);
  } else if (resultHttps) {
    handleHttps(url);
  } else if (resultHttp) {
    handleHttp(url);
  } else if (resultWww) {
    handleWww(url);
  }
}

function handleHttpsWww(url) {
  idx = url.search(/[^https:\/\/www\.]/);
  sub(url);
}

function handleHttpWww(url) {
  idx = url.search(/[^http:\/\/www\.]/);
  sub(url);
}

function handleHttps(url) {
  idx = url.search(/[^https:\/\/]/);
  sub(url);
}

function handleHttp(url) {
  idx = url.search(/[^http:\/\/]/);
  sub(url);
}

function handleWww(url) {
  idx = url.search(/[^www\.]/);
  sub(url);
}

function sub(url) {
  substUrl = url.substr(idx);
}