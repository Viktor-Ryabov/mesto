import "../index.html";
import "../pages/index.css";

//**КАРТОЧКИ**
import { createCard, addCard } from "../components/cards.js";

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
const avatarButton = document.querySelector("#avatarButton");
const mestoName = document.querySelector("#mestoName");
const linkFotoMesto = document.querySelector("#linkFotoMesto");

setPopupOpenHandler(editFormMesto, buttonAddCard, editMesto);
setPopupOpenHandler(changeAvatarPopup, avatarLogoButton);

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

        nameProfile.textContent = user.name;
        descriptionProfile.textContent = user.about;
        avatarKorolia.style.backgroundImage = `url(${user.avatar})`;

        cards.forEach(function (data) {
            // console.log(data.likes)
            const card = createCard(user, data);
            addCard(card);
        });
    })
    .catch((error) => {
        console.log(
            `При создании карточек произошла ошибка: ${error.status} - ${error.statusText}`
        );
    });

const setConfirmToDelete = (idCardToDelete, cardToDelete) => {
    deleteCardsAPI(idCardToDelete)
        .then(() => {
            cardToDelete.remove();
        })
        .catch((error) => {
            console.log(
                `При удалении карточки произошла ошибка: ${error.status} - ${error.statusText}`
            );
        })
        .finally(() => {
            console.log(`Post with id ${idCardToDelete} deleted `);
        });
};

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

const addLike = (cardId, button, likeCount) => {
    putLikesAPI(cardId)
        .then((data) => {
            button.classList.add("card__button-like_active");
            console.log(`card ${cardId} has been liked`);
            return (likeCount.textContent = data.likes.length);
        })
        .catch((error) => {
            `oshibochka vishla - ${error.status} - ${error.statusText}`;
        });
};
const deleteLike = (cardId, button, likeCount) => {
    deleteLikesAPI(cardId)
        .then((data) => {
            button.classList.remove("card__button-like_active");
            console.log(`card ${cardId} has been disliked`);
            return (likeCount.textContent = data.likes.length);
        })
        .catch((error) => {
            `oshibochka vishla - ${error.status} - ${error.statusText}`;
        });
};

avatarButton.addEventListener("click", function (event) {
    event.preventDefault();
    resetForm(formAvatar, saveAvatarButton);
    console.log("form has been reseted");
    openPopup(changeAvatarPopup);
});

formAvatar.addEventListener("submit", function (event) {
    event.preventDefault();
    const link = avatarLinkToChange.value;
    saveAvatarButton.textContent = "Сохраняем...";
    changeAvatarAPI(link)
        .then((data) => {
            document.querySelector(
                ".profile__avatar"
            ).style.backgroundImage = `url("${data.avatar}")`;
        })
        .then(() => {
            closePopup(changeAvatarPopup);
        })
        .catch((error) => {
            catchErrorMessage(error);
        })
        .finally(() => {
            saveAvatarButton.textContent = "Сохранить";
        });
});

editFormProfile.addEventListener("submit", function (event) {
    event.preventDefault();
    changeProfileName();
    saveData.textContent = "Сохраняем...";
    sendProfileDataToServer(descriptionEditForm.value, nameEditForm.value)
        .then(() => {
            closePopup(editFormProfile);
        })
        .catch(() => {
            console.log(`При добавлении карточки возникла ошибка`);
        })
        .finally(() => {
            saveData.textContent = "Сохранить";
        });
});

editFormMesto.addEventListener("submit", function (event) {
    event.preventDefault();
    saveDataButton.textContent = "Сохраняем...";
    addNewCadrsAPI(mestoName.value, linkFotoMesto.value)
        .then((data) => {
            const card = createCard(data.owner, data);
            addCard(card);
        })
        .then(() => {
            closePopup(editFormMesto);
            resetForm(editMesto, saveDataButton);
        })
        .catch(
            (error) =>
                `При добавлении новой карточки произошла ошибка: ${error.status} - ${error.statusText}`
        )
        .finally(() => {
            saveDataButton.textContent = "Сохранить";
        });
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

export { addLike, deleteLike, setConfirmToDelete };
