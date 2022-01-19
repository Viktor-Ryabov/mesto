import "../index.html";
import "../pages/index.css";

import { Api } from "../scripts/components/Api.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import Card from "../scripts/components/Cards.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { Section } from "../scripts/components/Section";
import { SectionQ } from "../scripts/components/Section";
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
  bigImage,
  bigImageTitle,
  validationConfig,
  cardTemplate,
  deleteCardsPopup,
  cardsContainer,

} from "../scripts/utils/constants.js";

let userId;

const mainApiData = new Api(mestoAPIConfig);

const bigImages = new PopupWithImage(imagePopup);
// const popupDeleteConfirming = new PopupWithForm(deleteCardsPopup, "");
const initialData = [mainApiData.getUserInfo(), mainApiData.getCardsInfo()];

let currentUserData = "";
//Main variables

//Начальная загрузка данных
Promise.all(initialData)
  .then(([userData, cardsData]) => {
    userId = userData._id;
    // console.log(`usedId is ${userId}`);

    // const renderItems = new Section(
    //   userData._id,
    //   cardsData[1],
    //   cardTemplate,
    //   popupDeleteConfirming
    // );
    // renderItems.renderer(cardsData, userData, mainApiData, bigImages);
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setPopupFieldsData(userData);
    currentUserData = userData;

    console.log(cardsData)

    section.renderItems(cardsData);

    // return renderItems;
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
  const cardElement = card.cardGenerator(cardsContainer);
  // console.log(cardElement);
  return cardElement;
};


const section = new SectionQ(
    {
        renderItems(data){
            // console.log(data)
            section.addItem(createCard(data));
        },
    },
    cardsContainer
);

// console.log(section)

////Попапы форм
// попап большого фото
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

// Удаление карточек

const popupDeleteConfirming = new PopupWithForm(deleteCardsPopup, {
  formSubmitCallBack(data) {
    console.log(data[1]);
    popupDeleteConfirming.changeButtonOnLoad(true);
    mainApiData
      .deleteCardsAPI(data[0])
      .then(() => {
        data[1].remove();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupDeleteConfirming.closePopup();
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
        const newCard = new Section(
          currentUserData._id,
          cardData[1],
          cardTemplate,
          popupDeleteConfirming
        );
        newCard.renderer([cardData], currentUserData, mainApiData, bigImages);
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
