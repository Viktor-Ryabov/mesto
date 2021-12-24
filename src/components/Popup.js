export {
    closeByEscape,
    openPopup,
    closePopup,
    resetForm,
    setPopupOpenHandler,
    // setPopupCloseHandler,
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
    console.log("имя сейчас поменяется");
    nameProfile.textContent = nameEditForm.value;
    descriptionProfile.textContent = descriptionEditForm.value;
}

function setPopupOpenHandler(popupWindow, button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
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

function closeByEscape(event) {
    if (event.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

function resetForm(form, button) {
    form.reset();
    button.disabled = true;
}
