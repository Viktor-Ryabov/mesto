import {
    getCardsAPI,
    deleteCardsAPI,
    putLikesAPI,
    deleteLikesAPI,
    addNewCadrsAPI,
    idUser,
} from "./api.js";

import {
    setPopupOpenHandler,
    formMesto,
    openPopup,
    closePopup,
    resetForm,
    idCardToDelete,
} from "../components/modal.js";

import { reloadPage } from "./utils.js";
import parseFloat from "core-js/fn/number/parse-float";

const saveDataButton = document.querySelector("#saveDataButton");
const imagePopup = document.querySelector("#image-popup");
const cardPlacesSection = document.querySelector(".places");
const deleteCardsPopup = document.querySelector("#deleteCardsPopup");
const confirmToDeleteButton = document.querySelector("#confirmToDeleteButton");
const editMesto = document.forms["editMesto"];
const popupBigFoto = document.querySelector(".popup__foto");
const popupBigFotoText = document.querySelector(".popup__discription");


function createCard(name, link, likes ="") {
    const template = document.querySelector("#newCardTemplate").content;
    const card = template.cloneNode(true).querySelector(".card");
    card.querySelector(".card__title").textContent = name;
    card.querySelector("img").src = link;
    card.querySelector("img").alt = name;
    card.querySelector("#numberOfLikes").textContent = likes;
    setBigFotoHandler(card.querySelector(".card__foto"), imagePopup);
    setDeleteCardHandler(deleteCardsPopup, card.querySelector(".card__delete-button"), card);
    setLikeHandler(card.querySelector(".card__button-like"));
    return card;
}

const setLikeHandler = (buttonLike, likes) => {
    buttonLike.addEventListener("submit", function (event) {
        event.preventDefault();
            if (!buttonLike.classList.contains("card__button-like_active")) {
                buttonLike.textContent = likes + 1;
                // baseNumber = Number(buttonLike.textContent);
            } else {
                buttonLike.textContent = likes - 1;
            //     buttonLike.textContent = Number(baseNumber - 1);
            //     baseNumber = Number(number.textContent);
            }
        })
}

const setBigFotoHandler = (button, popup) => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        setBigFotoData(button);
        openPopup(popup);
    });
};

const setBigFotoData = (button) => {
    popupBigFoto.src = button.src;
    popupBigFoto.alt = button.alt;
    popupBigFotoText.textContent = button.alt;
};

function addCard(card) {
    cardPlacesSection.prepend(card);
}

// function addCardsToPage() {}

// function setLikeHandler( buttonLike, card_id = "", number = "", baseNumber = "") {
//     // buttonLike.addEventListener("click", function (event) {
//     //     event.preventDefault();
//     //     if (!buttonLike.classList.contains("card__button-like_active")) {
//     //         buttonLike.classList.add("card__button-like_active");
//     //         putLikesAPI(card_id);
//     //         number.textContent = baseNumber + 1;
//     //         baseNumber = Number(number.textContent);
//     //     } else {
//     //         buttonLike.classList.remove("card__button-like_active");
//     //         deleteLikesAPI(card_id);
//     //         number.textContent = Number(baseNumber - 1);
//     //         baseNumber = Number(number.textContent);
//     //     }
//     // });
// }

// function deleteCardFromServer(button, card_id, popup, card) {
//     button.addEventListener("click", function (event) {
//         event.preventDefault();
//         console.log(card_id);
//         deleteCardsAPI(card_id);
//         closePopup(popup);
//         // card.remove();
//     });
// }

function setDeleteCardHandler(popupWindow, deletButton, card) {
    deletButton.addEventListener("click", function (event) {
        event.preventDefault();
        // console.log(card);
        openPopup(popupWindow);
        // card.remove();
    });
}
// function setNewCardsLikeHandler(likeButton) {
//     likeButton.addEventListener("click", function (event) {
//         event.preventDefault();
//         likeButton.classList.toggle("card__button-like_active");
//     });
// }

export {
    confirmToDeleteButton,
    deleteCardsPopup,
    createCard,
    setDeleteCardHandler,
    addCard,
    setLikeHandler,
    imagePopup,
};
