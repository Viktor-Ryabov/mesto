import "../index.html";
import "../pages/index.css";

//**КАРТОЧКИ**
import {
    createCard,
    addCard,
} from "../components/cards.js";

import { turnOnValidation } from "../components/validate.js";

import {
    resetForm,
    nameProfile,
    descriptionProfile,
    avatarKorolia,
    changeProfileName,
    setPopupOpenHandler,
    closePopup,
    openPopup,
    setPopupCloseHandler,
    nameEditForm,
    descriptionEditForm,
} from "../components/modal.js";

import {
    changeAvatarAPI,
    sendProfileDataToServer,
    addNewCadrsAPI,
    deleteCardsAPI,
    putLikesAPI,
    getUserInfo,
    getCardsInfo,
    deleteLikesAPI,
} from "../components/api.js";

const deleteCardsPopup = document.querySelector("#deleteCardsPopup");
const confirmToDeleteButton = document.querySelector("#confirmToDeleteButton");
const editFormProfile = document.querySelector("#editFormProfile");
const popupOpenProfile = document.querySelector("#popupOpenProfile");
const saveData = document.querySelector("#saveData");
const editFormMesto = document.querySelector("#editFormMesto");
const buttonAddCard = document.querySelector("#buttonAddCard");
const editMesto = document.forms["editMesto"];
const saveDataButton = document.querySelector("#saveDataButton");
const avatarLogoButton = document.querySelector(".profile__change-avatar-logo");
const saveAvatarButton = document.querySelector("#saveAvatarButton");
const formAvatar = document.forms["changeAvatarForm"];
const changeAvatarPopup = document.querySelector("#changeAvatarPopup");
const avatarLinkToChange = formAvatar.elements.linkAvatarFoto;
const popups = document.querySelectorAll(".popup");

setPopupOpenHandler(editFormMesto, buttonAddCard, editMesto);
setPopupOpenHandler(changeAvatarPopup, avatarLogoButton);

setPopupCloseHandler(deleteCardsPopup);
setPopupCloseHandler(editFormProfile);
setPopupCloseHandler(editFormMesto);
setPopupCloseHandler(changeAvatarPopup);

turnOnValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__field",
    buttonSelector: ".popup__submit-button",
    inputErrorClass: "popup__input-error",
});

const catchErrorMessage = (error) => {
    console.log(
        `Что-то пошло не так: Ошибка ${error.status} - ${error.statusText}`
    );
};

Promise.all([getUserInfo(), getCardsInfo()])
    .then(([userData, cards]) => {
        const user = userData;
        const initialCards = cards;
        nameProfile.textContent = user.name;
        descriptionProfile.textContent = user.about;
        avatarKorolia.style.backgroundImage = `url(${user.avatar})`;
        initialCards.forEach(function (data) {
            const card = createCard(data.name, data.link, data.likes.length);
            addCard(card);
        });
    })
    .catch((error) => {
        console.log(
            `При создании карточек произошла ошибка: ${error.status} - ${error.statusText}`
        );
    });

popups.forEach((popupWindow) => {
    popupWindow.addEventListener("click", (event) => {
        if (event.target.classList.contains("popup_opened")) {
            closePopup(popupWindow);
        }
        if (event.target.classList.contains("popup__close-icon")) {
            closePopup(popupWindow);
        }
    });
});

avatarButton.addEventListener("click", function (event) {
    event.preventDefault();
    resetForm(formAvatar, saveAvatarButton);
    console.log("form has been reseted");
    openPopup(changeAvatarPopup);
});

saveAvatarButton.addEventListener("click", function (event) {
    event.preventDefault();
    const link = avatarLinkToChange.value;
    changeAvatarAPI(link)
        .then((data) => {
            document.querySelector(
                ".profile__avatar"
            ).style.backgroundImage = `url("${data.avatar}")`;
        })
        .then(closePopup(changeAvatarPopup))
        .catch((error) => {
            catchErrorMessage(error);
        });
});

editFormProfile.addEventListener("submit", function (event) {
    event.preventDefault();
    changeProfileName();
    sendProfileDataToServer(descriptionEditForm.value, nameEditForm.value)
        .then((data) => {
            console.log(data);
        })
        .then((saveData.textContent = "Сохраняем..."))
        .then(closePopup(editFormProfile))
        .catch((error) => {
            console.log(
                `При удалении like произошла ошибка: ${error.status} - ${error.statusText}`
            );
        })
        .finally((saveData.textContent = "Сохранить"));
});

editFormMesto.addEventListener("submit", function (event) {
    event.preventDefault();
    let card;
    addNewCadrsAPI(mestoName.value, linkFotoMesto.value)
        .then((data) => {
            card = createCard(data.name, data.link, data.likes.length);
            addCard(card);
        })
        .then((saveData.textContent = "Сохраняем..."))
        .then(closePopup(editFormMesto))
        .then(resetForm(editMesto, saveDataButton))
        .catch(
            (err) =>
                `При добавлении новой карточки произошла ошибка: ${error.status} - ${error.statusText}`
        )
        .finally((saveData.textContent = "Сохранить"));
});

popupOpenProfile.addEventListener("click", function (event) {
    event.preventDefault();
    nameEditForm.value = nameProfile.textContent;
    descriptionEditForm.value = descriptionProfile.textContent;
    openPopup(editFormProfile);
});

buttonAddCard.addEventListener("click", function (event) {
    event.preventDefault();
    resetForm(editMesto, saveDataButton);
});
