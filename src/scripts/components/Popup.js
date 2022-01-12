export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    // this._popupOverlay = this._popupElement.querySelector(".popup__overlay");
    // this._popupWindow = document.querySelector(`#${this.popupElement}`);
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

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.closePopup();
    });
  }
}
