export class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._popupCloseButton = this._popupElement.querySelector(".popup__close-icon");
        this._closeByEscape = this._closeByEscape.bind(this);
    }

    openPopup() {
        document.addEventListener("keyup", this._closeByEscape);
        this._popupElement.classList.add("popup_opened");
    }

    closePopup() {
        document.removeEventListener("keyup", this._closeByEscape);
        this._popupElement.classList.remove("popup_opened");
    }

    _closeByEscape(event) {
        if (event.key === "Escape") {
            this.closePopup();
        }
    }

    _closeByOverlayClick(event) {
        if (event.type === "click") {
            if (event.target === event.currentTarget) {
                this.closePopup();
            }
        }
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener("click", () => {
            this.closePopup();
        });
        this._popupElement.addEventListener("click", (event) => {
            this._closeByOverlayClick(event);
        });
    }
}
