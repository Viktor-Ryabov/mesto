export class FormValidator {
  constructor(validationConfig, popupForm){
    this._form = popupForm;
    this._formSelector = validationConfig.formSelector;
    this._inputField = validationConfig.inputField;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputError = validationConfig.inputError;
    // this._errorClass = validationConfig.errorClass;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._errors = Array.from(this._form.querySelectorAll(this._inputError));
    // this._button = this._form.querySelector(this._submitButtonSelector);
    this._button = this._form.querySelector(".popup__submit-button");
  }

  //Выключение кнопки сабмита
  _disableSubmitButton() {
    this._button.disabled = true;
  }

  //Переключение состояния кнопки  
  _toggleButtonState = () => {
    if (isFormValid() === true) {
      this._button.disabled = false;
    } else {
      this._disableSubmitButton();
    }
  }

    // Проверка массива инпутов на валидность
    _hasInvalidInputField() {
      return this._inputs.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }

  // Проверка элемента формы на валидность
  _isValid(field) {
    this._field = field;
    this._errorElement = this._form.querySelector(`#${this._field.id}-error`);
    if (!this._field.validity.valid){
      this._showInputError();
      return true;
    } else {
      this._hideInputError();
      return false;
    }
  };

  _getErrorElement() {
    return this._inputField.querySelector(`#${this._inputError.name}-error`);
  } 

  //* Отображение сообщения об ошибке
  _showInputError() {
    // this._inputError = this._inputField.querySelector(`#${this._inputElement}-error`);
    // this._inputError.textContent = this._inputElement.validationMessage;
    console.log(1234);
  };

  // Скрытие сообщения об ошибке
  _hideInputError() {
    this._inputError.textContent = "";
  };

  //* Скрытие ошибок и очистка полей
  hideAllErrors() {
    this._errors.forEach((error) => {
      error.textContent = "";
    });
    this._disableSubmitButton();
  }

  //* Установка слушателей
  _setEventListeners() {
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._disableSubmitButton();
    //* Деактивация кнопки после отправки
    this._inputs.forEach((element) => {
      element.addEventListener("input", () => {
        this._isValid(element);
        this._toggleSubmit();
      });
    });
  }

  //* Валидация форм
  enableValidation(){
    this._setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    })
    this._disableSubmitButton();
  }
}

  // _checkInputValidity = (inputElement, formElement) => {
  //   if (inputElement.validity.valid) {
  //     hideInputError(inputElement, formElement);
  //   } else {
  //     showInputError(inputElement, formElement);
  //   }
  // };

  // _setEvenListeners = (formElement) => {
  //   formElement.addEventListener("submit", (event) => {
  //     event.preventDefault();
  //   });

  //   const inputList = Array.from(
  //     formElement.querySelectorAll(config.inputSelector)
  //   );

  //   const submitButton = formElement.querySelector(config.buttonSelector);

  //   inputList.forEach((inputElement) => {
  //     inputElement.addEventListener("input", () => {
  //       checkInputValidity(inputElement, formElement);
  //       toggleButtonState(submitButton, inputList);
  //     });
  //   });
  //   toggleButtonState(submitButton, inputList);
  // };

  // formList = Array.from(document.querySelectorAll(config.formSelector));
  // formList.forEach((formElement) => {
  //   setEvenListeners(formElement);
  // });
















// export const turnOnValidation = (config) => {

//   const isFormValid = (inputList) =>
//     inputList.every((inputElement) => inputElement.validity.valid);

//   const getErrorElement = (inputElement, formElement) =>
//     formElement.querySelector(`#${inputElement.name}-error`);

//   const hideInputError = (inputElement, formElement) => {
//     const errorElement = getErrorElement(inputElement, formElement);
//     errorElement.textContent = "";
//   };

//   const showInputError = (inputElement, formElement) => {
//     const errorElement = getErrorElement(inputElement, formElement);
//     errorElement.textContent = inputElement.validationMessage;
//   };

//   const toggleButtonState = (submitButton, inputList) => {
//     if (isFormValid(inputList)) {
//       submitButton.disabled = false;
//     } else {
//       submitButton.disabled = true;
//     }
//   };

//   const checkInputValidity = (inputElement, formElement) => {
//     if (inputElement.validity.valid) {
//       hideInputError(inputElement, formElement);
//     } else {
//       showInputError(inputElement, formElement);
//     }
//   };

//   const setEvenListeners = (formElement) => {
//     formElement.addEventListener("submit", (event) => {
//       event.preventDefault();
//     });

//     const inputList = Array.from(
//       formElement.querySelectorAll(config.inputSelector)
//     );

//     const submitButton = formElement.querySelector(config.buttonSelector);

//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener("input", () => {
//         checkInputValidity(inputElement, formElement);
//         toggleButtonState(submitButton, inputList);
//       });
//     });
//     toggleButtonState(submitButton, inputList);
//   };
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     setEvenListeners(formElement);
//   });
// };
