import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(cardImage, cardTitle) {
        this._cardImage = cardImage;
        this._cardTitle = cardTitle;
    }

    renderImageInPopup() {
        this._cardImage
    }
}
