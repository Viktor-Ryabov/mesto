//* Класс размещения карточек на странице
export class Section {
  constructor({ renderItems }, containerSelector) {
    this._renderer = renderItems;
    this._container = containerSelector;
  }

  //* Рендер карточек
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  //* Добавление карточки
  addItem(element) {
    this._container.prepend(element);
  }
}
