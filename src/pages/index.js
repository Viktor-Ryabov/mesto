import "../index.html";
import "../pages/index.css";

//**КАРТОЧКИ**
import {
    addCardsToPage,
    createCard,
    setDeleteCardHandler,
    addCard,
    setLikeHandler,
} from "../components/cards.js";

import { turnOnValidation } from "../components/validate.js";

import {
    resetForm,
    renameButton,
    nameProfile,
    descriptionProfile,
    avatarKorolia,
    changeProfileName,
    formProfile,
    setPopupOpenHandler,
    closePopup,
    openPopup,
    setPopupCloseHandler
} from "../components/modal.js";

import {
    changeAvatarAPI,
    getProfileName,
    sendProfileDataToServer,
    addNewCadrsAPI,
    deleteCardsAPI,
    putLikesAPI,
    getUserInfo,
    getCardsInfo,
    requestResult,
    deleteLikesAPI
} from "../components/api.js";
import { codePointAt } from "core-js/core/string";



const deleteCardsPopup = document.querySelector("#deleteCardsPopup");
// const deletButton = document.querySelector("#deletButton");
// const deleteCardsForm = document.forms["deleteCardsForm"];
const confirmToDeleteButton = document.querySelector("#confirmToDeleteButton");

const editFormProfile = document.querySelector("#editFormProfile");
const popupOpenProfile = document.querySelector("#popupOpenProfile");
const editForm = document.forms["editForm"];
const saveData = document.querySelector("#saveData");
const editFormMesto = document.querySelector("#editFormMesto");
const buttonAddCard = document.querySelector("#buttonAddCard");
const editMesto = document.forms["editMesto"];
const saveDataButton = document.querySelector("#saveDataButton");
const avatarLogoButton = document.querySelector(".profile__change-avatar-logo");
const saveAvatarButton = document.querySelector("#saveAvatarButton");
const formAvatar = document.forms["changeAvatarForm"];
const changeAvatarPopup = document.querySelector("#changeAvatarPopup");
const popapCloseCard = document.querySelector("#popapCloseCard");
const avatarLinkToChange = formAvatar.elements.linkAvatarFoto;
const cardButtonLike = document.querySelector("#card__button-like");
const popups = document.querySelectorAll(".popup");

// const cardButtonLike =  card.querySelector(".card__button-like");

//________________

setPopupOpenHandler(editFormProfile, popupOpenProfile, editForm, saveData);
setPopupOpenHandler(editFormMesto, buttonAddCard, editMesto, saveDataButton);
setPopupOpenHandler(changeAvatarPopup, avatarLogoButton, formAvatar, saveAvatarButton);

setPopupCloseHandler(deleteCardsPopup, popapCloseCard);
setPopupCloseHandler(editFormProfile, popapCloseCard);
setPopupCloseHandler(editFormMesto, popapCloseCard);
setPopupCloseHandler(changeAvatarPopup, popapCloseCard);

turnOnValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__field",
    buttonSelector: ".popup__submit-button",
    inputErrorClass: "popup__input-error",
});

const catchErrorMessage = (error) => {
    console.log(
        `Что-то пошло не так: Ошибка ${error.status} - ${error.statusText}`
    );
};

Promise.all([getUserInfo(), getCardsInfo()])
    .then(([userData, cards]) => {
        const user = userData;
        const initialCards = cards;

        nameProfile.textContent = user.name;
        descriptionProfile.textContent = user.about;
        avatarKorolia.style.backgroundImage = `url(${user.avatar})`;

        initialCards.forEach(function (data) {
            const card = createCard(data.name, data.link, data.likes.length);
            const deleteButton = card.querySelector(".card__delete-button");
            const cardButtonLike = card.querySelector(".card__button-like");
            const numberOfLikes = card.querySelector("#numberOfLikes");
            let baseNumberOfLikes = data.likes.length;

            //активные лайки
            let likes = data.likes;
            likes.forEach(function(like) {
                if (like._id == user._id) {
                    card.querySelector(".card__button-like").classList.add("card__button-like_active");
                }                
            });

            //переключение лайков
            cardButtonLike.addEventListener("click", function(event){
                
                // console.log("lIKE");
                if (!cardButtonLike.classList.contains("card__button-like_active")) {
                    putLikesAPI(data._id)
                    .then(numberOfLikes.textContent = baseNumberOfLikes + 1)
                    .then(console.log(numberOfLikes.textContent))
                    .then(baseNumberOfLikes = Number(numberOfLikes.textContent))
                    .then(cardButtonLike.classList.add("card__button-like_active"))
                    .catch(error => {
                        console.log(`При добавлении like произошла ошибка: ${error.status} - ${error.statusText}`)
                    })
                } else {
                    deleteLikesAPI(data._id)
                    .then(numberOfLikes.textContent = Number(baseNumberOfLikes - 1))
                    .then(console.log(numberOfLikes.textContent))
                    .then(baseNumberOfLikes = Number(numberOfLikes.textContent))
                    .then(cardButtonLike.classList.remove("card__button-like_active"))
                    .catch(error => {
                        console.log(`При удалении like произошла ошибка: ${error.status} - ${error.statusText}`)
                    })
                }
            })

            //кнопки удаления
            if (data.owner._id != user._id) {
                deleteButton.remove();
            } else {
                deleteButton.addEventListener("click", function (event) {
                    openPopup(deleteCardsPopup);
                    let idCardToDelete = "";
                    event.preventDefault();
                    idCardToDelete = data._id;
                    console.log("deleteButton: ", idCardToDelete);

                    confirmToDeleteButton.addEventListener("click", function (event) {
                        event.preventDefault();
                        console.log("confirmToDeleteButton: ", idCardToDelete);
                        deleteCardsAPI(idCardToDelete)
                        .then(closePopup(deleteCardsPopup))
                        .then(card.remove())
                        .then(idCardToDelete = "")
                        .catch(error => {
                            console.log(`При удалении карточки произошла ошибка: ${error.status} - ${error.statusText}`)
                        })
                        .finally(data => {
                            console.log(`Post deleted ${data}`)
                        })
                        
                    })
                })
            }
        addCard(card);
        })
    })
    .catch((error) => {
        catchErrorMessage(error);
    });

popups.forEach((popupWindow) => {
    popupWindow.addEventListener("click", (event) => {
        if (event.target.classList.contains("popup_opened")) {
            closePopup(popupWindow);
        }
        if (event.target.classList.contains("popup__close-icon")) {
            closePopup(popupWindow);
        }
    });
});

avatarButton.addEventListener("click", function (event) {
    event.preventDefault();
    resetForm(formAvatar, saveAvatarButton);
    console.log("form has been reseted");
    openPopup(changeAvatarPopup);
});

saveAvatarButton.addEventListener("click", function (event) {
    event.preventDefault();
    let link = avatarLinkToChange.value;
    changeAvatarAPI(link)
        .then((data) => {
            document.querySelector(
                ".profile__avatar"
            ).style.backgroundImage = `url("${data.avatar}")`;
        })
        .then(closePopup(changeAvatarPopup))
        .catch((error) => {catchErrorMessage(error)})
});

editFormProfile.addEventListener("submit", function (event) {
    event.preventDefault();
    changeProfileName();
    sendProfileDataToServer(descriptionEditForm.value, nameEditForm.value);
});

editFormMesto.addEventListener("submit", function (event) {
    event.preventDefault();
    const card = createCard(mestoName.value, linkFotoMesto.value);
    setDeleteCardHandler(card, card.querySelector(".card__delete-button"));
    addNewCadrsAPI(mestoName.value, linkFotoMesto.value)
    .then(addCard(card))
    .then(closePopup(editFormMesto))
    .catch((err) => requestResult(err))
});



//слушатель корзинки
//получение ид карточки
//открытие попапа подтверждения
//слушатель кнопки подтверждения
//запрос на серваер на удаление
//удаление карточки с экрана
//закрятие попапа

//создал перезаписываемую переменную в которую записывается карточка на ведерко которой нажал
//вызываю именно эту переменную и получается удаляется корректная карточка.



// function setPopupOpenHandler(popupWindow, button, id) { 
//     button.addEventListener("click", function (event) { 
//         event.preventDefault(); 
//         idCardToDelete = id; 
//         console.log(idCardToDelete); 
//         openPopup(popupWindow); 
//         return idCardToDelete; 
//     }); 
// } 

