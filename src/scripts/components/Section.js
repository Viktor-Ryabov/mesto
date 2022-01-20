//* Класс размещения карточек на странице

export class Section {
    constructor({ renderItems }, cardTemplate) {
        this._renderer = renderItems;
        this._cardTemplate = cardTemplate;
    }

    renderItems(items) {
        items.reverse().forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(item) {
        this._cardTemplate.prepend(item);
    }
}
