import "../index.html";
import "../pages/index.css";

import { Api } from "../scripts/components/Api.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import Card from "../scripts/components/Cards.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { Section } from "../scripts/components/Section";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage";

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
  cardsContainer,
} from "../scripts/utils/constants.js";

let userId;

const mainApiData = new Api(mestoAPIConfig);

const bigImages = new PopupWithImage(imagePopup);
const initialData = [mainApiData.getUserInfo(), mainApiData.getCardsInfo()];

let currentUserData = "";
//Main variables

//Начальная загрузка данных
Promise.all(initialData)
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setPopupFieldsData(userData);
    currentUserData = userData;

    console.log(cardsData);

    section.renderItems(cardsData);
  })
  .catch((error) => console.log(error))
  .finally(() => {});

// Редактирование профиля
const userInfo = new UserInfo({
  profileName,
  profileDescription,
  profileAvatar,
});

////Create card
const createCard = (data) => {
  const card = new Card(
    data,
    userId,
    mainApiData,
    bigImages,
    cardTemplate,
    popupDeleteConfirming
  );
  const cardElement = card.cardGenerator(data);
  return cardElement;
};

const section = new Section(
  {
    renderItems(data) {
      section.addItem(createCard(data));
    },
  },
  cardsContainer
);

////Попапы форм
// попап большого фото
const bigFotoPopup = new PopupWithImage(imagePopup);
bigFotoPopup.setEventListeners();

//редактирование профайла
const changeProfileNamePopup = new PopupWithForm(editProfilePopup, {
  formSubmitCallBack(data) {
    changeProfileNamePopup.changeButtonOnLoad(true);
    mainApiData
      .sendProfileDataToServer(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .then(() => {
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
      })
      .then(() => {
        changeAvatarImage.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        changeAvatarImage.changeButtonOnLoad(false);
      });
  },
});
changeAvatarImage.setEventListeners();

// Удаление карточек

const popupDeleteConfirming = new PopupWithForm(deleteCardsPopup, {
  formSubmitCallBack(data) {
    const text = "Удаление...";
    console.log(data[1]);
    popupDeleteConfirming.changeButtonOnLoad(true);
    mainApiData
      .deleteCardsAPI(data[0])
      .then(() => {
        data[1].remove();
      })
      .then(() => {
        popupDeleteConfirming.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupDeleteConfirming.changeButtonOnLoad(false);
      });
  },
});
popupDeleteConfirming.setEventListeners();

//добавление карточки
const addNewCardToPage = new PopupWithForm(editMestoPopup, {
  formSubmitCallBack(data) {
    addNewCardToPage.changeButtonOnLoad(true);
    mainApiData
      .addNewCadrsAPI(data.mestoName, data.linkFotoMesto)
      .then((cardData) => {
        section.addItem(createCard(cardData));
      })
      .then(() => {
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
  validatorEditProfilePopup.resetValidation();
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
