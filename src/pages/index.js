import "../index.html";
import "../pages/index.css";

import { mestoAPIConfig } from "../scripts/utils/constants.js";
import { Api } from "../scripts/components/Api.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

import {
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
console.log(initialData);


//** Попапы с формой
//* new card
const addNewCardPopup = new PopupWithForm(editMestoPopup);
addNewCardPopup.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  addNewCardPopup.openPopup();
});

//* Profile
profileButton.addEventListener("click", () => {
  changeProfileNamePopup.openPopup();
});

// Редактирования профиля
const userInfo = new UserInfo({ profileName, profileDescription, profileAvatar });

const changeProfileNamePopup = new PopupWithForm(avatarPopup, {
  formSubmitCallBack: (data, button) => {
    apiRyabov
      .sendProfileDataToServer(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        changeProfileNamePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
      });
  },
});
changeProfileNamePopup.setEventListeners();

changeAvatarButton.addEventListener("click", () => {
  changeProfileNamePopup.openPopup();
})
