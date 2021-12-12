import { openPopup, closePopup } from "../components/modal.js";
import { putLikesAPI, deleteLikesAPI, deleteCardsAPI } from "./api.js";

const imagePopup = document.querySelector("#image-popup");
const cardPlacesSection = document.querySelector(".places");
const deleteCardsPopup = document.querySelector("#deleteCardsPopup");
const confirmToDeleteButton = document.querySelector("#confirmToDeleteButton");
const popupBigFoto = document.querySelector(".popup__foto");
const popupBigFotoText = document.querySelector(".popup__discription");

const createCard = (user, data) => {
    const template = document.querySelector("#newCardTemplate").content;
    const card = template.cloneNode(true).querySelector(".card");
    const numberOfLikes = card.querySelector("#numberOfLikes");
    const deleteButton = card.querySelector(".card__delete-button");
    const cardButtonLike = card.querySelector(".card__button-like");

    card.querySelector(".card__title").textContent = data.name;
    card.querySelector("img").src = data.link;
    card.querySelector("img").alt = data.name;

    numberOfLikes.textContent = data.likes.length;

    setBigFotoHandler(card.querySelector(".card__foto"), imagePopup);
    setDeleteCardHandler(deleteCardsPopup, deleteButton, card, data, user);
    setLikeHandler(cardButtonLike, user, data.likes, data, card, numberOfLikes);

    return card;
}

const setLikeHandler = (
    buttonLike,
    user,
    dataLikes,
    data,
    card,
    numberOfLikes
) => {
    let baseNumberOfLikes = dataLikes.length;
    buttonLike.addEventListener("click", function (event) {
        event.preventDefault();
        if (!buttonLike.classList.contains("card__button-like_active")) {
            putLikesAPI(data._id)
                .then((numberOfLikes.textContent = baseNumberOfLikes + 1))
                .then((baseNumberOfLikes = Number(numberOfLikes.textContent)))
                .then(buttonLike.classList.add("card__button-like_active"))
                .catch((error) => {
                    console.log(
                        `При добавлении like произошла ошибка: ${error.status} - ${error.statusText}`
                    );
                });
        } else {
            deleteLikesAPI(data._id)
                .then(
                    (numberOfLikes.textContent = Number(baseNumberOfLikes - 1))
                )
                .then((baseNumberOfLikes = Number(numberOfLikes.textContent)))
                .then(buttonLike.classList.remove("card__button-like_active"))
                .catch((error) => {
                    console.log(
                        `При удалении like произошла ошибка: ${error.status} - ${error.statusText}`
                    );
                });
        }
    });
    dataLikes.forEach((like) => {
        if (like._id == user._id) {
            card.querySelector(".card__button-like").classList.add(
                "card__button-like_active"
            );
        }
    });

    // buttonLike.classList.toggle("card__button-like_active");
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

const addCard = (card) => {
    cardPlacesSection.append(card);
}

const setDeleteCardHandler = (
    deleteCardsPopup,
    deleteButton,
    card,
    data,
    user
) => {
    // console.log(user, data);
    if (data.owner._id != user._id) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener("click", function (event, idCardToDelete) {
            event.preventDefault();
            openPopup(deleteCardsPopup);
            event.preventDefault();
            idCardToDelete = data._id;
            console.log(idCardToDelete);
            confirmToDeleteButton.addEventListener("click", function (event) {
                event.preventDefault();
                deleteCardsAPI(idCardToDelete)
                    .then(closePopup(deleteCardsPopup))
                    .then(card.remove())
                    .then((idCardToDelete = ""))
                    .catch((error) => {
                        console.log(
                            `При удалении карточки произошла ошибка: ${error.status} - ${error.statusText}`
                        );
                    })
                    .finally((data) => {
                        console.log(`Post deleted ${data}`);
                    });
            });
        });
    }
}

export {
    confirmToDeleteButton,
    deleteCardsPopup,
    createCard,
    setDeleteCardHandler,
    addCard,
    imagePopup,
};
