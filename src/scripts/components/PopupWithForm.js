import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, formCallBackSubmit){
    super(popupElement);
    this._formCallBackSubmit = formCallBackSubmit;
    this._formSubmit = this._formSubmit.bind(this);
    this.form = this._popupElement.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__field"));
    this.submitButton = this._form.querySelector(".popup__submit-button");
}

  changeProfileName() {
    console.log("имя сейчас поменяется");
    nameProfile.textContent = nameEditForm.value;
    descriptionProfile.textContent = descriptionEditForm.value;
  }

  setPopupOpenHandler(popupWindow, button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      openPopup(popupWindow);
    });
  }

  openPopup(popupWindow) {
    popupWindow.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
  }

  closePopup(popupWindow) {
    popupWindow.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
  }

  closeByEscape(event) {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      closePopup(openedPopup);
    }
  }

  resetForm(form, button) {
    form.reset();
    button.disabled = true;
  }
}
