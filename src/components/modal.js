export {
    closeByEscape,
    renameButton,
    openPopup,
    closePopup,
    resetForm,
    setPopupOpenHandler,
    setPopupCloseHandler,
    formMesto,
    formProfile,
    nameEditForm,
    descriptionEditForm,
    avatarKorolia,
    editFormMesto,
    changeProfileName,
    editFormProfile,
    nameProfile,
    descriptionProfile,
};

const editFormProfile = document.querySelector("#editFormProfile");
const editFormMesto = document.querySelector("#editFormMesto");
const formMesto = document.forms["editMesto"];
const formProfile = document.forms["editForm"];

const nameProfile = document.querySelector("#nameProfile");
const nameEditForm = document.querySelector("#nameEditForm");
const descriptionProfile = document.querySelector("#descriptionProfile");
const descriptionEditForm = document.querySelector("#descriptionEditForm");
const avatarKorolia = document.querySelector(".profile__avatar");


function changeProfileName() {
    nameProfile.textContent = nameEditForm.value;
    descriptionProfile.textContent = descriptionEditForm.value;
}

function setPopupOpenHandler(popupWindow, button, form, buttonToLock) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        resetForm(form, buttonToLock);
        console.log(`form has been reseted`);
        openPopup(popupWindow);
    });
}

function openPopup(popupWindow) {
    popupWindow.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
}

function closePopup(popupWindow) {
    popupWindow.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
}

function setPopupCloseHandler(popupWindow, button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        closePopup(popupWindow);
    });
}

function closeByEscape(event) {
    if (event.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        console.log("Esc");
        closePopup(openedPopup);
    }
}

function resetForm(form, button) {
    form.reset();
    button.disabled = true;
}

const renameButton = (popup, form, button) => {
    button.textContent = "Сохраняем...";
    closePopup(popup);
    resetForm(form, button);
    button.textContent = "Сохранить";
};