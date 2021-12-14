import { openPopup } from "../components/modal.js";
import { addLike, deleteLike, setConfirmToDelete } from "../pages/index.js";

const imagePopup = document.querySelector("#image-popup");
const cardPlacesSection = document.querySelector(".places");
const deleteCardsPopup = document.querySelector("#deleteCardsPopup");

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

    //слушатель лайка
    cardButtonLike.addEventListener("click", function (event) {
        event.preventDefault();
        if (!cardButtonLike.classList.contains("card__button-like_active")) {
            addLike(data._id, cardButtonLike, numberOfLikes);
        } else {
            deleteLike(data._id, cardButtonLike, numberOfLikes);
        }
    });

    if (data.owner._id != user._id) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const idCardToDelete = data._id;
            setConfirmToDelete(idCardToDelete, card);
        });
    }

    //я не перебираю все лайки всех карточек
    const dataLikes = data.likes;
    //перебираю только лайки карточки которую создаю
    dataLikes.forEach((like) => {
        //каждый лайк сравниваю с ид.юзера
        if (like._id == user._id) {
            card.querySelector(".card__button-like").classList.add(
                "card__button-like_active"
            );
        }
    });
    return card;
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
    cardPlacesSection.prepend(card);
};

export { deleteCardsPopup, createCard, addCard, imagePopup };
