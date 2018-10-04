import { apiBookmarks } from "../services/api";
import { LOCALSTORAGE } from "../services/storage";

export default class Model {
  constructor() {
    this.arrUrl = LOCALSTORAGE.get("arr-url");
    if (this.arrUrl === null) this.arrUrl = [];

    this.arrBookmarks = LOCALSTORAGE.get("arr-bookmarks");
    if (this.arrBookmarks === null) this.arrBookmarks = [];
  }

  request(value) {
    return apiBookmarks(value).then(data => {
      let arrBookmarks = this.arrBookmarks;
      let arrUrl = this.arrUrl;
      let data1 = {
        data,
        arrBookmarks,
        arrUrl
      };
      return data1;
    });
  }

  addData(data) {
    this.arrBookmarks.push(data);
    this.arrUrl.push(data.url);
    this.setLocalstorage("arr-bookmarks", this.arrBookmarks);
    this.setLocalstorage("arr-url", this.arrUrl);
  }

  removeData(id) {
    this.arrUrl.splice(id, 1);
    this.setLocalstorage("arr-url", this.arrUrl);
    this.arrBookmarks.splice(id, 1);
    this.setLocalstorage("arr-bookmarks", this.arrBookmarks);
  }

  setLocalstorage(key, value) {
    LOCALSTORAGE.set(key, value);
  }
}
