export const mestoAPIConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-4",
  headers: {
    authorization: "04240b89-439a-4206-bc6f-4dcd1c8db2b2",
    "Content-Type": "application/json;charset=utf-8",
  },
};

export const editMestoPopup = document.querySelector("#editFormMesto");
export const buttonAddCard = document.querySelector("#buttonAddCard");

export const editProfilePopup = document.querySelector("#editFormProfile");
export const profileButton = document.querySelector("#popupOpenProfile");

export const avatarPopup = document.querySelector("#changeAvatarPopup");
export const changeAvatarButton = document.querySelector("#avatarButton");

export const profileName = document.querySelector("#nameProfile");
export const profileDescription = document.querySelector("#descriptionProfile");
export const profileAvatar = document.querySelector("#avatarButton");

export const cardsContainer = document.querySelector(".places");
export const template = document.querySelector(".card")