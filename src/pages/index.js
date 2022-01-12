import "../index.html";
import "../pages/index.css";

import { mestoAPIConfig } from "../scripts/utils/constants.js";
import { Api } from "../scripts/components/Api.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { Popup } from "../scripts/components/Popup.js";

import {
  editMestoPopup,
  buttonAddCard,
  editProfilePopup,
  profileButton,
} from "../scripts/utils/constants.js";


//Попапы с формой
const addNewCardPopup = new Popup(editMestoPopup);
addNewCardPopup.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  addNewCardPopup.openPopup();
});

const changeProfileNamePopup = new Popup(editProfilePopup);
changeProfileNamePopup.setEventListeners();

profileButton.addEventListener("click", () => {
  changeProfileNamePopup.openPopup();
});
