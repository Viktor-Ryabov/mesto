export class FormValidator {
  constructor(validationConfig, popupForm) {
    this._form = popupForm;
    this._formSelector = validationConfig.formSelector;
    this._inputField = validationConfig.inputField;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputError = validationConfig.inputError;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputField));
    this._errors = Array.from(this._form.querySelectorAll(this._inputError));
    this._buttonRR = this._form.querySelector(this._submitButtonSelector);
  }

  //Выключение кнопки сабмита
  disableSubmitButton() {
    this._buttonRR.disabled = true;
  }

  _toggleButtonState() {
    if (this._isFormNotValid()) {
      this._button.disabled = true;
//      console.log("form not valid");
    } else {
      this._button.disabled = false;
//      console.log("form valid");
    }
  }

  _isFormNotValid() {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Проверка элемента формы на валидность
  _isValid(field) {
    this._field = field;
    this._errorElement = this._form.querySelector(`#${this._field.id}-error`);
    if (!this._field.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  //* Отображение сообщения об ошибке
  _showInputError() {
    this._errorElement.textContent = this._field.validationMessage;
  }

  // Скрытие сообщения об ошибке
  _hideInputError() {
    this._errorElement.textContent = "";
  }

  //* Скрытие ошибок и очистка полей
  hideAllErrors() {
    this._errors.forEach((error) => {
      error.textContent = "";
    });
  }

  //* Установка слушателей
  _setEventListeners() {
    this._button = this._form.querySelector(this._submitButtonSelector);
    // this._toggleButtonState();
    this._inputs.forEach((element) => {
      element.addEventListener("input", () => {
        this._isValid(element);
        this._toggleButtonState();
      });
    });
  }

  //* Валидация форм
  enableValidation() {
    this._setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._toggleButtonState();
  }
}