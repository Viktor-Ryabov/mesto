
export class FormValidator {
  constructor(validationConfig, popupForm) {
    this._form = popupForm;
    this._formSelector = validationConfig.formSelector;
    this._inputField = validationConfig.inputField;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputError = validationConfig.inputError;
    console.log(this._inputError);
    this._inputs = Array.from(this._form.querySelectorAll(this._inputField));
    this._errors = Array.from(this._form.querySelectorAll(this._inputError));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  //Выключение кнопки сабмита
  _disableSubmitButton() {
    this._submitButton.disabled = true;
  }

  _toggleButtonState() {
    if (this._isFormNotValid()) {
      this._disableSubmitButton();
    } else {
      this._submitButton.disabled = false;
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
    console.log(this._inputError);
  }

  //* Скрытие ошибок и очистка полей
  _hideAllErrors() {
    this._errors.forEach((error) => {
      error.textContent = "";
    });
  }

  //* Установка слушателей
  _setEventListeners() {
    this._inputs.forEach((element) => {
      element.addEventListener("input", () => {
        this._isValid(element);
        this._toggleButtonState();
      });
    });
  }

  resetValidation(){
    this._toggleButtonState();
    this._hideAllErrors();
    // this._inputs.forEach((element) => {
    //   this._hideInputError(element)
    // });
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