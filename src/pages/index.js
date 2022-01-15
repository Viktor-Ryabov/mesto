import "../index.html";
import "../pages/index.css";

import { Api } from "../scripts/components/Api.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { Card } from "../scripts/components/Cards.js";
import UserInfo from "../scripts/components/UserInfo.js";

import { Section } from "../scripts/components/Section";

import { FormValidator } from "../scripts/components/FormValidator.js"

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
let UserAvatar, userDescription;

//Начальная загрузка данных
Promise.all(initialData)

    .then(([userData, cardsData]) => {
        initialCards.addItem(cardsData, userData, apiRyabov, bigImages);
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
    apiRyabov
      .sendProfileDataToServer(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        changeProfileNamePopup.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  },
});
changeProfileNamePopup.setEventListeners();



//Редактирование аватара
const changeAvatarImage = new PopupWithForm(avatarPopup, {
  formSubmitCallBack(data) {
    console.log(data);
    apiRyabov
      .changeAvatarAPI(data.linkAvatarFoto)
      .then((res) => {
        console.log(res);
        userInfo.setUserInfo(res);
        changeAvatarImage.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  },
});
changeAvatarImage.setEventListeners();


//// Классы валидации форм
//валидация профайла
const validatorEditProfilePopup = new FormValidator(
  validationConfig,
  editProfilePopup,
);

console.log(validatorEditProfilePopup);
//валидация аватара
const validatorAvatarPopup = new FormValidator(
  validationConfig,
  avatarPopup,
);
//валидация новых карточек
const validatorNewCardPopup = new FormValidator(
  validationConfig,
  editMestoPopup,
);
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