import "../index.html";
import "../pages/index.css";

import { Api } from "../scripts/components/Api.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { Card } from "../scripts/components/Cards.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { Section } from "../scripts/components/Section";
import { FormValidator } from "../scripts/components/FormValidator.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage";

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

const mainApiData = new Api(mestoAPIConfig);

const bigImages = new PopupWithImage(imagePopup);
const initialData = [mainApiData.getUserInfo(), mainApiData.getCardsInfo()];

//Main variables

//Начальная загрузка данных
Promise.all(initialData)
  .then(([userData, cardsData]) => {
    const initialCards = new Section(userData._id, cardsData[1]);
    initialCards.addItem(cardsData, userData, mainApiData, bigImages);
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setPopupFieldsData(userData);    
    return initialCards;
  })
  .catch((error) => console.log(error))
  .finally(() => {});
  

// Редактирование профиля
const userInfo = new UserInfo({
  profileName,
  profileDescription,
  profileAvatar,
});

////Попапы форм
// попап ольшог фото
const bigFotoPopup = new PopupWithImage(imagePopup);
bigFotoPopup.setEventListeners();

//редактирование профайла
const changeProfileNamePopup = new PopupWithForm(editProfilePopup, {
  formSubmitCallBack(data) {
    mainApiData
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
    mainApiData
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

//добавление карточки
const addNewCardToPage = new PopupWithForm(editMestoPopup, {
  formSubmitCallBack(data) {
    addNewCardToPage.changeButtonOnLoad(true);
    mainApiData
      .addNewCadrsAPI(data.mestoName, data.linkFotoMesto)
      .then((cardData) => {
        initialCards.addItem([cardData], currentUserData, mainApiData, bigImages);
        addNewCardToPage.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addNewCardToPage.changeButtonOnLoad(false);
      });
  },
});
addNewCardToPage.setEventListeners();

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



