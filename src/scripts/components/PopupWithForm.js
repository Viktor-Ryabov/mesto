import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, formCallBackSubmit){
    super(popupElement);
    this._formCallBackSubmit = formCallBackSubmit;
    this._formSubmit = this._formSubmit.bind(this);
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__field"));
    this.submitButton = this._form.querySelector(".popup__submit-button");
}

  
  //* Сабмит формы
  _formSubmit(evt) {
    evt.preventDefault();
    this._formSubmitCallBack(this._getInputValues(), this._submitButton);
  }

  //* Метод сбора данных со всех полей формы
  _getInputValues() {
    const data = {};
    this._inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  //* Перезапись родительского метода закрытия попапа
  close() {
    super.close();
    this._form.reset();
  }

  //* Перезапись родительского метода установки слушателей
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmit);
  }
}