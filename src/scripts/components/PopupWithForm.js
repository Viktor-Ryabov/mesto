import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement){
    super(popupElement);
  }
}


// export {
//   resetForm,
//   setPopupOpenHandler,
//   formMesto,
//   formProfile,
//   nameEditForm,
//   descriptionEditForm,
//   avatarKorolia,
//   editFormMesto,
//   changeProfileName,
//   editFormProfile,
//   nameProfile,
//   descriptionProfile,
// };






function changeProfileName() {
  console.log("имя сейчас поменяется");
  nameProfile.textContent = nameEditForm.value;
  descriptionProfile.textContent = descriptionEditForm.value;
}

function setPopupOpenHandler(popupWindow, button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    openPopup(popupWindow);
  });
}

function openPopup(popupWindow) {
  popupWindow.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function resetForm(form, button) {
  form.reset();
  button.disabled = true;
}
