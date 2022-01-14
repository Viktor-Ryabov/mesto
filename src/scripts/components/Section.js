//* Класс размещения карточек на странице
export class Section {
  constructor({ renderItems }, containerSelector) {
    this._renderer = renderItems;
    this._container = containerSelector;
  }



  //* Добавление карточки
  addItem(element) {
    this._container.prepend(element);
  }
}
