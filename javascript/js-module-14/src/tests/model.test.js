import Model from "../js/model";

describe("Model class", () => {
  let model;
  let arrBookmarks;
  let arrUrl;

  beforeEach(() => {
    model = new Model();
    arrBookmarks = model.arrBookmarks.length = 4;
    arrUrl = model.arrUrl.length = 4;
  });

  it("Add item to array", () => {
    model.addData({
      idx: 1,
      title: "Google",
      description: "Search webpages, images, videos and more.",
      image: "https://www.google.com/images/logo.png",
      url: "https://www.google.com/"
    });

    let resultBookmarks = model.arrBookmarks.length - arrBookmarks;
    let resultUrl = model.arrUrl.length - arrUrl;

    expect(resultBookmarks).toBe(1);
    expect(resultUrl).toBe(1);
  });

  it("Remove item from array", () => {
    model.removeData(2);
    let resultBookmarks = arrBookmarks - model.arrBookmarks.length;
    let resultUrl = arrUrl - model.arrUrl.length;

    expect(resultBookmarks).toBe(1);
    expect(resultUrl).toBe(1);
  });
});
