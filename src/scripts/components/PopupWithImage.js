import { Popup } from "./Popup.js";

// export class PopupWithImage extends Popup {
//     renderBigImages(cardImage, cardTitle) {
//         this._popupElement.querySelector(".popup__foto").src = cardImage;
//         this._popupElement.querySelector(".popup__discription").textContent = cardTitle;
//         // this.setEventListeners()
//         this.openPopup()
//     }
// }

export class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._popupImage = this._popupElement.querySelector(".popup__foto");
        this._popupTitle = this._popupElement.querySelector(".popup__discription");
    }

    openPopup(cardImage, cardTitle) {
        super.openPopup()
        this._popupImage.src = cardImage;
        this._popupImage.alt = cardTitle;
        this._popupTitle.textContent = cardTitle;
    }
}
