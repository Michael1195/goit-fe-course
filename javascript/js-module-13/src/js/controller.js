export default class Controller {
  constructor(model, view) {
    (this.model = model), (this.view = view);
    this.view.createListBookmarks(this.model.arrBookmarks);

    view.on("add", this.createListBookmarks.bind(this));
    view.on("remove", this.handleRemoveCards.bind(this));
  }

  createListBookmarks(value) {
    this.view.reset();
    this.model
      .request(value)
      .then(this.view.handleData)
      .then(data => {
        if (data === undefined) return;
        this.model.addData(data);
        this.view.createListBookmarks(this.model.arrBookmarks);
      });
  }

  handleRemoveCards(id) {
    this.model.removeData(id);
    this.view.updateCards(this.model.arrBookmarks);
  }
}
