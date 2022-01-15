import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    renderBigImages(cardImage, cardTitle) {
        this._popupElement.querySelector(".popup__foto").src = cardImage;
        this._popupElement.querySelector(".popup__discription").textContent = cardTitle;
        this.setEventListeners()
        this.openPopup()
    }
}
