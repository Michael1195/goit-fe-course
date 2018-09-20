import axios from "axios";
const API_KEY = "5b95238f42be97ea9f068a460ee6c285e7ca7af850c51";

export const apiBookmarks = (url) => {
  return axios
    .get(`http://api.linkpreview.net/?key=${API_KEY}&q=${url}`)
    .then(res => res.data)
    .catch(err => alert(`axios err : ${err}`));
}
