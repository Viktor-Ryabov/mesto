import { openPopup } from "../components/modal.js";

const imagePopup = document.querySelector("#image-popup");
const cardPlacesSection = document.querySelector(".places");
const deleteCardsPopup = document.querySelector("#deleteCardsPopup");
const confirmToDeleteButton = document.querySelector("#confirmToDeleteButton");
const popupBigFoto = document.querySelector(".popup__foto");
const popupBigFotoText = document.querySelector(".popup__discription");

function createCard(name, link, likes) {
    const template = document.querySelector("#newCardTemplate").content;
    const card = template.cloneNode(true).querySelector(".card");
    const numberOfLikes = card.querySelector("#numberOfLikes");
    const deleteButton = card.querySelector(".card__delete-button");
    const cardButtonLike = card.querySelector(".card__button-like");

    card.querySelector(".card__title").textContent = name;
    card.querySelector("img").src = link;
    card.querySelector("img").alt = name;

    numberOfLikes.textContent = likes;

    setBigFotoHandler(card.querySelector(".card__foto"), imagePopup);
    setDeleteCardHandler(
        deleteCardsPopup,
        card.querySelector(".card__delete-button"),
        card
    );
    // setLikeHandler(card.querySelector(".card__button-like"));
    
    let baseNumberOfLikes = data.likes.length;

    //активные лайки
    likes = data.likes;
    likes.forEach(function (like) {
        if (like._id == user._id) {
            card.querySelector(".card__button-like").classList.add(
                "card__button-like_active"
            );
        }
    });

    //переключение лайков
    cardButtonLike.addEventListener("click", function (event) {
        if (
            !cardButtonLike.classList.contains(
                "card__button-like_active"
            )
        ) {
            putLikesAPI(data._id)
                .then(
                    (numberOfLikes.textContent = baseNumberOfLikes + 1)
                )
                .then(
                    (baseNumberOfLikes = Number(
                        numberOfLikes.textContent
                    ))
                )
                .then(
                    cardButtonLike.classList.add(
                        "card__button-like_active"
                    )
                )
                .catch((error) => {
                    console.log(
                        `При добавлении like произошла ошибка: ${error.status} - ${error.statusText}`
                    );
                });
        } else {
            deleteLikesAPI(data._id)
                .then(
                    (numberOfLikes.textContent = Number(
                        baseNumberOfLikes - 1
                    ))
                )
                .then(
                    (baseNumberOfLikes = Number(
                        numberOfLikes.textContent
                    ))
                )
                .then(
                    cardButtonLike.classList.remove(
                        "card__button-like_active"
                    )
                )
                .catch((error) => {
                    console.log(
                        `При удалении like произошла ошибка: ${error.status} - ${error.statusText}`
                    );
                });
        }
    });

    //кнопки удаления
    if (data.owner._id != user._id) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener("click", function (event) {
            openPopup(deleteCardsPopup);
            let idCardToDelete = "";
            event.preventDefault();
            idCardToDelete = data._id;
            // console.log("deleteButton: ", idCardToDelete);

            confirmToDeleteButton.addEventListener(
                "click",
                function (event) {
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
                }
            );
        });
    }

    return card;
}

const setLikeHandler = (buttonLike, likes) => {
    buttonLike.addEventListener("click", function (event) {
        event.preventDefault();
        buttonLike.classList.toggle("card__button-like_active");
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
