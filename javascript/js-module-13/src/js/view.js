import EventEmitter from "../services/event-emitter";
import cardsHbs from "../templates/bookmarks.hbs";

export default class View extends EventEmitter {
  constructor() {
    super();
    this.form = document.querySelector(".form");
    this.container = document.querySelector("#cards");
    this.input = this.form.querySelector(".input");
    this.spinners = document.querySelector(".spinners");

    this.form.addEventListener("submit", this.handleForm.bind(this));
    this.container.addEventListener("click", this.handleRemoveCards.bind(this));

    this.handleData = this.handleData.bind(this);
  }

  handleForm(evt) {
    evt.preventDefault();

    let { value } = this.input;

    value = value.substr(0).toLowerCase();

    this.emit("add", value);
  }

  handleRemoveCards(evt) {
    if (evt.target.nodeName !== "BUTTON") return;
    this.emit("remove", evt.target.id);
  }

  reset() {
    this.spinner();
    this.resetBookmarks();
    this.form.reset();
  }

  handleData(data1) {
    if (data1.data === undefined) {
      this.spinner();
      this.createListBookmarks(data1.arrBookmarks);
      return;
    }

    if (data1.arrUrl.includes(data1.data.url)) {
      this.spinner();
      alert("Закладка вже є!");
      this.createListBookmarks(data1.arrBookmarks);
      return;
    }

    if (data1.data.image === "") {
      data1.data.image = "https://placehold.it/350x125/8FBC8F/ffffff/";
    }

    this.spinner();

    return data1.data;
  }

  createListBookmarks(arr) {
    const markup = arr.reduce(function(acc, url, idx) {
      url.idx = idx;
      return cardsHbs({ url }) + acc;
    }, "");
    this.updateBookmarks(markup);
  }

  updateBookmarks(markup) {
    this.container.insertAdjacentHTML("beforeend", markup);
  }

  resetBookmarks() {
    this.container.innerHTML = "";
  }

  spinner() {
    this.spinners.classList.toggle("visible");
  }

  updateCards(arr) {
    this.resetBookmarks();
    this.createListBookmarks(arr);
  }
}
