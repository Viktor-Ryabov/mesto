import "../index.html";
import "../pages/index.css";

import { Api } from "../scripts/components/Api.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

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
  profileAvatar

} from "../scripts/utils/constants.js";

const apiRyabov = new Api(mestoAPIConfig);
console.log(apiRyabov);

const initialData = [apiRyabov.getUserInfo(), apiRyabov.getCardsInfo()];
// console.log(initialData);

//Main variables
let userId, UserAvatar, userDescription;

//Начальная загрузка данных
Promise.all(initialData)
  .then (([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
  })
  .catch((error) => console.log(error))
  .finally(() => {
  });

// Редактирование профиля
const userInfo = new UserInfo({ profileName, profileDescription, profileAvatar });

const changeProfileNamePopup = new PopupWithForm(editProfilePopup, {
  formSubmitCallBack: (data) => {
    apiRyabov
      .sendProfileDataToServer(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        changeProfileNamePopup.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
      });
  },
});
changeProfileNamePopup.setEventListeners();

profileButton.addEventListener("click", () => {
  changeProfileNamePopup.openPopup();
})

//Редактирование аватара
const changeAvatarImage = new PopupWithForm(avatarPopup, {
  formSubmitCallBack: (data) => {
    console.log(data)
    apiRyabov
    .changeAvatarAPI(data.linkAvatarFoto)
    .then((res) => {
      console.log(res);
      userInfo.setUserInfo(res);
      changeAvatarImage.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
    });
  },
});
changeAvatarImage.setEventListeners();

changeAvatarButton.addEventListener("click", () => {
  changeAvatarImage.openPopup();
})