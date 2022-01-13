import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, { formSubmitCallBack }) {
    super(popupElement);
    this._formSubmitCallBack = formSubmitCallBack;
    this._formSubmit = this._formSubmit.bind(this);
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__field"));
    this._submitButton = this._form.querySelector(".popup__submit-button");
}

  
  // Сабмит
  _formSubmit(event) {
    event.preventDefault();
    this._formSubmitCallBack(this._getInputValues(), this._submitButton);
  }

  // Сбор данных с полей формы
  _getInputValues() {
    const data = {};
    this._inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  // Установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmit);
  }
}