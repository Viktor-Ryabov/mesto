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
} from "../scripts/utils/constants.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage";

const apiRyabov = new Api(mestoAPIConfig);

const bigImages = new PopupWithImage(imagePopup);
const initialData = [apiRyabov.getUserInfo(), apiRyabov.getCardsInfo()];
const initialCards = new Section(initialData[0]._id, initialData[1]);
//Main variables
let currentUserData, UserAvatar, userDescription;

//Начальная загрузка данных
Promise.all(initialData)
  .then(([userData, cardsData]) => {
    initialCards.addItem(cardsData, userData, apiRyabov, bigImages);
    currentUserData = userData;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setPopupFieldsData(userData);
    // console.log(userData);
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

const addNewCardToPage = new PopupWithForm(editMestoPopup, {
  formSubmitCallBack(data) {
    addNewCardToPage.changeButtonOnLoad(true);
    apiRyabov
      .addNewCadrsAPI(data.mestoName, data.linkFotoMesto)
      .then((cardData) => {
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

//// Классы валидации форм
//валидация профайла
const validatorEditProfilePopup = new FormValidator(
  validationConfig,
  editProfilePopup
);
//валидация аватара
const validatorAvatarPopup = new FormValidator(validationConfig, avatarPopup);
//валидация новых карточек
const validatorNewCardPopup = new FormValidator(
  validationConfig,
  editMestoPopup
);
//активация валидации
validatorEditProfilePopup.enableValidation();
validatorAvatarPopup.enableValidation();
validatorNewCardPopup.enableValidation();

//// Слушатели
changeAvatarButton.addEventListener("click", () => {
  validatorAvatarPopup.resetValidation();
  changeAvatarImage.openPopup();
});

buttonAddCard.addEventListener("click", () => {
  validatorNewCardPopup.resetValidation();
  addNewCardToPage.openPopup();
});

profileButton.addEventListener("click", () => {
  userInfo.setPopupFieldsData();
  validatorEditProfilePopup.resetValidation()
  changeProfileNamePopup.openPopup();
});