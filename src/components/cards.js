import { openPopup } from "../components/modal.js";

const imagePopup = document.querySelector("#image-popup");
const cardPlacesSection = document.querySelector(".places");
const deleteCardsPopup = document.querySelector("#deleteCardsPopup");
const confirmToDeleteButton = document.querySelector("#confirmToDeleteButton");
const popupBigFoto = document.querySelector(".popup__foto");
const popupBigFotoText = document.querySelector(".popup__discription");

function createCard(name, link, likes = "") {
    const template = document.querySelector("#newCardTemplate").content;
    const card = template.cloneNode(true).querySelector(".card");
    card.querySelector(".card__title").textContent = name;
    card.querySelector("img").src = link;
    card.querySelector("img").alt = name;
    card.querySelector("#numberOfLikes").textContent = likes;
    setBigFotoHandler(card.querySelector(".card__foto"), imagePopup);
    setDeleteCardHandler(
        deleteCardsPopup,
        card.querySelector(".card__delete-button"),
        card
    );
    setLikeHandler(card.querySelector(".card__button-like"));
    return card;
}

const setLikeHandler = (buttonLike, likes) => {
    buttonLike.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!buttonLike.classList.contains("card__button-like_active")) {
            buttonLike.textContent = likes + 1;
        } else {
            buttonLike.textContent = likes - 1;
        }
    });
};

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

function setDeleteCardHandler(popupWindow, deletButton, card) {
    deletButton.addEventListener("click", function (event) {
        event.preventDefault();
        openPopup(popupWindow);
    });
}

export {
    confirmToDeleteButton,
    deleteCardsPopup,
    createCard,
    setDeleteCardHandler,
    addCard,
    setLikeHandler,
    imagePopup,
};
