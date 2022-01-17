import "../index.html";
import "../pages/index.css";

import { Api } from "../scripts/components/Api.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { Card } from "../scripts/components/Cards.js";
import UserInfo from "../scripts/components/UserInfo.js";

import { Section } from "../scripts/components/Section";

import { FormValidator } from "../scripts/components/FormValidator.js";

import {
    mestoAPIConfig,
    editMestoPopup,
    buttonAddCard,
    editProfilePopup,
    profileButton,
    avatarPopup,
    changeAvatarButton,
    profileName,
    profileDescription,
    profileAvatar,
    imagePopup,
    validationConfig,
    cardTemplate,
    deleteCardsPopup,
} from "../scripts/utils/constants.js";

import { PopupWithImage } from "../scripts/components/PopupWithImage";
import { Popup } from "../scripts/components/Popup";

const apiRyabov = new Api(mestoAPIConfig);
const bigImages = new PopupWithImage(imagePopup);
const initialData = [apiRyabov.getUserInfo(), apiRyabov.getCardsInfo()];
const initialCards = new Section(initialData[0]._id, initialData[1], cardTemplate);
const popupDeleteConfirming = new PopupWithForm(deleteCardsPopup, '');

//Main variables
let currentUserData = '';

//Начальная загрузка данных
Promise.all(initialData)

    .then(([userData, cardsData]) => {
        initialCards.addItem(cardsData, userData, apiRyabov, bigImages, popupDeleteConfirming);
        currentUserData = userData;
        userInfo.setUserInfo(userData);
        userInfo.setUserAvatar(userData);
    })
    .catch((error) => console.log(error))
    .finally(() => {});

// Редактирование профиля
const userInfo = new UserInfo({
    profileName,
    profileDescription,
    profileAvatar,
});
const changeProfileNamePopup = new PopupWithForm(editProfilePopup, {
    formSubmitCallBack(data) {
        changeProfileNamePopup.changeButtonOnLoad(true);
        apiRyabov
            .sendProfileDataToServer(data)
            .then((res) => {
                userInfo.setUserInfo(res);
                changeProfileNamePopup.closePopup();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                changeProfileNamePopup.changeButtonOnLoad(false);
            });
    },
});
changeProfileNamePopup.setEventListeners();

//Редактирование аватара
const changeAvatarImage = new PopupWithForm(avatarPopup, {
    formSubmitCallBack(data) {
        changeAvatarImage.changeButtonOnLoad(true);
        apiRyabov
            .changeAvatarAPI(data.linkAvatarFoto)
            .then((res) => {
                console.log(res);
                userInfo.setUserInfo(res);
                changeAvatarImage.closePopup();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                changeAvatarImage.changeButtonOnLoad(false);
            });
    },
});
changeAvatarImage.setEventListeners();

//////_______________
const addNewCardToPage = new PopupWithForm(editMestoPopup, {
    formSubmitCallBack(data) {
        addNewCardToPage.changeButtonOnLoad(true);
        apiRyabov
            .addNewCadrsAPI(data.mestoName, data.linkFotoMesto)
            .then((cardData) => {
                console.log(cardData.owner._id);
                initialCards.addItem([cardData], currentUserData, apiRyabov, bigImages);
                addNewCardToPage.closePopup();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                addNewCardToPage.changeButtonOnLoad(false);
            });
    },
});
addNewCardToPage.setEventListeners();

buttonAddCard.addEventListener("click", () => {
    addNewCardToPage.openPopup();
});

//// Классы валидации форм
//валидация профайла
const validatorEditProfilePopup = new FormValidator(validationConfig, editProfilePopup);

//валидация аватара
const validatorAvatarPopup = new FormValidator(validationConfig, avatarPopup);
//валидация новых карточек
const validatorNewCardPopup = new FormValidator(validationConfig, editMestoPopup);
//активация валидации
validatorEditProfilePopup.enableValidation();
validatorAvatarPopup.enableValidation();
validatorNewCardPopup.enableValidation();

//// Слушатели
// кнопка аватара
changeAvatarButton.addEventListener("click", () => {
    changeAvatarImage.openPopup();
});
// кнопка профайла
profileButton.addEventListener("click", () => {
    changeProfileNamePopup.openPopup();
});
// кнопка новой карточки
