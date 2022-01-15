export class FormValidator {
  constructor(validationConfig, popupForm){
    this._form = popupForm;
    this._formSelector = validationConfig.formSelector;
    this._inputField = validationConfig.inputField;
    this._submitButton = validationConfig.submitButton;
    // this._inputError = validationConfig.inputError;
    this._errorClass = validationConfig.errorClass;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    // this._errors = Array.from(this._form.querySelectorAll(this._inputError));
  }

    //* Дизейбл кнопки сабмита

  //Переключение состояния кнопки  
  _toggleButtonState = () => {
    if (isFormValid(inputList)) {
      this._submitButton.disabled = false;
    } else {
      this._submitButton.disabled = true;
    }
  }

  _getErrorElement (inputElement) {
    this._inputField.querySelector(`#${inputElement.id}-error`);
  }

  _showInputError = (inputElement, formElement) => {
    const errorElement = getErrorElement(inputElement, formElement);
    errorElement.textContent = inputElement.validationMessage;
  };

  _isFormValid = (inputList) => {
    this._element = inputList;
    this._inputElement = this._inputField.querySelector(`#${this._element.id}-error`);
    if (!this._inputElement.validity.valid){
      showInputError();
    } else {
      hideInputError();
    }
  };  
  


  


  enableValidation(){

  }

  



  _hideInputError = (inputElement, formElement) => {
    const errorElement = getErrorElement(inputElement, formElement);
    errorElement.textContent = "";
  };




  _checkInputValidity = (inputElement, formElement) => {
    if (inputElement.validity.valid) {
      hideInputError(inputElement, formElement);
    } else {
      showInputError(inputElement, formElement);
    }
  };

  _setEvenListeners = (formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );

    const submitButton = formElement.querySelector(config.buttonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(inputElement, formElement);
        toggleButtonState(submitButton, inputList);
      });
    });
    toggleButtonState(submitButton, inputList);
  };

  formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEvenListeners(formElement);
  });

}
















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
