export const turnOnValidation = (config) => {
    const isFormValid = (inputList) =>
        inputList.every((inputElement) => inputElement.validity.valid);

    const getErrorElement = (inputElement, formElement) =>
        formElement.querySelector(`#${inputElement.name}-error`);

    const hideInputError = (inputElement, formElement) => {
        const errorElement = getErrorElement(inputElement, formElement);
        errorElement.textContent = "";
    };

    const showInputError = (inputElement, formElement) => {
        const errorElement = getErrorElement(inputElement, formElement);
        errorElement.textContent = inputElement.validationMessage;
    };

    const toggleButtonState = (submitButton, inputList) => {
        if (isFormValid(inputList)) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    };

    const checkInputValidity = (inputElement, formElement) => {
        if (inputElement.validity.valid) {
            hideInputError(inputElement, formElement);
        } else {
            showInputError(inputElement, formElement);
        }
    };

    const setEvenListeners = (formElement) => {
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
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEvenListeners(formElement);
    });
};
