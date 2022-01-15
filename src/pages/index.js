import "../index.html";
import "../pages/index.css";

import { Api } from "../scripts/components/Api.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { Card } from "../scripts/components/Cards.js";
import UserInfo from "../scripts/components/UserInfo.js";
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
  template,
  validationConfig,
} from "../scripts/utils/constants.js";

const apiRyabov = new Api(mestoAPIConfig);

const initialData = [apiRyabov.getUserInfo(), apiRyabov.getCardsInfo()];

//Main variables
let UserAvatar, userDescription;

const loadCards = new Card(initialData[1], initialData[0]);

//Начальная загрузка данных
Promise.all(initialData)
  .then(([userData, cardsData]) => {
    const loadCards = new Card(cardsData, userData._id);
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);

    loadCards.renderCards(cardsData);
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